import React from "react";
import { routes } from "../../routes/index.js"
import { ProfileButton } from './ProfileButton.jsx'

export const RightNavigation = ({
    loading,
    isAuthenticated,
    dropdownRef,
    isDropdownOpen,
    setIsDropdownOpen,
    userData,
    BASE_URL,
    dropdown_vector,
    handleLogout
}) => {
    return (
        <div className="w-1/3">
            <ul className="flex gap-4 text-xl justify-end items-center">
                <li>
                    <a className="cursor-default button-card-outlined" href={routes.upload_file.url}>Add Work</a>
                </li>
                <li>
                    <a className="cursor-default button-card-outlined" href={routes.home_page.url}>About</a>
                </li>
                <li>
                    <a className="cursor-default button-card-outlined" href={routes.home_page.url}>Contacts</a>
                </li>
                {/* Only show when NOT loading */}
                {!loading && <>
                    {isAuthenticated &&
                        <ProfileButton
                            dropdownRef={dropdownRef}
                            isDropdownOpen={isDropdownOpen} 
                            setIsDropdownOpen={setIsDropdownOpen} 
                            userData={userData} 
                            BASE_URL={BASE_URL} 
                            dropdown_vector={dropdown_vector} 
                            handleLogout={handleLogout} />}
                </>}
            </ul>
        </div>
    )
}
