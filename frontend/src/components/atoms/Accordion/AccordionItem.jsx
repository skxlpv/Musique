export const AccordionItem = ({ title, content, isOpen, onClick, itemKey }) => {
    return (
        <div className="border border-neutral-600 rounded-md mb-2 overflow-hidden card-element">
            <button
                onClick={onClick}
                className="flex border border-neutral-400 justify-between rounded-md items-center w-full p-4 text-left focus:outline-none"
                id={`accordion-header-${itemKey}`}
            >
                <span className="font-semibold text-small">{title}</span>
                <span>
                    {isOpen ? (
                        "UP"
                    ) : (
                        "DOWN"
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