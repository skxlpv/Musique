import { FileRenderer } from "../components/FileRenderer.jsx"
import BasePage from "./BasePage.jsx";

export const MusicianPage = () => {
    return(
        <BasePage title={"Musician Page"}  description={"Tune in, stand out"}>
            <FileRenderer category="music"/>
        </BasePage>
    )
}
