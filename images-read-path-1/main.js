import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../utils/image";

//define min and max (handy for when using random())
function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

const PAGE_WIDTH = 297.64;
const PAGE_HEIGHT = 419.53;

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: "A6",
    //do not automatically make a first page
    autoFirstPage: false,
    bufferPages: true,
  });

  const stream = doc.pipe(blobStream());

  const res = await fetch("/data/images-read-path.json");
  const inputs = await res.json();

  //define amount of boxes
  //define amount of pages
  const bookPages = 34;
  const boxCount = 34;
  const boxes = [];

  // Make all pages
  for (let page = 1; page <= bookPages; page++) {
    doc.addPage({
      size: [PAGE_WIDTH, PAGE_HEIGHT],
      margins: { top: 0, left: 0, bottom: 25, right: 0 },
    });
  }

  let imgIndex = 0;

  // define lay-out boxes
  for (let i = 0; i < boxCount; i++) {
    boxes.push({
      index: i,
      x: 0,
      y: 0,
      page: i + 1,
      image: inputs[imgIndex],
    });

    //voor wat is dit nu weer?
    imgIndex += 1;
    if (imgIndex >= inputs.length) {
      imgIndex = 0;
    }
  }

  //console.log(boxes);

  // Draw all the boxes

  //Create, 'draw' the boxes
  for (const box of boxes) {
    const wikiImage = await loadImage(
      "/images/images-read-path/" + box.image.img
    );
    //geen witte eerste pagina
    doc.switchToPage(box.page - 1);

    doc.image(wikiImage, box.x, box.y, { height: 419.53 });

    const nextBox = box.index + 1;
    if (nextBox) {
      const verwijzing = `pagina${nextBox.page} boxs${nextBox.index}`;
      doc.text(verwijzing, box.x + 25, box.y - 10);
    }
  }

  console.log(boxes);

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();