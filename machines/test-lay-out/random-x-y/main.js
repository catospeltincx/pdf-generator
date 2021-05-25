import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../../../utils/image";

async function makePdf(images) {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  let columnIndex = 0;

  let rowIndex = 0;

  let columns = [0, 50, 100];

  let rows = [0, 100, 150, 200];

  //.slice om niet alles te weergeven
  for (const imageObject of images.slice(0, 1000)) {
    const x = columns[columnIndex];
    const y = rows[rowIndex];
    const image = await loadImage(imageObject.src);
    doc.image(image, x, y, { width: 50 });
    doc.text(imageObject.caption);
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

document.getElementById("file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const jsonUrl = URL.createObjectURL(file);
  fetch(jsonUrl)
    .then((res) => res.json())
    .then((json) => makePdf(json));
});
