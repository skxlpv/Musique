import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { getFileUrl } from './FileTypes.jsx';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export const PDFViewer = ({ file, width = 280 }) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const fileUrl = getFileUrl(file);

    const handleDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="h-full flex flex-col items-center justify-start">
            <Document
                file={fileUrl}
                onLoadSuccess={handleDocumentLoadSuccess}
            >
                <Page
                    pageNumber={pageNumber}
                    width={width}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
            </Document>
        </div>
    );
};
