import { LeftNavigation } from './LeftNavigation';
import { CenterNavigation } from './CenterNavigation';
import { RightNavigation } from './RightNavigation';
import { useState, useRef, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { SubHeader } from "../SubHeader/SubHeader";
import { headerPageNamesObject } from "../../../utils/subHeaderTextObjects"
import { logout } from "../../../services/api";
import { useAuth } from "../../../features/auth/contexts/useAuth.jsx";
import { BASE_URL } from "../../../services/api"
import dropdown_vector from "../../../assets/dropdown-vector.svg"

const MemoizedLeftPanel = memo(LeftNavigation);
const MemoizedCenterPanel = memo(CenterNavigation);
const MemoizedRightPanel = memo(RightNavigation);

export const Header = () => {
    const nav = useNavigate();
    const { loading, isAuthenticated, userData, refreshAuth } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            refreshAuth();
            nav("/auth/login", { replace: true });
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="mb-16">
            <div className="border-b border-border flex w-full items-center justify-between shadow-medium bg-background px-4 md:px-8 lg:px-60 h-16 fixed top-0 z-10">
                <div className="flex flex-row items-center w-full lg:w-1/4 justify-between">
                    <MemoizedCenterPanel />
                    <MemoizedLeftPanel />
                </div>

                <MemoizedRightPanel
                    loading={loading}
                    isAuthenticated={isAuthenticated}
                    dropdownRef={dropdownRef}
                    isDropdownOpen={isDropdownOpen}
                    setIsDropdownOpen={setIsDropdownOpen}
                    userData={userData}
                    BASE_URL={BASE_URL}
                    dropdown_vector={dropdown_vector}
                    handleLogout={handleLogout} />
            </div>
            <SubHeader
                additionalStyle="z-0 absolute top-28"
                object={headerPageNamesObject}
            />
        </div>
    );
};