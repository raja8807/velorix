import React from "react";
import styles from "./value_props.module.scss";
import { features } from "@/constants/dummy_data";

const ValueProps = () => {
    return (
        <section className={styles.valueProps}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>Why Choose VELORIX?</h2>
                    <p className={styles.subheading}>We provide the best tools for your crypto journey.</p>
                </div>
                <div className={styles.grid}>
                    {features.map((feature) => (
                        <div key={feature.id} className={styles.card}>
                            <div className={styles.iconBox}>
                                {/* Simple shape icons for now */}
                                <div className={`${styles.icon} ${styles[feature.icon]}`}></div>
                            </div>
                            <h3 className={styles.title}>{feature.title}</h3>
                            <p className={styles.description}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
