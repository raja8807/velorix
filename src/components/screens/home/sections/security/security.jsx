import React from "react";
import styles from "./security.module.scss";
import { ShieldLock, CheckCircleFill } from "react-bootstrap-icons";

const Security = () => {
    return (
        <section className={styles.security}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>Built on a foundation of trust</h2>
                    <p>
                        Your security is our top priority. We utilize bank-grade encryption, cold storage for 98% of assets,
                        and rigorous identity verification to ensure your investments are always safe.
                    </p>
                    <div className={styles.badges}>
                        <div className={styles.badge}>
                            <span className={styles.check}><CheckCircleFill /></span>
                            ISO/IEC 27001 Certified Security
                        </div>
                        <div className={styles.badge}>
                            <span className={styles.check}><CheckCircleFill /></span>
                            100% Reserve Audit Guarantee
                        </div>
                        <div className={styles.badge}>
                            <span className={styles.check}><CheckCircleFill /></span>
                            24/7 Dedicated Support Team
                        </div>
                    </div>
                </div>
                <div className={styles.visual}>
                    <div className={styles.shield}>
                        <ShieldLock />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Security;
