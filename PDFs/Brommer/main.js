import "regenerator-runtime/runtime";
import PDFDocument, { text } from "pdfkit";
import blobStream from "blob-stream";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  //link-loop

  const res = await fetch("/data/brommer.json");
  const chapters = await res.json();

  doc.text("", 50, 40);

  for (const chapter of chapters) {
    doc.fontSize(11.5).font("Times-Roman");
    doc.text(chapter.brood1, {
      width: 270,
    });
    doc.text(chapter.brood2, {
      width: 270,
    });
    doc.text(chapter.brood3, {
      width: 270,
    });
    doc.text(chapter.brood4, {
      width: 270,
    });
    doc.text(chapter.brood5, {
      width: 270,
    });
    doc.text(chapter.brood6, {
      width: 270,
    });
    doc.text(chapter.brood7, {
      width: 270,
    });
    doc.text(chapter.brood8, {
      width: 270,
    });
    doc.text(chapter.brood9, {
      width: 270,
    });
    doc.text(chapter.brood10, {
      width: 270,
    });
    doc.text(chapter.brood11, {
      width: 270,
    });
    doc.moveDown();
    doc.text(chapter.deeltje1, {
      indent: 70,
    });
    doc.text(chapter.deeltje2, {
      indent: 70,
    });
    doc.text(chapter.deeltje3, {
      indent: 70,
    });
    doc.text(chapter.deeltje4, {
      indent: 70,
    });
    doc.text(chapter.deeltje5, {
      indent: 70,
    });
    doc.text(chapter.deeltje6, {
      indent: 70,
    });
    doc.text(chapter.deeltje7, {
      indent: 70,
    });
    doc.text(chapter.deeltje8, {
      indent: 70,
    });

    doc.moveDown(3);
    doc.text("*", {
      align: "center",
    });
    doc.moveDown(3);
  }

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
