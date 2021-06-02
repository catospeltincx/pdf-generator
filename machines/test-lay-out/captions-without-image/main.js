import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

async function makePdf(captions) {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [510, 383],
    margins: { top: 164, left: 0, bottom: 0, right: 237 },
  });

  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  //
  //.slice om niet alles te weergeven
  for (const captionObject of captions.slice(0, 5000)) {
    //const image = await loadImage(imageObject.src);
    //de caption
    doc.fontSize(17).text(captionObject.caption, x, y);

    //elke kolom is 100px breed
    x += 300;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 5;
    if (x >= 625) {
      x = 0;
      y += 200;
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

const jsonUrl = "/data/all-images.json";
fetch(jsonUrl)
  .then((res) => res.json())
  .then((json) => makePdf(json));
