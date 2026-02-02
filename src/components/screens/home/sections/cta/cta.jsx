import React from "react";
import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./cta.module.scss";

const CTA = () => {
    return (
        <section className={styles.cta}>
            <div className={styles.container}>
                <h2>Start Your Crypto Journey</h2>
                <p>
                    Join millions of users who trust VELORIX for their portfolio management.
                    Sign up today and get started in minutes.
                </p>
                <div className={styles.buttonWrapper}>
                    <CustomButton variant="secondary" href="/login">
                        Create Free Account
                    </CustomButton>
                </div>
            </div>
        </section>
    );
};

export default CTA;
