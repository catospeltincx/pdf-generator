import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

//define min and max (handy for when using random())
function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

//boxes color
function colorize() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return (randomColor = `#${randomColor}`);
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

  //define amount of boxes
  //define amount of pages
  const bookPages = 25;
  const boxCount = 15;
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

  // variable for width of the boxes
  const breedte = [123, 450, 372, 389];

  function randomwidth() {
    let minmax = randInt(0, breedte.length - 1);
    return breedte[minmax];
  }

  // define lay-out boxes
  for (let i = 0; i < boxCount; i++) {
    boxes.push({
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: randInt(10, 200),
      y: randInt(25, 200),
      width: randomwidth(),
      height: randInt(25, 555),
    });
  }

  console.log(boxes);

  // Draw all the boxes

  //Create, 'draw' the boxes
  for (const articles of boxes) {
    doc.switchToPage(articles.page - 1);

    //"continue reading..."
    doc
      .rect(articles.x, articles.y, articles.width, articles.height)
      .fillAndStroke(colorize());
    doc.fillColor("white").text(articles.index, articles.x + 5, articles.y + 5);

    const nextBox = boxes.find((b) => articles.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(5).text(verwijzing, articles.x + 5, articles.y + 15);
    }
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
