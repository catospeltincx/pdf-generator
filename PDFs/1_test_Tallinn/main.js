import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "/utils/image";

console.log(PDFDocument);

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [227, 312],
    margins: { top: 0, left: 0, bottom: 0, right: 0 },
  });
  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  const res = await fetch("/data/cuts_snow.json");
  const snows = await res.json();

  for (const snow of snows) {
    const Snow = await loadImage("/images/cuts_snow/" + snow.img);
    doc.image(Snow, x, y, { width: 200 });
    //breedte kolom
    x += 70;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 7;
    if (x >= 150) {
      x = 0;
      //hoogte rij
      y += 50;
      //lengte van pagina
      if (y >= 312) {
        y = 0;
        doc.addPage();
      }
    }
  }

  const pes = await fetch("/data/cuts_all.json");
  const cuts = await pes.json();
  for (const cut of cuts) {
    const Cut = await loadImage("/images/cuts_all/" + cut.img);

    doc.image(Cut, x, y, { width: 200 });

    //breedte kolom
    x += 70;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 7;
    if (x >= 150) {
      x = 0;
      //hoogte rij
      y += 50;
      //lengte van pagina
      if (y >= 312) {
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
