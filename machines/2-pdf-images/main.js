import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../../utils/image";

async function makePdf(images) {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [595.28, 841.89],
    //margins: { top: 50, bottom: 50, left: 72, right: 72 },
  });

  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  //
  //.slice om niet alles te weergeven
  for (const imageObject of images.slice(0, 1000)) {
    const image = await loadImage(imageObject.src);
    // console.log("image");
    //wanneer x en y meegegeven, blijven ze plakken
    doc.image(image, x, y, { width: 297 });
    //de caption
    //doc.fontSize(8).text(imageObject.caption, x, y, { width: 100 });

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

//dealen met json lijst images
//
document.getElementById("file").addEventListener("change", (e) => {
  //we nemen de file
  const file = e.target.files[0];
  //de data van de json
  const jsonUrl = URL.createObjectURL(file);
  //als de json geladen is, is er een lijst van alle images
  fetch(jsonUrl)
    .then((res) => res.json())
    .then((json) => makePdf(json));
});

//om snel te testen
//met een json op in public map

// const jsonUrl = "/data/book-images.json";
// fetch(jsonUrl)
//   .then((res) => res.json())
//   .then((json) => makePdf(json));
