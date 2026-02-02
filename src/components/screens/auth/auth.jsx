import React, { useState } from "react";
import styles from "./auth.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomInput from "@/components/ui/custom_input/custom_input";
import { useRouter } from "next/router";

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();
    const [values, setValues] = useState({
        email: "test@gmail.com",
        password: "test123",
        confirmPassword: "test123",
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Dummy validation
        const email = values.email;
        const password = values.password;

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email.");
            return;
        }

        // Mock success
        console.log(isLogin ? "Logging in..." : "Signing up...");
        router.push("/dashboard");
    };

    return (
        <div className={styles.authWrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className={styles.subtitle}>
                        {isLogin ? "Access your crypto portfolio" : "Join the future of finance"}
                    </p>
                </div>

                <div className={styles.toggleContainer}>
                    <button
                        className={`${styles.toggleBtn} ${isLogin ? styles.active : ""}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${!isLogin ? styles.active : ""}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <CustomInput
                        label="Email Address"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />

                    <CustomInput
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={values.password}
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                    />

                    {!isLogin && (
                        <CustomInput
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={values.confirmPassword}
                            onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                        />
                    )}

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <div className={styles.actions}>
                        <CustomButton type="submit" fullWidth variant="primary">
                            {isLogin ? "Log In" : "Sign Up"}
                        </CustomButton>
                    </div>
                </form>

                <div className={styles.footer}>
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <span onClick={() => setIsLogin(!isLogin)} className={styles.link}>
                            {isLogin ? " Sign Up" : " Log In"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
