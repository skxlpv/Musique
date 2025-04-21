import React from 'react';
import { FilePreview } from './FilePreview';
import FileDisplayHeader from "../../../components/atoms/FileDisplayHeader/FileDisplayHeader.jsx";
import { extensionMap } from "./FileTypes.jsx";

export const FileCard = ({ file, category, onClick }) => {
    const ext = file.file.split('.').pop().toLowerCase();
    const isImage = extensionMap.image.includes(ext);
    const isAudio = extensionMap.audio.includes(ext);
    const shouldShowHeader = !isImage && !isAudio; // Only show header if neither image nor audio

    return (
        <div
            className={`flex flex-col rounded-md overflow-hidden shadow-md
            border border-black w-full 
            ${isImage || isAudio ? 'h-fit' : 'h-[26rem]'}
            ${!isAudio && "bg-white"}
            cursor-pointer hover:shadow-lg transition-shadow
            items-center outline ${isAudio ? "outline-none" : "outline-white/50"}`}
            onClick={() => onClick(file)}
        >
            <div className={`w-full ${isAudio ? "h-fit" : ""} p-0`}>
                {shouldShowHeader && (
                    <FileDisplayHeader
                        data={file}
                        fileType={file.file_type}
                    />
                )}
                <FilePreview file={file} category={category} />
            </div>
        </div>
    );
};