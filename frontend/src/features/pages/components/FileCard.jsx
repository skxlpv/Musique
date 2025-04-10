import React from 'react';
import { FilePreview } from './FilePreview';
import {getFileTypeFromExtension, isDocument} from "./FileTypes.jsx";

export const FileCard = ({ file, category, onClick }) => {
    return (
        <div
            className="flex flex-col rounded-lg overflow-hidden shadow-md
            border border-black min-h-7 w-full h-[26rem]
            cursor-pointer hover:shadow-lg transition-shadow
            items-center outline outline-zinc-500"
            onClick={() => onClick(file)}
        >
            <div className="h-full min-h-80 w-full bg-gray-100 p-0 overflow-hidden ">
                <FilePreview file={file} category={category} />
            </div>
            <hr className="mt-0"/>
            {!isDocument(file) &&
                <div className="p-4 pt-2 min-h-96 bg-zinc-200 w-full flex flex-col">
                    <h3 className="heading-6 text-black line-clamp-1">
                        {file.title || file.name || 'Untitled'}
                    </h3>
                    {file.description && (
                        <p className="text-gray-500 line-clamp-2">{file.description}</p>
                    )}
            </div>}
        </div>
    );
};