import React from 'react';

const DetailTitle = ({title, data, getFieldLabel, showCategory = false}) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            {data.category && showCategory && (
                <span className="inline-block bg-gray-700 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium">
                    {getFieldLabel('category')}: {data.category.replace("_", " ")}
                </span>
            )}
        </div>
    );
};

export default DetailTitle;
