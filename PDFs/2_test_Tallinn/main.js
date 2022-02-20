import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../../utils/image";

//define min and max (handy for when using random())
function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

const PAGE_WIDTH = 419.53;
const PAGE_HEIGHT = 595.28;

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
  const bookPages = 5;
  const boxCount = 20;
  const boxes = [];

  // Make all pages
  for (let page = 1; page <= bookPages; page++) {
    doc.addPage({
      size: [PAGE_WIDTH, PAGE_HEIGHT],
    });
  }

  //the grid
  const width = [
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
  ];
  const height = [
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
  ];
  const x0 = [
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
    randInt(0, 300),
  ];

  const y0 = [
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
    randInt(0, 400),
  ];

  function boxWidth() {
    let minmax = randInt(0, width.length - 1);
    return width[minmax];
  }

  function boxHeight() {
    let minmax = randInt(0, height.length - 1);
    return height[minmax];
  }

  function boxX() {
    let minmax = randInt(0, x0.length - 1);
    return x0[minmax];
  }

  function boxY() {
    let minmax = randInt(0, y0.length - 1);
    return y0[minmax];
  }

  let articleIndex = 0;

  const res = await fetch("/data/cuts_var.json");
  const layer0 = await res.json();

  // define lay-out boxes
  for (let i = 0; i < boxCount; i++) {
    boxes.push({
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x0: boxX(),
      y0: boxY(),
      width: boxWidth(),
      height: boxHeight(),
      article: layer0[articleIndex],
      image: layer0[articleIndex].img,
    });

    //er is minder tekst dan het aantal boxen
    //deze code is er om terug bij het eerste article te beginnen wanneer de articles 'op' zijn
    articleIndex += 1;
    if (articleIndex >= layer0.length) {
      articleIndex = 0;
    }
  }

  //console.log(boxWidth);

  // Draw all the boxes
  for (const box of boxes.slice(0, 20)) {
    const Layer0 = await loadImage("/images/cuts_layer0/" + box.article.img);
    const Layer1 = await loadImage("/images/cuts_layer1/" + box.article.img);
    doc.switchToPage(box.page - 1);

    //input json
    doc.image(Layer0, box.x0, box.y0, { width: box.width, height: box.height });
    doc.image(Layer1, box.x0, box.y0, { width: box.width, height: box.height });
  }

  console.log(boxes);

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
