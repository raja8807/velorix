import React from "react";
import styles from "./TotalBalanceCard.module.scss";
import { calculateWalletBalance, calculatePendingBalance } from "@/utils/financials";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { useAppContext } from "@/context/AppContext";

const TotalBalanceCard = () => {
    const { assets, transactions } = useAppContext();
    const walletBalance = calculateWalletBalance(assets || []);
    const pendingBalance = calculatePendingBalance(transactions || []);

    return (
        <div className={styles.totalBalanceCard}>
            <div className={styles.balanceSection}>
                <div className={styles.balanceItem}>
                    <div className={styles.balanceHeader}>
                        <span>Available Balance</span>
                        <span className={styles.currency}>{walletBalance.currency}</span>
                    </div>
                    <h1 className={styles.amount}>
                        ${walletBalance.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h1>
                    <div className={styles.pnl}>
                        <span className={walletBalance.change24h >= 0 ? styles.positive : styles.negative}>
                            {walletBalance.change24h > 0 ? "+" : ""}{walletBalance.change24h}%
                        </span>
                        <span className={styles.label}>Last 24 hours</span>
                    </div>
                </div>

                {pendingBalance > 0 && (
                    <div className={`${styles.balanceItem} ${styles.pending}`}>
                        <div className={styles.balanceHeader}>
                            <span>Pending Inbound</span>
                        </div>
                        <h1 className={styles.amount}>
                            ${pendingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h1>
                        <div className={styles.pnl}>
                            <span className={styles.label}>Processing...</span>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <CustomButton variant="primary" href="/dashboard/withdraw">
                    Withdraw
                </CustomButton>
            </div>
        </div>
    );
};

export default TotalBalanceCard;
