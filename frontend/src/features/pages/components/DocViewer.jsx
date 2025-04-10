import React, {useState, useEffect} from 'react';
import * as mammoth from 'mammoth';
import {FileText, AlertCircle} from 'lucide-react';
import truncate from "html-truncate";
import {RTFJS} from 'rtf.js';
import he from 'he';
import FileDisplayHeader from "../../../components/atoms/FileDisplayHeader/FileDisplayHeader.jsx";

export const DocViewer = ({data, maxCharacters = 1200}) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileType, setFileType] = useState(null);

    useEffect(() => {
        const loadDocument = async () => {
            try {
                setLoading(true);
                const fileUrl = data.file;
                const fileName = data.file || fileUrl.split('/').pop();
                const extension = fileName.split('.').pop().toLowerCase();
                setFileType(extension);

                // Check supported extensions
                if (!['docx', 'txt', 'rtf'].includes(extension)) {
                    setError(`File type .${extension} is not supported. Supported types: .docx, .txt, .rtf`);
                    setLoading(false);
                    return;
                }

                // Fetch document
                const response = await fetch(fileUrl);
                if (!response.ok) throw new Error(`Failed to fetch document (status: ${response.status})`);

                let contentHtml;

                if (extension === 'docx') {
                    const arrayBuffer = await (await response.blob()).arrayBuffer();
                    const result = await mammoth.convertToHtml({ arrayBuffer });
                    contentHtml = result.value;
                } else if (extension === 'rtf') {
                    const arrayBuffer = await response.arrayBuffer();
                    const rtf = new RTFJS.Document(arrayBuffer, {});
                    contentHtml = await new Promise((resolve, reject) => {
                        rtf.render().then((htmlElements) => {
                            const div = document.createElement('div');
                            htmlElements.forEach(element => {
                                element.style.color = 'black';
                                div.appendChild(element)
                            });
                            resolve(div.innerHTML);
                        }).catch(reject);
                    });
                } else { //TXT
                    const text = await response.text();
                    contentHtml = he.encode(text).replace(/\n/g, '<br>');
                }

                const truncated = truncate(contentHtml, maxCharacters, {
                    ellipsis: '...',
                    keepWhitespace: false,
                    truncateLastWord: true
                });

                setContent(truncated);

            } catch (err) {
                console.error('Error loading document:', err);
                setError(err.message || 'Failed to load document');
            } finally {
                setLoading(false);
            }
        };

        loadDocument();
    }, [data, maxCharacters]);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 transition-opacity ease-in duration-300 opacity-100">
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
            {/* Document content */}
            <div className="flex-grow overflow-clip p-4 bg-white text-black text-[10px] relative no-scrollbar content-fade-in">
                <style dangerouslySetInnerHTML={{
                    __html: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .content-fade-in {
                    animation: fadeIn 0.7s ease-in;
                }

                .document-content {
                    max-width: 100%;
                    word-wrap: break-word;
                    overflow: clip;
                }
                .document-content * {
                    color: black !important;
                    font-family: inherit !important;
                    font-size: 12px !important;
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
                    color: black;
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