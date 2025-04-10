import { FileRenderer } from "../components/FileRenderer.jsx"
import BasePage from "./BasePage.jsx";

export const TheatrePage = () => {
    const handleFileClick = (file) => {
        window.location.href = `/art/view/${file.id}`;
    };

    return(
        <BasePage title={"Theatre Page"}  description={"Feel the role, play a life"}>
            <FileRenderer
                category="theatre"
                onFileClick={(file) => handleFileClick(file)}
            />
        </BasePage>
    )
}
