import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./DashboardLayout.module.scss";
import { CurrencyExchange, GraphUp, GraphUpArrow, Grid, Grid1x2Fill, PersonCircle, PersonLinesFill, Wallet, Wallet2, WalletFill } from "react-bootstrap-icons";
import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";

const DashboardLayout = ({ children }) => {
    const router = useRouter();
    const { userData } = useAuth();
    const { transactions } = useAppContext();
    const [activeTab, setActiveTab] = useState("");

    // Calculate pending transactions
    const pendingCount = (transactions || []).filter(t => t.status === "Pending" && t.type === "Receive").length;

    // Set active tab based on current path
    useEffect(() => {
        if (router.isReady) {
            const path = router.pathname;
            if (path.includes("/dashboard/assets")) setActiveTab("assets");
            else if (path.includes("/dashboard/withdraw")) setActiveTab("withdraw");
            else if (path.includes("/dashboard/market")) setActiveTab("market");
            else if (path.includes("/dashboard/account")) setActiveTab("account");
            else setActiveTab("overview");
        }
    }, [router.isReady, router.pathname]);

    const navItems = [
        { id: "overview", label: "Dashboard", icon: <Grid />, iconActive: <Grid1x2Fill />, path: "/dashboard/overview", badgeCount: pendingCount },
        { id: "assets", label: "Assets", icon: <Wallet />, iconActive: <WalletFill />, path: "/dashboard/assets" },
        { id: "withdraw", label: "Withdraw", icon: <CurrencyExchange />, iconActive: <CurrencyExchange />, path: "/dashboard/withdraw" },
        { id: "market", label: "Market", icon: <GraphUp />, iconActive: <GraphUpArrow />, path: "/dashboard/market" },
        { id: "account", label: "Account", icon: <PersonCircle />, iconActive: <PersonLinesFill />, hasBadge: true, path: "/dashboard/account" },
    ];

    return (
        <div className={styles.dashboardLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <h2>VELORIX</h2>
                </div>
                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            href={item.path}
                            key={item.id}
                            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ""}`}
                        >
                            <span className={styles.icon}>
                                {activeTab === item.id ? item.iconActive : item.icon}
                                {item.hasBadge && <p className={styles.badgeTab}>{userData?.current_subscription || "VIP-0"}</p>}
                                {item.badgeCount > 0 && <span className={styles.notificationBadgeTab}>{item.badgeCount}</span>}
                            </span>
                            <span className={styles.label}>{item.label}</span>
                            {item.hasBadge && <p className={styles.badgeList}>{userData?.current_subscription || "VIP-0"}</p>}
                            {item.badgeCount > 0 && <span className={styles.notificationBadgeList}>{item.badgeCount}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>
            <main className={styles.contentArea}>
                <div className={styles.scrollContent}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
