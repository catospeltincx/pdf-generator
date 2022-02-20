import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "/utils/image";

console.log(PDFDocument);

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [419.53, 595.28],
    margins: { top: 0, left: 0, bottom: 0, right: 0 },
  });
  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  const pes = await fetch("/data/cuts_var.json");
  const objects = await pes.json();

  const res = await fetch("/data/cuts_var.json");
  const cuts = await res.json();

  for (const cut of cuts.slice(0, 3)) {
    const Layer0 = await loadImage("/images/cuts_layer0/" + cut.img);
    doc.image(Layer0, x, y, { width: 419.53 });
    //breedte kolom
    x += 419.53;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 7;
    if (x >= 419.53) {
      x = 0;
      //hoogte rij
      y += 595.28;
      //lengte van pagina
      if (y >= 0) {
        y = 0;
        doc.addPage();
      }
    }
  }

  for (const object of objects.slice(0, 3)) {
    const Layer1 = await loadImage("/images/cuts_layer1/" + object.img);
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
