import React from "react";
import "../Button/Button.css";
import { useState } from "react";
import { ReactComponent as DropdownIcon } from "../../assets/dropdown.svg"; // Importing as ReactComponent

export const Button = ({ buttonTitle, boxShadowColor, shadowIntensity }) => {
    const [currentShadowIntensity, setCurrentShadowIntensity] = useState(shadowIntensity);

    const handleMouseEnter = () => {
        setCurrentShadowIntensity(shadowIntensity * 1.5);
    };

    const handleMouseLeave = () => {
        setCurrentShadowIntensity(shadowIntensity);
    };

    return (
        <div
            className="button-container"
            style={{ '--boxShadowColor': boxShadowColor, '--shadowIntensity': currentShadowIntensity }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="button-box button-shadow"
                style={{
                    boxShadow: `0px 2px 10px ${currentShadowIntensity}px ${boxShadowColor}`,
                }}>
            </div>
            <div className="button-box button-left"></div>
            <div className="button-box button-right"></div>
            <div className="button-box">
                <a href="https://google.com" className="box-anchor">{buttonTitle}</a>
                <DropdownIcon className="dropdown-icon" style={{ fill: 'var(--boxShadowColor)' }} />
            </div>
        </div>
    );
};
