import "regenerator-runtime/runtime";
import PDFDocument, { addPage } from "pdfkit";
import blobStream from "blob-stream";
import { loadImage } from "../utils/image";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [421, 595],
  });

  const stream = doc.pipe(blobStream());

  const img = await loadImage("/images/cv/CV.jpg");

  function titel(text) {
    doc.fontSize(12).font("Helvetica").text(text, 45);
  }

  function tussentitel(text) {
    doc.fontSize(10).font("Courier").text(text, 80);
  }

  function brood(text) {
    doc.fontSize(10).font("Courier").text(text, 80);
  }

  doc.text("", 45, 45);
  titel("CV CATO SPELTINCX");
  doc.moveDown(0.8);
  brood("Terlostraat 21");
  brood("2140 Borgerhout");
  doc.moveDown(0.8);
  brood("+32 497 86 83 70");
  brood("cato.speltincx@telenet.be");
  doc.moveDown(1.2);
  titel("EERDER WERKTE IK");
  doc.moveDown(0.8);
  tussentitel("in Bourla,");
  brood("als kelner tijdens brunchen en theater avonden.");
  doc.moveDown(0.8);
  tussentitel("in het Middelheim museum,");
  brood("als erfgoed bewaker.");
  doc.moveDown(0.8);
  tussentitel("in Bar Noord en Ga Nord,");
  brood(
    "als kelner in de zomerbar van Park Spoor Noord en het restaurant daarnaast."
  );
  doc.moveDown(0.8);
  tussentitel("bij Deliveroo,");
  brood("als fietskoerier.");
  doc.moveDown(0.5);
  titel("IK");
  doc.image(img, { width: 85 });
  doc.moveDown(1.3);
  brood(
    "werk dit jaar mijn studie Grafisch Ontwerp aan Sint Lucas Antwerpen af. Momenteel zijn mijn dagen gevuld met werken aan mijn masterproef. Door COVID-19 sloot mijn vorige werkplek de deuren en ik mis de fysieke taken die daarbij komen kijken. Ik zou erg graag mijn studie weer combineren met een studentenjob. Mijn lessenrooster is erg flexibel : - )"
  );

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
