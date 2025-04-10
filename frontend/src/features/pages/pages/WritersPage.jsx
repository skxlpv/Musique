import React from 'react';
import BasePage from "./BasePage.jsx";
import {FileRenderer} from "../components/FileRenderer.jsx";

export const WritersPage = () => {
    return (
        <BasePage title={"Writers Page"}  description={"Meow"}>
            <FileRenderer category="writing"/>
        </BasePage>
    );
};