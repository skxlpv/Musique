import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SubHeader } from "../SubHeader/SubHeader";
import { headerPageNamesObject } from "../../utils/subHeaderTextObjects"

export const Header = () => {
    const { auth, loading } = useAuth();
    const location = useLocation();
    const loggedInState = location.state?.loggedIn;

    return (
        <div className="mb-24">
            <div className="flex w-full items-center shadow-md shadow-neutral-950 bg-black px-16 h-28 fixed z-10">
                {/* Left section: Navigation links */}
                <div className="flex w-1/3">
                    <ul className="flex gap-8 text-xl">
                        <li className="list-item-hover">
                            <a className="cursor-default" href="/dictionary">Dictionary</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href="/">Learn</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href="/">Analyze</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href="/auth">Discover</a>
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
                            <a className="cursor-default" href="/">Add Work</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href="/">About</a>
                        </li>
                        <li className="list-item-hover">
                            <a className="cursor-default" href="/">Contacts</a>
                        </li>
                        {/* Conditional rendering based on authentication state */}
                        <li className="list-item-hover">
                            {loading ? (
                                <span>My Profile</span>
                            ) : (
                                auth?.isAuthenticated || loggedInState ? (
                                    <a className="cursor-default" href="/profile">My Profile</a>
                                ) : (
                                    <a className="cursor-default" href="/auth/login">Login</a>
                                )
                            )}
                        </li>
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
