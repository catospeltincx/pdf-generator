import "regenerator-runtime/runtime";
import PDFDocument, { addPage, image, listeners } from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../utils/image";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  const res = await fetch("/data/images-caption.json");
  const captions = await res.json();

  for (const caption of captions) {
    const wikiImage = await loadImage(
      "/images/images-first-link/" + caption.img
    );
    doc.font("Times-Roman", 8).text("", 15, 15);
    doc.text(caption.cap, { width: 100 });
    doc.image(wikiImage, { height: 500 });
    doc.addPage();
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
