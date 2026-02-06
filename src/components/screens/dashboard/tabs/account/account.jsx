import React from "react";
import styles from "./account.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const Account = () => {
    const router = useRouter();
    const { signOut, userData } = useAuth();

    const handleLogout = async () => {
        await signOut();
        router.push("/login");
    };

    if (!userData) {
        return <div className={styles.account}>Loading profile...</div>;
    }

    return (
        <div className={styles.account}>
            <div className={styles.profileHeader}>
                <div className={styles.avatarLarge}>
                    <p>{userData.name.charAt(0).toUpperCase()}</p>
                </div>
                <div className={styles.userInfo}>
                    <h2 className={styles.name}>{userData.name}</h2>
                    <p className={styles.email}>{userData.email}</p>
                    <span className={styles.joined}>Member since {userData.joined}</span>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.subscriptionHeader}>
                    <h3 className={styles.sectionTitle}>Subscription</h3>
                </div>
                <div className={styles.subscriptionCard}>
                    <div className={styles.cardRow}>
                        <div>
                            <span className={styles.fieldLabel}>Current Plan</span>
                            <div className={styles.fieldValue}>
                                {userData.current_subscription || "VIP-0"}
                                <span className={styles.activeBadge}>Active</span>
                            </div>
                        </div>
                        <div className={styles.textAlignRight}>
                            <span className={styles.fieldLabel}>Monthly Limit</span>
                            <div className={styles.limitValue}>
                                $0.00
                            </div>
                        </div>
                    </div>
                    {userData.previous_subscription_expired && (
                        <div className={styles.expiryRow}>
                            Previous <span
                                className={styles.textWhite}
                            >{userData.previous_subscription}</span> Subscription Expired: <br /><span className={styles.textWhite}>{userData.previous_subscription_expired}</span>
                        </div>
                    )}
                </div>
                <br />
                <CustomButton variant="primary" fullWidth href="/dashboard/account/subscription">Manage Plan</CustomButton>

            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Security</h3>
                <div className={styles.field}>
                    <label>Wallet Address</label>
                    <div className={styles.copyRow}>
                        <code>{userData.wallet_address || "Not Connected"}</code>
                        {
                            userData.wallet_address && (
                                <button className={styles.copyBtn}>Copy</button>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <CustomButton variant="outline" onClick={handleLogout}>Log Out</CustomButton>
            </div>
        </div>
    );
};

export default Account;
