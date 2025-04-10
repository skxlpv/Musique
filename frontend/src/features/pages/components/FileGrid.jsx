import React from 'react';
import { FileCard } from './FileCard';

export const FileGrid = ({ files, category, onFileClick }) => (
    <div className="w-full h-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {files.map((file, index) => (
            <FileCard
                key={file.id || index}
                file={file}
                category={category}
                onClick={onFileClick}
            />
        ))}
    </div>
);
