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

  // const doubledHistories = [];
  // for (let i = 0; i < histories.length; i++) {
  //   const history = histories[i];
  //   doubledHistories.push(history);
  //   if (i > 0 && i < histories.length - 1) {
  //     doubledHistories.push(history);
  //   }
  // }

  //GRID methode 2
  //elke lijn = een box
  //elke loop dat de onderstaande forloop doet, komt op de plaats die deze lijnen omschrijft
  const boxes = [
    { x: 93, y: 79, width: 101, height: 58 },
    { x: 225, y: 45, width: 25, height: 52 },
    { x: 205, y: 0, width: 20, height: 82 },
    { x: 249, y: 96, width: 161, height: 62 },
    { x: 75, y: 226, width: 161, height: 56 },
    { x: 269, y: 258, width: 141, height: 44 },
    { x: 61, y: 302, width: 132, height: 87 },
    { x: 271, y: 260, width: 139, height: 83 },
    { x: 133, y: 389, width: 277, height: 40 },
    { x: 61, y: 440, width: 164, height: 43 },
    { x: 162, y: 530, width: 63, height: 43 },
  ];

  let boxIndex = 0;

  for (const revision of histories) {
    const box = boxes[boxIndex];

    //lay-out

    function editor(text) {
      doc
        .fontSize(10)
        .font("Helvetica")
        .text(text, box.x - 3, box.y + 45 + box.height, { oblique: "yes" });
    }

    function time(text) {
      doc
        .fontSize(10)
        .font("Helvetica")
        .text(text, box.x + 123, box.y + 18 + box.height, { oblique: "yes" });
    }

    function date(text) {
      doc
        .fontSize(5)
        .font("Helvetica")
        .text(text, box.x + 100, box.y + 7 + box.height, { oblique: "yes" });
    }

    function description(text) {
      doc
        .fontSize(14)
        .font("Times-Roman")
        .text(text, box.x + 3, box.y + 3, { width: box.width });
    }

    //tekst ballon
    doc.polygon(
      [box.x, box.y],
      [box.x + box.width, box.y],
      [box.x + box.width, box.y + box.height],
      [box.x + 15, box.y + box.height],
      [box.x + 0, box.y + box.height + 30],
      [box.x + 0, box.y + box.height + 30]
    );
    doc.stroke();

    //inhoud kaders
    editor(revision.editor);
    time(revision.time);
    date(revision.date);

    //onder kaders
    description(revision.description);

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
