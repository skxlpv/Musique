import React, { useState } from "react";
import "../HeaderButton/HeaderButton.css";
import { Link } from "react-router-dom";

export const HeaderButton = ({
    buttonTitle,
    pageLink,
    onClick,
    isSubmit = false
}) => {
    return (
        <div className="container">
            <div className="box shadow"></div>
            <div className="box left"></div>
            <div className="box right"></div>
            <div className="box">
                {isSubmit ? (
                    <button 
                        className="box-anchor" 
                        onClick={onClick} 
                        type="submit"
                    >
                        {buttonTitle}
                    </button>
                ) : (
                    <Link to={pageLink} className="box-anchor">
                        {buttonTitle}
                    </Link>
                )}
            </div>
        </div>
    );
};
