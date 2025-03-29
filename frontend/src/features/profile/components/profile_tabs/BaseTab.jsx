import React from "react";

export const BaseTab = ({children, tabTitle}) => {
    return (
        <div className="w-full mt-4">
            <h1 className="text-2xl mt-2 mb-6 ml-0 badge-primary w-fit px-4">{tabTitle}</h1>
            {children}
        </div>
    )
}