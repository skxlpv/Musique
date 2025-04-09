import { UniversalFileRenderer } from "../../components/BrowseDocuments/UniversalFileRenderer.jsx"

export const TheatrePage = () => {
    const handleFileClick = (file) => {
        window.location.href = `/art/view/${file.id}`;
    };

    return(
        <div className="w-full">
            <div className="ml-4 mb-4">
                <h1 className="heading-1">Theatre Page</h1>
                <h1 className="heading-3 text-neutral-500">Feel the role, play a life</h1>
            </div>
            <div>
                <UniversalFileRenderer
                    category="theatre"
                    onFileClick={(file) => handleFileClick(file)}
                />
            </div>
        </div>
    )
}
