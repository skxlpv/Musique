import React from 'react';

const BasePage = ({title, description, children}) => {
    return (
        <div className="w-full">
            <div className="ml-4 mb-4">
                <h1 className="heading-1">{title}</h1>
                <h1 className="heading-3 text-neutral-500">{description}</h1>
            </div>
            {children}
        </div>
    );
};

export default BasePage;