import React, {useState, useEffect} from 'react';
import * as mammoth from 'mammoth';
import {FileText, AlertCircle} from 'lucide-react';
import truncate from "html-truncate";

export const DocViewer = ({data, maxCharacters = 1200}) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileType, setFileType] = useState(null);

    useEffect(() => {
        const loadDocument = async () => {
            try {
                setLoading(true);

                // Get the file URL from data
                const fileUrl = data.file;

                // Check file extension
                const fileName = data.file || fileUrl.split('/').pop();
                const extension = fileName.split('.').pop().toLowerCase();
                setFileType(extension);

                // Only process docx files with mammoth
                if (extension !== 'docx') {
                    setError(`File type .${extension} is not supported for preview. Only .docx files can be previewed.`);
                    setLoading(false);
                    return;
                }

                // Fetch the document file
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch document (status: ${response.status})`);
                }

                // Convert the response to an ArrayBuffer
                const blob = await response.blob();
                const arrayBuffer = await blob.arrayBuffer();

                // Use mammoth to convert the docx to HTML
                const result = await mammoth.convertToHtml({ arrayBuffer });
                const truncatedContent = truncate(result.value, maxCharacters, {
                    ellipsis: '...',
                    keepWhitespace: false,
                    truncateLastWord: true
                });
                setContent(truncatedContent);

            } catch (err) {
                console.error('Error loading document:', err);
                setError(err.message || 'Failed to load document');
            } finally {
                setLoading(false);
            }
        };

        loadDocument();
    }, [data]);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2.5"></div>
                    <div className="text-xs text-gray-500 mt-2">Loading document preview...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center p-4">
                    <AlertCircle className="mx-auto mb-2 text-red-500" size={24}/>
                    <p className="text-red-600 font-medium">Document Preview Not Available</p>
                    <p className="text-sm text-gray-600 mt-1">{error}</p>
                    {data.file && (
                        <a
                            href={data.file}
                            className="inline-block mt-4 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            download
                        >
                            Download Document
                        </a>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-hidden flex flex-col">
            {/* Document header with info */}
            <div className="p-2 border-b-2 border-black flex items-center">
                <FileText className="text-blue-600 mr-2" size={16}/>
                <h3 className="font-medium text-lg text-black truncate">
                    {data.title || data.file || 'Document Preview'}
                </h3>
                <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
          {fileType?.toUpperCase()}
        </span>
            </div>

            {/* Document content */}
            <div className="flex-grow overflow-clip p-4 bg-white text-black text-[10px] relative no-scrollbar">
                <style dangerouslySetInnerHTML={{
                    __html: `
                .document-content {
                    max-width: 100%;
                    word-wrap: break-word;
                    overflow: clip;
                    ani
                }
                .document-content h1, .document-content h2, .document-content h3, 
                .document-content h4, .document-content h5, .document-content h6 {
                    margin-top: 1em;
                    margin-bottom: 0.5em;
                    font-weight: bold;
                }
                .document-content h1 { font-size: 1.5em; }
                .document-content h2 { font-size: 1.3em; }
                .document-content h3 { font-size: 1.2em; }
                .document-content p { margin-bottom: 0.8em; }
                .document-content table {
                    border-collapse: collapse;
                    margin: 1em 0;
                    max-width: 100% !important;
                    overflow-x: auto;
                    display: block;
                }
                .document-content td, .document-content th { 
                    border: 1px solid #ddd; 
                    padding: 4px 8px;
                    word-break: break-word;
                }
                .document-content ul, .document-content ol { 
                    margin-left: 2em; 
                    margin-bottom: 1em;
                    overflow-wrap: anywhere;
                }
                .document-content img {
                    max-width: 100%;
                    height: auto;
                }
                `
                }}/>

                <div
                    className="document-content"
                    dangerouslySetInnerHTML={{__html: content}}
                />
            </div>
        </div>
    );
};