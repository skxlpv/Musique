import React from 'react';
import { FileTypes, getFileTypeFromExtension, isPdf, getFileUrl } from './FileTypes';
import { FileIcon } from './FileIcon';
import { PDFViewer } from './PDFViewer';
import {DocViewer} from "./DocViewer.jsx";

export const FilePreview = ({ file, category }) => {
    const fileType = file.file_type || getCategoryFileType(category) || getFileTypeFromExtension(file.file);
    const fileUrl = getFileUrl(file);

    if (fileType === FileTypes.DOCUMENT && isPdf(file)) {
        return <PDFViewer file={file} />;
    }

    switch (fileType) {
        case FileTypes.IMAGE:
            return (
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${fileUrl})`,
                    }}
                />
            );

        case FileTypes.AUDIO:
            if (file.cover_art) {
                const coverArtUrl = file.cover_art.startsWith('http')
                    ? file.cover_art
                    : `http://127.0.0.1:8000/${file.cover_art}`;

                return (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${coverArtUrl})`,
                        }}
                    >
                        <div className="absolute bottom-2 right-2 bg-black/50 p-1 rounded-full">
                            <FileIcon fileType={FileTypes.AUDIO} size="small" />
                        </div>
                    </div>
                );
            }
            return (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                    <FileIcon fileType={FileTypes.AUDIO} />
                </div>
            );
        case FileTypes.DOCUMENT:
            return (<DocViewer data={file} category={category} />)
        default:
            return (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-yellow-50">
                    <FileIcon fileType={fileType} />
                </div>
            );
    }
};

const getCategoryFileType = (category) => {
    const categoryConfig = {
        visual_art: FileTypes.IMAGE,
        music: FileTypes.AUDIO,
        writing: FileTypes.DOCUMENT,
        theatre: FileTypes.DOCUMENT,
        crafts: FileTypes.CRAFT,
    };

    return categoryConfig[category];
};