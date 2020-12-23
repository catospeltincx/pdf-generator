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

  const image1 = await loadImage("/images/foss-history/1-selden.jpg");
  const image2 = await loadImage("/images/foss-history/2-GeorgeSelden.jpg");
  const image3 = await loadImage("/images/foss-history/3-selden.jpg");
  const image4 = await loadImage("/images/foss-history/4-Henry-Ford.jpg");
  const image5 = await loadImage("/images/foss-history/5-ford.jpg");
  const image6 = await loadImage("/images/foss-history/6-IBM_701console.jpg");
  const image7 = await loadImage("/images/foss-history/7-univac.jpg");
  const image8 = await loadImage("/images/foss-history/8-ibm.jpg");
  const image9 = await loadImage("/images/foss-history/9-Arpanet_map_1973.jpg");
  const image10 = await loadImage("/images/foss-history/10-TeX_logo.jpg");
  const image11 = await loadImage("/images/foss-history/11-Knuth.jpg");
  const image12 = await loadImage("/images/foss-history/12-spice.jpg");
  const image13 = await loadImage("/images/foss-history/13-unix.jpg");
  const image14 = await loadImage("/images/foss-history/14-unix.jpg");
  const image15 = await loadImage("/images/foss-history/15-CONTU-cover.jpg");
  const image16 = await loadImage(
    "/images/foss-history/16-Seal_of_the_United_States_Court_of_Appeals_for_the_Third_Circuit.jpg"
  );
  const image17 = await loadImage(
    "/images/foss-history/17-Bill_Gates_Letter_to_Hobbyists.jpg"
  );
  const image18 = await loadImage("/images/foss-history/18-Altair.jpg");
  const image19 = await loadImage(
    "/images/foss-history/19-Richard_Matthew_Stallman.jpg"
  );
  const image20 = await loadImage("/images/foss-history/20-FOSS-logo.jpg");
  const image21 = await loadImage("/images/foss-history/21-copyleft.jpg");
  const image22 = await loadImage("/images/foss-history/22-FOSS.jpg");
  const image23 = await loadImage("/images/foss-history/23-FOSS.jpg");
  const image24 = await loadImage(
    "/images/foss-history/24-quick-guide-gplv3-compatibility.jpg"
  );
  doc.text("", 0, 0);
  doc.image(image1, { width: 421 });
  doc.image(image2, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image3, { width: 421 });
  doc.image(image4, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image5, { width: 421 });
  doc.image(image6, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image7, { width: 421 });
  doc.image(image8, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image9, { width: 421 });
  doc.image(image10, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image11, { width: 421 });
  doc.image(image12, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image13, { width: 421 });
  doc.image(image14, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image15, { width: 421 });
  doc.image(image16, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image17, { width: 421 });
  doc.image(image18, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image19, { width: 421 });
  doc.image(image20, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image21, { width: 421 });
  doc.image(image22, { width: 421 });
  doc.addPage();
  doc.text("", 0, 0);
  doc.image(image23, { width: 421 });
  doc.image(image24, { width: 421 });

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
