import "../styles/globals.scss";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router, { useRouter } from "next/router";
import Head from "next/head";

import { ToastContainer } from "react-toastify";
import Layout from "@/components/layout/layout";
import { FONTS } from "@/styles/fonts";

import { AppProvider } from "@/context/AppContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const AppWrapper = ({ children }) => {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  console.log(loading);


  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in
        if (router.pathname.startsWith("/dashboard") || router.pathname === "/complete-profile") {
          router.push("/login");
        }
      } else {
        // Logged in
        if (!userData) {
          // No profile yet -> Go to complete profile
          if (router.pathname !== "/complete-profile") {
            router.push("/complete-profile");
          }
        } else {
          // Has profile -> Block access to complete profile page
          if (router.pathname === "/complete-profile") {
            router.push("/dashboard");
          }
        }
      }
    }
  }, [user, loading, router.pathname, userData]);

  if (loading) return null;

  return <>{children}</>;
};

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // ----------- AOS ----------------------
    Aos.init({
      duration: 1500,
      once: false,
    });

    // ----------- Progress ----------------------

    Router.events.on("routeChangeStart", (...params) => {
      NProgress.start(params);
    });
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  return (
    <AuthProvider>
      <AppProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <AppWrapper>
          <main className={FONTS.font1}>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer position="bottom-right" />
            </Layout>
          </main>
        </AppWrapper>
      </AppProvider>
    </AuthProvider>
  );
}
