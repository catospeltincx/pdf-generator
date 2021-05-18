import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "/utils/image";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  //link-loop

  const res = await fetch("/data/winklink.json");
  const links = await res.json();

  // doc.text("READ UNTIL THE WINKING LINK");
  // doc.moveDown();
  doc.font("Times-Roman").fontSize(13);

  //lay-out methode 2
  const boxes = [
    { x: 10, y: 10, width: 150 },
    { x: 170, y: 250, width: 200 },
    { x: 10, y: 370, width: 300 },
  ];

  let boxIndex = 0;

  for (const link of links) {
    const box = boxes[boxIndex];
    doc.text(link.lnk, box.x, box.y);
    doc.text(link.txt1, box.x, box.y + 25, {
      oblique: "yes",
      width: box.width - 10,
    });

    //pijl
    doc
      .moveTo(box.x + 150, box.y + 5)
      .lineTo(box.x + 200, box.y + 5)
      .stroke();
    doc
      .moveTo(box.x + 200, box.y + 5)
      .lineTo(box.x + 200, box.y + 100)
      .stroke();
    doc
      .moveTo(box.x + 200, box.y + 100)
      .lineTo(box.x + 185, box.y + 35)
      .stroke();
    doc
      .moveTo(box.x + 200, box.y + 100)
      .lineTo(box.x + 215, box.y + 35)
      .stroke();
    boxIndex += 1;
    if (boxIndex >= boxes.length) {
      doc.addPage();
      boxIndex = 0;
    }
  }

  //lay-out methode 1
  // let x = 10;
  // let y = 10;

  // for (const link of links) {
  //   doc.text(link.lnk, x, y, { width: 100 });
  //   doc.text(link.txt1, x, y, {
  //     oblique: "yes",
  //     width: "200",
  //   });
  //   x += 220;
  //   if (x > 400) {
  //     x = 0;
  //     y += 200;
  //   }
  // }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
