import React from "react";
import styles from "./hero.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Security First. <br />
                        <span className={styles.highlight}>Crypto</span> for Everyone.
                    </h1>
                    <p className={styles.subtitle}>
                        Buy, sell, and store digital assets with the world&apos;s most secure and user-friendly crypto wallet.
                        Start your journey with zero fees on your first transfer.
                    </p>
                    <div className={styles.actions}>
                        <CustomButton variant="primary" href="/login">Get Started</CustomButton>
                        <CustomButton variant="outline" href="/market">View Markets</CustomButton>
                    </div>
                </div>
                <div className={styles.visual}>
                    {/* Abstract visual/placeholder */}
                    <div className={styles.circle}></div>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span>BTC/USD</span>
                            <span className={styles.positive}>+2.4%</span>
                        </div>
                        <div className={styles.cardPrice}>$42,530.50</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
