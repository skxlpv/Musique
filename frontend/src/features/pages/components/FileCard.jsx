import React from 'react';
import { FilePreview } from './FilePreview';
import FileDisplayHeader from "../../../components/atoms/FileDisplayHeader/FileDisplayHeader.jsx";
import {extensionMap} from "./FileTypes.jsx";

export const FileCard = ({ file, category, onClick }) => {
    const ext = file.file.split('.').pop().toLowerCase();
    const isImage = extensionMap.image.includes(ext);

    return (
        <div
            className={`flex flex-col rounded-md overflow-hidden shadow-md
            border border-black min-h-7 w-full ${isImage ? 'h-fit' : 'h-[26rem]'}
            cursor-pointer hover:shadow-lg transition-shadow
            items-center outline outline-white/50`}
            onClick={() => onClick(file)}
        >
            <div className={`w-full bg-gray-100 p-0 overflow-hidden ${isImage ? 'h-auto' : 'h-full min-h-80'}`}>
                {!isImage && (
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