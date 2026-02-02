import React, { useState } from "react";
import styles from "./dashboard.module.scss";
import Overview from "./tabs/overview/overview";
import Market from "./tabs/market/market";
import Withdraw from "./tabs/withdraw/withdraw";
import MyAssets from "./tabs/my_assets/my_assets";
import Account from "./tabs/account/account";
import { CurrencyExchange, GraphUp, GraphUpArrow, Grid, Grid1x2Fill, PersonCircle, PersonLinesFill, Wallet, Wallet2, WalletFill } from "react-bootstrap-icons";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const renderContent = () => {
        switch (activeTab) {
            case "overview": return <Overview />;
            case "market": return <Market />;
            case "withdraw": return <Withdraw />;
            case "my_assets": return <MyAssets />;
            case "account": return <Account />;
            default: return <Overview />;
        }
    };

    const navItems = [
        { id: "overview", label: "Dashboard", icon: <Grid />, iconActive: <Grid1x2Fill /> },
        { id: "my_assets", label: "Assets", icon: <Wallet />, iconActive: <WalletFill /> },
        { id: "withdraw", label: "Withdraw", icon: <CurrencyExchange />, iconActive: <CurrencyExchange /> },
        { id: "market", label: "Market", icon: <GraphUp />, iconActive: <GraphUpArrow /> },
        { id: "account", label: "Account", icon: <PersonCircle />, iconActive: <PersonLinesFill />, hasBadge: true },
    ];

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <h2>VELORIX</h2>
                </div>
                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ""}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className={styles.icon}>{activeTab === item.id ? item.iconActive : item.icon}
                                {item.hasBadge && <p className={styles.badgeTab}>VIP-1</p>}
                            </span>
                            <span className={styles.label}>{item.label}</span>
                            {item.hasBadge && <p className={styles.badgeList}>VIP-1</p>}


                        </button>
                    ))}
                </nav>
            </aside>
            <main className={styles.contentArea}>

                <div className={styles.scrollContent}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
