import React, { useState } from "react";
import styles from "./WithdrawForm.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomInput from "@/components/ui/custom_input/custom_input";
import { userAssets, userProfile } from "@/constants/dummy_data";
import { useRouter } from "next/router";

const WithdrawForm = () => {
    const router = useRouter();
    const [status, setStatus] = useState("");
    const [selectedAssetSymbol, setSelectedAssetSymbol] = useState(userAssets[0]?.symbol || "");
    const [amount, setAmount] = useState("");

    const selectedAsset = userAssets.find(a => a.symbol === selectedAssetSymbol) || {};

    const handleMax = () => {
        if (selectedAsset) {
            setAmount(selectedAsset.balance.toString());
        }
    };

    const handleWithdraw = (e) => {
        e.preventDefault();
        setStatus("processing");




        setTimeout(() => {

            if (!userProfile.currentSubscription || userProfile.currentSubscription === "VIP-0") {
                alert("You must have an active subscription plan to withdraw funds.");
                router.push("/dashboard/account/subscription");
                return;
            }

            setStatus("success");
        }, 1500);
    };

    return (
        <form onSubmit={handleWithdraw} className={styles.form}>
            <div className={styles.inputGroup}>
                <label>Asset</label>
                <div className={styles.selectWrapper}>
                    <select
                        className={styles.input}
                        value={selectedAssetSymbol}
                        onChange={(e) => {
                            setSelectedAssetSymbol(e.target.value);
                            setAmount(""); // Reset amount on asset change
                        }}
                    >
                        {userAssets.map(asset => (
                            <option key={asset.id} value={asset.symbol}>
                                {asset.name} ({asset.symbol})
                            </option>
                        ))}
                    </select>
                    <span className={styles.balanceHint}>
                        Available: {selectedAsset.balance} {selectedAsset.symbol}
                    </span>
                </div>
            </div>

            <div className={styles.inputGroup}>
                <CustomInput
                    label="Withdraw To Address"
                    type="text"
                    placeholder="0x..."
                    required
                />
                <span className={styles.hint}>Ensure network matches the address</span>
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

            <div className={styles.infoRow}>
                <span>Network Fee</span>
                <span>0.0004 BTC</span>
            </div>

            <div className={styles.actions}>
                <CustomButton type="submit" fullWidth disabled={status === "processing"}>
                    {status === "processing" ? "Processing..." : status === "success" ? "Withdrawal Initiated" : "Withdraw Fund"}
                </CustomButton>
            </div>
        </form>
    );
};

export default WithdrawForm;
