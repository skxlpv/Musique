import { FileRenderer } from "../components/FileRenderer.jsx"
import BasePage from "./BasePage.jsx";

export const MusicianPage = () => {
    const handleFileClick = (file) => {
        window.location.href = `/visual_art/${file.id}`;
    };

    return(
        <BasePage title={"Musician Page"}  description={"Tune in, stand out"}>
            <FileRenderer
                category="music"
                onFileClick={(file) => handleFileClick(file)}
            />
        </BasePage>
    )
}
