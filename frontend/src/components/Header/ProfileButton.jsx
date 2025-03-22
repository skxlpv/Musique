import React from "react";
import { ProfileDropdown } from "./ProfileDropdown";

export const ProfileButton = ({
    dropdownRef,
    isDropdownOpen,
    setIsDropdownOpen,
    userData,
    BASE_URL,
    dropdown_vector,
    handleLogout
}) => {
    return (
        <li className="relative" ref={dropdownRef}>
            <div className={`relative z-10 ${isDropdownOpen ? 'profile-dropdown-open' : ''}`}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`button-card-outlined ${isDropdownOpen && `!border-2 !border-neutral-800`}`}>
                    <div className="flex items-center">
                        <span className="text-ellipsis overflow-hidden">
                            {userData?.username || "No Profile"}
                        </span>
                        <img alt="user_profile_image" className="w-6 h-6 rounded-md ml-2" src={userData?.avatar ? BASE_URL + userData.avatar : ''} />
                        <img alt="dropdown_vector" src={dropdown_vector} className={`w-6 h-6 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                </button>

                {/* Dropdown menu */}
                <ProfileDropdown 
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                handleLogout={handleLogout}/>
            </div>
        </li>
       )
    }