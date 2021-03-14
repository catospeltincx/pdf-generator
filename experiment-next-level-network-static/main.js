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

  //fetch data
  const res = await fetch("/data/network.json");
  const article = await res.json();

  // Setup Layout
  const bookPages = 25;
  const boxCount = 15;
  const boxes1 = [];
  const boxes2 = [];
  const boxes3 = [];
  const boxes4 = [];
  const boxes5 = [];
  const boxes6 = [];
  const boxes7 = [];
  const boxes8 = [];
  const boxes9 = [];
  const boxes10 = [];

  for (let i = 0; i < boxCount; i++) {
    const artikel1 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 5,
      y: 5,
      width: 410,
      height: randInt(25, 555),
    };

    const artikel2 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 5,
      y: 122,
      width: 161,
      height: randInt(25, 555),
    };

    const artikel3 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 254,
      y: 5,
      width: 78,
      height: randInt(25, 555),
    };

    const artikel4 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 171,
      y: 239,
      width: 161,
      height: randInt(25, 555),
    };

    const artikel5 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 38,
      y: 356,
      width: 332,
      height: randInt(25, 555),
    };

    const artikel6 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 254,
      y: 122,
      width: 161,
      height: randInt(25, 555),
    };

    const artikel7 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 239,
      y: 5,
      width: 78,
      height: randInt(25, 555),
    };

    const artikel8 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 318,
      y: 10,
      width: 92,
      height: randInt(25, 555),
    };

    const artikel9 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 88,
      y: 73,
      width: 78,
      height: randInt(25, 555),
    };

    const artikel10 = {
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: 171,
      y: 473,
      width: 78,
      height: randInt(25, 555),
    };

    boxes1.push(artikel1);
    boxes2.push(artikel2);
    boxes3.push(artikel3);
    boxes4.push(artikel4);
    boxes5.push(artikel5);
    boxes6.push(artikel6);
    boxes7.push(artikel7);
    boxes8.push(artikel8);
    boxes9.push(artikel9);
    boxes10.push(artikel10);
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

  //BOXES VIJFDE ARTIKEL
  for (const artikel5 of boxes5) {
    doc.switchToPage(artikel5.page - 1);

    //DOOR-VERWIJZING

    doc
      .rect(artikel5.x, artikel5.y, artikel5.width, artikel5.height)
      .fillAndStroke("#1f1fff");
    doc
      .fillColor("black")
      .text(artikel5.index, artikel5.x + 10, artikel5.y + 10);

    const nextBox = boxes5.find((b) => artikel5.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel5.x + 10, artikel5.y + 20);
    }
  }

  //BOXES ZESDE ARTIKEL
  for (const artikel6 of boxes6) {
    doc.switchToPage(artikel6.page - 1);

    //DOOR-VERWIJZING

    doc
      .rect(artikel6.x, artikel6.y, artikel6.width, artikel6.height)
      .fillAndStroke("#FF00FF");
    doc
      .fillColor("black")
      .text(artikel6.index, artikel6.x + 10, artikel6.y + 10);

    const nextBox = boxes6.find((b) => artikel6.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel6.x + 10, artikel6.y + 20);
    }
  }

  //BOXES ZEVENDE ARTIKEL
  for (const artikel7 of boxes7) {
    doc.switchToPage(artikel7.page - 1);

    //DOOR-VERWIJZING

    doc
      .rect(artikel7.x, artikel7.y, artikel7.width, artikel7.height)
      .fillAndStroke("#C0C0C0");
    doc
      .fillColor("black")
      .text(artikel7.index, artikel7.x + 10, artikel7.y + 10);

    const nextBox = boxes7.find((b) => artikel7.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel7.x + 10, artikel7.y + 20);
    }
  }

  //BOXES ACHTSTE ARTIKEL
  for (const artikel8 of boxes8) {
    doc.switchToPage(artikel8.page - 1);

    //DOOR-VERWIJZING

    doc
      .rect(artikel8.x, artikel8.y, artikel8.width, artikel8.height)
      .fillAndStroke("#5b9859");
    doc
      .fillColor("black")
      .text(artikel8.index, artikel8.x + 10, artikel8.y + 10);

    const nextBox = boxes8.find((b) => artikel8.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel8.x + 10, artikel8.y + 20);
    }
  }

  //BOXES NEGENDE ARTIKEL
  for (const artikel9 of boxes9) {
    doc.switchToPage(artikel9.page - 1);

    //DOOR-VERWIJZING

    doc
      .rect(artikel9.x, artikel9.y, artikel9.width, artikel9.height)
      .fillAndStroke("#d2d67a");
    doc
      .fillColor("black")
      .text(artikel9.index, artikel9.x + 10, artikel9.y + 10);

    const nextBox = boxes9.find((b) => artikel9.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel9.x + 10, artikel9.y + 20);
    }
  }

  //BOXES TIENDE ARTIKEL
  for (const artikel10 of boxes10) {
    doc.switchToPage(artikel10.page - 1);

    //DOOR-VERWIJZING

    doc
      .rect(artikel10.x, artikel10.y, artikel10.width, artikel10.height)
      .fillAndStroke("#48ff07");
    doc
      .fillColor("black")
      .text(artikel10.index, artikel10.x + 10, artikel10.y + 10);

    const nextBox = boxes10.find((b) => artikel10.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, artikel10.x + 10, artikel10.y + 20);
    }
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
