import React, { useState } from "react";
import styles from "./complete_profile.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomInput from "@/components/ui/custom_input/custom_input";
import PinInput from "@/components/common/pin_input/pin_input";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const CompleteProfileScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { createProfile, user } = useAuth();
    const router = useRouter();

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        securityCode: "",
        confirmSecurityCode: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!values.firstName.trim() || !values.lastName.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (values.securityCode.length < 6) {
            setError("Security code must be 6 digits.");
            return;
        }

        if (values.securityCode !== values.confirmSecurityCode) {
            setError("Security codes do not match.");
            return;
        }

        setLoading(true);

        try {
            // Need to pass userAuth from context or session, but createProfile expects userAuth as first arg.
            // AuthContext's createProfile signature: async (userAuth, { ...data })
            // We can get userAuth from `user` object from useAuth()

            if (!user) {
                setError("User not authenticated. Please log in again.");
                setLoading(false);
                return;
            }

            const result = await createProfile(user, {
                firstName: values.firstName,
                lastName: values.lastName,
                securityCode: values.securityCode
            });

            if (result) {
                router.push("/dashboard");
            } else {
                setError("Failed to create profile. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Complete Your Profile</h2>
                    <p className={styles.subtitle}>
                        Please provide your details to secure your account
                    </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <CustomInput
                            label="First Name"
                            type="text"
                            placeholder="John"
                            value={values.firstName}
                            onChange={(e) => setValues({ ...values, firstName: e.target.value })}
                        />
                        <CustomInput
                            label="Last Name"
                            type="text"
                            placeholder="Doe"
                            value={values.lastName}
                            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
                        />
                    </div>

                    <div>
                        <div className={styles.sectionTitle}>Set Security PIN (6 Digits)</div>
                        <PinInput
                            length={6}
                            onChange={(val) => setValues(prev => ({ ...prev, securityCode: val }))}
                            showForgot={false}
                        />
                    </div>

                    <div>
                        <div className={styles.sectionTitle}>Confirm Security PIN</div>
                        <PinInput
                            length={6}
                            onChange={(val) => setValues(prev => ({ ...prev, confirmSecurityCode: val }))}
                            showForgot={false}
                        />
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <div className={styles.actions}>
                        <CustomButton type="submit" fullWidth variant="primary" disabled={loading}>
                            {loading ? "Processing..." : "Complete Setup"}
                        </CustomButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfileScreen;
