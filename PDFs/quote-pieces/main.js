import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

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

  const res = await fetch("/data/quote-pieces.json");
  const inputs = await res.json();

  //define amount of boxes
  //define amount of pages
  const bookPages = 10;
  const boxCount = 9;
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

  let articleIndex = 0;

  // define lay-out boxes
  for (let i = 0; i < boxCount; i++) {
    boxes.push({
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: randInt(10, 180),
      y: randInt(10, 450),
      article: inputs[articleIndex],
    });

    articleIndex += 1;
    if (articleIndex >= inputs.length) {
      articleIndex = 0;
    }
  }

  //console.log(boxes);

  // Draw all the boxes

  //Create, 'draw' the boxes
  for (const box of boxes) {
    //geen witte eerste pagina
    doc.switchToPage(box.page - 1);

    doc.font("Times-Roman").fontSize(10);

    //input json
    //quote
    doc.fillColor("black").text(box.article.quote, box.x, box.y + 20, {
      width: 250,
    });

    //src
    doc
      .font("Courier")
      .fontSize(8)
      .fillColor("black")
      .text(box.article.src, box.x, box.y);

    //box-index
    doc
      .font("Courier")

      .text(box.index, box.x, box.y - 10);

    const nextBox = boxes.find((b) => box.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `continue reading at page ${nextBox.page}, number ${nextBox.index}`;
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
