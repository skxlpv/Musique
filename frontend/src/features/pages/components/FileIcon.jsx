import React from 'react';
import { File, Image, Music, FileText, Video, Hammer } from "lucide-react";
import { FileTypes } from './FileTypes';

export const FileIcon = ({ fileType, size = "medium" }) => {
    const sizeClasses = {
        small: "w-6 h-6",
        medium: "w-16 h-16",
        large: "w-24 h-24"
    };

    const sizeClass = sizeClasses[size] || sizeClasses.medium;

    switch (fileType) {
        case FileTypes.IMAGE:
            return <Image className={`${sizeClass} text-blue-500`} />;
        case FileTypes.AUDIO:
            return <Music className={`${sizeClass} text-green-500`} />;
        case FileTypes.DOCUMENT:
            return <FileText className={`${sizeClass} text-yellow-500`} />;
        case FileTypes.CRAFT:
            return <Hammer className={`${sizeClass} text-orange-500`} />;
        case FileTypes.VIDEO:
            return <Video className={`${sizeClass} text-purple-500`} />;
        default:
            return <File className={`${sizeClass} text-gray-500`} />;
    }
};
