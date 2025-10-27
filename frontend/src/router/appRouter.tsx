import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/pages/landing/home";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

import MainDashboard from "@/pages/dashboard/mainDashboard";
import ManagementUser from "@/pages/admin/user/managementUser";
import ManagementLoan from "@/pages/admin/loan/managementLoan";
import ManagementVehicle from "@/pages/admin/vehicle/managementVehicle";
import { ManagementStation } from "@/pages/admin/station/managementStation";
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
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
