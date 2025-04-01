import dropdown_vector from "../../../assets/dropdown-vector.svg"

export const AccordionItem = ({ title, content, isOpen, onClick, itemKey }) => {
    return (
        <div className="border border-border rounded-md mb-2 overflow-hidden">
            <button
                onClick={onClick}
                className="flex border border-border justify-between
                rounded-md items-center w-full p-4 text-left focus:outline-none"
                id={`accordion-header-${itemKey}`}
            >
                <span className="font-semibold text-small">{title}</span>
                <span>
                    {isOpen ? (
                        <img className="w-7 rotate-180 transition-all duration-200" src={dropdown_vector} alt="Meow"></img>
                    ) : (
                        <img className="w-7 transition-all duration-200" src={dropdown_vector} alt="Meow"></img>
                    )}
                </span>
            </button>

            <div
                id={`accordion-content-${itemKey}`}
                role="region"
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-screen' : 'max-h-0'
                }`}
            >
                <div className="p-4">
                    {content}
                </div>
            </div>
        </div>
    );
};