import React, { useState } from "react";
import styles from "./WithdrawForm.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomInput from "@/components/ui/custom_input/custom_input";
import { useAppContext } from "@/context/AppContext";
import PinInput from "@/components/common/pin_input/pin_input";

const WithdrawForm = ({ setActiveTab }) => {
    const { assets } = useAppContext();
    const [status, setStatus] = useState("");
    const [selectedAssetSymbol, setSelectedAssetSymbol] = useState("BTC");
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");

    const safeAssets = assets || [];
    const selectedAsset = safeAssets.find(a => a.symbol === selectedAssetSymbol) || {};

    const handleMax = () => {
        if (selectedAsset) {
            setAmount(selectedAsset.balance.toString());
        }
    };

    const handleWithdraw = (e) => {
        e.preventDefault();
        setError("");

        if (pin.length < 6) {
            setError("Please enter complete PIN");
            return;
        }

        setStatus("processing");

        setTimeout(() => {

            // if (!userData?.current_subscription || userData.current_subscription === "VIP-0") {
            //     alert("You must have an active subscription plan to withdraw funds.");
            //     router.push("/dashboard/account/subscription");
            //     return;
            // }

            // Simulate incorrect PIN error as requeste
            setError(<p className={styles.error}>Incorrect Security PIN. <span
                onClick={() => setActiveTab("transfer")}
            >Try Internal Transfer</span></p>);
            setStatus("");
            return;

            /* Unreachable success state for now
            setStatus("success");
            */
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

            <div className={styles.inputGroup}>
                <label>Security PIN</label>
                <PinInput length={6} onChange={(val) => { setPin(val); setError(""); }} />
                {error && error}
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
