var pdfjsLib = require('pdfjs-dist');

class PdfViewer{
  getDefaultWorker(){
      return 'pdf.worker.js';
  }

  setWorker(src) {
    pdfjsLib.PDFJS.workerSrc = src;
  }

  showPdf(url, canvas, page){
    var pdfDocument = pdfjsLib.getDocument(url);
    pdfDocument.then(function (pdf) {
        // Fetch the page.
        pdf.getPage(page).then(function (page) {
          var scale = 1;
          var viewport = page.getViewport(scale);

          // Prepare canvas using PDF page dimensions.
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context.
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext);
        });
      });
  }

  printTest(){
    console.log("test");
  }


}

export default PdfViewer;

// export default function printTest(){
//   console.log("test");
// }
