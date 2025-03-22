import { useNavigate } from "react-router-dom";
import { SubHeader } from "../SubHeader/SubHeader";
import { headerPageNamesObject } from "../../utils/subHeaderTextObjects"
import api, { logout } from "../../services/api";
import { routes } from "../../routes";
import { useAuth } from "../../features/auth/contexts/useAuth";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {BASE_URL} from "../../services/api"
import dropdown_vector from "../../assets/dropdown-vector.svg"

export const Header = () => {
    const nav = useNavigate();
    const { loading, isAuthenticated, userData, refreshAuth } = useAuth();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            refreshAuth();
            nav("/auth/login", { replace: true });
        }
    };

    return (
        <div className="mb-24">
            <div className="flex w-full items-center shadow-md shadow-neutral-950 bg-black px-16 h-28 fixed z-10">
                {/* Left section: Navigation links */}
                <div className="flex w-1/3">
                    <ul className="flex gap-4 text-xl">
                        <li>
                            <a className="cursor-default button-card-outlined" href={routes.dictionary_page.url}>Dictionary</a>
                        </li>
                        <li>
                            <a className="cursor-default button-card-outlined" href={routes.home_page.url}>Learn</a>
                        </li>
                        <li>
                            <a className="cursor-default button-card-outlined" href={routes.home_page.url}>Analyze</a>
                        </li>
                        <li>
                            <a className="cursor-default button-card-outlined" href={routes.home_page.url}>Discover</a>
                        </li>
                    </ul>
                </div>

                {/* Middle section: Logo */}
                <div className="w-1/3 flex justify-center mt-2">
                    <a href="/">
                        <div className="group relative h-12 flex items-center justify-center">
                            <h1 className="absolute text-4xl tracking-widest transition-all duration-1000 group-hover:-translate-x-2 group-hover:-translate-y-0.5 group-hover:text-blue-900">
                                МУР
                            </h1>
                            <h1 className="absolute text-4xl tracking-widest transition-all duration-1000 group-hover:translate-x-2 group-hover:translate-y-0.5 group-hover:text-red-900">
                                МУР
                            </h1>
                            <h1 className="absolute text-4xl tracking-widest transition-all duration-500">
                                МУР
                            </h1>
                        </div>
                        <div>
                            <p>Мистецький Універсальний Ресурс</p>
                        </div>
                    </a>
                </div>

                {/* Right section: Additional links and authentication state */}
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
                        {!loading && (
                        < >
                        {isAuthenticated && (
                            <li>
                                <Link to={routes.my_profile.url}
                                    className="button-card-outlined">
                                    <div className="flex items-center">
                                        <span className="text-ellipsis overflow-hidden">
                                            {userData?.username || "No Profile"}
                                        </span>
                                        <img alt="user_profile_image"
                                            className="w-6 h-6 rounded-md ml-2"
                                            src={userData?.avatar ? BASE_URL+userData.avatar : ''}>
                                        </img>
                                        <img src={dropdown_vector}
                                            className="w-6 h-6">
                                        </img>
                                    </div>
                                </Link>
                            </li>
                        )}
                            {/* <li>
                                <button className="button-card-outlined"
                                    onClick={handleLogout}
                                    disabled={!isAuthenticated}
                                >
                                    {isAuthenticated && 'Logout'}
                                </button>
                            </li> */}
                        </>
                        )}
                    </ul>
                </div>
            </div>
            <SubHeader
            additionalStyle={"z-0 absolute top-28"}
            object={headerPageNamesObject}
            />
        </div>
    );
};
