import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "/utils/image";

//console.log(PDFDocument);

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [841.89, 595.28],
    margins: { top: 0, left: 0, bottom: 0, right: 0 },
  });
  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  const res = await fetch("/data/girls.json");
  const objects = await res.json();

  for (const object of objects.slice(0, 16)) {
    const Layer0 = await loadImage("/images/batch-1_snow/" + object.img);

    //input json
    doc.image(Layer0, x, y, { height: 298 });
    x += 210;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 7;
    if (x >= 650) {
      x = 0;
      //hoogte rij
      y += 298;
      //lengte van pagina
      if (y >= 592) {
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
