import React from "react";
import { useRouter } from "next/router";
import styles from "./TransactionModal.module.scss";
import { userProfile } from "@/constants/dummy_data";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import CustomButton from "@/components/ui/custom_button/custom_button";

const TransactionModal = ({ isOpen, onClose, transaction, onUpdateStatus }) => {
    const router = useRouter();

    if (!transaction) return null;

    const isPendingReceive = transaction.status === "Pending" && transaction.type === "Receive";

    const handleAction = (status) => {
        if (status === "Completed" && userProfile.currentSubscription === "VIP-0") {
            alert("You need at least VIP-1 to accept external transfers.");
            router.push("/dashboard/account/subscription");
            return;
        }

        if (onUpdateStatus) {
            onUpdateStatus(transaction.id, status);
        }
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Transaction Details">
            <div className={styles.modalDetails}>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Type</span>
                    <span className={styles.value}>{transaction.type}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Asset</span>
                    <span className={styles.value}>{transaction.asset}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Amount</span>
                    <span className={`${styles.value} ${transaction.type === 'Receive' ? styles.positive : ''}`}>
                        {transaction.type === 'Receive' ? '+' : '-'}{transaction.amount}
                    </span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Date</span>
                    <span className={styles.value}>{transaction.date}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Status</span>
                    <span className={`${styles.statusBadge} ${styles[transaction.status.toLowerCase()] || ''}`}>
                        {transaction.status}
                    </span>
                </div>

                {transaction.sender && (
                    <div className={styles.detailRow}>
                        <span className={styles.label}>From</span>
                        <span className={styles.txId}>{transaction.sender}</span>
                    </div>
                )}

                {transaction.recipient && (
                    <div className={styles.detailRow}>
                        <span className={styles.label}>To</span>
                        <span className={styles.txId}>{transaction.recipient}</span>
                    </div>
                )}

                <div className={styles.detailRow}>
                    <span className={styles.label}>Transaction ID</span>
                    <span className={styles.txId}>#{transaction.id}938475...</span>
                </div>

                {isPendingReceive && (
                    <div className={styles.actions}>
                        <CustomButton
                            className={styles.declineBtn}
                            onClick={() => handleAction("Declined")}
                        >
                            Decline
                        </CustomButton>
                        <CustomButton
                            onClick={() => handleAction("Completed")}
                        >
                            Accept
                        </CustomButton>
                    </div>
                )}
            </div>
        </CustomModal>
    );
};

export default TransactionModal;
