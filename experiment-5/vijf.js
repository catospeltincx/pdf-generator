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

//TITLES
function title1(text) {
  doc.fontSize(14).font("Helvetica").text(text, {
    underline: 2,
    width: 170,
  });
}

function title2(text) {
  doc.fontSize(14).font("Helvetica").text(text, {
    width: 170,
  });
}

function title3(text) {
  doc.fontSize(10).font("Helvetica").text(text, {});
}

function title4(text) {
  doc.fontSize(9).font("Times-Roman").text(text, {
    underline: "true",
  });
}

//BROOD
function brood1(text) {
  doc.fontSize(9).font("Times-Roman").text(text, {
    indent: 10,
    columns: 2,
    width: 280,
    height: 200,
    columnGap: 10,
  });
}

function brood2(text) {
  doc.fontSize(9).font("Times-Roman").text(text, {
    indent: 10,
    columns: 2,
    width: 280,
    height: 270,
    columnGap: 10,
  });
}

function brood3(text) {
  doc.fontSize(9).font("Times-Roman").text(text, {
    indent: 10,
    width: 280,
  });
}

//REST
function caption(text) {
  doc.fontSize(10).font("Times-Roman").text(text, {
    indent: 100,
  });
}

function intro(text) {
  doc.fontSize(9.5).font("Courier").text(text, {
    width: 330,
    lineGap: 2,
  });
}

function content(list) {
  doc.fontSize(9.5).font("Courier").list(list, {
    bulletRadius: 6,
    textIndent: 20,
    lineGap: 2,
  });
}

//TITLE-INTRO
// pagina 1
doc.text("", 45, 45);
title1("HISTORY OF FREE AND OPEN-SOURCE SOFTWARE");

caption("From Wikipedia, the free encyclopedia");
doc.moveDown();
intro(
  "In the 1950s and 1960s, computer operating software and compilers were delivered as a part of hardware purchases without separate fees. At the time, source code, the human-readable form of software, was generally distributed with the software providing the ability to fix bugs or add new functions.[1] Universities were early adopters of computing technology. Many of the modifications developed by universities were openly shared, in keeping with the academic principles of sharing knowledge, and organizations sprung up to facilitate sharing. As large-scale operating systems matured, fewer organizations allowed modifications to the operating software, and eventually such operating systems were closed to modification. However, utilities and other added-function applications are still shared and new organizations have been formed to promote the sharing of software."
);

//CONTENT
//pagina 2
doc.addPage();
doc.text("", 45, 45);
caption("Contents");
content([
  // 1
  "Sharing techniques before software",
  // 2
  "Free software before the 1980s",
  // 2.1
  ["Initial decline of free software"],
  // 3
  "1980s and 1990s",
  [
    // 3.1
    "Informal software sharing continues",
    // 3.1.1
    [
      "SHARE program library",
      // 3.1.2
      "DECUS tapes",
      // 3.1.3
      "Online software",
    ],
    // 3.2
    "Launch of the free software movement",
    // 3.3
    "Linux (1991-present)",
    // 3.4
    "The free BSD's (1993-present)",
    // 3.5
    "The dot-com years (late 1990s)",
    // 3.6
    "The launch of Open Source",
  ],
  // 4
  "Desktop (1984-present)",
  //5
  "Microsoft, SCO and other attacks (1998-2014)",
  [
    // 5.1
    "SCO v. IBM and related bad publicity (2003-present)",
    //5.2
    "European commission v. Microsoft (2004-2007)",
    //5.3
    "ISO OOXML controversy (2008-present)",
    //5.4
    "Microsoft's contributions to open source and aquisition of related projects",
  ],
  // 6
  "Open source and programming languages",
  [
    // 6.1
    "Java",
  ],
  // 7
  "Distributed version control (2001-present)",
  [
    // 7.1
    "Git (2005-present)",
  ],
  // 8
  "Recent developments",
  [
    // 8.1
    "Android (2008-present)",
    [
      //8.1.1
      "Oracle v. Google",
    ],
    //8.2
    "Chromium OS (2009-present)",
  ],
  // 9
  "See also",
  // 10
  "References",
  // 11
  "External links",
]);

