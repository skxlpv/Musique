import React from 'react';
import BasePage from "./BasePage.jsx";
import {FileRenderer} from "../components/FileRenderer.jsx";

const WritersPage = () => {
    return (
        <BasePage title={"Writers Page"}  description={"Feel the role, play a life"}>
            <FileRenderer category="theatre"/>
        </BasePage>
    );
};

export default WritersPage;