import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
// import { loadImage } from "./utils/image";

console.log(PDFDocument);

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  const res = await fetch("/data/example-markdown.md");
  const text = await res.text();

  const lines = text.split("\n");
  console.log(lines);

  for (const line of lines) {
    if (line.trim().length === 0) continue;
    if (line.startsWith("# ")) {
      doc.fontSize(24).text(line.substring(2));
    } else if (line.startsWith("## ")) {
      doc.fontSize(18).text(line.substring(3));
    } else {
      doc.fontSize(12).text(line);
    }
    doc.moveDown();
  }
  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
