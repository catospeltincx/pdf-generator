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

  //define amount of boxes0
  //define amount of pages
  const bookPages = 10;
  const boxCount = 20;
  const boxes0 = [];
  const boxes1 = [];

  // Make all pages
  for (let page = 1; page <= bookPages; page++) {
    doc.addPage({
      size: [PAGE_WIDTH, PAGE_HEIGHT],
    });
  }

  //the grid
  const width0 = PAGE_WIDTH;
  const height0 = PAGE_HEIGHT;

  const x0 = 0;
  const y0 = 0;

  const width1 = [100];
  const height1 = [0];

  const x1 = [20, 40, 60, 80, 100, 120];
  const y1 = [70, 140, 250, 300];

  //

  function boxWidth() {
    let minmax = randInt(0, width1.length - 1);
    return width1[minmax];
  }

  function boxHeight() {
    let minmax = randInt(0, height1.length - 1);
    return height1[minmax];
  }

  function boxX() {
    let minmax = randInt(0, x1.length - 1);
    return x1[minmax];
  }

  function boxY() {
    let minmax = randInt(0, y1.length - 1);
    return y1[minmax];
  }

  let articleIndex = 0;

  const res = await fetch("/data/cuts_var.json");
  const layer0 = await res.json();

  // define lay-out boxes0

  //Layer0
  for (let i = 0; i < boxCount; i++) {
    boxes0.push({
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x0: x0,
      y0: y0,
      width0: width0,
      height0: height0,
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

  //Layer1
  for (let i = 0; i < boxCount; i++) {
    boxes1.push({
      index: i,
      page: 1 + Math.floor(Math.random() * bookPages),
      x1: boxX(),
      y1: boxY(),
      width1: boxWidth(),
      height1: boxHeight(),
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

  // Draw all the boxes0
  for (const box of boxes0.slice(0, 20)) {
    const Layer0 = await loadImage("/images/cuts_layer0/" + box.article.img);
    doc.switchToPage(box.page - 1);

    //input json
    doc.image(Layer0, box.x0, box.y0, { width: box.width0 });
  }

  for (const box of boxes1.slice(0, 23)) {
    const Layer1 = await loadImage("/images/cuts_layer1/" + box.article.img);
    doc.switchToPage(box.page - 1);

    //input json
    doc.image(Layer1, box.x1, box.y1, { width: box.width1 });
  }

  console.log(boxes0);

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
