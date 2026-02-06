import HowToPayScreen from "@/components/screens/how_to_pay/how_to_pay";
import Head from "next/head";

const HowToPay = () => {
    return (
        <>
            <Head>
                <title>How to Pay | Velorix</title>
                <meta name="description" content="Instructions for payment" />
            </Head>
            <HowToPayScreen />
        </>
    );
};

export default HowToPay;
