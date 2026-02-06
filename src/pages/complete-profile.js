import CompleteProfileScreen from "@/components/screens/complete_profile/complete_profile";
import Head from "next/head";

const CompleteProfile = () => {
    return (
        <>
            <Head>
                <title>Complete Profile | Velorix</title>
                <meta name="description" content="Complete your profile to get started" />
            </Head>
            <CompleteProfileScreen />
        </>
    );
};

export default CompleteProfile;
