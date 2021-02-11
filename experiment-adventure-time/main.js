import "regenerator-runtime/runtime";
import PDFDocument, { addPage } from "pdfkit";
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

  console.log(boxes);

  for (let page = 1; page <= bookPages; page++) {
    doc.fontSize(8).text(`Pagina ${page}`, 10, 10);
    const boxesForThisPage = boxes.filter((box) => box.page === page);

    for (const box of boxesForThisPage) {
      const nextBox = boxes.find((b) => box.index + 1 === b.index);
      doc.rect(box.x, box.y, box.width, box.height);
      doc.fontSize(12).text(box.index, box.x + 10, box.y + 10);
      if (nextBox) {
        const verwijzing = `Ga naar pagina ${nextBox.page}, kader ${nextBox.index}`;
        doc.fontSize(8).text(verwijzing, box.x + 10, box.y + 20);
      }
      doc.stroke();
    }

    // Go to the next page
    if (page < bookPages) {
      doc.addPage();
    }
  }

  // doc.polygon([100, 0], [50, 100], [150, 100]);
  // doc.stroke();

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
