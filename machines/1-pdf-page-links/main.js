import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
//import { loadImage } from "../../utils/image";

async function makePdf(pageLinks) {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [842, 595],
    //margins: { top: 50, bottom: 50, left: 72, right: 72 },
  });

  const stream = doc.pipe(blobStream());

  let x = 25;
  let y = 25;

  //.slice om niet alles te weergeven
  for (const pageLink of pageLinks) {
    //de page-link
    doc.font("Times-Roman").fontSize(80).text(pageLink, x, y, { width: 1191 });

    //elke kolom is 50px breed
    x += 1191;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 20;
    if (x >= 750) {
      x = 25;
      y += 842;
      //deze moet korter zijn dan de lengte van de pagina
      //lengte van pagina
      if (y >= 400) {
        y = 25;
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

// const jsonUrl = "/data/page-links-to-test.json";
// fetch(jsonUrl)
//   .then((res) => res.json())
//   .then((json) => makePdf(json));
