import "regenerator-runtime/runtime";
import PDFDocument, { addPage } from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../utils/image";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  const image1 = await loadImage("/images/grids/grid-01.jpg");
  const image2 = await loadImage("/images/grids/grid-02.jpg");
  const image3 = await loadImage("/images/grids/grid-03.jpg");
  const image4 = await loadImage("/images/grids/grid-04.jpg");
  doc.text("", 0, 0);
  doc.image(image1, { width: 400 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image2, { width: 400 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image3, { width: 400 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image4, { width: 400 });

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
