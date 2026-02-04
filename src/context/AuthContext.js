
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()




    // Helper to fetch profile
    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) {
                console.error('Error fetching profile:', error)
                return null
            }
            return data
        } catch (error) {
            console.error('Unexpected error fetching profile:', error)
            return null
        }
    }

    // Helper to create profile
    const createProfile = async (userAuth) => {
        const newProfile = {
            id: userAuth.id,
            email: userAuth.email,
            name: "New User",
            avatar: "https://i.pravatar.cc/150?u=" + userAuth.id,
            wallet_address: "",
            joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
            previous_subscription_expired: null,
            previous_subscription: null,
            current_subscription: "VIP-0",
            updated_at: new Date()
        }

        try {
            const { data, error } = await supabase
                .from('users')
                .insert([newProfile])
                .select()
                .single()

            if (error) {
                console.error('Error creating profile:', error)
                return null
            }
            return data
        } catch (error) {
            console.error('Unexpected error creating profile:', error)
            return null
        }
    }

    useEffect(() => {
        const initializeAuth = async () => {
            // Check active session
            const { data: { session }, error } = await supabase.auth.getSession()
            if (error) console.error('Error getting session:', error)

            setSession(session)
            setUser(session?.user ?? null)

            if (session?.user) {
                let profile = await fetchProfile(session.user.id)
                if (!profile) {
                    profile = await createProfile(session.user)
                }
                setUserData(profile)
            } else {
                setUserData(null)
            }
            setLoading(false)
        }

        initializeAuth()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)

            if (session?.user) {
                // Determine if we need to fetch profile (optimization: check if ID changed or no userData)
                // For safety, let's fetch.
                let profile = await fetchProfile(session.user.id)
                if (!profile) {
                    profile = await createProfile(session.user)
                }
                setUserData(profile)
            } else {
                setUserData(null)
            }

            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        // If signup is successful and we have a session (auto-login), profile creation 
        // will be handled by onAuthStateChange. 
        // But if email confirmation is required, we won't have a session yet.
        return { data, error }
    }

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            setUserData(null)
            router.push('/')
        }
        return { error }
    }

    const value = {
        signUp,
        signIn,
        signOut,
        user,
        userData,
        session,
        loading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
