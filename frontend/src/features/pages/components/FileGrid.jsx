import React from 'react';
import { FileCard } from './FileCard';

export const FileGrid = ({ files, category, onFileClick }) => (
    <div className="w-full p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-6 space-y-6">
        {files.map((file, index) => (
            <FileCard
                key={file.id || index}
                file={file}
                category={category}
                onClick={onFileClick}
                className="break-inside-avoid" // Prevent item splitting between columns
            />
        ))}
    </div>
);
