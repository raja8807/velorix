import React from "react";
import styles from "./my_assets.module.scss";
import TotalBalanceCard from "@/components/common/TotalBalanceCard/TotalBalanceCard";
import { CurrencyBitcoin, CurrencyExchange, GraphUpArrow, WalletFill } from "react-bootstrap-icons";
import { useAppContext } from "@/context/AppContext";

const MyAssets = () => {
    const { assets } = useAppContext();

    const getIcon = (symbol) => {
        switch (symbol) {
            case "BTC": return <CurrencyBitcoin />;
            case "ETH": return <CurrencyExchange />;
            case "USDT": return <WalletFill />;
            case "SOL": return <GraphUpArrow />;
            default: return <WalletFill />;
        }
    };

    return (
        <div className={styles.myAssets}>
            <div className={styles.header}>
                <h2>My Assets</h2>
                <p>Manage your crypto portfolio and track performance.</p>
            </div>

            <TotalBalanceCard />

            <div className={styles.assetsList}>
                {(assets || []).map((asset) => {
                    const value = asset.balance * asset.price;
                    const isPositive = asset.change24h >= 0;

                    return (
                        <div key={asset.id} className={styles.assetRow}>
                            <div className={styles.assetInfo}>
                                <div className={styles.icon}>
                                    {getIcon(asset.symbol)}
                                </div>
                                <div className={styles.details}>
                                    <h3>{asset.name}</h3>
                                    <span className={styles.symbol}>{asset.symbol}</span>
                                </div>
                            </div>

                            <div className={styles.assetStats}>
                                <div className={styles.stat}>
                                    <span className={styles.label}>Price</span>
                                    <span className={styles.value}>
                                        ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.label}>Balance</span>
                                    <span className={styles.value}>
                                        {Number(asset.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {asset.symbol}
                                    </span>
                                    <span className={`${styles.label} ${styles.fiatValue}`}>
                                        ≈ ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className={`${styles.stat} ${styles.statRight}`}>
                                    <span className={styles.label}>24h</span>
                                    <span className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
                                        {isPositive ? "+" : ""}{Number(asset.change24h).toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyAssets;
