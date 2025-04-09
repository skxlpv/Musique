import React from 'react';

export const LoadingState = () => (
    <div className="w-full h-full flex justify-center items-center ">
        Loading files...
    </div>
);

export const ErrorState = ({ message }) => (
    <div className="w-full h-full flex justify-center items-center text-red-500">
        {message}
    </div>
);

export const EmptyState = () => (
    <div className="w-full h-full flex justify-center items-center">
        No files found in this category.
    </div>
);

