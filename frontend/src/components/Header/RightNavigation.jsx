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
        <div className="mt-1">
            <ul className="flex text-xl gap-4">
                <li>
                    <a className="text-small btn-secondary" href={routes.upload_file.url}>Add Work</a>
                </li>
                <li>
                    <a className="text-small btn-secondary" href={routes.home_page.url}>About</a>
                </li>
                <li>
                    <a className="text-small btn-secondary" href={routes.home_page.url}>Contacts</a>
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
