import React from "react";
import styles from "./how_it_works.module.scss";

const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Create Account",
            description: "Sign up for free in minutes. Verify your identity to ensure maximum security.",
        },
        {
            number: "2",
            title: "Add Funds",
            description: "Deposit crypto or fiat currency using your preferred payment method.",
        },
        {
            number: "3",
            title: "Start Trading",
            description: "Buy, sell, and trade over 100+ cryptocurrencies with ease and confidence.",
        },
    ];

    return (
        <section className={styles.howItWorks}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Get Started in Minutes</h2>
                    <p>Your journey into the world of crypto begins here</p>
                </div>
                <div className={styles.steps}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.step}>
                            <div className={styles.number}>{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
