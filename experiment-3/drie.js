// create a document and pipe to a blob
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
//const blobStream = require("blob-stream");

const iframe = document.querySelector("iframe");
const doc = new PDFDocument({
  size: [421, 595],
});
const stream = doc.pipe(blobStream());

//Header
doc
  .fontSize(10)
  .font("Times-Roman")
  .text("", 25, 25)
  .text("History of free and open-source software", {
    indent: 0,
  })

  .text("From Wikipedia, the free encyclopedia", {
    indent: 20,
  })
  .moveDown()
  .text(
    "In the 1950s and 1960s, computer operating software and compilers were delivered as a part of hardware purchases without separate fees. At the time, source code, the human-readable form of software, was generally distributed with the software providing the ability to fix bugs or add new functions.[1] Universities were early adopters of computing technology. Many of the modifications developed by universities were openly shared, in keeping with the academic principles of sharing knowledge, and organizations sprung up to facilitate sharing. As large-scale operating systems matured, fewer organizations allowed modifications to the operating software, and eventually such operating systems were closed to modification. However, utilities and other added-function applications are still shared and new organizations have been formed to promote the sharing of software.",
    {
      indent: 20,
      width: 360,
    }
  )
  .moveDown()
  .text("Contents", {
    indent: 0,
  })

  .text("1 Sharing techniques before software", {
    indent: 10,
  })
  .text("2 Free software before the 1980s", {
    indent: 10,
  })
  .text("2.1 Initial decline of free software", {
    indent: 20,
  })
  .moveDown()
  .text("Sharing techniques before software", {
    indent: 0,
  })
  .text(
    "The concept of free sharing of technological information existed long before computers. For example, in the early years of automobile development, one enterprise owned the rights to a 2-cycle gasoline engine patent originally filed by George B. Selden.[2] By controlling this patent, they were able to monopolize the industry and force car manufacturers to adhere to their demands, or risk a lawsuit. In 1911, independent automaker Henry Ford won a challenge to the Selden patent. The result was that the Selden patent became virtually worthless and a new association (which would eventually become the Motor Vehicle Manufacturers Association) was formed.[2] The new association instituted a cross-licensing agreement among all US auto manufacturers: although each company would develop technology and file patents, these patents were shared openly and without the exchange of money between all the manufacturers.[2] By the time the US entered World War 2, 92 Ford patents and 515 patents from other companies were being shared between these manufacturers, without any exchange of money (or lawsuits).[2][improper synthesis?]",
    {
      indent: 20,
      columns: 2,
      columnGap: 5,
      width: 300,
      height: 240,
    }
  )
  .moveDown(9)
  .text("Free software before the 1980s", {
    indent: 0,
  })

  .text(
    "In the 1950s and into the 1960s almost all software was produced by academics and corporate researchers working in collaboration, often shared as public-domain software. As such, it was generally distributed under the principles of openness and cooperation long established in the fields of academia, and was not seen as a commodity in itself. Such communal behavior later became a central element of the so-called hacking culture (a term with a positive connotation among open-source programmers). At this time, source code, the human-readable form of software, was generally distributed with the software machine code because users frequently modified the software themselves, because it would not run on different hardware or OS without modification, and also to fix bugs or add new functions.[3][4][failed verification] The first example of free and open-source software is believed to be the A-2 system, developed at the UNIVAC division of Remington Rand in 1953,[5] which was released to customers with its source code. They were invited to send their improvements back to UNIVAC.[6] Later, almost all IBM mainframe software was also distributed with source code included. User groups such as that of the IBM 701, called SHARE, and that of Digital Equipment Corporation (DEC), called DECUS, were formed to facilitate the exchange of software. The SHARE Operating System, originally developed by General Motors, was distributed by SHARE for the IBM 709 and 7090 computers. Some university computer labs even had a policy requiring that all programs installed on the computer had to come with published source-code files.[7] In 1969 the Advanced Research Projects Agency Network (ARPANET), a transcontinental, high-speed computer network was constructed. The network (later succeeded by the Internet) simplified the exchange of software code.[3] Some free software which was developed in the 1970s continues to be developed and used, such as TeX (developed by Donald Knuth)[8] and SPICE.[9]",
    {
      indent: 20,
      columns: 2,
      columnGap: 5,
      width: 300,
      height: 400,
    }
  )
  .moveDown(20)
  .text("Initial decline of free software", { indent: 0 })

  .text(
    "By the late 1960s change was coming: as operating systems and programming language compilers evolved, software production costs were dramatically increasing relative to hardware. A growing software industry was competing with the hardware manufacturers' bundled software products (the cost of bundled products was included in the hardware cost), leased machines required software support while providing no revenue for software, and some customers, able to better meet their own needs,[10] did not want the costs of manufacturer's software to be bundled with hardware product costs. In the United States vs. IBM antitrust suit, filed 17 January 1969, the U.S. government charged that bundled software was anticompetitive.[11] While some software continued to come at no cost, there was a growing amount of software that was for sale only under restrictive licenses. In the early 1970s AT&T distributed early versions of Unix at no cost to government and academic researchers, but these versions did not come with permission to redistribute or to distribute modified versions, and were thus not free software in the modern meaning of the phrase. After Unix became more widespread in the early 1980s, AT&T stopped the free distribution and charged for system patches. As it is quite difficult to switch to another architecture, most researchers paid for a commercial license. Software was not considered copyrightable before the 1974 US Commission on New Technological Uses of Copyrighted Works (CONTU) decided that computer programs, to the extent that they embody an authors original creation, are proper subject matter of copyright.[12][13] Therefore, software had no licenses attached and was shared as public-domain software, typically with source code. The CONTU decision plus later court decisions such as Apple v. Franklin in 1983 for object code, gave computer programs the copyright status of literary works and started the licensing of software and the shrink-wrap closed source software business model.[14] In the late 1970s and early 1980s, computer vendors and software-only companies began routinely charging for software licenses, marketing software as Program Products and imposing legal restrictions on new software developments, now seen as assets, through copyrights, trademarks, and leasing contracts. In 1976 Bill Gates wrote an essay entitled Open Letter to Hobbyists, in which he expressed dismay at the widespread sharing of Microsofts product Altair BASIC by hobbyists without paying its licensing fee. In 1979, AT&T began to enforce its licenses when the company decided it might profit by selling the Unix system.[15] In an announcement letter dated 8 February 1983 IBM inaugurated a policy of no longer distributing sources with purchased software.[16][17] To increase revenues, a general trend began to no longer distribute source code (easily readable by programmers), and only distribute the executable machine code that was compiled from the source code. One person especially distressed by this new practice was Richard Stallman. He was concerned that he could no longer study or further modify programs initially written by others. Stallman viewed this practice as ethically wrong. In response, he founded the GNU Project in 1983 so that people could use computers using only free software.[1] He established a non-profit organization, the Free Software Foundation, in 1985, to more formally organize the project. He invented copyleft, a legal mechanism to preserve the free status of a work subject to copyright, and implemented this in the GNU General Public License. Copyleft licenses allow authors to grant a number of rights to users (including rights to use a work without further charges, and rights to obtain, study and modify the programs complete corresponding source code) but requires derivatives to remain under the same license or one without any additional restrictions. Since derivatives include combinations with other original programs, downstream authors are prevented from turning the initial work into proprietary software, and invited to contribute to the copyleft commons.[3] Later, variations of such licenses were developed by others.",

    { indent: 20, columns: 2, columnGap: 5, width: 300 }
  );

// end and display the document in the iframe to the right
doc.end();
stream.on("finish", function () {
  iframe.src = stream.toBlobURL("application/pdf");
});
