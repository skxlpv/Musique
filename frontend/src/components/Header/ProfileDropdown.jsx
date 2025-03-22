import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export const ProfileDropdown = ({
    isDropdownOpen, 
    setIsDropdownOpen, 
    handleLogout
}) => {
    return (
        <div className={`absolute left-0 right-0 bg-black 
                            flex flex-col transition-all duration-300 
                            overflow-hidden border-neutral-800
                            ${isDropdownOpen ? 'border-2 rounded-b-md max-h-48 border-sm border-neutral-800' : 'max-h-0 border-none'}`} style={{
                boxShadow: isDropdownOpen ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                top: 'calc(100% - 2px)',
            }}>
            <Link to={routes.my_profile.url} 
            className="px-3.5 py-1 text-zinc-400 hover:bg-neutral-800 hover:text-white text-left" onClick={() => setIsDropdownOpen(false)}>
                Profile 
            </Link>
            {routes.settings && <Link to={routes.settings.url} 
            className="px-3.5 py-1 text-zinc-400 hover:bg-neutral-800 hover:text-white text-left" onClick={() => setIsDropdownOpen(false)}>
                Settings
            </Link>}
            <button onClick={() => {
                setIsDropdownOpen(false);
                handleLogout();
            }} className="px-3.5 py-1 hover:bg-neutral-800 hover:text-white text-left text-red-600">
                Logout
            </button>
        </div>
    )
}

