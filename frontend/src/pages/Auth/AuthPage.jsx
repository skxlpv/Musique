import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Registration } from "./Registration/Registration";
import { Login } from "./Login/Login";
import "./AuthPage.css";

export const AuthPage = () => {
    return (
        <div className="content-container flex-center-all-row auth-container-padding">
            <Routes>
                <Route path="register" element={<Registration />} />
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Navigate to="login" replace />} />
                <Route path="*" element={<Navigate to="login" replace />} />
            </Routes>
        </div>
    );
};
