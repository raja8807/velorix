import React, { useRef, useState, useEffect } from "react";
import styles from "./pin_input.module.scss";

const PinInput = ({ length = 6, onChange, showForgot = true }) => {
    const [values, setValues] = useState(Array(length).fill(""));
    const [resetSent, setResetSent] = useState(false);
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const val = e.target.value;
        if (isNaN(val)) return;

        const newValues = [...values];
        // Take only the last character if multiple entered (logic for single char input)
        newValues[index] = val.slice(-1);
        setValues(newValues);
        onChange(newValues.join(""));

        // Move to next input if value is entered
        if (val && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !values[index] && index > 0) {
            // Move to previous input on backspace if current is empty
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, length);
        if (!/^\d+$/.test(pasteData)) return;

        const newValues = [...values];
        pasteData.split("").forEach((char, i) => {
            newValues[i] = char;
        });
        setValues(newValues);
        onChange(newValues.join(""));

        // Focus the last filled input or the next empty one
        const nextIndex = Math.min(pasteData.length, length - 1);
        inputsRef.current[nextIndex].focus();
    };

    const handleForgot = () => {
        setResetSent(true);
        // Simulate API call
        setTimeout(() => setResetSent(false), 5000);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.pinContainer}>
                {values.map((val, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className={styles.pinBox}
                    />
                ))}
            </div>
            {showForgot && (
                <div className={styles.footer}>
                    {resetSent ? (
                        <span className={styles.successMessage}>
                            Reset PIN link sent to your email
                        </span>
                    ) : (
                        <button type="button" onClick={handleForgot} className={styles.forgotLink}>
                            Forgot Security PIN?
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default PinInput;
