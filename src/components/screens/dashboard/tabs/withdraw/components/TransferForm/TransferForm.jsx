import React, { useState } from "react";
import styles from "./TransferForm.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomInput from "@/components/ui/custom_input/custom_input";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";

const TransferForm = () => {
    const router = useRouter();
    const { assets, checkUserByEmail, checkPendingInbound, sendTransfer } = useAppContext();
    const [status, setStatus] = useState("");
    const [selectedAssetSymbol, setSelectedAssetSymbol] = useState("BTC");
    const [amount, setAmount] = useState("");

    // Recipient State
    const [recipientEmail, setRecipientEmail] = useState("");
    const [verifiedUser, setVerifiedUser] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState("");

    const safeAssets = assets || [];
    const selectedAsset = safeAssets.find(a => a.symbol === selectedAssetSymbol) || {};

    const handleMax = () => {
        if (selectedAsset) {
            setAmount(selectedAsset.balance.toString());
        }
    };

    const handleVerifyUser = async () => {
        if (!recipientEmail) return;
        setIsVerifying(true);
        setVerificationError("");
        setVerifiedUser(null);

        const user = await checkUserByEmail(recipientEmail);
        setIsVerifying(false);

        if (user) {
            setVerifiedUser(user);
        } else {
            setVerificationError("User not found or invalid email.");
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        if (!verifiedUser) return;

        setStatus("processing");

        // Check for pending inbound transactions for the recipient
        const hasPending = await checkPendingInbound(verifiedUser.id);
        if (hasPending) {
            alert("Transfer Blocked: The recipient already has a pending transaction. They must accept it before receiving more.");
            setStatus("");
            return;
        }

        const { error } = await sendTransfer({
            asset: selectedAssetSymbol,
            amount: parseFloat(amount),
            recipientId: verifiedUser.id,
            recipientName: verifiedUser.name || verifiedUser.email
        });

        if (error) {
            console.error(error);
            setStatus("failed");
            alert("Transfer failed: " + error.message);
            setStatus("");
        } else {
            // Success state
            setStatus("success");

            // Redirect after 2 seconds
            setTimeout(() => {
                router.push("/dashboard/overview");
            }, 2000);
        }
    };

    return (
        <form onSubmit={handleTransfer} className={styles.form}>
            <div className={styles.inputGroup}>
                <label>Asset</label>
                <div className={styles.selectWrapper}>
                    <select
                        className={styles.input}
                        value={selectedAssetSymbol}
                        onChange={(e) => {
                            setSelectedAssetSymbol(e.target.value);
                            setAmount("");
                        }}
                    >
                        {safeAssets.map(asset => (
                            <option key={asset.id} value={asset.symbol}>
                                {asset.name} ({asset.symbol})
                            </option>
                        ))}
                    </select>
                    <span className={styles.balanceHint}>
                        Available: {Number(selectedAsset.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedAsset.symbol}
                    </span>
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label>Recipient Email</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <CustomInput
                        type="email"
                        placeholder="User email"
                        value={recipientEmail}
                        onChange={(e) => {
                            setRecipientEmail(e.target.value);
                            setVerifiedUser(null);
                            setVerificationError("");
                        }}
                        required
                        className={styles.inputNoLabel}
                        style={{ flex: 1 }}
                    />
                    <CustomButton
                        type="button"
                        variant="outline"
                        onClick={handleVerifyUser}
                    // disabled={isVerifying || !recipientEmail}
                    >
                        {isVerifying ? "..." : "Verify"}
                    </CustomButton>
                </div>
                {verifiedUser && (
                    <span className={styles.hint} style={{ color: '#4caf50' }}>
                        Verified: {verifiedUser.name || "User found"}
                    </span>
                )}
                {verificationError && (
                    <span className={styles.hint} style={{ color: '#ff4d4d' }}>
                        {verificationError}
                    </span>
                )}
            </div>

            <div className={styles.inputGroup}>
                <label>Amount</label>
                <div className={styles.amountInput}>
                    <CustomInput
                        type="number"
                        placeholder="0.00"
                        required
                        className={styles.inputNoLabel}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button type="button" className={styles.maxBtn} onClick={handleMax}>MAX</button>
                </div>
            </div>

            <div className={styles.note}>
                Internal transfers are instant and free of charge.
            </div>

            <div className={styles.actions}>
                <CustomButton
                    type="submit"
                    fullWidth
                    disabled={status === "processing" || status === "success" || !verifiedUser}
                    className={status === "success" ? styles.successBtn : ""}
                >
                    {status === "processing" ? "Sending..." : status === "success" ? "Transfer Sent!" : "Send Assets"}
                </CustomButton>
            </div>
        </form>
    );
};

export default TransferForm;
