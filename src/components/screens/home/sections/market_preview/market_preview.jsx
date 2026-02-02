import React from "react";
import Link from "next/link";
import { ArrowRight } from "react-bootstrap-icons";
import styles from "./market_preview.module.scss";

const MarketPreview = () => {
    const marketData = [
        { name: "Bitcoin", symbol: "BTC", price: "$42,530.50", change: "+2.4%", isPositive: true },
        { name: "Ethereum", symbol: "ETH", price: "$2,230.15", change: "+1.8%", isPositive: true },
        { name: "Solana", symbol: "SOL", price: "$98.40", change: "-0.5%", isPositive: false },
        { name: "Cardano", symbol: "ADA", price: "$0.52", change: "+0.2%", isPositive: true },
        { name: "Polkadot", symbol: "DOT", price: "$6.80", change: "-1.1%", isPositive: false },
    ];

    return (
        <section className={styles.marketPreview}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Market Trend</h2>
                    <Link href="/market" className={styles.viewAll}>
                        View full market <ArrowRight />
                    </Link>
                </div>
                <table className={styles.marketTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th className={styles.textRight}>24h Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marketData.map((coin) => (
                            <tr key={coin.symbol}>
                                <td>
                                    <div className={styles.coinName}>
                                        <span>{coin.name}</span>
                                        <span className={styles.symbol}>{coin.symbol}</span>
                                    </div>
                                </td>
                                <td>{coin.price}</td>
                                <td className={coin.isPositive ? styles.positive : styles.negative}>
                                    {coin.change}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MarketPreview;
