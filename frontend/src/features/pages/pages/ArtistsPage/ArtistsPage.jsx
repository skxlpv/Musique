import { UniversalFileRenderer } from "../../../dictionary/components/BrowseDocuments/UniversalFileRenderer.jsx"

export const ArtistsPage = () => {
    const handleFileClick = (file) => {
        window.location.href = `/art/view/${file.id}`;
    };

    return(
        <div className="place-items-center w-full">
            <h1 className="heading-1">Artists Page</h1>
            <h1 className="heading-3 text-neutral-500">Browse Other Artists Works</h1>
            <UniversalFileRenderer
              category="art"
              onFileClick={(file) => handleFileClick(file)}
            />
        </div>
    )
}
