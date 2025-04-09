import React from 'react';
import { FilePreview } from './FilePreview';

export const FileCard = ({ file, category, onClick }) => {
    return (
        <div
            className="flex flex-col rounded-lg overflow-hidden shadow-md
            border border-black min-h-7 w-full
            cursor-pointer hover:shadow-lg transition-shadow
            items-center outline outline-zinc-500"
            onClick={() => onClick(file)}
        >
            <div className="h-80 w-full overflow-hidden bg-gray-100 p-0">
                <FilePreview file={file} category={category} />
            </div>
            <hr className="mt-0"/>
            <div className="p-4 bg-zinc-200 h-1/4 w-full flex flex-col line-clamp-2">
                <h3 className="heading-6 text-black line-clamp-1">
                    {file.title || file.name || 'Untitled'}
                </h3>
                {file.description && (
                    <p className="text-gray-500 line-clamp-2">{file.description}</p>
                )}
            </div>
        </div>
    );
};