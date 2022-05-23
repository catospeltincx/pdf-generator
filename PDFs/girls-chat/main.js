import "regenerator-runtime/runtime";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [841.89, 595.28],
  });

  const stream = doc.pipe(blobStream());

  let x = 0;
  let y = 0;

  //haalt de data uit de juiste json-file
  const res = await fetch("/data/girl-1-text.json");
  const chats = await res.json();

  for (const chat of chats) {
    function chat1(text) {
      doc
        .fillColor("black")
        .fontSize(13)
        .lineGap(2)
        .font("Times-Bold")
        .text(text, x + 20, y + 20, {
          width: 175,
          align: "left",
        });
    }

    //tekst ballon
    // doc.polygon(
    //   [x, y],
    //   [x + width, y],
    //   [x + width, y + height],
    //   [x + 15, y + height],
    //   [x + 0, y + height + 30],
    //   [x + 0, y + height + 30]
    // );
    // doc.stroke();

    //inhoud kaders
    chat1(chat.line);

    x += 210;
    //de afbeeldingen schuin naar beneden laten gaan
    //y += 7;
    if (x >= 650) {
      x = 0;
      //hoogte rij
      y += 298;
      //lengte van pagina
      if (y >= 592) {
        y = 0;
        doc.addPage();
      }
    }
  }

  //end and display the document in the iframe
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