//BROOD
//pagina 3
doc.addPage();
doc.text("", 45, 45);
title2("SHARING TECHNIQUES BEFORE SOFTWARE");
brood1(
  "The concept of free sharing of technological information existed long before computers. For example, in the early years of automobile development, one enterprise owned the rights to a 2-cycle gasoline engine patent originally filed by George B. Selden.[2] By controlling this patent, they were able to monopolize the industry and force car manufacturers to adhere to their demands, or risk a lawsuit. In 1911, independent automaker Henry Ford won a challenge to the Selden patent. The result was that the Selden patent became virtually worthless and a new association (which would eventually become the Motor Vehicle Manufacturers Association) was formed.[2] The new association instituted a cross-licensing agreement among all US auto manufacturers: although each company would develop technology and file patents, these patents were shared openly and without the exchange of money between all the manufacturers.[2] By the time the US entered World War 2, 92 Ford patents and 515 patents from other companies were being shared between these manufacturers, without any exchange of money (or lawsuits).[2][improper synthesis?]"
);
doc.moveDown(6);
title2("FREE SOFTWARE BEFORE THE 1980s");
brood2(
  "In the 1950s and into the 1960s almost all software was produced by academics and corporate researchers working in collaboration, often shared as public-domain software. As such, it was generally distributed under the principles of openness and cooperation long established in the fields of academia, and was not seen as a commodity in itself. Such communal behavior later became a central element of the so-called hacking culture (a term with a positive connotation among open-source programmers). At this time, source code, the human-readable form of software, was generally distributed with the software machine code because users frequently modified the software themselves, because it would not run on different hardware or OS without modification, and also to fix bugs or add new functions.[3][4][failed verification] The first example of free and open-source software is believed to be the A-2 system, developed at the UNIVAC division of Remington Rand in 1953,[5] which was released to customers with its source code. They were invited to send their improvements back to UNIVAC.[6] Later, almost all IBM mainframe software was also distributed with source code included. User groups such as that of the IBM 701, called SHARE, and that of Digital Equipment Corporation (DEC), called DECUS, were formed to facilitate the exchange of software. The SHARE Operating System, originally developed by General Motors, was distributed by SHARE for the IBM 709 and 7090 computers. Some university computer labs even had a policy requiring that all programs installed on the computer had to come with published source-code files."
);
//pagina 4
doc.addPage();
doc.text("", 45, 45);
brood2(
  "[7]In 1969 the Advanced Research Projects Agency Network (ARPANET), a transcontinental, high-speed computer network was constructed. The network (later succeeded by the Internet) simplified the exchange of software code.[3]Some free software which was developed in the 1970s continues to be developed and used, such as TeX (developed by Donald Knuth)[8] and SPICE.[9]"
);
doc.moveDown();
title3("Initial decline of free software");
brood3(
  "By the late 1960s change was coming: as operating systems and programming language compilers evolved, software production costs were dramatically increasing relative to hardware. A growing software industry was competing with the hardware manufacturers' bundled software products (the cost of bundled products was included in the hardware cost), leased machines required software support while providing no revenue for software, and some customers, able to better meet their own needs,[10] did not want the costs of manufacturer's software to be bundled with hardware product costs. In the United States vs. IBM antitrust suit, filed 17 January 1969, the U.S. government charged that bundled software was anticompetitive.[11] While some software continued to come at no cost, there was a growing amount of software that was for sale only under restrictive licenses. In the early 1970s AT&T distributed early versions of Unix at no cost to government and academic researchers, but these versions did not come with permission to redistribute or to distribute modified versions, and were thus not free software in the modern meaning of the phrase. After Unix became more widespread in the early 1980s, AT&T stopped the free distribution and charged for system patches. As it is quite difficult to switch to another architecture, most researchers paid for a commercial license. Software was not considered copyrightable before the 1974 US Commission on New Technological Uses of Copyrighted Works (CONTU) decided that computer programs, to the extent that they embody an author's original creation, are proper subject matter of copyright.[12][13] Therefore, software had no licenses attached and was shared as public-domain software, typically with source code. The CONTU decision plus later court decisions such as Apple v. Franklin in 1983 for object code, gave computer programs the copyright status of literary works and started the licensing of software and the shrink-wrap closed source software business model.[14] In the late 1970s and early 1980s, computer vendors and software-only companies began routinely charging for software licenses, marketing software as Program Products and imposing legal restrictions on new software developments, now seen as assets, through copyrights, trademarks, and leasing contracts. "
);

