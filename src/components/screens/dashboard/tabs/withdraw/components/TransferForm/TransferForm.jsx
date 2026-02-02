import React, { useState } from "react";
import styles from "./TransferForm.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomInput from "@/components/ui/custom_input/custom_input";
import { userAssets, userProfile } from "@/constants/dummy_data";
import { useRouter } from "next/router";

const TransferForm = () => {
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

    const handleTransfer = (e) => {
        e.preventDefault();
        setStatus("processing");
        setTimeout(() => {
            // Success state
            setStatus("success");

            // Redirect after 5 seconds
            setTimeout(() => {
                router.push("/dashboard/overview");
            }, 5000);
        }, 1500);
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

            <CustomInput
                label="Recipient Email / ID"
                type="text"
                placeholder="User email or VELORIX ID"
                required
                className={styles.inputGroup}
            />

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
                    disabled={status === "processing" || status === "success"}
                    className={status === "success" ? styles.successBtn : ""}
                >
                    {status === "processing" ? "Sending..." : status === "success" ? "Transfer Sent!" : "Send Assets"}
                </CustomButton>
            </div>
        </form>
    );
};

export default TransferForm;
