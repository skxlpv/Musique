import React from 'react';
import { FilePreview } from './FilePreview';
import FileDisplayHeader from "../../../components/atoms/FileDisplayHeader/FileDisplayHeader.jsx";

export const FileCard = ({ file, category, onClick }) => {
    return (
        <div
            className="flex flex-col rounded-md overflow-hidden shadow-md
            border border-black min-h-7 w-full h-[26rem]
            cursor-pointer hover:shadow-lg transition-shadow
            items-center outline outline-white/50"
            onClick={() => onClick(file)}
        >
            <div className="h-full min-h-80 w-full bg-gray-100 p-0 overflow-hidden ">
                <FileDisplayHeader
                    data={file}
                    fileType={file.file_type}
                />
                <FilePreview file={file} category={category} />
            </div>
        </div>
    );
};