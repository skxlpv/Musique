import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../../routes/index.jsx";

import settings_icon from "../../../assets/settings_icon.png"
import profile_icon from "../../../assets/user-account-icon.png"

export const ProfileDropdown = ({
    isDropdownOpen, 
    setIsDropdownOpen, 
    handleLogout
}) => {
    return (
        <div className={`absolute left-0 right-0 bg-black 
                         flex flex-col transition-all duration-300 
                         overflow-hidden border-neutral-800
                         ${isDropdownOpen ? 'border-2 rounded-b-md max-h-48 border-sm border-neutral-800' : 'max-h-0 border-none'}`}
                         style={{top: 'calc(100% - 2px)'}}>
            <Link to={routes.my_profile.url} 
                className="body-small btn-link flex text-center items-center"
                onClick={() => setIsDropdownOpen(false)}>
                    <img src={profile_icon} alt={"profile-button"} className="w-4 h-4 mr-0.5"/>
                    Profile
            </Link>
            {routes.settings && <Link to={routes.settings.url}
                className="body-small btn-link flex text-center items-center"
                onClick={() => setIsDropdownOpen(false)}>
                    <img src={settings_icon} alt={"profile-button"} className="w-4 h-4 mr-0.5"/>
                    Settings
            </Link>}
            <button onClick={() => {
                setIsDropdownOpen(false);
                handleLogout();
            }} className="body-small btn-link flex text-center text-red-600 items-center">
                    <img src={settings_icon} alt={"profile-button"} className="w-4 h-4 mr-0.5"/>
                    Logout
            </button>
        </div>
    )
}

