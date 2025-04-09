import { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

import { File, Image, Music, FileText, Video, Hammer } from "lucide-react";

export const UniversalFileRenderer = ({
                                          category,
                                          apiEndpoint = "http://127.0.0.1:8000/api/v1/files",
                                          onFileClick = (file) => console.log("File clicked:", file)
                                      }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Store page information for each PDF file using its URL as the key
    const [pdfStates, setPdfStates] = useState({});

    // Map categories to their endpoints and file type groups
    const categoryConfig = {
        art: {
            endpoint: "visual_art",
            fileType: "image"
        },
        music: {
            endpoint: "music",
            fileType: "audio"
        },
        writing: {
            endpoint: "writing",
            fileType: "document"
        },
        theatre: {
            endpoint: "theatre",
            fileType: "document"
        },
        crafts: {
            endpoint: "crafts",
            fileType: "document"
        },
    };

    // Determine appropriate endpoint based on category
    const endpoint = categoryConfig[category]?.endpoint || category;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiEndpoint}/${endpoint}/`);
                console.log(response.data);
                setFiles(response.data.results);
                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load files. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiEndpoint, endpoint]);

    // Get appropriate file icon based on file type
    const getFileIcon = (file) => {
        const fileType = file.file_type || categoryConfig[category]?.fileType || getFileTypeFromExtension(file.file);

        switch (fileType) {
            case 'image':
                return <Image className="w-24 h-24 text-blue-500" />;
            case 'audio':
                return <Music className="w-24 h-24 text-green-500" />;
            case 'document':
                return <FileText className="w-24 h-24 text-yellow-500" />;
            case 'craft':
                return <Hammer className="w-24 h-24 text-orange-500" />;
            default:
                return <File className="w-24 h-24 text-gray-500" />;
        }
    };

    // Try to determine file type from extension
    const getFileTypeFromExtension = (filePath) => {
        if (!filePath) return 'unknown';

        const extension = filePath.split('.').pop().toLowerCase();

        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
        const audioExts = ['mp3', 'wav', 'ogg', 'flac'];
        const videoExts = ['mp4', 'webm', 'avi', 'mov'];
        const documentExts = ['pdf', 'doc', 'docx', 'txt', 'rtf'];

        if (imageExts.includes(extension)) return 'image';
        if (audioExts.includes(extension)) return 'audio';
        if (videoExts.includes(extension)) return 'video';
        if (documentExts.includes(extension)) return 'document';

        return 'unknown';
    };

    // Handle document load success for PDFs
    const handleDocumentLoadSuccess = (file, numPages) => {
        const fileUrl = file.file.startsWith('http') ? file.file : `http://127.0.0.1:8000/${file.file}`;

        setPdfStates(prevStates => ({
            ...prevStates,
            [fileUrl]: {
                ...prevStates[fileUrl],
                numPages,
                pageNumber: prevStates[fileUrl]?.pageNumber || 1
            }
        }));
    };

    // Handle page navigation for PDFs
    const changePage = (fileUrl, newPageNumber) => {
        setPdfStates(prevStates => ({
            ...prevStates,
            [fileUrl]: {
                ...prevStates[fileUrl],
                pageNumber: newPageNumber
            }
        }));
    };

    // Check if a file is a PDF
    const isPdf = (file) => {
        return file.file && file.file.toLowerCase().endsWith('.pdf');
    };

    // Render appropriate preview based on file type
    const renderPreview = (file) => {
        const fileType = file.file_type || categoryConfig[category]?.fileType || getFileTypeFromExtension(file.file);
        const fileUrl = file.file.startsWith('http') ? file.file : `http://127.0.0.1:8000/${file.file}`;

        // Handle PDF files
        if (fileType === 'document' && isPdf(file)) {
            const pdfState = pdfStates[fileUrl] || { pageNumber: 1, numPages: 0 };

            return (
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <Document
                        file={fileUrl}
                        onLoadSuccess={(pdf) => handleDocumentLoadSuccess(file, pdf.numPages)}
                        className="border border-gray-300 rounded-md overflow-hidden"
                    >
                        <Page
                            pageNumber={pdfState.pageNumber}
                            width={280}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>
            );
        }

        // Handle image files
        switch (fileType) {
            case 'image':
                return (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${fileUrl})`,
                        }}
                    />
                );
            case 'audio':
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
                                <Music className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                        <Music className="w-16 h-16 text-green-600" />
                    </div>
                );
            case 'document':
                return (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-yellow-50">
                        <FileText className="w-16 h-16 text-yellow-600" />
                    </div>
                );
            default:
                return (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-yellow-50">
                        {getFileIcon(file)}
                    </div>
                );
        }
    };

    if (loading) {
        return <div className="w-full h-full flex justify-center items-center">Loading files...</div>;
    }

    if (error) {
        return <div className="w-full h-full flex justify-center items-center text-red-500">{error}</div>;
    }

    if (files.length === 0) {
        return <div className="w-full h-full flex justify-center items-center">No files found in this category.</div>;
    }

    return (
        <div className="w-full h-full p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {files.map((file, index) => (
                <div
                    key={file.id || index}
                    className="flex flex-col rounded-lg overflow-hidden shadow-md border border-gray-200 h-96 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => onFileClick(file)}
                >
                    <div className="h-3/4 overflow-hidden bg-gray-100">
                        {renderPreview(file)}
                    </div>
                    <div className="p-4 bg-white h-1/4 flex flex-col justify-between">
                        <h3 className="font-medium text-gray-900 line-clamp-1">{file.title || file.name || 'Untitled'}</h3>
                        {file.description && (
                            <p className="text-sm text-gray-500 line-clamp-2">{file.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};