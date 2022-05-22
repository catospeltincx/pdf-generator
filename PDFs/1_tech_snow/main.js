import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "/utils/image";

console.log(PDFDocument);

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [210.4725, 297.64],
    margins: { top: 0, left: 0, bottom: 0, right: 0 },
  });
  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  const res = await fetch("/data/snow_images.json");
  const objects = await res.json();

  for (const object of objects.slice(0, 3)) {
    const Layer1 = await loadImage("/images/snow/" + object.img);
    doc.image(Layer1, x, y, { width: 419.53 });
    x += 419.53;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 7;
    if (x >= 419.53) {
      x = 0;
      //hoogte rij
      y += 1000;
      //lengte van pagina
      if (y >= 0) {
        y = 0;
        doc.addPage();
      }
    }
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
