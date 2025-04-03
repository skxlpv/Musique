import { UniversalFileRenderer } from "../../../dictionary/components/BrowseDocuments/UniversalFileRenderer.jsx"

export const ArtistsPage = () => {
    const handleFileClick = (file) => {
        window.location.href = `/art/view/${file.id}`;
    };

    return(
        <div className="w-full">
            <div className="ml-4 mb-4">
                <h1 className="heading-1">Artists Page</h1>
                <h1 className="heading-3 text-neutral-500">Dive In. Get Inspired</h1>
            </div>
            <div>
                <UniversalFileRenderer
                    category="art"
                    onFileClick={(file) => handleFileClick(file)}
                />
            </div>
        </div>
    )
}
