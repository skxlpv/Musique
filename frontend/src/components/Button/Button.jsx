import React from "react";

export const Button = ({ isActive, label, onClick }) => (
    <button
        onClick={onClick}
        className={`button-card bg-neutral-950 hover:bg-neutral-900 
            ${isActive ? "!bg-neutral-200 !text-black outline outline-black -outline-offset-4 shadow-inner" : ""}`}
        >
        {label}
    </button>
);