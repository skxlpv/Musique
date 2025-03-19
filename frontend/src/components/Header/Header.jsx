import { useNavigate } from "react-router-dom";
import { SubHeader } from "../SubHeader/SubHeader";
import { headerPageNamesObject } from "../../utils/subHeaderTextObjects"
import { logout } from "../../services/api";
import { routes } from "../../routes";
import { useAuth } from "../../features/auth/contexts/useAuth";

export const Header = () => {
    const nav = useNavigate();
    const { loading, isAuthenticated, userData } = useAuth();


    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            nav("/auth/login", { replace: true });
        }
    };

    return (
        <div className="mb-24">
            <div className="flex w-full items-center shadow-md shadow-neutral-950 bg-black px-16 h-28 fixed z-10">
                {/* Left section: Navigation links */}
                <div className="flex w-1/3">
                    <ul className="flex gap-8 text-xl">
                        <li className="list-item-hover">
                            <a className="cursor-default" href={routes.dictionary_page.url}>Dictionary</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href={routes.home_page.url}>Learn</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href={routes.home_page.url}>Analyze</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href={routes.home_page.url}>Discover</a>
                        </li>
                    </ul>
                </div>

                {/* Middle section: Logo */}
                <div className="w-1/3 flex justify-center">
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
                    <ul className="flex gap-8 text-xl p-0 justify-end">
                        <li className="list-item-hover">
                            <a className="cursor-default" href={routes.upload_file.url}>Add Work</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href={routes.home_page.url}>About</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href={routes.home_page.url}>Contacts</a>
                        </li>
                        {/* Only show when NOT loading */}
                        {!loading && (
                            <>
                                {isAuthenticated && (
                                    <li>
                                        <a>{userData?.username}</a>
                                    </li>
                                )}
                                <li>
                                    <button 
                                        className="text-red-500 h-4" 
                                        onClick={handleLogout}
                                        disabled={!isAuthenticated}
                                    >
                                        {isAuthenticated && 'Logout'}
                                    </button>
                                </li>
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
