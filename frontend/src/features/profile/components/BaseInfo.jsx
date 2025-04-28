import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import {Avatar} from "../../../components/atoms/Avatar/Avatar";
import {useAuth} from "../../auth/contexts/useAuth.jsx";

export const BaseInfo = () => {
    const {userData} = useAuth();

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        // Check if date is valid
        if (isNaN(date.getTime())) return dateString;

        // Format as Month Day, Year (e.g., March 22, 2025)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="flex card-gradient card-gradient-color-violet justify-between">
            {/* Left section - Name and title */}
            <div className="flex gap-10 items-center">
                <div className="flex mb-4">
                    <Avatar size={"xl"}/>
                </div>
                <div className="py-4 space-y-2">
                    <h1 className="heading-2">
                        {userData.first_name} {userData.last_name}
                    </h1>
                    <div className="w-fit">
                        <span className="body-small">{userData.username}</span>
                        <span className="rounded-full px-2 ml-2 badge-warning">{userData.pronouns}</span>
                    </div>
                    <div className="flex items-center">
                        <Mail size={16} className="mr-1 text-white" />
                        <span className="body-small">{userData.email}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar size={16} className="mr-1 text-white" />
                        <span className="body-small">Joined {formatDate(userData.joined_at)}</span>
                    </div>
                </div>
            </div>

            <div className="flex w-1/5 justify-between py-4">
                <div className="border border-neutral-900 h-full"></div>
                <ul className="flex flex-col items-end gap-3">
                    <li>
                        <button className="body-small btn-primary">
                            Create Sub Profile
                        </button>
                    </li>
                    <li>
                        <button className="body-small btn-primary">
                            Edit profile
                        </button>
                    </li>
                    <li>
                        <button className="body-small btn-primary">
                            Settings
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BaseInfo;