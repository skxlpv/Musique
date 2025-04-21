import React from 'react';
import { FileTypes, getFileTypeFromExtension, isPdf, getFileUrl } from './FileTypes';
import { FileIcon } from './FileIcon';
import { PDFViewer } from './PDFViewer';
import {DocViewer} from "./DocViewer.jsx";
import vinyl from "../../../assets/vinyl.png"
import play from "../../../assets/play.png"
import pause from "../../../assets/pause.png"

export const FilePreview = ({ file, category }) => {
    const fileType = getCategoryFileType(category) || getFileTypeFromExtension(file.file);
    const fileUrl = getFileUrl(file);

    if (fileType === FileTypes.DOCUMENT && isPdf(file)) {
        return <PDFViewer file={file} />;
    }

    switch (fileType) {
        case FileTypes.DOCUMENT:
            return (<DocViewer data={file} />)
        case FileTypes.IMAGE:
            return (
                <div>
                    <img
                        src={fileUrl}
                        className="w-full h-auto rounded-md"
                        alt={file.file || 'Preview'}
                        loading="lazy"
                        style={{
                            objectFit: 'cover'
                        }}
                    />
                </div>
            );

        case FileTypes.AUDIO:
            if (file.cover_art) {
                const coverArtUrl = file.cover_art.startsWith('http')
                    ? file.cover_art
                    : `http://127.0.0.1:8000/${file.cover_art}`;

                return (
                    <div className="flex relative z-0 ml-10">
                        <img
                            src={vinyl}
                            className="w-[8.5rem] h-fit absolute z-10 left-[calc(33.33%)] invert"
                            alt="vinyl record"
                            style={{
                                transform: 'translateX(1rem)'
                            }}
                        />
                        <img
                            src={coverArtUrl}
                            className="w-7/12 h-auto rounded-md z-20 relative"
                            alt={file.cover_art}
                        />
                        <img
                            src={play}
                            className="w-10 h-10 absolute z-20 top-12 left-12 invert"
                            alt="play-icon"
                        />
                    </div>
                );
            }
            return (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                    <FileIcon fileType={FileTypes.AUDIO} />
                </div>
            );
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