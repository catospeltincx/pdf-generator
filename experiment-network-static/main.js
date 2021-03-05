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

  // Setup Layout

  const bookPages = 25;
  const boxCount = 15;
  const boxes1 = [];
  const boxes2 = [];
  const boxes3 = [];
  const boxes4 = [];

  for (let i = 0; i < boxCount; i++) {
    const artikel1 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 10,
      y: 10,
      width: 92,
      height: randInt(25, 555),
    };

    const artikel2 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 112,
      y: 10,
      width: 92,
      height: randInt(25, 555),
    };

    const artikel3 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 215,
      y: 10,
      width: 92,
      height: randInt(25, 555),
    };

    const artikel4 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 318,
      y: 10,
      width: 92,
      height: randInt(25, 555),
    };

    boxes1.push(artikel1);
    boxes2.push(artikel2);
    boxes3.push(artikel3);
    boxes4.push(artikel4);
  }

  //console.log(boxes2);

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
  for (const artikel1 of boxes1) {
    doc.switchToPage(artikel1.page - 1);

    //DOOR-VERWIJZING
    doc
      .rect(artikel1.x, artikel1.y, artikel1.width, artikel1.height)
      .fillAndStroke("black");
    doc.fillColor("white").text(artikel1.index, artikel1.x + 5, artikel1.y + 5);

    const nextBox = boxes1.find((b) => artikel1.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel1.x + 5, artikel1.y + 15);
    }
  }

  //BOXES TWEEDE ARTIKEL
  for (const artikel2 of boxes2) {
    doc.switchToPage(artikel2.page - 1);

    //DOOR-VERWIJZING

    doc
      .rect(artikel2.x, artikel2.y, artikel2.width, artikel2.height)
      .fillAndStroke("#0f9641");
    doc.fillColor("black").text(artikel2.index, artikel2.x + 5, artikel2.y + 5);

    const nextBox = boxes2.find((b) => artikel2.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel2.x + 5, artikel2.y + 15);
    }
  }

  //BOXES DERDE ARTIKEL
  for (const artikel3 of boxes3) {
    doc.switchToPage(artikel3.page - 1);

    //DOOR-VERWIJZING

    doc
      .rect(artikel3.x, artikel3.y, artikel3.width, artikel3.height)
      .fillAndStroke("#6b7be7");
    doc.fillColor("black").text(artikel3.index, artikel3.x + 5, artikel3.y + 5);

    const nextBox = boxes3.find((b) => artikel3.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel3.x + 5, artikel3.y + 15);
    }
  }

  //BOXES VIERDE ARTIKEL
  for (const artikel4 of boxes4) {
    doc.switchToPage(artikel4.page - 1);

    //DOOR-VERWIJZING

    doc
      .rect(artikel4.x, artikel4.y, artikel4.width, artikel4.height)
      .fillAndStroke("red");
    doc
      .fillColor("black")
      .text(artikel4.index, artikel4.x + 10, artikel4.y + 10);

    const nextBox = boxes4.find((b) => artikel4.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel4.x + 10, artikel4.y + 20);
    }
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
