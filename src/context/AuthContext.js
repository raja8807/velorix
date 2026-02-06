
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
                .select('id, email, name, avatar, wallet_address, joined, previous_subscription_expired, previous_subscription, current_subscription, updated_at')
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
    const createProfile = async (userAuth, { firstName, lastName, securityCode }) => {
        const newProfile = {
            id: userAuth.id,
            email: userAuth.email,
            name: `${firstName} ${lastName}`,
            avatar: "https://i.pravatar.cc/150?u=" + userAuth.id,
            wallet_address: "",
            joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
            previous_subscription_expired: null,
            previous_subscription: null,
            current_subscription: "VIP-0",
            updated_at: new Date(),
            security_code: securityCode
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
            // Update local state immediately after creation
            setUserData(data)
            return data
        } catch (error) {
            console.error('Unexpected error creating profile:', error)
            return null
        }
    }

    useEffect(() => {
        let mounted = true

        const handleSession = async (session) => {
            if (!mounted) return

            setSession(session)
            setUser(session?.user ?? null)

            if (session?.user) {
                let profile = await fetchProfile(session.user.id)
                // Removed auto-creation logic here
                setUserData(profile)
            } else {
                setUserData(null)
            }

            setLoading(false)
        }

        // 1️⃣ Subscribe FIRST
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            handleSession(session)
        })

        // 2️⃣ Bootstrap once (non-authoritative)
        supabase.auth.getSession().then(({ data }) => {
            handleSession(data.session)
        })

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
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
        createProfile,
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
