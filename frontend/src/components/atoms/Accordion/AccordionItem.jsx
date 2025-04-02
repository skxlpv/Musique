import dropdown_vector from "../../../assets/dropdown-vector.svg"

export const AccordionItem = ({ title, content, isOpen, onClick, itemKey }) => {
    return (
        <div className="accordion-item rounded-md mb-4 p-4 overflow-hidden card-gradient">
            <button
                onClick={onClick} id={`accordion-header-${itemKey}`}
                className="flex justify-between cursor-pointer
                rounded-md items-center w-full p-4 text-left">
                <span className="font-semibold heading-5">
                    {title}
                </span>
                <span>
                    <img src={dropdown_vector} alt="dropdown-vector"
                         className={`w-7 transition-all duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    </img>
                </span>
            </button>

            <div
                id={`accordion-content-${itemKey}`}
                role="region"
                className={`transition-max-height duration-300
                ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="p-4">
                    {content}
                </div>
            </div>
        </div>
    );
};