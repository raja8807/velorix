import React, { useState } from "react";
import styles from "./PaymentModal.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomInput from "@/components/ui/custom_input/custom_input";
import { Wallet2, CreditCard, QrCode } from "react-bootstrap-icons";
import { calculateWalletBalance } from "@/utils/financials";
import PinInput from "@/components/common/pin_input/pin_input";
import { useAppContext } from "@/context/AppContext";
import { Image } from "react-bootstrap";

const PaymentModal = ({ plan, onClose, onSuccess }) => {
    const { assets } = useAppContext();
    const [activeTab, setActiveTab] = useState("wallet");
    const [isProcessing, setIsProcessing] = useState(false);

    const [cardError, setCardError] = useState(null);

    // Get Wallet Balance
    const { total } = calculateWalletBalance(assets || []);

    const handlePayment = () => {
        setIsProcessing(true);
        setCardError(null);

        setTimeout(() => {
            setIsProcessing(false);

            if (activeTab === "card") {
                setCardError("Issuer bank unavailable → Temporary downtime at bank side.");
                return;
            }

            onSuccess(plan.id);
        }, 2000);
    };

    const [pin, setPin] = useState("");

    const handlePinChange = (value) => {
        setPin(value);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <h2>Upgrade to {plan.name}</h2>
                    <p className={styles.price}>Total: ${plan.price}</p>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "wallet" ? styles.active : ""}`}
                        onClick={() => setActiveTab("wallet")}
                    >
                        <Wallet2 /> Wallet
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "card" ? styles.active : ""}`}
                        onClick={() => setActiveTab("card")}
                    >
                        <CreditCard /> Card
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "crypto" ? styles.active : ""}`}
                        onClick={() => setActiveTab("crypto")}
                    >
                        <QrCode /> Crypto
                    </button>
                </div>

                <div className={styles.body}>
                    {activeTab === "wallet" && (
                        <div className={styles.walletTab}>
                            <p className={styles.label}>Available Balance</p>
                            <h3 className={styles.balance}>${total.toLocaleString()}</h3>
                            {total < plan.price && (
                                <p className={styles.error}>Insufficient fund. Please deposit or use another method.</p>
                            )}

                            <p className={styles.label} style={{ marginTop: '16px' }}>Security PIN</p>
                            <PinInput length={6} onChange={handlePinChange} />

                            <br />
                            <CustomButton
                                fullWidth
                                onClick={handlePayment}
                                disabled={total < plan.price || isProcessing || pin.length < 6}
                            >
                                {isProcessing ? "Processing..." : "Pay from Wallet"}
                            </CustomButton>
                        </div>
                    )}

                    {activeTab === "card" && (
                        <div className={styles.cardForm}>
                            {cardError && (
                                <div className={styles.errorMessage}>
                                    {cardError}
                                </div>
                            )}
                            <CustomInput label="Card Number" placeholder="0000 0000 0000 0000" />
                            <div className={styles.row}>
                                <CustomInput label="Expiry" placeholder="MM/YY" />
                                <CustomInput label="CVC" placeholder="123" />
                            </div>
                            <CustomButton fullWidth onClick={handlePayment} disabled={isProcessing}>
                                {isProcessing ? "Processing..." : "Pay with Card"}
                            </CustomButton>
                        </div>
                    )}

                    {activeTab === "crypto" && (
                        <div className={styles.cryptoTab}>
                            <div className={styles.qrPlaceholder}>
                                <Image src="/images/qr.jpg" alt="QR Code" width={100} height={100} />
                            </div>
                            <div className={styles.addressBox}>
                                <label>Send exact <span style={{ color: '#F7931A' }}>BTC</span> amount to:</label>
                                <div className={styles.address}>
                                    bc1qh03xh7827c3855jn6v82hnragqzux4g8j3rv4t
                                </div>
                                <span className={styles.copyHint}>Click to copy address</span>
                            </div>
                            <CustomButton fullWidth onClick={handlePayment} disabled={isProcessing}>
                                {isProcessing ? "Checking..." : "I have made the transfer"}
                            </CustomButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
