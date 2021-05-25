import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../../utils/image";

async function makePdf(images) {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  //
  //.slice om niet alles te weergeven
  for (const imageObject of images.slice(0, 100)) {
    const image = await loadImage(imageObject.src);
    //wanneer x en y meegegeven, blijven ze plakken
    doc.image(image, 0, 15, { width: 300 });
    //de caption
    doc.text(imageObject.caption, { width: 100 });
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
