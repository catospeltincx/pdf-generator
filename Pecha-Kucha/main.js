import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [1920, 1080],
  });

  const stream = doc.pipe(blobStream());

  //haalt de data uit de juiste json-file
  const res = await fetch("/data/pechakucha.json");
  const slides = await res.json();

  //GRID methode 2
  //elke lijn = een box
  //elke loop dat de onderstaande forloop doet, komt op de plaats die deze lijnen omschrijft
  //const boxes = [{ x: 74, y: 66, width: 149, height: 33 }];
  const boxes = [{ x: 50, y: 50, width: 1820, height: 980 }];

  let boxIndex = 0;

  //img-loop

  for (const slide of slides) {
    const box = boxes[boxIndex];

    //lay-out

    function deel(text) {
      doc
        .fontSize(36)
        .font("Times-Roman")

        .text(text, box.x, box.y, { width: 200 });
    }

    //vouwlijn
    doc.moveTo(300, 0).lineTo(300, 1080).dash(20, { space: 10 }).stroke();

    //inhoud kaders
    deel(slide.deel);

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
