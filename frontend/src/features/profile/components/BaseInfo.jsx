import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import {Avatar} from "../../../components/Avatar/Avatar";
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
        <div className="flex">
            {/* Left section - Name and title */}
            <div className="w-full">
                <div className="flex gap-4">
                    <div className="flex ml-2 mb-4">
                        <Avatar size={"lg"}/>
                    </div>
                    <div>
                        <h1 className="text-h2">
                            {userData.first_name} {userData.last_name}
                        </h1>
                        <div className="text-body">
                            <span>{userData.username}</span>
                            <span className="text-small badge-warning">{userData.pronouns}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row h-fit gap-4">
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
    );
};

export default BaseInfo;