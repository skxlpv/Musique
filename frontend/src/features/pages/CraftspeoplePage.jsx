import { FileRenderer } from "../../components/molecules/FileRenderer/FileRenderer.jsx"
import BasePage from "./BasePage.jsx";

export const CraftspeoplePage = () => {
    return(
        <BasePage title={"Craftspeople Page"}  description={"Ordinary into a wonder"}>
            <FileRenderer category="crafts"/>
        </BasePage>
    )
}
