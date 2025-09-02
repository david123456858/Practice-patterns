import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainDashboard from "../pages/dashboard/mainDashboard";
import ManagementUser from "../pages/management/user/managementUser";
import ManagementStation from "../pages/management/station/managementStation";
import ManagementVehicle from "../pages/management/vehicle/managementVehicle";
import RegisterLoan from "../pages/register/loan/registerLoan";
import RegisterPayment from "../pages/register/payment/registerPayment";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={<MainDashboard />} />

                {/* Otras rutas */}
                <Route path="/users" element={<ManagementUser />} />
                <Route path="/stations" element={<ManagementStation />} />
                <Route path="/vehicles" element={<ManagementVehicle />} />
                <Route path="/loan" element={<RegisterLoan />} />
                <Route path="/payment" element={<RegisterPayment />} />
            </Routes>
        </BrowserRouter>
    );
}