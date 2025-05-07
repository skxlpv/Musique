import React, { useState } from 'react';
import { FileTypes, getFileTypeFromExtension, isPdf, getFileUrl } from './FileTypes.jsx';
import { FileIcon } from './FileIcon.jsx';
import { PDFViewer } from './PDFViewer.jsx';
import { DocViewer } from "./DocViewer.jsx";
import vinyl from "../../../assets/vinyl.png"
import play from "../../../assets/play.png"

export const FilePreview = ({ file, category }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioElement, setAudioElement] = useState(null);

    const fileType = getCategoryFileType(category) || getFileTypeFromExtension(file.file);
    const fileUrl = getFileUrl(file);

    const handlePlayAudio = () => {
        if (!audioElement) {
            const audio = new Audio(fileUrl);
            setAudioElement(audio);

            audio.addEventListener('ended', () => {
                setIsPlaying(false);
            });

            audio.play();
            setIsPlaying(true);
        } else {
            if (isPlaying) {
                audioElement.pause();
                setIsPlaying(false);
            } else {
                audioElement.play();
                setIsPlaying(true);
            }
        }
    };

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
                    <div className="flex flex-col items-center">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Vinyl Record - behind the cover */}
                            <img
                                src={vinyl}
                                className="absolute w-full h-full object-contain animate-spin"
                                style={{
                                    animationDuration: '3s',
                                    animationPlayState: isPlaying ? 'running' : 'paused'
                                }}
                                alt="vinyl record"
                            />

                            {/* Cover Art - centered on top of vinyl */}
                            <img
                                src={coverArtUrl}
                                className="w-3/5 h-3/5 rounded-md z-10 object-cover shadow-lg"
                                alt={file.cover_art}
                            />

                            {/* Play Button - centered on top of cover */}
                            <button
                                onClick={handlePlayAudio}
                                className="absolute z-20 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                            >
                                <img
                                    src={play}
                                    className={`w-6 h-6 invert ${isPlaying ? 'opacity-70' : ''}`}
                                    alt="play-icon"
                                />
                            </button>
                        </div>

                        {/* Track info */}
                        {isPlaying && (
                            <div className="mt-4 text-center max-w-xs">
                                <p className="text-sm font-medium truncate">{file.title || file.file.split('/').pop()}</p>
                            </div>
                        )}
                    </div>
                );
            }
            return (
                <div className="flex flex-col items-center">
                    <div className="relative w-64 h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 rounded-full">
                        <FileIcon fileType={FileTypes.AUDIO} className="w-16 h-16" />
                        <button
                            onClick={handlePlayAudio}
                            className="absolute z-20 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                        >
                            <img
                                src={play}
                                className={`w-6 h-6 invert ${isPlaying ? 'opacity-70' : ''}`}
                                alt="play-icon"
                            />
                        </button>
                    </div>
                    {isPlaying && (
                        <div className="mt-4 text-center max-w-xs">
                            <p className="text-sm font-medium truncate">{file.title || file.file.split('/').pop()}</p>
                        </div>
                    )}
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
        crafts: FileTypes.DOCUMENT,
    };

    return categoryConfig[category];
};