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
  const beforehistorys = await res.json();

  const tes = await fetch("/data/pagehistory/history3after.json");
  const afterhistorys = await tes.json();

  //lay-out methode 2
  const boxesbefore = [
    { x: 25, y: 25, width: 250 },
    { x: 25, y: 400, width: 250 },
  ];

  const boxesafter = [{ x: 320, y: 60, width: 240 }];

  let boxIndex = 0;

  for (const befhis of beforehistorys) {
    const box = boxesbefore[boxIndex];
    doc.rect(25, 60, 272, 43);
    doc.moveTo(297, 0).lineTo(297, 842).dash(5, { space: 10 }).stroke();
    doc.fontSize(31).font("Times-Roman").text(befhis.tit1, box.x, box.y);
    doc
      .fontSize(14)
      .text("by " + befhis.editor, box.x, box.y + 43, { indent: 50 });
    doc.text(befhis.date, box.x, box.y + 60, { oblique: "yes", indent: 180 });
    doc.text(befhis.time, box.x, box.y + 43, { oblique: "yes", indent: 180 });
    doc.text(befhis.brood, box.x, box.y + 90, { width: 250 });

    // boxIndex += 1;
    // if (boxIndex >= boxesbefore.length) {
    //   doc.addPage();
    //   boxIndex = 0;
    // }
  }

  for (const afthis of afterhistorys) {
    const box = boxesafter[boxIndex];
    doc.moveTo(297, 0).lineTo(297, 842).dash(5, { space: 10 }).stroke();
    doc.fontSize(28).font("Helvetica").text(afthis.tit1, box.x, box.y);
    doc.rect(297, 95, 240, 60).stroke();
    doc
      .fontSize(13)
      .text("by " + afthis.editor, box.x, box.y + 43, { align: "right" });
    doc.text(afthis.date, box.x, box.y + 60, { oblique: "yes", indent: 180 });
    doc.text(afthis.time, box.x, box.y + 43, { oblique: "yes", indent: 180 });
    doc.text(afthis.brood, box.x, box.y + 90);
    //   // boxIndex += 1;
    //   // if (boxIndex >= boxesbefore.length) {
    //   //   doc.addPage();
    //   //   boxIndex = 0;
    //   // }
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
