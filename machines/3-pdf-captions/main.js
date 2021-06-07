import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../../utils/image";

async function makePdf(images) {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [1191, 842],
    margins: { top: 50, bottom: 50, left: 72, right: 72 },
  });

  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 465;

  //
  //.slice om niet alles te weergeven
  for (const imageObject of images.slice(0, 800)) {
    const image = await loadImage(imageObject.src);
    // console.log("image");
    //wanneer x en y meegegeven, blijven ze plakken
    doc.image(image, x, y, { width: 200 });
    //de caption
    //doc.fontSize(8).text(imageObject.caption, x, y - 10, { width: 50 });

    //elke kolom is 50px breed
    x += 50;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 5;
    if (x >= 510) {
      x = 0;
      y += 50;
      //lzngte van pagina
      if (y >= 842) {
        y = 465;
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
