import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "/utils/image";

console.log(PDFDocument);

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  // const res = await fetch("/data/cupcake-ipsum.txt");
  // const text = await res.text();

  // const lines = text.split("\n");
  // console.log(lines);

  // for (const line of lines) {
  //   if (line.trim().length === 0) continue;
  //   doc.text(line);
  //   doc.moveDown();
  // }

  // const image = await loadImage("/images/road.jpg");
  // doc.image(image, 0, 15, { width: 300 });
  // doc.image(image, 0, 100, { width: 512 });

  const res = await fetch("/data/zozmer.json");
  const images = await res.json();
  //console.log(bikes);
  for (const image of images.slice(0, 10)) {
    const Img = await loadImage("/images/zozmer/" + image.image);
    doc.image(Img, { width: 100 });
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
