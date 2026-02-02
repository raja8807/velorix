import React, { useState } from "react";
import styles from "./Subscription.module.scss";
import { CheckCircleFill, XCircle } from "react-bootstrap-icons";
import PaymentModal from "./PaymentModal/PaymentModal";

const Subscription = () => {
    const [currentPlan, setCurrentPlan] = useState("VIP-0");
    const [processing, setProcessing] = useState(null); // plan ID being processed
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        // {
        //     id: "VIP-0",
        //     name: "VIP-0",
        //     price: 0,
        //     limit: "0",
        //     benefits: [
        //         "Basic account access",
        //         "Market data viewing",
        //         "Zero transaction fees",
        //     ],
        //     missing: [
        //         "No withdrawals",
        //         "No transfers"
        //     ]
        // },
        {
            id: "VIP-1",
            name: "VIP-1",
            price: 9.99,
            limit: "5,000",
            benefits: [
                "Everything in VIP-0",
                "$5,000 Monthly limit",
                "Standard support",
                "Withdrawals enabled"
            ],
            missing: []
        },
        {
            id: "VIP-2",
            name: "VIP-2",
            price: 24.99,
            limit: "25,000",
            featured: true,
            badge: "Popular",
            benefits: [
                "Everything in VIP-1",
                "$25,000 Monthly limit",
                "Priority support",
                "Lower fees"
            ],
            missing: []
        },
        {
            id: "VIP-3",
            name: "VIP-3",
            price: 49.99,
            limit: "Unlimited",
            badge: "Best Value",
            benefits: [
                "Everything in VIP-2",
                "Unlimited transfers",
                "Dedicated manager",
                "Zero fees"
            ],
            missing: []
        }
    ];

    const handleUpgrade = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handlePaymentSuccess = (planId) => {
        setIsModalOpen(false);
        setProcessing(planId);
        // Simulate backend update
        setTimeout(() => {
            setCurrentPlan(planId);
            setProcessing(null);
            setSelectedPlan(null);
        }, 1000);
    };

    return (
        <div className={styles.subscription}>
            <div className={styles.header}>
                <h1>Upgrade Your Plan</h1>
                <p>Unlock higher limits and exclusive features for your crypto journey.</p>
            </div>

            <div className={styles.plansGrid}>
                {plans.map((plan) => {
                    const isCurrent = currentPlan === plan.id;
                    const isProcessing = processing === plan.id;
                    const isFree = plan.price === 0;

                    return (
                        <div key={plan.id} className={`${styles.planCard} ${isCurrent ? styles.current : ""} ${plan.featured ? styles.featured : ""}`}>
                            {plan.badge && <div className={styles.badge}>{plan.badge}</div>}

                            {isProcessing && (
                                <div className={styles.loadingOverlay}>
                                    <div className={styles.spinner}></div>
                                    <span>Processing...</span>
                                </div>
                            )}

                            <h3 className={styles.planName}>{plan.name}</h3>

                            <div className={styles.price}>
                                <span className={styles.amount}>{isFree ? "Free" : `$${plan.price}`}</span>
                                {!isFree && <span className={styles.period}>/month</span>}
                            </div>

                            <ul className={styles.benefits}>
                                {plan.benefits.map((benefit, index) => (
                                    <li key={index}>
                                        <CheckCircleFill className={styles.icon} />
                                        {benefit}
                                    </li>
                                ))}
                                {plan.missing && plan.missing.map((missing, index) => (
                                    <li key={`missing-${index}`} className={styles.disabled}>
                                        <XCircle className={styles.icon} />
                                        {missing}
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.buttonContainer}>
                                <button
                                    className={`${styles.selectBtn} ${plan.featured ? styles.primary : ""}`}
                                    disabled={isCurrent || isProcessing}
                                    onClick={() => handleUpgrade(plan)}
                                >
                                    {isCurrent ? "Current Plan" : "Upgrade"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className={styles.disclaimer}>
                * Subscription limits reset on the 1st of every month. Prices are in USD. Cancel anytime.
            </p>

            {isModalOpen && selectedPlan && (
                <PaymentModal
                    plan={selectedPlan}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};

export default Subscription;
