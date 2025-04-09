import { UniversalFileRenderer } from "../../components/BrowseDocuments/UniversalFileRenderer.jsx"

export const MusicianPage = () => {
    const handleFileClick = (file) => {
        window.location.href = `/visual_art/${file.id}`;
    };

    return(
        <div className="w-full">
            <div className="ml-4 mb-4">
                <h1 className="heading-1">Musician Page</h1>
                <h1 className="heading-3 text-neutral-500">Tune in, stand out</h1>
            </div>
            <div>
                <UniversalFileRenderer
                    category="music"
                    onFileClick={(file) => handleFileClick(file)}
                />
            </div>
        </div>
    )
}
