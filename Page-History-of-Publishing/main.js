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

  const res = await fetch("/data/pagehistory/history2.json");
  const historys = await res.json();

  doc.text("PUBLISHING:", 150, 30);
  doc.text("REVISION HISTORY", 150, 43);
  doc.text("cut to", 368, 10);
  doc.text("undo", 370, 20);

  for (const history of historys) {
    doc.font("Times-Roman").text("", 25, 25);
    doc.lineJoin("miter").rect(24, 325, 139, 244).lineWidth(0.7).stroke();
    doc.lineJoin("miter").rect(188, 325, 139, 244).stroke();
    doc.moveTo(350, 0).lineTo(350, 595).dash(2, { space: 0 }).stroke();
    doc.moveTo(0, 300).lineTo(421, 300).dash(2, { space: 0 }).stroke();

    //DATE
    doc.text("................................");
    doc.moveDown();
    doc.text(history.time);
    doc.text([history.day + "   " + history.month + "   " + history.year]);
    doc.text("................................");
    doc.moveDown();

    //
    doc.text(history.bytes + " bytes");
    doc.moveDown();
    doc.text(
      "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
    );
    doc.text("-");
    doc.text(
      "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
    );
    doc.text("+");
    doc.text(history.plus);
    doc.text(
      "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
    );
    doc.text(history.summary, {
      indent: 100,
      oblique: "yes",
    });
    doc.text(
      "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
    );
    doc.text("by " + history.contributor, {
      indent: 220,
    });
    doc.moveDown(2);
    doc.text("thank", 33, 333);
    doc.text("edit", 197, 333);

    doc.addPage();
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
