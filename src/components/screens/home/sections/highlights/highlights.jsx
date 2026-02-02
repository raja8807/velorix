import React from "react";
import styles from "./highlights.module.scss";

const Highlights = () => {
    const stats = [
        { label: "Quarterly Volume", value: "$20B+" },
        { label: "Verified Users", value: "10M+" },
        { label: "Countries Supported", value: "100+" },
        { label: "Total Assets", value: "$500M+" },
    ];

    return (
        <section className={styles.highlights}>
            <div className={styles.container}>
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <h3 className={styles.value}>{stat.value}</h3>
                            <p className={styles.label}>{stat.label}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.trustBadge}>
                    <p>Trusted by industry leaders worldwide</p>
                    {/* Logos could go here */}
                </div>
            </div>
        </section>
    );
};

export default Highlights;
