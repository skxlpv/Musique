import React from 'react';

const HtmlRender = ({content}) => {
    return (
        <div className="flex-grow overflow-clip p-4 bg-white text-black text-[10px] relative no-scrollbar content-fade-in">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .content-fade-in {
                    animation: fadeIn 0.7s ease-in;
                }

                .document-content {
                    max-width: 100%;
                    word-wrap: break-word;
                    overflow: clip;
                }
                .document-content * {
                    color: black !important;
                    font-family: inherit !important;
                    font-size: 12px !important;
                }
                .document-content h1, .document-content h2, .document-content h3, 
                .document-content h4, .document-content h5, .document-content h6 {
                    margin-top: 1em;
                    margin-bottom: 0.5em;
                    font-weight: bold;
                }
                .document-content h1 { font-size: 1.5em; }
                .document-content h2 { font-size: 1.3em; }
                .document-content h3 { font-size: 1.2em; }
                .document-content p { margin-bottom: 0.8em; }
                .document-content table {
                    border-collapse: collapse;
                    margin: 1em 0;
                    max-width: 100% !important;
                    overflow-x: auto;
                    display: block;
                    color: black;
                }
                .document-content td, .document-content th { 
                    border: 1px solid #ddd; 
                    padding: 4px 8px;
                    word-break: break-word;
                }
                .document-content ul, .document-content ol { 
                    margin-left: 2em; 
                    margin-bottom: 1em;
                    overflow-wrap: anywhere;
                }
                .document-content img {
                    max-width: 100%;
                    height: auto;
                }
                `
            }}/>

            <div
                className="document-content"
                dangerouslySetInnerHTML={{__html: content}}
            />
        </div>
    );
};

export default HtmlRender;