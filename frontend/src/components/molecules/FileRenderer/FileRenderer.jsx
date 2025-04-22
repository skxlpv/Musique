import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileGrid } from './FileGrid.jsx';
import { LoadingState } from './States.jsx';
import { ErrorState } from './States.jsx';
import { EmptyState } from './States.jsx';

export const FileRenderer = ({
                                          category,
                                          apiEndpoint = "http://127.0.0.1:8000/api/v1/files",
                                      }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categoryEndpoints = {
        art: "art-gallery",
        music: "music-gallery",
        writing: "writings-gallery",
        theatre: "theatrical-gallery",
        crafts: "craftspeople-gallery",
    };
    const endpoint = categoryEndpoints[category] || category;
    const handleFileClick = (file) => {
        window.location.href = `${endpoint}/${file.id}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiEndpoint}/${endpoint}/`);
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

    if (loading) {return <LoadingState />;}
    else if (error) {return <ErrorState message={error} />;}
    else if (files.length === 0) {return <EmptyState />;}

    return (
        <FileGrid
            files={files}
            category={category}
            onFileClick={handleFileClick}
        />
    );
};
