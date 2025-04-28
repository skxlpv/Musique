import React from 'react';

const DetailImage = ({data}) => {
    return (
        <div className="lg:w-auto h-[50vh] px-6">
            <div className="relative h-full w-full group overflow-hidden rounded-lg">
                {data.file_type === 'image' ? (
                    <img
                        src={data.file}
                        alt={data.title || "Preview"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full flex items-center justify-center p-8 text-center">
                        <div className="text-4xl mb-2">📄</div>
                        <p className="text-sm">{data.file.split('/').pop()}</p>
                    </div>
                )}
                {data.is_downloadable && (
                    <button className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Download
                    </button>
                )}
            </div>
        </div>
    );
};

export default DetailImage;
