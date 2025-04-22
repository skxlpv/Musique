import { FileRenderer } from "../../components/molecules/FileRenderer/FileRenderer.jsx"
import BasePage from "./BasePage.jsx";

export const ArtistsPage = () => {
    return(
        <BasePage title={"Artists Page"}  description={"Dive In. Get Inspired"}>
            <FileRenderer category="art"/>
        </BasePage>
    )
}
