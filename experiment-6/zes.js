// create a document and pipe to a blob
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
//const blobStream = require("blob-stream");

const iframe = document.querySelector("iframe");
const doc = new PDFDocument({
  size: [421, 595],
});

const stream = doc.pipe(blobStream());

// doc.image("misloper-01.png", 0, 15, { width: 300 });

// end and display the document in the iframe to the right
doc.end();
stream.on("finish", function () {
  iframe.src = stream.toBlobURL("application/pdf");
});
