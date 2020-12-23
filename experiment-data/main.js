import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../utils/image";

console.log(PDFDocument)

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

  const res = await fetch("/data/bikes.json");
  const bikes = await res.json();
  console.log(bikes)
  for (const bike of bikes) {
    const bikeImage = await loadImage('/images/bikes/' + bike.image);
    doc.image(bikeImage, { width: 100 });
    doc.fontSize(24).text(bike.type);
    doc.fontSize(10).text(bike.brand);
    doc.text('€ ' + bike.price);
  }


  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
