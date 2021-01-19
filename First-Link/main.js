import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../utils/image";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  //img-loop
  const get = await fetch("/data/firstlink/image.json");
  const images = await get.json();

  for (const image of images) {
    const exactImage = await loadImage("/images/first-link/" + image.img);
    doc.image(exactImage);
  }

  //text-loop

  const res = await fetch("/data/firstlink/firstlink.json");
  const links = await res.json();

  doc.text("READ UNTIL THE FIRST LINK");
  doc.moveDown();
  doc.font("Times-Roman").fontSize(12);

  for (const link of links) {
    doc.text(link.link);
    doc.text(link.text, {
      oblique: "yes",
    });

    doc.moveDown();
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
