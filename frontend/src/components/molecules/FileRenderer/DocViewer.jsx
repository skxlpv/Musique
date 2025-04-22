import React, {useState, useEffect} from 'react';
import * as mammoth from 'mammoth';
import {FileText} from 'lucide-react';
import truncate from "html-truncate";
import {RTFJS} from 'rtf.js';
import he from 'he';
import HTMLRender from "../../atoms/HTMLRender/HTMLRender.jsx";

export const DocViewer = ({data, maxCharacters = 1200}) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDocument = async () => {
            try {
                setLoading(true);
                const fileUrl = data.file;
                const fileName = data.file || fileUrl.split('/').pop();
                const extension = fileName.split('.').pop().toLowerCase();

                if (!['docx', 'txt', 'rtf'].includes(extension)) {
                    setError(`File type .${extension} is not supported. Supported types: .docx, .txt, .rtf`);
                    setLoading(false);
                    return;
                }

                const response = await fetch(fileUrl);
                if (!response.ok) new Error(`Failed to fetch document (status: ${response.status})`);

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
            <h1 className="text-xs text-gray-500 mt-2">Loading document preview...</h1>
        );
    }

    if (error) {
        return (
            <div className="w-full h-80 flex items-center justify-center">
                <div className="p-4 h-7/12 flex flex-col items-center justify-around text-red-500 break-all text-center">
                    <FileText className="mx-auto mb-2 text-black" size={72}/>
                    <div>
                        <h3 className="font-medium text-lg text-black ">
                            {data.title}
                        </h3>
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
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-hidden flex flex-col">
            {/* Document content */}
            <HTMLRender content={content}/>
        </div>
    );
};