import styles from "./overview.module.scss";
import React, { useState } from "react";
import TotalBalanceCard from "@/components/common/TotalBalanceCard/TotalBalanceCard";
import TransactionModal from "./TransactionModal/TransactionModal";
import { useAppContext } from "@/context/AppContext";
import { Image } from "react-bootstrap";

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

    const icons = {
        'BTC': 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
        'ETH': 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501400',
        'USDT': 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661',
        'BNB': 'https://coin-images.coingecko.com/coins/images/1839/large/binance-coin.png?1696501400',
        'SOL': 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756',
        'ADA': 'https://coin-images.coingecko.com/coins/images/2679/large/cardano.png?1696501400',
        'XRP': 'https://coin-images.coingecko.com/coins/images/1419/large/xrp.png?1696501400',
        'DOGE': 'https://coin-images.coingecko.com/coins/images/2261/large/dogecoin.png?1696501400',
        'TRX': 'https://coin-images.coingecko.com/coins/images/1825/large/tron.png?1696501400',
        'LTC': 'https://coin-images.coingecko.com/coins/images/2261/large/dogecoin.png?1696501400',
    }



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
                                    {/* {tx.type[0]} */}
                                    <Image src={icons[tx.asset]} alt={tx.asset} width={24} height={24} />
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
