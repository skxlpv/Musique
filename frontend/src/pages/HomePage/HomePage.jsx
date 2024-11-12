import React from "react";
import "../HomePage/HomePage.css";
import { Link } from "react-router-dom";
import "../../styles/TextStyles.css";
import { instrumentsObject, resoursesObject } from "./textObjects";

export const HomePage = () => {

    const renderInstruments = () => {
        return (
            <ul className='grid grid-cols-4 justify-center text-center mb-10'>
                {Object.keys(instrumentsObject).map((key, index) => {
                    const { description, color: shadowColor, link } = instrumentsObject[key];
                    return (
                        <li key={index}>
                            <div className="card">
                                <h1
                                    className="text-5xl mb-10 transition-all duration-1000 text-shadow-diffusion" style={{ '--shadowColor': shadowColor }}>
                                    <Link to={link}>{key}</Link>
                                </h1>
                                {description && <p className="w-3/4 text-zinc-300">{description}</p>}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderResourses = () => {
        return(
            <ul className="flex flex-col items-start gap-4">
                {Object.keys(resoursesObject).map((key) => {
                    return(
                        <li className="text-5xl" key={key}>
                            {key}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <>
            <div className="w-full flex justify-center">
                <h1 className="text-header">
                    Everything.
                    <p className="text-5xl ml-20 rotate-6 mt-auto">In a single place</p>
                </h1>
            </div>
            <div className="container w-full p-10 min-h-screen">
                <div className="mb-36 flex flex-col text-center mb-30">
                    {renderInstruments()}
                </div>
                {/* <div className="flex flex-col text-center ">
                    {renderResourses()}
                </div> */}
            </div>
        </>
    );
};
