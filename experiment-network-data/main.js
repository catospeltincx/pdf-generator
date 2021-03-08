import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

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

  //Catch data WERKT NOT!!!!
  const res = await fetch("/public/data/network.json");
  const articles = await res.json();

  // Setup Layout
  const bookPages = 10;
  const boxCount = 10;
  const boxes1 = [];

  for (let i = 0; i < boxCount; i++) {
    const box1 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: randInt(0, PAGE_WIDTH - 200),
      y: randInt(0, PAGE_HEIGHT - 200),
      width: randInt(155, 300),
      height: randInt(25, 500),
    };

    boxes1.push(box1);
  }

  console.log(boxes1);

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
      .text(`${page}`, 0, doc.page.maxY() - 10, { align: "center" });
  }

  // Draw all the boxes

  //BOXES EERSTE ARTIKEL
  for (const box1 of boxes1) {
    doc.switchToPage(box1.page - 1);

    //DOOR-VERWIJZING
    doc.rect(box1.x, box1.y, box1.width, box1.height).fillAndStroke("black");
    doc.fillColor("white").text(box1.index, box1.x + 10, box1.y + 10);

    const nextBox = boxes1.find((b) => box1.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `Ga naar pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(7).text(verwijzing, box1.x + 10, box1.y + 20);
    }
  }

  //add data WERKT NOT!!!!
  for (const article of articles) {
    doc.text(article.title);
    doc.text(article.text);
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
