import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [595, 842],
  });

  const stream = doc.pipe(blobStream());

  const res = await fetch("/data/pagehistory/history3before.json");
  const histories = await res.json();

  const doubleHistories = [];
  for (let i = 0; i < histories.length; i++) {
    const history = histories[i];
    doubleHistories.push(history);
    if (i > 0 && i < histories.length - 1) {
      doubleHistories.push(history);
    }
  }

  //lay-out methode 2
  const boxes = [
    { x: 25, y: 25, width: 250 },
    { x: 320, y: 60, width: 250 },
    { x: 25, y: 400, width: 250 },
    { x: 320, y: 200, width: 250 },
  ];

  let boxIndex = 0;

  for (const history of doubleHistories) {
    const box = boxes[boxIndex];
    doc.rect(25, 60, 272, 43);
    doc.moveTo(297, 0).lineTo(297, 842).dash(5, { space: 10 }).stroke();
    doc.fontSize(31).font("Times-Roman").text(history.tit1, box.x, box.y);
    doc
      .fontSize(14)
      .text("by " + history.editor, box.x, box.y + 43, { indent: 50 });
    doc.text(history.date, box.x, box.y + 60, { oblique: "yes", indent: 180 });
    doc.text(history.time, box.x, box.y + 43, { oblique: "yes", indent: 180 });
    doc.text(history.brood, box.x, box.y + 90, { width: 250 });

    boxIndex += 1;
    if (boxIndex >= boxes.length) {
      doc.addPage();
      boxIndex = 0;
    }
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
