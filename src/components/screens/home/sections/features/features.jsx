import React from "react";
import styles from "./features.module.scss";
import { ShieldCheck, Lightning, GraphUp, Wallet2 } from "react-bootstrap-icons";

const Features = () => {
    const features = [
        {
            icon: <Wallet2 />,
            title: "Secure Wallet Storage",
            description: "Your assets are protected by industry-leading encryption and cold storage protocols.",
        },
        {
            icon: <Lightning />,
            title: "Lightning Fast Transfers",
            description: "Send and receive crypto across the globe instantly with minimal transaction fees.",
        },
        {
            icon: <GraphUp />,
            title: "Real-Time Market Data",
            description: "Stay ahead of the market with live price updates and advanced charting tools.",
        },
        {
            icon: <ShieldCheck />,
            title: "Bank-Grade Security",
            description: "We use state-of-the-art security measures to ensure your funds and data are always safe.",
        },
    ];

    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Why Choose VELORIX</h2>
                    <p>
                        Experience the next generation of crypto exchange with features designed for both beginners and pros.
                    </p>
                </div>
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
