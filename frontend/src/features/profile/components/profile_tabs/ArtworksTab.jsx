import React, { useState, useEffect } from 'react';
import {get_user_files, MEDIA_ROOT} from '../../../../services/api';
import {useAuth} from "../../../auth/contexts/useAuth";
import {FileList} from "../../../../components/FileRenderer/FileRenderer";

export const ArtworksTab = () => {
    const [files, setFiles] = useState([]);
    const [filesLoading, setFilesLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userData } = useAuth();

    useEffect(() => {
        const fetchUserFiles = async () => {
            try {
                setFilesLoading(true);
                const fileData = await get_user_files(userData.username);
                setFiles(fileData);
                setFilesLoading(false);
            } catch (err) {
                setError('Failed to fetch files');
                setFilesLoading(false);
                console.error('Error fetching files:', err);
            }
        };

        fetchUserFiles();
    }, [userData.username]);

    if (filesLoading) {return <div className="text-center p-4">Loading artworks...</div>;}
    if (error) {return <div className="text-red-500 p-4">{error}</div>;}

    return (
        <div className="w-full">
            <h1 className="text-3xl mb-4">My Artworks</h1>
                {files.length === 0 ? (
                    <p className="text-gray-500">No artworks found.</p>
                ) : (
                    <FileList files={files} />
                )}
        </div>
    );
};