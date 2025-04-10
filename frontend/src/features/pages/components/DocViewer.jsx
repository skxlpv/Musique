import React, { useState } from 'react';
import { FileText, Download, User, Calendar, Book, Globe, Tag } from 'lucide-react';

export const DocViewer = ({ data }) => {
    const [expanded, setExpanded] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleDownload = (e) => {
        e.stopPropagation();
        // Download functionality handled by the href attribute
    };

    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* Document preview area */}
            <div
                className="flex-grow flex flex-col items-center justify-center cursor-pointer p-4"
                onClick={() => setExpanded(!expanded)}
            >
                <FileText size={48} className="text-blue-600 mb-2" />
                <h3 className="font-medium text-lg text-center">{data.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                    {data.word_count?.toLocaleString() || 'Unknown'} words
                </p>

                {/* Document type indicator */}
                <div className="mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    {data.file?.split('.').pop().toUpperCase() || 'DOC'}
                </div>
            </div>

            {/* Expandable details */}
            <div className={`border-t transition-all duration-300 overflow-hidden ${expanded ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-1 gap-3">
                        {/* Basic details */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center text-sm">
                                <User size={14} className="mr-2 text-gray-500" />
                                <span className="text-gray-700">{data.author_name || 'Unknown author'}</span>
                            </div>

                            <div className="flex items-center text-sm">
                                <Calendar size={14} className="mr-2 text-gray-500" />
                                <span className="text-gray-700">{formatDate(data.publication_date)}</span>
                            </div>

                            <div className="flex items-center text-sm">
                                <Book size={14} className="mr-2 text-gray-500" />
                                <span className="text-gray-700">{data.genre || 'Unspecified genre'}</span>
                            </div>

                            <div className="flex items-center text-sm">
                                <Globe size={14} className="mr-2 text-gray-500" />
                                <span className="text-gray-700">{data.language || 'Unspecified language'}</span>
                            </div>
                        </div>

                        {/* Description if available */}
                        {data.description && (
                            <div className="text-sm text-gray-700 mt-2">
                                <p className="line-clamp-2">{data.description}</p>
                            </div>
                        )}

                        {/* Tags if available */}
                        {data.tags_list && data.tags_list.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                                <Tag size={12} className="text-gray-500" />
                                {data.tags_list.map((tag, index) => (
                                    <span key={index} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action bar */}
            <div className="p-2 border-t flex justify-between items-center">
                <button
                    className="text-xs text-blue-600 hover:text-blue-800"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'Show less' : 'Show more'}
                </button>

                {data.is_downloadable && (
                    <a
                        href={data.file_url}
                        className="flex items-center text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={handleDownload}
                        download
                    >
                        <Download size={12} className="mr-1" />
                        Download
                    </a>
                )}
            </div>
        </div>
    );
};