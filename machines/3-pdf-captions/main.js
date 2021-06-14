import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../../utils/image";

async function makePdf(images) {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [1191, 842],
  });

  const stream = doc.pipe(blobStream());

  let x = 50;
  let y = 0;

  //
  //.slice om niet alles te weergeven
  for (const imageObject of images) {
    const image = await loadImage(imageObject.src);
    // console.log("image");
    //wanneer x en y meegegeven, blijven ze plakken
    //doc.image(image, x, y, { width: 200 });
    //de caption
    doc
      .font("Times-Roman")
      .fontSize(45)
      .text(imageObject.caption, x + 10, y + 10, { width: 470 });

    //elke kolom is 50px breed
    x += 595;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 5;
    if (x >= 1100) {
      x = 50;
      y += 842;
      //lzngte van pagina
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

// const jsonUrl = "/data/all-images.json";
// fetch(jsonUrl)
//   .then((res) => res.json())
//   .then((json) => makePdf(json));
