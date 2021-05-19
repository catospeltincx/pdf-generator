import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

const PAGE_WIDTH = 420;
const PAGE_HEIGHT = 595;

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: "A5",
  });

  const stream = doc.pipe(blobStream());

  const res = await fetch("/data/sears-grid.json");
  const articles = await res.json();

  //GRID methode 2
  //elke lijn = een box
  //elke loop dat de onderstaande forloop doet, komt op de plaats die deze lijnen omschrijft
  const boxes = [
    { x: 0, y: 0, width: 420, height: 20 },
    { x: 0, y: 20, width: 35, height: 35 },
    { x: 35, y: 20, width: 350, height: 35 },
    { x: 385, y: 20, width: 35, height: 35 },

    { x: 0, y: 60, width: 60, height: 80 },
    { x: 60, y: 60, width: 60, height: 80 },
    { x: 120, y: 60, width: 60, height: 80 },
    { x: 180, y: 60, width: 60, height: 80 },
    { x: 240, y: 60, width: 60, height: 80 },
    { x: 300, y: 60, width: 60, height: 80 },
    { x: 360, y: 60, width: 60, height: 80 },

    { x: 0, y: 140, width: 60, height: 80 },
    { x: 60, y: 140, width: 60, height: 80 },
    { x: 120, y: 140, width: 60, height: 80 },
    { x: 180, y: 140, width: 60, height: 80 },
    { x: 240, y: 140, width: 60, height: 80 },
    { x: 300, y: 140, width: 60, height: 80 },
    { x: 360, y: 140, width: 60, height: 80 },

    { x: 0, y: 220, width: 105, height: 80 },
    { x: 105, y: 220, width: 105, height: 80 },
    { x: 210, y: 220, width: 105, height: 80 },
    { x: 315, y: 220, width: 105, height: 80 },

    { x: 0, y: 300, width: 420, height: 25 },

    { x: 0, y: 325, width: 55, height: 50 },
    { x: 55, y: 325, width: 55, height: 50 },
    { x: 110, y: 325, width: 55, height: 50 },
    { x: 165, y: 325, width: 90, height: 130 },
    { x: 255, y: 325, width: 55, height: 50 },
    { x: 310, y: 325, width: 55, height: 50 },
    { x: 365, y: 325, width: 55, height: 50 },

    { x: 0, y: 375, width: 82, height: 80 },
    { x: 82, y: 375, width: 82, height: 80 },

    { x: 255, y: 375, width: 82, height: 80 },
    { x: 337, y: 375, width: 82, height: 80 },

    { x: 0, y: 455, width: 210, height: 25 },
    { x: 210, y: 455, width: 210, height: 25 },

    { x: 0, y: 480, width: 41, height: 47 },
    { x: 41, y: 480, width: 42, height: 79 },
    { x: 83, y: 480, width: 42, height: 105 },
    { x: 125, y: 480, width: 42, height: 105 },
    { x: 167, y: 480, width: 43, height: 105 },
    { x: 210, y: 480, width: 168, height: 55 },
    { x: 378, y: 480, width: 42, height: 115 },

    //{ x: 0, y: 527, width: 5, height: 5 },
    // { x: 41, y: 559, width: 42, height: 36 },
    // { x: 83, y: 584, width: 127, height: 11 },
    // { x: 210, y: 535, width: 168, height: 60 },
  ];

  let boxIndex = 0;

  for (const article of articles) {
    const box = boxes[boxIndex];

    //lay-out
    function body(text) {
      doc.fontSize(6).font("Helvetica").text(text, box.x, box.y, box.height);
    }

    //box-vorm
    doc.rect(box.x, box.y, box.width, box.height).stroke(3);

    //inhoud kaders
    body(article.body);

    boxIndex += 1;
    if (boxIndex >= boxes.length) {
      doc.addPage();
      boxIndex = 0;
    }
  }

  //end and display the document in the iframe
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
