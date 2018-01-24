import React from 'react';
import ReactDOM from 'react-dom';
import PdfViewer from './pdfviewer';

const pdfViewer = new PdfViewer();

pdfViewer.setWorker(pdfViewer.getDefaultWorker());
pdfViewer.showPdf('http://localhost:4567/doc/Testing%20Presentation.pdf', window.document.getElementById('the-canvas'), 1);
// '../build/Testing Presentation.pdf'
