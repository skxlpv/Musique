import { SubHeader } from "../../components/SubHeader/SubHeader"
import {artistsPageOptionNames} from "../../utils/artistsPageTextObjects"
import { BrowseDocuments } from "../../components/BrowseDocuments/BrowseDocuments"

export const ArtistsPage = () => {
    return(
        <div className="place-items-center w-full">
            <h1 className="medium-header">Artists Page</h1>
            <SubHeader object={artistsPageOptionNames}/>
            <h1>Browse Other Artists Works</h1>
            <BrowseDocuments />
        </div>
    )
}