import { useEffect } from "react";
import { useRouter } from "next/router";

const DashboardIndex = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/dashboard/overview");
    }, [router]);

    return null; // Or a loading spinner
};

export default DashboardIndex;