//pagina 5
doc.addPage();
doc.text("", 45, 45);
brood3(
  "In 1976 Bill Gates wrote an essay entitled Open Letter to Hobbyists, in which he expressed dismay at the widespread sharing of Microsofts product Altair BASIC by hobbyists without paying its licensing fee. In 1979, AT&T began to enforce its licenses when the company decided it might profit by selling the Unix system.[15] In an announcement letter dated 8 February 1983 IBM inaugurated a policy of no longer distributing sources with purchased software.[16][17] To increase revenues, a general trend began to no longer distribute source code (easily readable by programmers), and only distribute the executable machine code that was compiled from the source code. One person especially distressed by this new practice was Richard Stallman. He was concerned that he could no longer study or further modify programs initially written by others. Stallman viewed this practice as ethically wrong. In response, he founded the GNU Project in 1983 so that people could use computers using only free software.[1] He established a non-profit organization, the Free Software Foundation, in 1985, to more formally organize the project. He invented copyleft, a legal mechanism to preserve the free status of a work subject to copyright, and implemented this in the GNU General Public License. Copyleft licenses allow authors to grant a number of rights to users (including rights to use a work without further charges, and rights to obtain, study and modify the programs complete corresponding source code) but requires derivatives to remain under the same license or one without any additional restrictions. Since derivatives include combinations with other original programs, downstream authors are prevented from turning the initial work into proprietary software, and invited to contribute to the copyleft commons.[3] Later, variations of such licenses were developed by others."
);
doc.moveDown();
title2("1980s AND 1990s");
title3("Informal software sharing continues");
intro(
  "However, there were still those who wished to share their source code with other programmers and/or with users on a free basis, then called hobbyists and hackers.[18] Before the introduction and widespread public use of the internet, there were several alternative ways available to do this, including listings in computer magazines (like Dr. Dobb's Journal, Creative Computing, SoftSide, Compute!, Byte, etc.) and in computer programming books, like the bestseller BASIC Computer Games.[19] Though still copyrighted, annotated source code for key components of Atari 8-bit family system software was published in mass market books, including The Atari BASIC Source Book[20] (full source for Atari BASIC) and Inside Atari DOS (full source for Atari DOS).[21]"
);

//pagina 6
doc.addPage();
doc.text("", 45, 45);
title4("SHARE program library");
brood2(
  "The SHARE users group, founded in 1955, began collecting and distributing free software. The first documented distribution from SHARE was dated 17 October 1955.[22] The SHARE Program Library Agency (SPLA) distributed information and software, notably on magnetic tape."
);
doc.moveDown();
title4("DECUS tapes");
brood2(
  "In the early 1980s, the so-called DECUS tapes[23] were a worldwide system for transmission of free software for users of DEC equipment. Operating systems were usually proprietary software, but many tools like the TECO editor, Runoff text formatter, or List file listing utility, etc. were developed to make users' lives easier, and distributed on the DECUS tapes. These utility packages benefited DEC, which sometimes incorporated them into new releases of their proprietary operating system. Even compilers could be distributed and for example Ratfor (and Ratfiv) helped researchers to move from Fortran coding to structured programming (suppressing the GO TO statement). The 1981 Decus tape was probably the most innovative by bringing the Lawrence Berkeley Laboratory Software Tools Virtual Operating System which permitted users to use a Unix-like system on DEC 16-bit PDP-11s and 32-bit VAXes running under the VMS operating system. It was similar to the current cygwin system for Windows. Binaries and libraries were often distributed, but users usually preferred to compile from source code.[citation needed]"
);

