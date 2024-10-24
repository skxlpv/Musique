import React from "react";
import "../Button/Button.css";
import { ReactComponent as DropdownIcon } from "../../assets/dropdown.svg";

export const Button = ({ buttonTitle }) => {
    return (
        <div className="button-container">
            <div className="button-box button-shadow"> </div>
            <div className="button-box button-left"></div>
            <div className="button-box button-right"></div>
            <div className="button-box">
                <a href="https://google.com" className="box-anchor">{buttonTitle}</a>
                <DropdownIcon className="dropdown-icon"/>
            </div>
        </div>
    );
};
