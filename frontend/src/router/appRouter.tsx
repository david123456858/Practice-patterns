import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainDashboard from "../pages/dashboard/mainDashboard";
import ManagementUser from "../pages/management/user/managementUser";
import ManagementLoan from "@/pages/management/loan/managementLoan";
import ManagementVehicle from "../pages/management/vehicle/managementVehicle";
import RegisterStation from "@/pages/register/station/registerStation";
import RegisterPayment from "../pages/register/payment/registerPayment";
import WelcomeToEcomove from "../pages/dashboard/welcomeToEcoMove";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta padre */}
                <Route path="/" element={<MainDashboard />}>
                    {/* Ruta hija por defecto*/}
                    <Route index element={<WelcomeToEcomove />} />

                    {/* Rutas hijas */}
                    <Route path="welcome" element={<WelcomeToEcomove />} />
                    <Route path="users" element={<ManagementUser />} />
                    <Route path="stations" element={<RegisterStation />} />
                    <Route path="vehicles" element={<ManagementVehicle />} />
                    <Route path="loan" element={<ManagementLoan />} />
                    <Route path="payment" element={<RegisterPayment />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}