import React from 'react';
import {
    File,
    Image,
    FileText,
    FileAudio,
    FileVideo,
    FileArchive,
    FileType
} from 'lucide-react';

const getFileTypeIcon = (filename) => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg'];
    const docExtensions = ['.doc', '.docx', '.txt', '.rtf', '.md'];
    const musicExtensions = ['.mp3', '.wav', '.ogg', '.flac', '.aac'];
    const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.mkv'];
    const archiveExtensions = ['.zip', '.rar', '.7z', '.tar', '.gz'];

    if (imageExtensions.some(type => type.includes(`.${extension}`))) return Image;
    if (['.pdf'].includes(`.${extension}`)) return FileType;
    if (docExtensions.some(type => type.includes(`.${extension}`))) return FileText;
    if (musicExtensions.some(type => type.includes(`.${extension}`))) return FileAudio;
    if (videoExtensions.some(type => type.includes(`.${extension}`))) return FileVideo;
    if (archiveExtensions.some(type => type.includes(`.${extension}`))) return FileArchive;

    return File;
};

export const FileRenderer = ({ file }) => {
    const FileIcon = getFileTypeIcon(file.file);

    const formattedDate = new Date(file.uploaded_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="card w-52 h-80 flex flex-col justify-between">
            <div className="flex justify-center h-1/2 items-center">
                {/*<FileIcon size={60}/>*/}
            </div>
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