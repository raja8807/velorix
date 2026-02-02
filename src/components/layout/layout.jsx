import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Pages that don't need the global header/footer
  const noLayoutRoutes = ["/login", "/dashboard"];
  const shouldHideLayout = noLayoutRoutes.some((route) => router.pathname.startsWith(route));



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (shouldHideLayout) {
    return <>{children}</>;
  }

  return (
    <div>
      <Header isScrolled={isScrolled} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
