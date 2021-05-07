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
  const historys = await res.json();

  for (const history of historys) {
    const wikiImage = await loadImage(
      "/images/images-first-link/" + history.img
    );
    doc.font("Times-Roman").text("", 25, 25);
    doc.text(history.cap);
    doc.addPage();
    doc.image(wikiImage);
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();