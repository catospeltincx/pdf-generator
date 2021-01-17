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
  const res = await fetch("/data/revision-chat.json");
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
    { x: 5, y: 5, width: 64, height: 17 },
    { x: 330, y: 130, width: 64, height: 73 },
    { x: 35, y: 360, width: 64, height: 73 },
    { x: 330, y: 590, width: 64, height: 73 },
  ];

  let boxIndex = 0;

  //cover
  // doc.fontSize(17).font("Times-Roman").text("Revisions of", 330, 35);
  // doc.text("        Internet Archive");
  // doc.moveTo(297, 0).lineTo(297, 842).dash(5, { space: 10 }).stroke();
  // doc.addPage();

  for (const revision of doubledHistories) {
    const box = boxes[boxIndex];

    //lay-out

    function editor(text) {
      doc.fontSize(7).font("Helvetica").text(text, box.x, box.y);
    }

    function date(text) {
      doc
        .fontSize(7)
        .font("Helvetica")
        .text(text, box.x, box.y + 10);
    }

    function time(text) {
      doc
        .fontSize(7)
        .font("Helvetica")
        .text(text, box.x, box.y + 20);
    }

    function description(text) {
      doc
        .fontSize(7)
        .font("Times-Roman")
        .text(text, box.x + 3, box.y + 50, { width: box.width });
    }

    //kaders
    doc
      .rect(box.x, box.y + 45, box.width, box.height)
      .lineWidth(0.5)
      .stroke();

    //vouwlijn

    //lijnen
    doc.moveTo(74, 0).lineTo(74, 842).stroke();
    doc.moveTo(149, 0).lineTo(149, 842).stroke();
    doc.moveTo(223, 0).lineTo(223, 842).stroke();
    doc.moveTo(298, 0).lineTo(298, 842).stroke();
    doc.moveTo(372, 0).lineTo(372, 842).stroke();
    doc.moveTo(446, 0).lineTo(446, 842).stroke();
    doc.moveTo(521, 0).lineTo(521, 842).stroke();

    //inhoud kaders
    editor("by " + revision.editor);
    date(revision.date);
    time(revision.time);

    //onder kaders
    description(" '" + revision.description + "' ");

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
