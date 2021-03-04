import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
// import { loadImage } from "../utils/image";

function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

const PAGE_WIDTH = 420;
const PAGE_HEIGHT = 595;
async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: "A5",
    //niet automatisch een eerste pagina maken
    autoFirstPage: false,
    bufferPages: true,
  });

  const stream = doc.pipe(blobStream());

  // data
  const res = await fetch("/data/network.json");
  const elements = await res.json();

  // Setup Layout

  const bookPages = 10;
  const boxCount = 20;
  const boxes1 = [];
  const boxes2 = [];

  for (let i = 0; i < boxCount; i++) {
    const box1 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: randInt(0, PAGE_WIDTH - 200),
      y: randInt(0, PAGE_HEIGHT - 200),
      width: randInt(50, 200),
      height: randInt(50, 200),
    };

    const box2 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: randInt(0, PAGE_WIDTH - 200),
      y: randInt(0, PAGE_HEIGHT - 200),
      width: randInt(50, 100),
      height: randInt(50, 100),
    };
    boxes1.push(box1);
    boxes2.push(box2);
  }

  //console.log(boxes);

  // Make all pages
  for (let page = 1; page <= bookPages; page++) {
    doc.addPage({
      size: [PAGE_WIDTH, PAGE_HEIGHT],
      margins: { top: 0, left: 0, bottom: 25, right: 0 },
    });

    // Add page footer
    doc
      .fontSize(8)
      .font("Courier")
      .text(` ${page}`, 0, doc.page.maxY() - 10, { align: "center" });
  }

  // Draw all the boxes
  for (const box1 of boxes1) {
    doc.switchToPage(box1.page - 1);

    //lees-verder-box
    doc.rect(box1.x, box1.y, box1.width, box1.height).fillAndStroke("red");
    doc

      .font("Helvetica")
      .fontSize(18)
      .text(box1.index, box1.x + 10, box1.y + 10)
      .fillColor("black");

    for (const revision of elements) {
      //data
      doc.text(revision.txt, box1.x + 10, box1.y + 50);
    }

    const nextBox = boxes1.find((b) => box1.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `Ga naar pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(18).text(verwijzing, box1.x + 10, box1.y + 20);
    }
  }

  for (const box2 of boxes2) {
    doc.switchToPage(box2.page - 1);
    //lees-verder-box
    doc.rect(box2.x, box2.y, box2.width, box2.height).fillAndStroke("yellow");
    doc
      .fontSize(12)
      .text(box2.index, box2.x + 10, box2.y + 10)
      .fillColor("black");

    const nextBox = boxes2.find((b) => box2.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `lees verder op pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(8).text(verwijzing, box2.x + 10, box2.y + 20);
      doc.fillColor("red");
    }
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
