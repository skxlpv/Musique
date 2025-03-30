import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Registration } from "./Registration/Registration";
import { Login } from "./Login/Login";
import "./AuthPage.css"

export const AuthPage = () => {
    return (
        <div className="flex justify-center">
            <div className="container flex justify-center">
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Registration />} />
                    <Route path="/" element={<Navigate to="register" replace />} />
                </Routes>
            </div>
        </div>
    );
};
