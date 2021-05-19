import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [595, 842],
  });

  const stream = doc.pipe(blobStream());

  //haalt de data uit de juiste json-file
  const res = await fetch("/data/pagehistory/revision3.json");
  const histories = await res.json();

  //Ik begin bij de eerste versie van een Wikipedia pagina
  //de eerste versie wordt aangepast en wordt zo de tweede versie
  //de tweede versie wordt aan gepast en wordt zo de derde versie
  //deze code biedt een structuur om dit te visualiseren
  //ze herhaalt telkens de vorige versie
  //A --> B, B --> C, C --> D, D --> F, F --> .....
  const doubledHistories = [];
  for (let i = 0; i < histories.length; i++) {
    const history = histories[i];
    doubledHistories.push(history);
    if (i > 0 && i < histories.length - 1) {
      doubledHistories.push(history);
    }
  }

  //GRID methode 2
  //elke lijn = een box
  //elke loop dat de onderstaande forloop doet, komt op de plaats die deze lijnen omschrijft
  const boxes = [
    { x: 35, y: 35, width: 100, height: 73 },
    { x: 330, y: 130, width: 145, height: 73 },
    { x: 35, y: 360, width: 145, height: 73 },
    { x: 330, y: 590, width: 250, height: 73 },
  ];

  let boxIndex = 0;

  //cover
  doc.fontSize(17).font("Times-Roman").text("Revisions of", 330, 35);
  doc.text("        Internet Archive");
  doc.moveTo(297, 0).lineTo(297, 842).dash(5, { space: 10 }).stroke();
  doc.addPage();

  for (const revision of doubledHistories) {
    const box = boxes[boxIndex];

    //lay-out

    function editor(text) {
      doc
        .fontSize(14)
        .font("Times-Roman")
        .text(text, box.x + 10, box.y + 10);
    }

    function date(text) {
      doc
        .fontSize(14)
        .font("Times-Roman")
        .text(text, box.x + 10, box.y + 30);
    }

    function time(text) {
      doc
        .fontSize(14)
        .font("Times-Roman")
        .text(text, box.x + 10, box.y + 50);
    }

    function description(text) {
      doc
        .fontSize(14)
        .font("Times-Roman")
        .text(text, box.x, box.y + 90, { oblique: "yes" });
    }

    function brood(text) {
      doc
        .fontSize(12)
        .font("Helvetica")
        .text(text, box.x, box.y + 130, { width: 240 });
    }

    //kaders
    doc.rect(box.x, box.y, box.width, box.height).stroke();

    //vouwlijn
    doc.moveTo(297, 0).lineTo(297, 842).stroke();

    //inhoud kaders
    editor("by " + revision.editor);
    date(revision.date);
    time(revision.time);

    //onder kaders
    description(" '" + revision.description + "' ");

    brood(revision.added);

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
