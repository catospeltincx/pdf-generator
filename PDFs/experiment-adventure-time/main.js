import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
// import { loadImage } from "../utils/image";

function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

const PAGE_WIDTH = 421;
const PAGE_HEIGHT = 595;
async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [PAGE_WIDTH, PAGE_HEIGHT],
    autoFirstPage: false,
    bufferPages: true,
  });

  const stream = doc.pipe(blobStream());

  // Setup Layout

  const bookPages = 50;
  const boxCount = 30;
  const boxes = [];

  for (let i = 0; i < boxCount; i++) {
    const box = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: randInt(0, PAGE_WIDTH - 200),
      y: randInt(0, PAGE_HEIGHT - 200),
      width: randInt(50, 200),
      height: randInt(50, 200),
    };
    boxes.push(box);
  }

  // console.log(boxes);

  // Make all pages
  for (let page = 1; page <= bookPages; page++) {
    doc.addPage({
      size: [PAGE_WIDTH, PAGE_HEIGHT],
      margins: { top: 0, left: 0, bottom: 0, right: 0 },
    });

    // Add page footer
    doc.fontSize(8).text(`Pagina ${page}`, 10, doc.page.maxY() - 10);
  }

  // Draw all the boxes
  for (const box of boxes) {
    doc.switchToPage(box.page - 1);

    // Draw the box
    doc.rect(box.x, box.y, box.width, box.height);
    doc.stroke();
    doc.fontSize(12).text(box.index, box.x + 10, box.y + 10);

    const nextBox = boxes.find((b) => box.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `Ga naar pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(8).text(verwijzing, box.x + 10, box.y + 20);
    }
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
