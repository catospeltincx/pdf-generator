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
    { x: 74, y: 66, width: 149, height: 33 },
    { x: 372, y: 132, width: 149, height: 50 },
    { x: 74, y: 198, width: 149, height: 66 },
    { x: 372, y: 264, width: 149, height: 80 },
    { x: 74, y: 331, width: 149, height: 50 },
    { x: 372, y: 463, width: 149, height: 160 },
    { x: 74, y: 529, width: 149, height: 65 },
  ];

  let boxIndex = 0;

  //cover
  // doc.fontSize(17).font("Times-Roman").text("Revisions of", 330, 35);
  // doc.text("        Internet Archive");
  // doc.moveTo(297, 0).lineTo(297, 842).dash(5, { space: 10 }).stroke();
  // doc.addPage();

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
        .fontSize(10)
        .font("Helvetica")
        .text(text, box.x + 100, box.y + 7 + box.height, { oblique: "yes" });
    }

    function description(text) {
      doc
        .fontSize(14)
        .font("Times-Roman")
        .text(text, box.x + 20, box.y + 10, { width: 110 });
    }

    //tekst ballon
    doc.polygon(
      [box.x, box.y],
      [box.x + 149, box.y],
      [box.x + 149, box.y + box.height],
      [box.x + 15, box.y + box.height],
      [box.x + 0, box.y + box.height + 30],
      [box.x + 0, box.y + box.height + 30]
    );
    doc.stroke();

    //vouwlijn
    doc.moveTo(298, 0).lineTo(298, 842).stroke();

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
