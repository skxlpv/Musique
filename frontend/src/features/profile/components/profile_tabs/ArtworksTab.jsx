import React, { useState, useEffect } from 'react';
import { get_user_files, MEDIA_ROOT } from '../../../../services/api'; // Adjust import path as needed

export const ArtworksTab = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserFiles = async () => {
            try {
                setIsLoading(true);
                const fileData = await get_user_files();
                setFiles(fileData);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch files');
                setIsLoading(false);
                console.error('Error fetching files:', err);
            }
        };

        fetchUserFiles();
    }, []);

    if (isLoading) {
        return <div className="text-center p-4">Loading artworks...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl mb-4">My Artworks</h1>
            {files.length === 0 ? (
                <p className="text-gray-500">No artworks found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {file.file.endsWith('.png') || file.file.endsWith('.jpg') || file.file.endsWith('.jpeg') ? (
                                <img
                                    src={`${MEDIA_ROOT}${file.file}`}
                                    alt={file.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                                    File Preview Unavailable
                                </div>
                            )}
                            <div className="p-2">
                                <h2 className="font-bold truncate">{file.name}</h2>
                                <p className="text-sm text-gray-500">
                                    Uploaded: {new Date(file.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Type: {file.file.split('.').pop().toUpperCase()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};