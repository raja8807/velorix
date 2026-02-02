import React, { useEffect, useState } from "react";
import styles from "./market.module.scss";
import { fetchMarketData } from "@/services/cryptoService";
import { marketCoins as dummyCoins } from "@/constants/dummy_data";

const Market = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchMarketData();
            if (data) {
                setCoins(data);
            } else {
                setCoins(dummyCoins); // Fallback to dummy data
            }
            setLoading(false);
        };

        loadData();
        const interval = setInterval(loadData, 60000); // Update every 60s

        return () => clearInterval(interval);
    }, []);

    // Helper to format large numbers
    const formatMarketCap = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        return num.toLocaleString();
    };

    return (
        <div className={styles.market}>
            <div className={styles.tableHeader}>
                <div className={styles.col}>Asset</div>
                <div className={styles.col}>Price</div>
                <div className={styles.col}>24h Change</div>
                <div className={styles.col}>Market Cap</div>
                <div className={styles.col}>Action</div>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <div className={styles.coinList}>
                    {coins.map((coin) => (
                        <div key={coin.id} className={styles.coinRow}>
                            <div className={styles.col}>
                                <div className={styles.assetInfo}>
                                    {coin.image ? (
                                        <img src={coin.image} alt={coin.name} className={styles.coinImg} />
                                    ) : (
                                        <div className={styles.coinIcon}>{coin.symbol[0]}</div>
                                    )}
                                    <div>
                                        <span className={styles.symbol}>{coin.symbol}</span>
                                        <span className={styles.name}>{coin.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.col}>
                                ${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                            <div className={`${styles.col} ${coin.change24h >= 0 ? styles.positive : styles.negative}`}>
                                {coin.change24h > 0 ? "+" : ""}{coin.change24h?.toFixed(2)}%
                            </div>
                            <div className={`${styles.col} ${styles.desktopOnly}`}>
                                ${formatMarketCap(coin.marketCap)}
                            </div>
                            <div className={styles.col}>
                                <button className={styles.tradeBtn}>Trade</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Market;
