import React, { useState } from "react";
import styles from "./withdraw.module.scss";
import WithdrawForm from "./components/WithdrawForm/WithdrawForm";
import TransferForm from "./components/TransferForm/TransferForm";

const Withdraw = () => {
    const [activeTab, setActiveTab] = useState("withdraw");

    return (
        <div className={styles.withdraw}>
            <h2 className={styles.title}>Withdraw Components</h2>
            <div className={styles.card}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "withdraw" ? styles.active : ""}`}
                        onClick={() => setActiveTab("withdraw")}
                    >
                        Withdraw
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "transfer" ? styles.active : ""}`}
                        onClick={() => setActiveTab("transfer")}
                    >
                        Internal Transfer
                    </button>
                </div>

                {activeTab === "withdraw" ? <WithdrawForm
                    setActiveTab={setActiveTab}
                /> : <TransferForm />}
            </div>
        </div>
    );
};

export default Withdraw;
