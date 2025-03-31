import React from 'react';

export const FileRenderer = ({ file }) => {
    const formattedDate = new Date(file.uploaded_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="card w-52 h-80 flex flex-col justify-between card card-section card-element">
            <div className="flex flex-col">
                <hr className="border-zinc-600"/>
                <div className="flex flex-col pb-4 px-4">
                    <h2 className="text-base truncate mt-2">{file.title}</h2>
                    <span className="text-small truncate">Uploaded: {formattedDate}</span>
                </div>
            </div>
        </div>
    );
};

export const FileList = ({ files }) => {
    return (
        <div className="flex flex-row flex-wrap gap-6">
            {files.map((file) => (
                <FileRenderer
                    key={file.id}
                    file={file}
                />
            ))}
        </div>
    );
};