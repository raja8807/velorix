import React from "react";
import styles from "./account.module.scss";
import { userProfile } from "@/constants/dummy_data";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { useRouter } from "next/router";

const Account = () => {
    const router = useRouter();

    const handleLogout = () => {
        router.push("/");
    };

    return (
        <div className={styles.account}>
            <div className={styles.profileHeader}>
                <div className={styles.avatarLarge}>
                    <img src={userProfile.avatar} alt="Avatar" />
                </div>
                <div className={styles.userInfo}>
                    <h2 className={styles.name}>{userProfile.name}</h2>
                    <p className={styles.email}>{userProfile.email}</p>
                    <span className={styles.joined}>Member since {userProfile.joined}</span>
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
                                {userProfile.currentSubscription || "VIP-0"}
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
                    {userProfile.previousSubscriptionExpired && (
                        <div className={styles.expiryRow}>
                            Previous <span
                                className={styles.textWhite}
                            >{userProfile.previousSubscription}</span> Subscription Expired: <br /><span className={styles.textWhite}>{userProfile.previousSubscriptionExpired}</span>
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
                        <code>{userProfile.walletAddress}</code>
                        <button className={styles.copyBtn}>Copy</button>
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
