import React from 'react';
import {FileText} from "lucide-react";

const FileDisplayHeader = ({data}) => {
    const fileType = data.file_url.split('.').pop().toLowerCase();
    return (
        <div className="p-2 flex items-center">
            <FileText className="text-blue-600 mr-2" size={20}/>
            <h3 className="font-medium text-lg text-black truncate">
                {data.title || data.file || 'Document Preview'}
            </h3>
            <span className="ml-auto text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {fileType.toUpperCase()}
            </span>
        </div>
    );
};

export default FileDisplayHeader;