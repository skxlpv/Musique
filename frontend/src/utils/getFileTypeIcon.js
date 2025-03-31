import {
    File,
    Image,
    FileText,
    FileAudio,
    FileVideo,
    FileArchive,
    FileType
} from 'lucide-react';

export const getFileTypeIcon = (filename) => {
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