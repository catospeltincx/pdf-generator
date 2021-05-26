import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../../../utils/image";

async function makePdf(captions) {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [400, 640],
  });

  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  //
  //.slice om niet alles te weergeven
  for (const imageObject of captions.slice(0, 5000)) {
    const image = await loadImage(imageObject.src);
    //de caption
    //doc.fontSize(8).text(imageObject.caption, x, y - 10, { width: 50 });

    //elke kolom is 100px breed
    x += 25;
    //de afbeeldingen schuin naar beneden laten gaan
    y += 5;
    if (x >= 625) {
      x = 0;
      y += 25;
      if (y >= 375) {
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

// const jsonUrl = "/data/all-images.json";
// fetch(jsonUrl)
//   .then((res) => res.json())
//   .then((json) => makePdf(json));