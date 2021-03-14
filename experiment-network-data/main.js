import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
//import { loadImage } from "../utils/image";

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
  const boxCount = 100;
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

  //the grid
  const width = [78, 161, 244, 327, 410];
  const height = [113, 231, 349, 467, 585];
  const x = [5, 88, 171, 254, 337];
  const y = [5, 123, 241, 359, 477];

  function boxWidth() {
    let minmax = randInt(0, width.length - 1);
    return width[minmax];
  }

  function boxHeight() {
    let minmax = randInt(0, height.length - 1);
    return height[minmax];
  }

  function boxX() {
    let minmax = randInt(0, x.length - 1);
    return x[minmax];
  }

  function boxY() {
    let minmax = randInt(0, x.length - 1);
    return x[minmax];
  }

  // define lay-out boxes
  for (let i = 0; i < boxCount; i++) {
    boxes.push({
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x: boxX(),
      y: boxY(),
      width: boxWidth(),
      height: boxHeight(),
    });
  }
  //console.log(boxes);

  //fetch data
  const res = await fetch("/data/los-angeles.json");
  const inputs = await res.json();

  //console.log(inputs);

  //fetch article images -- NIET GELUKT
  // for (var input of inputs) {
  //   var inputImage = await loadImage(
  //     "/images/experiment-network-data/" + input.img
  //   );
  //   doc.image(inputImage);
  // }

  // Draw all the boxes
  for (const articles of boxes) {
    doc.switchToPage(articles.page - 1);

    //colored box
    doc
      .rect(articles.x, articles.y, articles.width, articles.height)
      .fillAndStroke(colorize());

    doc.text(inputs.title);
    console.log(inputs);

    //"continue reading..."
    doc
      .font("Courier")
      .fillColor("black")
      .fontSize(8)
      .text(articles.index, articles.x + 5, articles.y + 5);
    const nextBox = boxes.find((b) => articles.index + 1 === b.index);
    if (nextBox) {
      const verwijzing = `--> pagina ${nextBox.page}, kader ${nextBox.index}`;
      doc.fontSize(8).text(verwijzing, articles.x + 5, articles.y + 15);
    }
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
