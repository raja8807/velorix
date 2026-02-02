import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <h3>VELORIX</h3>
                        <p>
                            The most trusted and secure cryptocurrency platform for buying, selling, and managing your digital assets.
                        </p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4>Platform</h4>
                            <ul>
                                <li><Link href="#">Markets</Link></li>
                                <li><Link href="#">Exchange</Link></li>
                                <li><Link href="#">Earn</Link></li>
                                <li><Link href="#">Wallet</Link></li>
                            </ul>
                        </div>
                        <div className={styles.column}>
                            <h4>Support</h4>
                            <ul>
                                <li><Link href="#">Help Center</Link></li>
                                <li><Link href="#">API Documentation</Link></li>
                                <li><Link href="#">Fees</Link></li>
                                <li><Link href="#">Security</Link></li>
                            </ul>
                        </div>
                        <div className={styles.column}>
                            <h4>Company</h4>
                            <ul>
                                <li><Link href="#">About Us</Link></li>
                                <li><Link href="#">Careers</Link></li>
                                <li><Link href="#">Blog</Link></li>
                                <li><Link href="#">Legal</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} VELORIX. All rights reserved.</p>
                    <p>Privacy Policy • Terms of Service</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
