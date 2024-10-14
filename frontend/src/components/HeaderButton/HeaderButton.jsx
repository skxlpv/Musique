import React, { useState } from "react";
import "../HeaderButton/HeaderButton.css";
import { Link } from "react-router-dom";

export const HeaderButton = ({
    buttonTitle,
    boxShadowColor,
    shadowIntensity,
    pageLink,
    onClick,
    isSubmit = false
}) => {
    const [currentShadowIntensity, setCurrentShadowIntensity] = useState(shadowIntensity);

    const handleMouseEnter = () => {
        setCurrentShadowIntensity(shadowIntensity * 1.4);
    };

    const handleMouseLeave = () => {
        setCurrentShadowIntensity(shadowIntensity);
    };

    return (
        <div 
            className="container"
            style={{ '--boxShadowColor': boxShadowColor, '--shadowIntensity': currentShadowIntensity }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className="box shadow"
                style={{
                    boxShadow: `0px 2px 10px ${currentShadowIntensity}px ${boxShadowColor}`,
                }}
            ></div>
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
