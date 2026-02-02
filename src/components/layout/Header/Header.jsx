import React, { useState, useEffect } from "react";
import Link from "next/link";
import { List, X } from "react-bootstrap-icons";
import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./Header.module.scss";

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = ["Dashboard", "Market", "Withdraw", "Transfer", "Account"];

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            VELORIX
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <ul className={styles.navLinks}>
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className={activeLink === item ? styles.active : ""}
                    onClick={() => handleLinkClick(item)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <CustomButton variant="outline" href="/login">
              Login
            </CustomButton>
            <CustomButton variant="primary" href="/login">
              Sign Up
            </CustomButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={styles.hamburger}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <List />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.open : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
        <ul className={styles.mobileNavLinks}>
          {navItems.map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className={activeLink === item ? styles.active : ""}
                onClick={() => handleLinkClick(item)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.mobileActions}>
          <CustomButton
            variant="outline"
            fullWidth
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </CustomButton>
          <CustomButton
            variant="primary"
            fullWidth
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign Up
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default Header;
