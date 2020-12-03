// create a document and pipe to a blob
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
//const blobStream = require("blob-stream");

const iframe = document.querySelector("iframe");
const doc = new PDFDocument({
  size: [561, 793],
});
const stream = doc.pipe(blobStream());

//probeer
const titel1 = doc.font("Times-Roman").fontSize(30);

const brood1 = doc.font("Courier").fontSize(12);

// // draw some text
doc.text("History of free and open-source software", {
  font: titel1,
});

doc.text("From Wikipedia, the free encyclopedia", {
  font: brood1,
});

// for (let i = 0; i < 100; i++) {
//   if (i > 0) {
//     doc.addPage();
//   }

//   doc.fontSize(25).text(`Page ${i + 1}...`, 100, 80);
// }

// // some vector graphics
// doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

// doc.circle(280, 200, 100).fill("#6600FF");

// // an SVG path
// doc
//   .scale(0.6)
//   .translate(470, 130)
//   .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
//   .fill("red", "even-odd")
//   .restore();

// // and some justified text wrapped into columns
// doc
//   .text("And here is some wrapped text...", 100, 300)
//   .font("Times-Roman", 13)
//   .moveDown()
//   .text("Hello there", {
//     width: 412,
//     align: "justify",
//     indent: 30,
//     columns: 2,
//     height: 300,
//     ellipsis: true,
//   });

// end and display the document in the iframe to the right
doc.end();
stream.on("finish", function () {
  iframe.src = stream.toBlobURL("application/pdf");
});
