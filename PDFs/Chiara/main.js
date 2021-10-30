import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "/utils/image";

console.log(PDFDocument);

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [595.28, 841.89],
    margins: { top: 0, left: 0, bottom: 0, right: 0 },
  });
  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  const res = await fetch("/data/chiara.json");
  const images = await res.json();
  //console.log(bikes);
  for (const image of images.slice(0, 155)) {
    const Img = await loadImage("/images/Chiara/" + image.img);
    doc.image(Img, x, y, { width: 297.64 });

    //breedte kolom
    x += 297.64;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 7;
    if (x >= 450) {
      x = 0;
      //hoogte rij
      y += 420.945;
      //lengte van pagina
      if (y >= 835.89) {
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
