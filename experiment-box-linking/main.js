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

  // Fetch article text
  const res = await fetch("/data/los-angeles.json");
  const article = await res.json();

  doc.addPage({
    size: [PAGE_WIDTH, PAGE_HEIGHT],
    margins: { top: 0, left: 0, bottom: 0, right: 0 },
  });

  const boxes = [
    { x: 20, y: 20, width: 380, height: 130 },
    { x: 20, y: 200, width: 380, height: 100 },
    { x: 20, y: 350, width: 380, height: 200 },
  ];

  const textWidth = doc.widthOfString(article.body, { width: 400 });
  const textHeight = doc.heightOfString(article.body, { width: 400 });
  console.log(textWidth, textHeight);

  const firstBox = boxes[0];
  for (const box of boxes) {
    doc.rect(box.x, box.y, box.width, box.height);
    doc.stroke();
  }

  let y = 0;
  let boxIndex = 0;

  doc._text(
    article.body,
    firstBox.x,
    firstBox.y,
    {
      width: firstBox.width,
      height: Infinity,
    },
    (lineText, opts) => {
      console.log(lineText, opts, boxIndex);
      const box = boxes[boxIndex];
      if (!box) return;
      doc.text(lineText, box.x, box.y + y, { width: box.width });

      y += doc.currentLineHeight(true) + doc._lineGap;
      if (y + doc.currentLineHeight(true) + doc._lineGap >= box.height) {
        boxIndex++;
        y = 0;
      }
    }
  );

  console.log("wrapper", doc._wrapper);

  // const secondBox = boxes[1];
  // doc.rect(secondBox.x, secondBox.y, secondBox.width, secondBox.height);
  // doc.stroke();

  // doc._text(null, secondBox.x, secondBox.y, {
  //   width: secondBox.width,
  //   height: secondBox.height,
  //   continued: true,
  // });

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
