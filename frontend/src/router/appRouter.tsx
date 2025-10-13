import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/pages/landing/home";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

import MainDashboard from "@/pages/dashboard/mainDashboard";
import ManagementUser from "@/pages/management/user/managementUser";
import ManagementLoan from "@/pages/management/loan/managementLoan";
import ManagementVehicle from "@/pages/management/vehicle/managementVehicle";
import { ManagementStation } from "@/pages/management/station/managementStation";
import RegisterPayment from "@/pages/register/payment/registerPayment";
import { WelcomeComponent } from "@/components/welcome";

import ClientPage from "@/pages/client/homeClientPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/homeClient" element={<ClientPage />} />

                <Route path="/dashboard" element={<MainDashboard />}>

                    <Route index element={<WelcomeComponent />} />

                    <Route path="users" element={<ManagementUser />} />
                    <Route path="vehicles" element={<ManagementVehicle />} />
                    <Route path="stations" element={<ManagementStation />} />
                    <Route path="loan" element={<ManagementLoan />} />
                    <Route path="payment" element={<RegisterPayment />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
