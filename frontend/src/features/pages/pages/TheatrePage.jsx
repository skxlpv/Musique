import { FileRenderer } from "../components/FileRenderer.jsx"
import BasePage from "./BasePage.jsx";

export const TheatrePage = () => {
    return(
        <BasePage title={"Theatre Page"}  description={"Feel the role, play a life"}>
            <FileRenderer category="theatre"/>
        </BasePage>
    )
}
