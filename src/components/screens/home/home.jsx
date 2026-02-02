import React from "react";
import Hero from "./sections/hero/hero";
import Trust from "./sections/trust/trust";
import MarketPreview from "./sections/market_preview/market_preview";
import HowItWorks from "./sections/how_it_works/how_it_works";
import Features from "./sections/features/features";
import Security from "./sections/security/security";
import CTA from "./sections/cta/cta";
import styles from "./home.module.scss";

const HomeScreen = () => {
  return (
    <div className={styles.homeWrapper}>
      <Hero />
      <Trust />
      <MarketPreview />
      <HowItWorks />
      <Features />
      <Security />
      <CTA />
    </div>
  );
};

export default HomeScreen;
