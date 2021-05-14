import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../utils/image";

//define min and max (handy for when using random())
function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

const PAGE_WIDTH = 420;
const PAGE_HEIGHT = 595;

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: "A5",
    //do not automatically make a first page
    autoFirstPage: false,
    bufferPages: true,
  });

  const stream = doc.pipe(blobStream());

  const res = await fetch("/data/test-api-images.json");
  const inputs = await res.json();

  //define amount of boxes
  //define amount of pages
  const bookPages = 100;
  const boxCount = 34;
  const boxes = [];

  // Make all pages
  for (let page = 1; page <= bookPages; page++) {
    doc.addPage({
      size: [PAGE_WIDTH, PAGE_HEIGHT],
      margins: { top: 0, left: 0, bottom: 25, right: 0 },
    });

    // Add pagenumbers in footer
    doc
      .fontSize(8)
      .font("Courier")
      .text(`${page}`, 0, doc.page.maxY() - 10, { align: "center" });
  }

  let imgIndex = 0;

  // define lay-out boxes
  for (let i = 0; i < boxCount; i++) {
    boxes.push({
      index: i,
      //put box on random page
      page: 1 + Math.floor(Math.random() * bookPages),
      x: randInt(10, 180),
      y: randInt(10, 450),
      image: inputs[imgIndex],
    });

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
      "/images/test-api-images/" + box.image.img
    );
    //geen witte eerste pagina
    doc.switchToPage(box.page - 1);

    doc.image(wikiImage, { width: 200 });

    //
    const nextBox = boxes.find((b) => box.index + 1 === b.index);
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
