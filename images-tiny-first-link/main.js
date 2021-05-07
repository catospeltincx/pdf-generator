import "regenerator-runtime/runtime";
import PDFDocument, { addPage, image, listeners } from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../utils/image";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [419.53, 595.28],
  });

  const stream = doc.pipe(blobStream());

  const res = await fetch("/data/images-caption.json");
  const captions = await res.json();

  const boxes = [
    { x: 0, y: 0 },
    { x: 0, y: 50 },
  ];

  let boxIndex = 0;

  for (const caption of captions) {
    const box = boxes[boxIndex];

    const wikiImage = await loadImage(
      "/images/images-first-link/" + caption.img
    );
    doc.image(wikiImage, box.x, box.y, { height: 50 });
    doc.image(wikiImage, box.x, box.y + 50, { height: 50 });
  }

  doc.addPage();

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
