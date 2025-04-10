export const FileTypes = {
    IMAGE: 'image',
    AUDIO: 'audio',
    DOCUMENT: 'document',
    CRAFT: 'craft',
    UNKNOWN: 'unknown'
};

export const getFileTypeFromExtension = (filePath) => {
    if (!filePath) return FileTypes.UNKNOWN;

    const extension = filePath.split('.').pop().toLowerCase();

    const extensionMap = {
        image: ['jpg', 'jpeg', 'png', 'webp'],
        audio: ['mp3', 'wav', 'ogg'],
        pdf: ['pdf'],
        document: ['doc', 'docx', 'txt', 'rtf']
    };

    for (const [type, extensions] of Object.entries(extensionMap)) {
        if (extensions.includes(extension)) {
            return type;
        }
    }

    return FileTypes.UNKNOWN;
};

export const isPdf = (file) => {
    return file.file && file.file.toLowerCase().endsWith('.pdf');
};

export const isDocx = (file) => {
    return file.file && file.file.toLowerCase().endsWith('.docx');
};

export const getFileUrl = (file) => {
    return file.file.startsWith('http') ? file.file : `http://127.0.0.1:8000/${file.file}`;
};
