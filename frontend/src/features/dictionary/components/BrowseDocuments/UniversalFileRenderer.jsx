import { useEffect, useState } from "react";
import axios from "axios";

import { File, Image, Music, FileText, Video, Hammer } from "lucide-react";

export const UniversalFileRenderer = ({
                                          category,
                                          apiEndpoint = "http://127.0.0.1:8000/api/v1/files",
                                          onFileClick = (file) => console.log("File clicked:", file)
                                      }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                return <Image className="w-10 h-10 text-blue-500" />;
            case 'audio':
                return <Music className="w-10 h-10 text-green-500" />;
            case 'video':
                return <Video className="w-10 h-10 text-red-500" />;
            case 'document':
            case 'pdf':
                return <FileText className="w-10 h-10 text-yellow-500" />;
            case 'craft':
                return <Hammer className="w-10 h-10 text-orange-500" />;
            default:
                return <File className="w-10 h-10 text-gray-500" />;
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

    // Render appropriate preview based on file type
    const renderPreview = (file) => {
        const fileType = file.file_type || categoryConfig[category]?.fileType || getFileTypeFromExtension(file.file);
        const fileUrl = file.file.startsWith('http') ? file.file : `http://127.0.0.1:8000/${file.file}`;

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
            case 'video':
                return (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-purple-50">
                        <Video className="w-16 h-16 text-red-600" />
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
                    key={index}
                    className="border border-neutral-700 rounded-lg
                    h-56 w-full relative shadow-md hover:shadow-lg
                    transition-shadow duration-300 cursor-pointer overflow-hidden"
                    onClick={() => onFileClick(file)}
                >
                    {renderPreview(file)}

                    <div className="absolute bottom-0 w-full px-3 py-2 backdrop-blur-sm bg-black/30 text-white">
                        <h3 className="font-medium truncate">{file.title}</h3>
                        <p className="text-sm truncate">{file.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};