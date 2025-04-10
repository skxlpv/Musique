import { FileRenderer } from "../components/FileRenderer.jsx"
import BasePage from "./BasePage.jsx";

export const ArtistsPage = () => {
    const handleFileClick = (file) => {
        window.location.href = `/art/view/${file.id}`;
    };

    return(
        <BasePage title={"Artists Page"}  description={"Dive In. Get Inspired"}>
            <FileRenderer
                category="art"
                onFileClick={(file) => handleFileClick(file)}
            />
        </BasePage>
    )
}
