import React from "react";
import "../HomePage/HomePage.css";
import "../../styles/TextStyles.css";

export const HomePage = () => {
    return (
        <div>
            <div className="w-full flex justify-center">
                <h1 className="text-header">
                    Everything.
                    <p className="text-5xl ml-20 rotate-6 mt-auto">In a single place</p>
                </h1>
            </div>
            <div className="container w-full p-10 min-h-screen text-center">
                <h1 className="medium-header"><i>More coming!</i></h1>
            </div>
        </div>
    );
};
