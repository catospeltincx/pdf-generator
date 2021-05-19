import "regenerator-runtime/runtime";
import PDFDocument, { addPage, listeners } from "pdfkit";
import blobStream from "blob-stream";
//import { moveDown } from "pdfkit/js/mixins/text";
//import { loadImage } from "../utils/image";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  const res = await fetch("/data/pagehistory/history1.json");
  const historys = await res.json();

  doc.text("", 25, 25);
  doc.fontSize(15).text("PAGE-HISTORY OF PAGE-HISTORY", {
    align: "center",
  });
  doc.moveDown();

  for (const history of historys) {
    doc.fontSize(10).font("Times-Roman");
    doc.text(
      "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
    );
    doc.text(
      "||||||||||||||||||||| " +
        [history.month + " " + history.year] +
        " |||||||||||||||||||||"
    );
    doc.text(
      "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
    );
    doc.moveDown();

    doc.text(history.warning, {
      oblique: "yes",
    });
    doc.moveDown();

    doc.text(history.sentence);
    doc.moveDown();
    doc.list([history.words + " words"], {
      bulletRadius: 5,
    });
    doc.list([history.bytes + " bytes"], {
      bulletRadius: 5,
    });
    doc.moveDown();
    doc.text("by " + history.contributor, {
      align: "right",
    });
    doc.moveDown();
    doc.text("thank/talk", {
      align: "center",
    });
    doc.text(".............................................", {
      align: "center",
    });
    doc.text(".............................................", {
      align: "center",
    });
    doc.text(".............................................", {
      align: "center",
    });

    doc.moveDown();
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
