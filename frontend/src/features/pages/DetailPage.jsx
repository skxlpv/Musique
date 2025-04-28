import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { FILES_URL } from "../../services/api.js";
import {getPrimaryFields, getSecondaryFields} from "../../utils/generateDetailFields.js";
import DetailImage from "../../components/atoms/DetailComponents/DetailImage.jsx";
import DetailPrimaryFields from "../../components/atoms/DetailComponents/DetailPrimaryFields.jsx";
import DetailSecondaryFields from "../../components/atoms/DetailComponents/DetailSecondaryFields.jsx";
import DetailTitle from "../../components/atoms/DetailComponents/DetailTitle.jsx";
import {DetailCommentsSection} from "../../components/atoms/DetailComponents/DetailCommentsSection.jsx";

const DetailPage = () => {
    const { slug } = useParams();
    const location = useLocation();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showComments, setShowComments] = useState(false);

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const mainPath = pathSegments[0];
    const primaryFields = getPrimaryFields(data);
    const secondaryFields = getSecondaryFields(data);
    const getFieldLabel = (fieldName) => {
        return data.field_labels?.[fieldName] ||
            fieldName.replace(/_/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get(`${FILES_URL}${mainPath}/${slug}/`);
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    if (!data) return <div className="text-center py-8">No data found</div>

    return (
        <div className="card-gradient">
            {/* Header Panel */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    {data.file && <DetailImage data={data}/>}
                    <div className="lg:w-3/5 flex flex-row space-y-6 ">
                        <div className="w-1/2 relative">
                            <DetailTitle
                                data={data}
                                title={data.title}
                                getFieldLabel={getFieldLabel}
                                showCategory={true}
                            />
                            {/* Primary Fields */}
                            <DetailPrimaryFields
                                primaryFields={primaryFields}
                                getFieldLabel={getFieldLabel}
                                data={data}
                            />
                        </div>
                        <div className="h-full w-px bg-gray-300 mx-20"></div>
                        <div className="w-1/2">
                            <DetailTitle
                                data={data}
                                title={"Details"}
                                getFieldLabel={getFieldLabel}
                            />
                            {/* Secondary Fields */}
                            <DetailSecondaryFields
                                secondaryFields={secondaryFields}
                                getFieldLabel={getFieldLabel}
                                data={data}
                            />
                        </div>
                    </div>
                </div>

                {/* Comments Section Toggle */}
                <div className="mt-0 mb-4 mx-6">
                    <button
                        onClick={toggleComments}
                        className="flex items-center gap-2 hover:text-violet-400 font-medium transition-colors"
                    >
                        <span>{showComments ? 'Collapse Comments Section' : 'Show Comments'}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform ${showComments ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Comments Section */}
                <div id="comments"
                     className={`transition-all duration-300 overflow-hidden  mx-6 
                     ${showComments ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <DetailCommentsSection />
                </div>
            </div>
        </div>
    );
};

export default DetailPage;