import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileGrid } from './FileGrid';
import { LoadingState } from './States.jsx';
import { ErrorState } from './States.jsx';
import { EmptyState } from './States.jsx';

export const FileRenderer = ({
                                          category,
                                          apiEndpoint = "http://127.0.0.1:8000/api/v1/files",
                                          onFileClick = (file) => console.log("File clicked:", file)
                                      }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categoryEndpoints = {
        art: "visual_art",
        music: "music",
        writing: "writing",
        theatre: "theatre",
        crafts: "crafts",
    };

    const endpoint = categoryEndpoints[category] || category;

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

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    if (files.length === 0) {
        return <EmptyState />;
    }

    return (
        <FileGrid
            files={files}
            category={category}
            onFileClick={onFileClick}
        />
    );
};