//pagina 7
doc.addPage();
doc.text("", 45, 45);
title4("Online software sharing communities in the 1980s");
brood3(
  "In the 1980s, parallel to the free software movement, software with source code was shared on BBS networks. This was sometimes a necessity; software written in BASIC and other interpreted languages could only be distributed as source code, and much of it was freeware. When users began gathering such source code, and setting up boards specifically to discuss its modification, this was a de facto open-source system. One of the most obvious examples of this is one of the most-used BBS systems and networks, WWIV, developed initially in BASIC by Wayne Bell. A culture of modding his software, and distributing the mods, grew up so extensively that when the software was ported to first Pascal, then C++, its source code continued to be distributed to registered users, who would share mods and compile their own versions of the software. This may have contributed to it being a dominant system and network, despite being outside the Fidonet umbrella that was shared by so many other BBS makers. Meanwhile, the advent of Usenet and UUCPNet in the early 1980s further connected the programming community and provided a simpler way for programmers to share their software and contribute to software others had written.[24]"
);
doc.moveDown();
title3("Launch of the free software movement");
caption("Main article: Free software movement");
brood2(
  "In 1983, Richard Stallman launched the GNU Project to write a complete operating system free from constraints on use of its source code. Particular incidents that motivated this include a case where an annoying printer couldn't be fixed because the source code was withheld from users.[25] Stallman also published the GNU Manifesto in 1985 to outline the GNU Project's purpose and explain the importance of free software. Another probable inspiration for the GNU project and its manifesto was a disagreement between Stallman and Symbolics, Inc. over MIT's access to updates Symbolics had made to its Lisp machine, which was based on MIT code.[26] Soon after the launch, he[18] used[clarification needed] the existing term free software and founded the Free Software Foundation to promote the concept. The Free Software Definition was published in February 1986. In 1989, the first version of the GNU General Public License was published.[27] A slightly updated version 2 was published in 1991. In 1989, some GNU developers formed the company Cygnus Solutions.[28] The GNU project's kernel, later called GNU Hurd, was continually delayed, but most other components were completed by 1991. Some of these, especially the GNU Compiler Collection, had become market leaders[clarification needed] in their own right. The GNU Debugger and GNU Emacs were also notable successes."
);

// pagina 8
doc.addPage();
doc.text("", 45, 45);
title3("Linux (1991–present)");
caption("Main article: History of Linux");
brood3(
  "The Linux kernel, started by Linus Torvalds, was released as freely modifiable source code in 1991. The license was not a free software license, but with version 0.12 in February 1992, Torvalds relicensed the project under the GNU General Public License.[29] Much like Unix, Torvalds' kernel attracted attention from volunteer programmers. Until this point, the GNU project's lack of a kernel meant that no complete free software operating systems existed. The development of Torvalds kernel closed that last gap. The combination of the almost-finished GNU operating system and the Linux kernel made the first complete free software operating system. Among Linux distributions, Debian GNU/Linux, begun by Ian Murdock in 1993, is noteworthy for being explicitly committed to the GNU and FSF principles of free software. The Debian developers' principles are expressed in the Debian Social Contract. Since its inception, the Debian project has been closely linked with the FSF, and in fact was sponsored by the FSF for a year in 1994–1995. In 1997, former Debian project leader Bruce Perens also helped found Software in the Public Interest, a non-profit funding and support organization for various free software projects.[30] Since 1996, the Linux kernel has included proprietary licensed components, so that it was no longer entirely free software.[31] Therefore, the Free Software Foundation Latin America released in 2008 a modified version of the Linux-kernel called Linux-libre, where all proprietary and non-free components were removed. Many businesses offer customized Linux-based products, or distributions, with commercial support. The naming remains controversial. Referring to the complete system as simply Linux is common usage. However, the Free Software Foundation, and many others,[citation needed] advocate the use of the term GNU/Linux, saying that it is a more accurate name for the whole operating system.[32] Linux adoption grew among businesses and governments in the 1990s and 2000s. In the English-speaking world at least, Ubuntu and its derivatives became a relatively popular group of Linux distributions"
);
doc.moveDown();
title3("The free BSDs (1993–present)");
brood2(
  "When the USL v. BSDi lawsuit was settled out of court in 1993, FreeBSD and NetBSD (both derived from 386BSD) were released as free software. In 1995, OpenBSD forked from NetBSD. In 2004, Dragonfly BSD forked from FreeBSD."
);

