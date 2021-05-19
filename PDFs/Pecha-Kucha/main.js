import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "/utils/image";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [1920, 1080],
  });

  const stream = doc.pipe(blobStream());

  //haalt de data uit de juiste json-file
  const res = await fetch("/data/pechakucha.json");
  const titles = await res.json();

  const boxes = [{ x: 0, y: 0 }];

  let boxIndex = 0;

  for (const title of titles) {
    const box = boxes[boxIndex];
    const image1 = await loadImage("/images/pecha-kucha/" + title.beeld1);
    const image2 = await loadImage("/images/pecha-kucha/" + title.beeld2);
    const image3 = await loadImage("/images/pecha-kucha/" + title.beeld3);
    const image4 = await loadImage("/images/pecha-kucha/" + title.beeld4);
    const image5 = await loadImage("/images/pecha-kucha/" + title.beeld5);
    const image6 = await loadImage("/images/pecha-kucha/" + title.beeld6);

    doc.image(image1, box.x + 414, box.y + 50);
    doc.image(image2, box.x + 915, box.y + 50);
    doc.image(image3, box.x + 1415, box.y + 50);
    doc.image(image4, box.x + 414, box.y + 442);
    doc.image(image5, box.x + 915, box.y + 442);
    doc.image(image6, box.x + 1415, box.y + 442);

    //lay-out

    function tit(text) {
      doc
        .fontSize(36)
        .font("Times-Roman")
        .text(text, box.x + 50, box.y + 95);
    }

    function slide(text) {
      doc
        .fontSize(35)
        .font("Courier")
        .text(text, box.x + 50, box.y + 50);
    }

    function inhoud(list) {
      doc.fontSize(36).font("Times-Roman").list(list, {
        bulletRadius: 5,
        textIndent: 35,
        lineGap: 3,
        width: 330,
      });
    }

    //lijn
    doc.moveTo(414, 0).lineTo(414, 1080).dash(20, { space: 10 }).stroke();

    //inhoud kader
    slide(title.slide);
    tit(title.tit);
    inhoud(title.inhoud);

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
