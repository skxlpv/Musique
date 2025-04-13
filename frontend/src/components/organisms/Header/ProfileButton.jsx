import React from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import { Avatar } from "../../atoms/Avatar/Avatar";

export const ProfileButton = ({
    dropdownRef,
    isDropdownOpen,
    setIsDropdownOpen,
    userData,
    dropdown_vector,
    handleLogout
}) => {
    return (
        <li className="relative" ref={dropdownRef}>
            <div className={`relative z-10`}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`body-small btn-small ${isDropdownOpen && `!border-2 !border-neutral-800`}`}>
                    <div className="flex items-center justify-center">
                        <span className="text-ellipsis overflow-hidden mr-2 mb-1">
                            {userData?.username || "No Profile"}
                        </span>
                        <Avatar size="sm"/>
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