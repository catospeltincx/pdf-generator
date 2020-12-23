// create a document and pipe to a blob
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
//import { moveDown } from "pdfkit/js/mixins/text";
//const blobStream = require("blob-stream");

const iframe = document.querySelector("iframe");
const doc = new PDFDocument({
  size: [421, 595],
});
const stream = doc.pipe(blobStream());

function title1(text) {
  doc.fontSize(10).font("Helvetica").text(text);
}

function title2(text) {
  doc.fontSize(8).font("Courier").text(text);
}

function intro(text) {
  doc.fontSize(10).font("Times-Roman").text(text, {
    width: 300,
    oblique: 20,
  });
}

function brood1(text) {
  doc.fontSize(8).font("Helvetica").text(text, {
    indent: 10,
    columns: 2,
    width: 340,
    height: 150,
    columnGap: 5,
  });
}

function brood2(text) {
  doc.fontSize(8).font("Helvetica").text(text, {
    indent: 10,
    width: 340,
  });
}

function content(list) {
  doc.fontSize(8).font("Courier").list(list, {
    bulletRadius: 6,
    textIndent: 20,
    lineGap: 3,
  });
}

//Header
doc.text("", 45, 45);
title1("HISTORY OF FREE AND OPEN-SOURCE SOFTWARE");
title1("From Wikipedia, the free encyclopedia");
doc.moveDown();
intro(
  "In the 1950s and 1960s, computer operating software and compilers were delivered as a part of hardware purchases without separate fees. At the time, source code, the human-readable form of software, was generally distributed with the software providing the ability to fix bugs or add new functions.[1] Universities were early adopters of computing technology. Many of the modifications developed by universities were openly shared, in keeping with the academic principles of sharing knowledge, and organizations sprung up to facilitate sharing. As large-scale operating systems matured, fewer organizations allowed modifications to the operating software, and eventually such operating systems were closed to modification. However, utilities and other added-function applications are still shared and new organizations have been formed to promote the sharing of software."
);
doc.moveDown();

title1("CONTENTS");
doc.moveDown();
content([
  "Sharing techniques before software",
  "Free software before the 1980s",
  ["Initial decline of free software"],
]);
doc.moveDown();
title2("Sharing techniques before software");
brood1(
  "The concept of free sharing of technological information existed long before computers. For example, in the early years of automobile development, one enterprise owned the rights to a 2-cycle gasoline engine patent originally filed by George B. Selden.[2] By controlling this patent, they were able to monopolize the industry and force car manufacturers to adhere to their demands, or risk a lawsuit. In 1911, independent automaker Henry Ford won a challenge to the Selden patent. The result was that the Selden patent became virtually worthless and a new association (which would eventually become the Motor Vehicle Manufacturers Association) was formed.[2] The new association instituted a cross-licensing agreement among all US auto manufacturers: although each company would develop technology and file patents, these patents were shared openly and without the exchange of money between all the manufacturers.[2] By the time the US entered World War 2, 92 Ford patents and 515 patents from other companies were being shared between these manufacturers, without any exchange of money (or lawsuits).[2][improper synthesis?]"
);
doc.addPage();
doc.text("", 45, 45);
title2("Free software before the 1980s");

brood2(
  "In the 1950s and into the 1960s almost all software was produced by academics and corporate researchers working in collaboration, often shared as public-domain software. As such, it was generally distributed under the principles of openness and cooperation long established in the fields of academia, and was not seen as a commodity in itself. Such communal behavior later became a central element of the so-called hacking culture (a term with a positive connotation among open-source programmers). At this time, source code, the human-readable form of software, was generally distributed with the software machine code because users frequently modified the software themselves, because it would not run on different hardware or OS without modification, and also to fix bugs or add new functions.[3][4][failed verification] The first example of free and open-source software is believed to be the A-2 system, developed at the UNIVAC division of Remington Rand in 1953,[5] which was released to customers with its source code. They were invited to send their improvements back to UNIVAC.[6] Later, almost all IBM mainframe software was also distributed with source code included. User groups such as that of the IBM 701, called SHARE, and that of Digital Equipment Corporation (DEC), called DECUS, were formed to facilitate the exchange of software. The SHARE Operating System, originally developed by General Motors, was distributed by SHARE for the IBM 709 and 7090 computers. Some university computer labs even had a policy requiring that all programs installed on the computer had to come with published source-code files.[7]In 1969 the Advanced Research Projects Agency Network (ARPANET), a transcontinental, high-speed computer network was constructed. The network (later succeeded by the Internet) simplified the exchange of software code.[3]Some free software which was developed in the 1970s continues to be developed and used, such as TeX (developed by Donald Knuth)[8] and SPICE.[9]"
);

// end and display the document in the iframe to the right
doc.end();
stream.on("finish", function () {
  iframe.src = stream.toBlobURL("application/pdf");
});