//pagina 9
doc.addPage();
doc.text("", 45, 45);
title3("The dot-com years (late 1990s)");
brood3(
  "In the mid to late 90s, when many website-based companies were starting up, free software became a popular choice for web servers. The Apache HTTP Server became the most-used web-server software, a title that still holds as of 2015.[33] Systems based on a common stack of software with the Linux kernel at the base, Apache providing web services, the MySQL database engine for data storage, and the PHP programming language for providing dynamic pages, came to be termed LAMP systems. In actuality, the programming language that predated PHP and dominated the web in the mid and late 1990s was Perl. Web forms were processed on the server side through Common Gateway Interface scripts written in Perl."
);
doc.moveDown();
title3("The launch of Open Source");
brood2(
  "In 1997, Eric S. Raymond published The Cathedral and the Bazaar, a reflective analysis of the hacker community and free software principles. The paper received significant attention in early 1998 and was one factor in motivating Netscape Communications Corporation to release their popular Netscape Communicator Internet suite as free software.[34]Netscape's act prompted Raymond and others to look into how to bring free software principles and benefits to the commercial-software industry. They concluded that FSF's social activism was not appealing to companies like Netscape, and looked for a way to rebrand the free software movement to emphasize the business potential of the sharing of source code.[35]The label open source was adopted by some people in the free software movement at a strategy session[36] held at Palo Alto, California, in reaction to Netscape's January 1998 announcement of a source code release for Navigator. The group of individuals at the session included Christine Peterson who suggested open source,[1] Todd Anderson, Larry Augustin, Jon Hall, Sam Ockman, Michael Tiemann, and Eric S. Raymond. Over the next week, Raymond and others worked on spreading the word. Linus Torvalds gave an all-important sanction the following day. Phil Hughes offered a pulpit in Linux Journal. Richard Stallman, pioneer of the free software movement, flirted with adopting the term, but changed his mind.[36] Those people who adopted the term used the opportunity before the release of Navigator's source code to free themselves of the ideological and confrontational connotations of the term free software. "
);

//pagina 10
doc.addPage();
doc.text("", 45, 45);
brood3(
  "Netscape released its source code under the Netscape Public License and later under the Mozilla Public License.[37]The term was given a big boost at an event organized in April 1998 by technology publisher Tim O'Reilly. Originally titled the Freeware Summit and later named the Open Source Summit,[38] the event brought together the leaders of many of the most important free and open-source projects, including Linus Torvalds, Larry Wall, Brian Behlendorf, Eric Allman, Guido van Rossum, Michael Tiemann, Paul Vixie, Jamie Zawinski of Netscape, and Eric Raymond. At that meeting, the confusion caused by the name free software was brought up. Tiemann argued for sourceware as a new term, while Raymond argued for open source. The assembled developers took a vote, and the winner was announced at a press conference that evening. Five days later, Raymond made the first public call to the free software community to adopt the new term.[39] The Open Source Initiative was formed shortly thereafter.[1][36] According to the OSI Richard Stallman initially flirted with the idea of adopting the open source term.[40] But as the enormous success of the open source term buried Stallman's free software term and his message on social values and computer users' freedom,[41][42][43] later Stallman and his FSF strongly objected to the OSI's approach and terminology.[44] Due to Stallman's rejection of the term open-source software, the FOSS ecosystem is divided in its terminology; see also Alternative terms for free software. For example, a 2002 FOSS developer survey revealed that 32.6% associated themselves with OSS, 48% with free software, and 19.4% in between or undecided.[45] Stallman still maintained, however, that users of each term were allies in the fight against proprietary software. On 13 October 2000, Sun Microsystems released the StarOffice office suite as free software under the GNU Lesser General Public License. The free software version was renamed OpenOffice.org, and coexisted with StarOffice. By the end of the 1990s, the term open source gained much traction in public media[46] and acceptance in software industry in context of the dotcom bubble and the open-source software driven Web 2.0."
);
doc.moveDown();
title2("DESKTOP (1984–PRESENT)");
brood2(
  "The X Window System was created in 1984, and became the de facto standard window system in desktop free software operating systems by the mid-1990s. X runs as a server, and is responsible for communicating with graphics hardware on behalf of clients (which are individual software applications). It provides useful services such as having multiple virtual desktops for the same monitor, and transmitting visual data across the network so a desktop can be accessed remotely. Initially, users or system administrators assembled their own environments from X and available window managers (which add standard controls to application windows; X itself does not do this), pagers, docks and other software. While X can be operated without a window manager, having one greatly increases convenience and ease of use. Two key heavyweight desktop environments for free software operating systems emerged in the 1990s that were widely adopted: KDE and GNOME. KDE was founded in 1996 by Matthias Ettrich. At the time, he was troubled by the inconsistencies in the user interfaces of UNIX applications. He proposed a new desktop environment. He also wanted to make this desktop easy to use. His initial Usenet post spurred a lot of interest.[47] Ettrich chose to use the Qt toolkit for the KDE project. At the time, Qt did not use a free software license. Members of the GNU project became concerned with the use of such a toolkit for building a free software desktop environment."
);

