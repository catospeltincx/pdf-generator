import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "/utils/image";

console.log(PDFDocument);

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [1683.78, 1190.551],
    margins: { top: 0, left: 0, bottom: 0, right: 0 },
  });

  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  const res = await fetch("/data/arne.json");
  const images = await res.json();
  //console.log(bikes);
  for (const image of images.slice(0, 19)) {
    const Img = await loadImage("/images/Arne/" + image.image);
    doc.image(Img, x, y, { width: 420.945 });

    //breedte kolom
    x += 420.945;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 7;
    if (x >= 1683.78) {
      x = 0;
      //hoogte rij
      y += 280.63;
      //lengte van pagina
      if (y >= 1122.173) {
        y = 0;
        doc.addPage();
      }
    }
  }

  doc.font("Times-Roman").fontSize(20).text("Klemskerke Frankrijk", 368, 440);

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
