import React from 'react';
import BasePage from "./BasePage.jsx";
import {FileRenderer} from "../components/FileRenderer.jsx";

export const WritersPage = () => {
    return (
        <BasePage title={"Writers Page"}  description={"Ink the thoughts, shape the world"}>
            <FileRenderer category="writing"/>
        </BasePage>
    );
};