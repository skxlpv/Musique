import { useState } from "react";
import pencil_icon from "../../assets/pencil.png";
import save_icon from "../../assets/save.png";

export const BoxContainer = ({containerHeader, fragments, styles, onContentSave}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableContent, setEditableContent] = useState(null);
    
    function editContent() {
        if (!isEditing) {
            setIsEditing(true);
            
            if (fragments && fragments.props && fragments.props.children) {
                if (typeof fragments.props.children === 'string') {
                    setEditableContent(fragments.props.children);
                } else if (fragments.props.children.props && fragments.props.children.props.children) {
                    setEditableContent(fragments.props.children.props.children);
                }
            }
        } else {
            setIsEditing(false);
            
            if (onContentSave) {
                onContentSave(editableContent);
            }
        }
    }
    
    function handleContentChange(e) {
        setEditableContent(e.target.value);
    }
    
    return(
        <div className={`bg-gradient-to-b from-[#0D0D0D] from-50% to-[#000000] h-fit px-12 pt-6 pb-16 rounded-[10px] ${styles}`}>
            <div className="flex justify-between items-center">
                {containerHeader && <h1 className="text-4xl text-neutral-300 mb-2">{containerHeader}</h1>}
                <img 
                    className="small-icon text-white invert cursor-pointer hover:opacity-80" 
                    src={isEditing ? save_icon : pencil_icon} 
                    alt={isEditing ? "save_content_icon" : "edit_content_icon"}
                    onClick={editContent}
                />
            </div>
            
            <div className="mt-4">
                {isEditing ? (
                    <textarea 
                        className="w-full bg-[#1A1A1A] text-neutral-300 p-3 rounded-md min-h-24 focus:outline-none focus:ring-1 focus:ring-neutral-600"
                        value={editableContent}
                        onChange={handleContentChange}
                        autoFocus
                    />
                ) : (
                    fragments
                )}
            </div>
        </div>
    );
};