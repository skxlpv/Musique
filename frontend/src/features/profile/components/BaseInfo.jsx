import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import {Avatar} from "../../../components/atoms/Avatar/Avatar";
import {useAuth} from "../../auth/contexts/useAuth";

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
        <div className="flex card card-section">
            {/* Left section - Name and title */}
            <div className="w-full">
                <div className="flex gap-10">
                    <div className="flex ml-2 mb-4">
                        <Avatar size={"xl"}/>
                    </div>
                    <div className="py-4">
                        <h1 className="heading-2">
                            {userData.first_name} {userData.last_name}
                        </h1>
                        <div className="text-body">
                            <span>{userData.username}</span>
                            <span className="text-small badge-warning">{userData.pronouns}</span>
                        </div>
                        <div className="flex items-center">
                            <Mail size={16} className="mr-1 text-white" />
                            <span className="text-body">{userData.email}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar size={16} className="mr-1 text-white" />
                            <span className="text-body">Joined {formatDate(userData.joined_at)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 w-1/3 justify-end py-4">
                <ul>
                    <li>
                        <button className="text-small btn-secondary">
                            Create a Sub Profile
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BaseInfo;