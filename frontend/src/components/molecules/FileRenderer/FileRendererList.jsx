import React from 'react';
import { FileIcon } from './FileIcon.jsx';
import {DocViewer} from "./DocViewer.jsx";
import {BASE_URL} from "../../../services/api.js";
import {PDFViewer} from "./PDFViewer.jsx";

export const FileRendererList = ({ file }) => {
    const formattedDate = new Date(file.uploaded_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const fileExtension = file.file?.split('.').pop()?.toLowerCase() || '';
    console.log(file)

    const getFileUrl = () => {
        if (!file.file) return '';
        return file.file.startsWith('http') ? file.file : `http://127.0.0.1:8000${file.file}`;
    };

    const getCoverArtUrl = () => {
        if (!file.cover_art) return '';
        return file.cover_art.startsWith('http') ? file.cover_art : `http://127.0.0.1:8000/${file.cover_art}`;
    };

    const renderPreview = () => {
        // Handle different file types
        switch(fileExtension) {
            case 'docx':
                return (
                    <div className="h-56 flex items-center justify-center">
                        <div className="text-gray-600 bg-white flex flex-col items-center p-4">
                            <DocViewer data={file} maxCharacters={251} />
                        </div>
                    </div>
                );
            case 'doc':
                return (
                    <div className="h-56 flex items-center justify-center">
                        <div className="text-gray-600 flex flex-col items-center p-4">
                            <span className="text-5xl uppercase tracking-wider">{fileExtension}</span>
                        </div>
                    </div>
                );
            case 'pdf':
                return (
                    <div className="h-56 flex items-center justify-center">
                        <div className="text-gray-600 flex flex-col items-center mt-auto">
                            <PDFViewer file={file} />
                            <span className="text-xs uppercase tracking-wider">{fileExtension}</span>
                        </div>
                    </div>
                );

            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'webp':
                return (
                    <div className="h-56 flex items-center justify-center">
                        <img
                            src={getFileUrl()}
                            alt={file.title}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '';
                                e.target.parentElement.innerHTML = `
                                    <div class="text-gray-600 flex flex-col items-center p-4">
                                        <FileIcon fileType="image" class="w-16 h-16 mb-4" />
                                        <span class="text-xs uppercase tracking-wider">${fileExtension}</span>
                                    </div>
                                `;
                            }}
                        />
                    </div>
                );
            case 'mp3':
            case 'wav':
            case 'ogg':
            case 'm4a':
                return (
                    <div className="h-56 flex items-center justify-center relative">
                        {file.cover_art ? (
                            <>
                                <img
                                    src={getCoverArtUrl()}
                                    className="w-full h-full object-cover"
                                    alt="Cover art"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '';
                                    }}
                                />
                            </>
                        ) : (
                            <div className="text-gray-600 flex flex-col items-center p-4">
                                <FileIcon fileType="audio" className="w-16 h-16 mb-4" />
                                <span className="text-xs uppercase tracking-wider">AUDIO</span>
                            </div>
                        )}
                    </div>
                );

            default:
                return (
                    <div className="h-56 flex items-center justify-center">
                        <div className="text-gray-600 flex flex-col items-center p-4">
                            <FileIcon fileType="generic" className="w-16 h-16 mb-4" />
                            <span className="text-xs uppercase tracking-wider">{fileExtension || 'FILE'}</span>
                        </div>
                    </div>
                );
        }
    };

    const getDisplayName = () => {
        if (file.title) return file.title;
        if (file.file) {
            const fileName = file.file.split('/').pop();
            return decodeURIComponent(fileName).replace(/%20/g, ' ');
        }
        return 'Untitled Document';
    };

    return (
        <div className="w-56 h-96 flex flex-col cursor-pointer bg-black rounded-lg border-2 border-gray-800 overflow-hidden hover:border-gray-600 transition-all duration-300 shadow-xl">
            <div className="flex-1 flex flex-col overflow-y-auto group relative">
                <div className="overflow-hidden h-full">
                    {renderPreview()}
                    {file.file && (
                        <a
                            href={file.file}
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100
                           transition-opacity duration-300 z-10
                           text-center
                           w-10 h-12
                           py-1.5 bg-black text-violet-300 text-2xl rounded-full
                           hover:bg-neutral-700 shadow-lg"
                            download
                        >
                            ↓
                        </a>
                    )}
                </div>
            </div>

            {/* Document metadata - now at the top */}
            <div className="p-4 flex flex-col bg-black border-gray-800">
                <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-gray-500">{formattedDate}</span>
                    <span className="px-2 py-1 rounded text-gray-300">
                        {file.category?.toUpperCase() || fileExtension.toUpperCase() || 'FILE'}
                    </span>
                </div>

                <div className="text-lg font-medium text-white flex items-start">
                    {getDisplayName()}
                </div>

                <div className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {file.description || 'No description available'}
                </div>
            </div>
        </div>
    );
};

export const FileList = ({ files }) => {
    if (!files || files.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center bg-black">
                <p className="text-gray-500">No files found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-y-6 bg-black">
            {files.map((file) => (
                <FileRendererList
                    key={file.id || file.file} // Fallback to file path if no id
                    file={file}
                />
            ))}
        </div>
    );
};