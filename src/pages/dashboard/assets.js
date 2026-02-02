import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import MyAssetsScreen from "@/components/screens/dashboard/tabs/my_assets/my_assets";

const AssetsPage = () => {
    return (
        <DashboardLayout>
            <MyAssetsScreen />
        </DashboardLayout>
    );
};

export default AssetsPage;