//pagina 11
doc.addPage();
doc.text("", 45, 45);
brood2(
  "In August 1997, two projects were started in response to KDE: the Harmony toolkit (a free replacement for the Qt libraries) and GNOME (a different desktop without Qt and built entirely on top of free software).[48] GTK+ was chosen as the base of GNOME in place of the Qt toolkit. In November 1998, the Qt toolkit was licensed under the free/open source Q Public License (QPL) but debate continued about compatibility with the GNU General Public License (GPL). In September 2000, Trolltech made the Unix version of the Qt libraries available under the GPL, in addition to the QPL, which has eliminated the concerns of the Free Software Foundation. KDE has since been split into KDE Plasma Workspaces, a desktop environment, and KDE Software Compilation, a much broader set of software that includes the desktop environment. Both KDE and GNOME now participate in freedesktop.org, an effort launched in 2000 to standardize Unix desktop interoperability, although there is still competition between them.[49]Since 2000, software written for X almost always uses some widget toolkit written on top of X, like Qt or GTK.[citation needed] In 2010, Canonical released the first version of Unity, a replacement for the prior default desktop environment for Ubuntu, GNOME. This change to a new, under-development desktop environment and user interface was initially somewhat controversial among Ubuntu users. In 2011, GNOME 3 was introduced, which largely discarded the desktop metaphor in favor of a more mobile-oriented interface. The ensuing controversy led Debian to consider making the Xfce environment default on Debian 7. Several independent projects were begun to keep maintaining the GNOME 2 code. Fedora did not adopt Unity, retaining its existing offering of a choice of GNOME, KDE and LXDE with GNOME being the default, and hence Red Hat Enterprise Linux (for which Fedora acts as the initial testing ground) did not adopt Unity either. A fork of Ubuntu was made by interested third-party developers that kept GNOME and discarded Unity. In March 2017, Ubuntu announced that it will be abandoning Unity in favour or GNOME 3 in future versions, and ceasing its efforts in developing Unity-based smartphones and tablets.[50][51] When Google built the Linux-based Android operating system, mostly for phone and tablet devices, it replaced X with the purpose-built SurfaceFlinger. Open-source developers also criticized X as obsolete, carrying many unused or overly complicated elements in its protocol and libraries, while missing modern functionality, e.g., compositing, screen savers, and functions provided by window managers.[52] Several attempts have been made or are underway to replace X for these reasons, including: The Y Window System, which had ceased development by 2006.[53]The Wayland project, started in 2008. The Mir project, started in 2013 by Canonical Ltd. to produce a replacement windowing system for Ubuntu."
);
doc.moveDown();

// end and display the document in the iframe to the right
doc.end();
stream.on("finish", function () {
  iframe.src = stream.toBlobURL("application/pdf");
});
