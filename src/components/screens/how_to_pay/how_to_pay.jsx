import React from 'react';
import styles from './how_to_pay.module.scss';
import { ArrowLeft, CheckCircleFill, XCircleFill, InfoCircleFill } from 'react-bootstrap-icons';
import { useRouter } from 'next/router';

const HowToPayScreen = () => {
    const router = useRouter();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>How to Pay with Crypto</h1>
                    <p>Choose the option that suits you best</p>
                </div>

                <div className={styles.optionsContainer}>
                    {/* Option 1 */}
                    <div className={styles.optionSection}>
                        <div className={styles.optionHeader}>
                            <h2>OPTION 1 — Pay with Card (USDT – No Crypto Required)</h2>
                            <span className={styles.tag}>Best for Beginners</span>
                        </div>
                        <p className={styles.description}>
                            You can pay using a credit or debit card. Your payment will be automatically converted into USDT (Tether) and sent to our wallet.
                            <br />This option is ideal if you do not already own cryptocurrency.
                        </p>

                        <div style={{ background: 'rgba(38, 161, 123, 0.1)', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid rgba(38, 161, 123, 0.3)' }}>
                            <h4 style={{ color: '#26A17B', margin: '0 0 8px 0' }}>🔹 Payment Details (Important)</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#aaa', fontSize: '0.9rem' }}>
                                <li style={{ marginBottom: '4px' }}><strong>Currency:</strong> USDT (Tether)</li>
                                <li style={{ marginBottom: '4px' }}><strong>Network:</strong> <span style={{ color: '#26A17B', fontWeight: 'bold' }}>TRC20 (TRON) ONLY</span></li>
                                <li>
                                    <strong>Recipient Wallet Address:</strong><br />
                                    <code style={{ display: 'block', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', marginTop: '4px', wordBreak: 'break-all', color: '#fff' }}>
                                        TKch9X3yJaYhxxLiLCCAWuJv8YbbqVk7SN
                                    </code>
                                </li>
                            </ul>
                        </div>

                        <div style={{ background: 'rgba(231, 76, 60, 0.1)', padding: '12px', borderRadius: '8px', marginBottom: '24px', border: '1px solid rgba(231, 76, 60, 0.3)', display: 'flex', gap: '10px' }}>
                            <XCircleFill style={{ color: '#E74C3C', minWidth: '20px', marginTop: '2px' }} />
                            <div>
                                <strong style={{ color: '#E74C3C', display: 'block', marginBottom: '4px' }}>⚠️ Warning</strong>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#bbb' }}>
                                    You must select <strong>TRC20 (TRON)</strong> as the network. Sending USDT on any other network (ERC20, BEP20, etc.) may result in permanent loss of funds.
                                </p>
                            </div>
                        </div>

                        <div className={styles.stepsList}>
                            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '16px' }}>🛒 Supported Payment Providers</h3>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '12px' }}>You may use any one of the following trusted providers:</p>
                            <ul className={styles.bulletList} style={{ marginBottom: '24px' }}>
                                <li>MoonPay</li>
                                <li>BitPay</li>
                                <li>Paybis</li>
                                <li>Guardarian</li>
                            </ul>

                            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '16px' }}>🧾 Step-by-Step Instructions</h3>

                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>1</span>
                                <div className={styles.stepText}>
                                    <strong>Open a payment provider</strong>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#aaa' }}>Visit any one of the supported providers listed above.</p>
                                </div>
                            </div>

                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>2</span>
                                <div className={styles.stepText}>
                                    <strong>Choose what to buy</strong>
                                    <ul className={styles.bulletList}>
                                        <li>Select <strong>USDT (Tether)</strong> as the cryptocurrency.</li>
                                        <li>Enter the payment amount (in USD or your local currency).</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>3</span>
                                <div className={styles.stepText}>
                                    <strong>Enter the recipient wallet address</strong>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#aaa' }}>
                                        Paste the USDT wallet address shown above. Double-check carefully.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>4</span>
                                <div className={styles.stepText}>
                                    <strong>Select the correct network</strong>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#aaa' }}>
                                        Choose <strong className={styles.highlight}>TRC20 (TRON)</strong>.
                                        <br /><span style={{ color: '#E74C3C' }}>⚠️ Do not select ERC20 or BEP20.</span>
                                    </p>
                                </div>
                            </div>

                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>5</span>
                                <div className={styles.stepText}>
                                    <strong>Choose payment method</strong>
                                    <ul className={styles.bulletList}>
                                        <li>Credit Card / Debit Card</li>
                                        <li>Apple Pay / Google Pay</li>
                                        <li>Bank transfer (if available)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>6</span>
                                <div className={styles.stepText}>
                                    <strong>Complete identity verification (if required)</strong>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#aaa' }}>
                                        Upload ID or take a selfie if prompted.
                                        <br />⏱️ Takes 5–10 minutes, required only once.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>7</span>
                                <div className={styles.stepText}>
                                    <strong>Review and confirm</strong>
                                    <ul className={styles.bulletList}>
                                        <li>Verify USDT amount, Wallet Address, and Network (TRC20).</li>
                                        <li>Click Confirm / Buy / Pay.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>8</span>
                                <div className={styles.stepText}>
                                    <strong>Payment processing</strong>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#aaa' }}>
                                        Your card will be charged and USDT sent to us.
                                        <br />You will receive a confirmation and Transaction ID (TXID).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.resultBox}>
                            <p><CheckCircleFill className={styles.successIcon} /> USDT will be sent directly to our wallet.</p>
                            <p>⏱️ Typical processing time: <strong>5–30 minutes</strong></p>
                        </div>
                    </div>

                    {/* Option 2 */}
                    <div className={styles.optionSection}>
                        <div className={styles.optionHeader}>
                            <h2>OPTION 2 — Pay from Existing Wallet</h2>
                            <span className={styles.tag}>Have Crypto?</span>
                        </div>
                        <p className={styles.description}>Use this option if you already have USDT.</p>

                        <div className={styles.stepsList}>
                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>1</span>
                                <div className={styles.stepText}>
                                    Open your crypto wallet (Trust Wallet, MetaMask, Coinbase, Binance, etc.).
                                </div>
                            </div>
                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>2</span>
                                <div>Select <strong>Send</strong> and choose <strong>USDT (Tether)</strong>.</div>
                            </div>
                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>3</span>
                                <div>Paste the wallet address shown in the payment popup.</div>
                            </div>
                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>4</span>
                                <div>Select the <strong className={styles.highlight}>TRC20 (TRON)</strong> network.</div>
                            </div>
                            <div className={styles.stepItem}>
                                <span className={styles.stepNum}>5</span>
                                <div>Enter the <strong>exact</strong> payment amount, confirm and send.</div>
                            </div>
                        </div>

                        <div className={styles.resultBox}>
                            <p>⏱️ Confirmation time: <strong>1–3 minutes</strong></p>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomSections}>
                    <div className={styles.infoCard}>
                        <h3>📌 After Payment</h3>
                        <ul>
                            <li>Save your transaction ID (TXID).</li>
                            <li>If required, submit the TXID in the payment confirmation form or email it to us.</li>
                        </ul>
                    </div>

                    <div className={`${styles.infoCard} ${styles.warning}`}>
                        <h3>❗ Important Rules</h3>
                        <ul className={styles.rulesList}>
                            <li className={styles.success}><CheckCircleFill /> Send USDT only</li>
                            <li className={styles.success}><CheckCircleFill /> Use TRC20 network only</li>
                            <li className={styles.error}><XCircleFill /> Do NOT send other tokens</li>
                            <li className={styles.error}><XCircleFill /> Do NOT use a different network</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.helpBox}>
                    <InfoCircleFill className={styles.helpIcon} />
                    <div>
                        <h3>❓ Need Help?</h3>
                        <p>If you experience any issues, contact our support with:</p>
                        <ul>
                            <li>Transaction ID (TXID)</li>
                            <li>Payment amount</li>
                            <li>Date & time of payment</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToPayScreen;
