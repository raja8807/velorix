import React from "react";
import styles from "./trust.module.scss";

const Trust = () => {
    const partners = ["Binance", "Coinbase", "Kraken", "Gemini", "Chainlink"];

    return (
        <section className={styles.trust}>
            <div className={styles.container}>
                <span className={styles.label}>Trusted by industry leaders</span>
                <div className={styles.logos}>
                    {partners.map((partner) => (
                        <div key={partner} className={styles.logo}>
                            {partner}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trust;
