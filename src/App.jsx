import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

import './styles/main.scss';

export default function App() {
    return (
        <div className="site-wrapper">
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                    <main className="main">
                        <Routes>
                            <Route path="/auth" element={<Auth />} />
                            <Route element={<PrivateRoute />}>
                                <Route path="/" element={<Dashboard />} />
                            </Route>
                        </Routes>
                    </main>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
};