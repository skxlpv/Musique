import React from "react";

export const GradientCard = ({children}) => {
    return (
        <div className="w-full flex p-[1px] rounded-2xl bg-gradient-to-b from-neutral-600 to-black">
            <div className="rounded-2xl bg-black px-16 py-10 w-full flex">
                {children}
            </div>
        </div>
    );
};