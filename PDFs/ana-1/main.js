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

  let x = 0;
  let y = 0;

  const res = await fetch("/data/zozmer.json");
  const images = await res.json();
  //console.log(bikes);
  for (const image of images.slice(0, 10)) {
    const Img = await loadImage("/images/zozmer/" + image.image);
    doc.image(Img, x, y, { width: 100 });

    //breedte kolom
    x += 297;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 7;
    if (x >= 450) {
      x = 0;
      //hoogte rij
      y += 250;
      //lengte van pagina
      if (y >= 800) {
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
