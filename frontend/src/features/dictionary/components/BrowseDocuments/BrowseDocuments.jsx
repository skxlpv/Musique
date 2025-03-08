import { useEffect, useState } from "react";
import axios from "axios";

export const BrowseDocuments = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                `http://127.0.0.1:8000/api/v1/artist_documents/`
                );
                setDocuments(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-full p-10 grid grid-flow-row grid-cols-3 gap-10">
            {documents.map((doc, index) => (
                <div key={index} className="outline-1 outline outline-neutral-500 rounded-sm h-56 w-full relative"
                    style={{
                        backgroundImage: `url(http://127.0.0.1:8000/${doc.file})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        overflow: 'hidden',
                    }}>
                    <div className="h-16 w-full absolute bottom-0 px-3 py-1 backdrop-blur-lg"
                        style={{
                            boxShadow: '0px -10px 30px 10px rgba(0, 0, 0, 0.5)'
                        }}>
                        <h3>Title: {doc.title}</h3>
                        <h3>{doc.description}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
