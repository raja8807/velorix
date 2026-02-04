import styles from "./overview.module.scss";
import React, { useState } from "react";
import TotalBalanceCard from "@/components/common/TotalBalanceCard/TotalBalanceCard";
import TransactionModal from "./TransactionModal/TransactionModal";
import { useAppContext } from "@/context/AppContext";

const Overview = () => {
    const { transactions } = useAppContext();
    const [selectedTx, setSelectedTx] = useState(null);

    const handleUpdateStatus = (id, newStatus) => {
        // Ideally call Supabase update here
        console.log("Update status:", id, newStatus);
    };

    // Sort transactions: Pending first
    const sortedTransactions = [...(transactions || [])].sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return 0;
    });

    return (
        <div className={styles.overview}>
            {/* Balance Card */}
            <TotalBalanceCard />

            {/* Recent Transactions */}
            <div className={styles.transactions}>
                <h3 className={styles.sectionTitle}>Recent Transactions</h3>
                <div className={styles.txList}>
                    {sortedTransactions.map((tx) => (
                        <div
                            key={tx.id}
                            className={styles.txItem}
                            onClick={() => setSelectedTx(tx)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={styles.txLeft}>
                                <div className={`${styles.icon} ${styles[tx.type.toLowerCase()]}`}>
                                    {tx.type[0]}
                                </div>
                                <div className={styles.txInfo}>
                                    <span className={styles.txType}>{tx.type} {tx.asset}</span>
                                    <span className={styles.txDate}>{tx.date}</span>
                                </div>
                            </div>
                            <div className={styles.txRight}>
                                <span className={`${styles.txAmount} ${tx.type === 'Receive' ? styles.positive : ''}`}>
                                    {tx.type === 'Receive' ? '+' : '-'}{Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tx.asset}
                                </span>
                                <span className={`${styles.txStatus} ${tx.status === 'Pending' ? styles.pendingBadge : ''}`}>
                                    {tx.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <TransactionModal
                isOpen={!!selectedTx}
                onClose={() => setSelectedTx(null)}
                transaction={selectedTx}
                onUpdateStatus={handleUpdateStatus}
            />
        </div>
    );
};

export default Overview;
