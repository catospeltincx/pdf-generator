// create a document and pipe to a blob
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
//import { list } from "pdfkit/js/mixins/text";
//import { moveDown } from "pdfkit/js/mixins/text";
//const blobStream = require("blob-stream");

const iframe = document.querySelector("iframe");
const doc = new PDFDocument({
  size: [421, 595],
});
const stream = doc.pipe(blobStream());

//TITLES
function title1(text) {
  doc.fontSize(17).font("Helvetica").text(text, {
    underline: 2,
    width: 200,
  });
}

function title2(text) {
  doc.fontSize(14).font("Helvetica").text(text);
}

function title3(text) {
  doc.fontSize(11).font("Helvetica").text(text);
}

function title4(text) {
  doc.fontSize(9).font("Helvetica").text(text);
}

//BROOD
function brood0(text) {
  doc.fontSize(9.5).font("Courier").text(text, {
    width: 200,
    lineGap: 2,
  });
}

function brood1(text) {
  doc.fontSize(10).font("Helvetica").text(text, {
    indent: 10,
    width: 240,
  });
}

function brood2(text) {
  doc.fontSize(9).font("Times-Roman").text(text, {
    width: 300,
  });
}

function brood3(text) {
  doc.fontSize(9).font("Times-Roman").text(text, {
    width: 170,
  });
}

//REST
function caption(text) {
  doc.fontSize(10).font("Times-Roman").text(text, {
    indent: 100,
    oblique: 45,
  });
}

function content(list) {
  doc.fontSize(17).font("Helvetica").list(list, {
    bulletRadius: 6,
    textIndent: 30,
    lineGap: 1,
    underline: "true",
  });
}

function appendix(list) {
  doc.fontSize(7).font("Times-Roman").list(list, {
    bulletRadius: 1,
    lineGap: 1,
    columns: 3,
    underline: true,
  });
}

//TITLE-INTRO (1)
//PAGINA 1
doc.text("", 45, 45);
title1("HISTORY OF FREE AND OPEN-SOURCE SOFTWARE");
caption("From Wikipedia, the free encyclopedia");
doc.moveDown();
brood0(
  "In the 1950s and 1960s, computer operating software and compilers were delivered as a part of hardware purchases without separate fees. At the time, source code, the human-readable form of software, was generally distributed with the software providing the ability to fix bugs or add new functions.[1] Universities were early adopters of computing technology. Many of the modifications developed by universities were openly shared, in keeping with the academic principles of sharing knowledge, and organizations sprung up to facilitate sharing. As large-scale operating systems matured, fewer organizations allowed modifications to the operating software, and eventually such operating systems were closed to modification. However, utilities and other added-function applications are still shared and new organizations have been formed to promote the sharing of software."
);

//CONTENT (2-3)
//PAGINA 2
doc.addPage();
doc.text("", 45, 45);
title2("CONTENTS");
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
  "Microsoft, SCO and other attacks (1998-2014)",
  [
    // 5.1
    "SCO v. IBM and related bad publicity (2003-present)",
  ],
]);

//PAGINA 3
doc.addPage();
doc.text("", 45, 45);
content([
  [
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
//pagina 4
doc.addPage();
doc.text("", 45, 45);
title2("SHARING TECHNIQUES BEFORE SOFTWARE");
brood1(
  "The concept of free sharing of technological information existed long before computers. For example, in the early years of automobile development, one enterprise owned the rights to a 2-cycle gasoline engine patent originally filed by George B. Selden.[2] By controlling this patent, they were able to monopolize the industry and force car manufacturers to adhere to their demands, or risk a lawsuit. In 1911, independent automaker Henry Ford won a challenge to the Selden patent. The result was that the Selden patent became virtually worthless and a new association (which would eventually become the Motor Vehicle Manufacturers Association) was formed.[2] The new association instituted a cross-licensing agreement among all US auto manufacturers: although each company would develop technology and file patents, these patents were shared openly and without the exchange of money between all the manufacturers.[2] By the time the US entered World War 2, 92 Ford patents and 515 patents from other companies were being shared between these manufacturers, without any exchange of money (or lawsuits).[2][improper synthesis?]"
);
doc.moveDown();
title2("FREE SOFTWARE BEFORE THE 1980s");
brood1(
  "In the 1950s and into the 1960s almost all software was produced by academics and corporate researchers working in collaboration, often shared as public-domain software. As such, it was generally distributed under the principles of openness and cooperation long established in the fields of academia, and was not seen as a commodity in itself. Such communal behavior later became a central element of the so-called hacking culture (a term with a positive connotation among open-source programmers). At this time, source code, the human-readable form of software, was generally distributed with the software machine code because users frequently modified the software themselves, because it would not run on different hardware or OS without modification, and also to fix bugs or add new functions.[3][4][failed verification] The first example of free and open-source software is believed to be the A-2 system, developed at the UNIVAC division of Remington Rand in 1953,[5] which was released to customers with its source code. They were invited to send their improvements back to UNIVAC.[6] Later, almost all IBM mainframe software was also distributed with source code included. User groups such as that of the IBM 701, called SHARE, and that of Digital Equipment Corporation (DEC), called DECUS, were formed to facilitate the exchange of software. The SHARE Operating System, originally developed by General Motors, was distributed by SHARE for the IBM 709 and 7090 computers. Some university computer labs even had a policy requiring that all programs installed on the computer had to come with published source-code files. [7]In 1969 the Advanced Research Projects Agency Network (ARPANET), a transcontinental, high-speed computer network was constructed. The network (later succeeded by the Internet) simplified the exchange of software code.[3]Some free software which was developed in the 1970s continues to be developed and used, such as TeX (developed by Donald Knuth)[8] and SPICE.[9]"
);

doc.moveDown();
title3("Initial decline of free software");
brood2(
  "By the late 1960s change was coming: as operating systems and programming language compilers evolved, software production costs were dramatically increasing relative to hardware. A growing software industry was competing with the hardware manufacturers' bundled software products (the cost of bundled products was included in the hardware cost), leased machines required software support while providing no revenue for software, and some customers, able to better meet their own needs,[10] did not want the costs of manufacturer's software to be bundled with hardware product costs. In the United States vs. IBM antitrust suit, filed 17 January 1969, the U.S. government charged that bundled software was anticompetitive.[11] While some software continued to come at no cost, there was a growing amount of software that was for sale only under restrictive licenses. In the early 1970s AT&T distributed early versions of Unix at no cost to government and academic researchers, but these versions did not come with permission to redistribute or to distribute modified versions, and were thus not free software in the modern meaning of the phrase. After Unix became more widespread in the early 1980s, AT&T stopped the free distribution and charged for system patches. As it is quite difficult to switch to another architecture, most researchers paid for a commercial license. Software was not considered copyrightable before the 1974 US Commission on New Technological Uses of Copyrighted Works (CONTU) decided that computer programs, to the extent that they embody an author's original creation, are proper subject matter of copyright.[12][13] Therefore, software had no licenses attached and was shared as public-domain software, typically with source code. The CONTU decision plus later court decisions such as Apple v. Franklin in 1983 for object code, gave computer programs the copyright status of literary works and started the licensing of software and the shrink-wrap closed source software business model.[14] In the late 1970s and early 1980s, computer vendors and software-only companies began routinely charging for software licenses, marketing software as Program Products and imposing legal restrictions on new software developments, now seen as assets, through copyrights, trademarks, and leasing contracts. In 1976 Bill Gates wrote an essay entitled Open Letter to Hobbyists, in which he expressed dismay at the widespread sharing of Microsofts product Altair BASIC by hobbyists without paying its licensing fee. In 1979, AT&T began to enforce its licenses when the company decided it might profit by selling the Unix system.[15] In an announcement letter dated 8 February 1983 IBM inaugurated a policy of no longer distributing sources with purchased software.[16][17] To increase revenues, a general trend began to no longer distribute source code (easily readable by programmers), and only distribute the executable machine code that was compiled from the source code. One person especially distressed by this new practice was Richard Stallman. He was concerned that he could no longer study or further modify programs initially written by others. Stallman viewed this practice as ethically wrong. In response, he founded the GNU Project in 1983 so that people could use computers using only free software.[1] He established a non-profit organization, the Free Software Foundation, in 1985, to more formally organize the project. He invented copyleft, a legal mechanism to preserve the free status of a work subject to copyright, and implemented this in the GNU General Public License. Copyleft licenses allow authors to grant a number of rights to users (including rights to use a work without further charges, and rights to obtain, study and modify the programs complete corresponding source code) but requires derivatives to remain under the same license or one without any additional restrictions. Since derivatives include combinations with other original programs, downstream authors are prevented from turning the initial work into proprietary software, and invited to contribute to the copyleft commons.[3] Later, variations of such licenses were developed by others."
);

//pagina 7
doc.addPage();
doc.text("", 45, 45);
title2("1980s AND 1990s");
title3("Informal software sharing continues");
brood2(
  "However, there were still those who wished to share their source code with other programmers and/or with users on a free basis, then called hobbyists and hackers.[18] Before the introduction and widespread public use of the internet, there were several alternative ways available to do this, including listings in computer magazines (like Dr. Dobb's Journal, Creative Computing, SoftSide, Compute!, Byte, etc.) and in computer programming books, like the bestseller BASIC Computer Games.[19] Though still copyrighted, annotated source code for key components of Atari 8-bit family system software was published in mass market books, including The Atari BASIC Source Book[20] (full source for Atari BASIC) and Inside Atari DOS (full source for Atari DOS).[21]"
);
doc.moveDown();
title4("SHARE program library");
brood3(
  "The SHARE users group, founded in 1955, began collecting and distributing free software. The first documented distribution from SHARE was dated 17 October 1955.[22] The SHARE Program Library Agency (SPLA) distributed information and software, notably on magnetic tape."
);
doc.moveDown();
title4("DECUS tapes");
brood3(
  "In the early 1980s, the so-called DECUS tapes[23] were a worldwide system for transmission of free software for users of DEC equipment. Operating systems were usually proprietary software, but many tools like the TECO editor, Runoff text formatter, or List file listing utility, etc. were developed to make users' lives easier, and distributed on the DECUS tapes. These utility packages benefited DEC, which sometimes incorporated them into new releases of their proprietary operating system. Even compilers could be distributed and for example Ratfor (and Ratfiv) helped researchers to move from Fortran coding to structured programming (suppressing the GO TO statement). The 1981 Decus tape was probably the most innovative by bringing the Lawrence Berkeley Laboratory Software Tools Virtual Operating System which permitted users to use a Unix-like system on DEC 16-bit PDP-11s and 32-bit VAXes running under the VMS operating system. "
);

//pagina 7
doc.addPage();
doc.text(
  "It was similar to the current cygwin system for Windows. Binaries and libraries were often distributed, but users usually preferred to compile from source code.[citation needed]",
  45,
  45
);
doc.moveDown();
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
doc.moveDown();
title3("Linux (1991–present)");
caption("Main article: History of Linux");
brood2(
  "The Linux kernel, started by Linus Torvalds, was released as freely modifiable source code in 1991. The license was not a free software license, but with version 0.12 in February 1992, Torvalds relicensed the project under the GNU General Public License.[29] Much like Unix, Torvalds' kernel attracted attention from volunteer programmers. Until this point, the GNU project's lack of a kernel meant that no complete free software operating systems existed. The development of Torvalds kernel closed that last gap. The combination of the almost-finished GNU operating system and the Linux kernel made the first complete free software operating system. Among Linux distributions, Debian GNU/Linux, begun by Ian Murdock in 1993, is noteworthy for being explicitly committed to the GNU and FSF principles of free software. The Debian developers' principles are expressed in the Debian Social Contract. Since its inception, the Debian project has been closely linked with the FSF, and in fact was sponsored by the FSF for a year in 1994–1995. In 1997, former Debian project leader Bruce Perens also helped found Software in the Public Interest, a non-profit funding and support organization for various free software projects.[30] Since 1996, the Linux kernel has included proprietary licensed components, so that it was no longer entirely free software.[31] Therefore, the Free Software Foundation Latin America released in 2008 a modified version of the Linux-kernel called Linux-libre, where all proprietary and non-free components were removed. Many businesses offer customized Linux-based products, or distributions, with commercial support. The naming remains controversial. Referring to the complete system as simply Linux is common usage. However, the Free Software Foundation, and many others,[citation needed] advocate the use of the term GNU/Linux, saying that it is a more accurate name for the whole operating system.[32] Linux adoption grew among businesses and governments in the 1990s and 2000s. In the English-speaking world at least, Ubuntu and its derivatives became a relatively popular group of Linux distributions"
);
doc.moveDown();
title3("The free BSDs (1993–present)");
brood2(
  "When the USL v. BSDi lawsuit was settled out of court in 1993, FreeBSD and NetBSD (both derived from 386BSD) were released as free software. In 1995, OpenBSD forked from NetBSD. In 2004, Dragonfly BSD forked from FreeBSD."
);

doc.moveDown();
title3("The dot-com years (late 1990s)");
brood2(
  "In the mid to late 90s, when many website-based companies were starting up, free software became a popular choice for web servers. The Apache HTTP Server became the most-used web-server software, a title that still holds as of 2015.[33] Systems based on a common stack of software with the Linux kernel at the base, Apache providing web services, the MySQL database engine for data storage, and the PHP programming language for providing dynamic pages, came to be termed LAMP systems. In actuality, the programming language that predated PHP and dominated the web in the mid and late 1990s was Perl. Web forms were processed on the server side through Common Gateway Interface scripts written in Perl."
);
doc.moveDown();
title3("The launch of Open Source");
brood2(
  "In 1997, Eric S. Raymond published The Cathedral and the Bazaar, a reflective analysis of the hacker community and free software principles. The paper received significant attention in early 1998 and was one factor in motivating Netscape Communications Corporation to release their popular Netscape Communicator Internet suite as free software.[34]Netscape's act prompted Raymond and others to look into how to bring free software principles and benefits to the commercial-software industry. They concluded that FSF's social activism was not appealing to companies like Netscape, and looked for a way to rebrand the free software movement to emphasize the business potential of the sharing of source code.[35]The label open source was adopted by some people in the free software movement at a strategy session[36] held at Palo Alto, California, in reaction to Netscape's January 1998 announcement of a source code release for Navigator. The group of individuals at the session included Christine Peterson who suggested open source,[1] Todd Anderson, Larry Augustin, Jon Hall, Sam Ockman, Michael Tiemann, and Eric S. Raymond. Over the next week, Raymond and others worked on spreading the word. Linus Torvalds gave an all-important sanction the following day. Phil Hughes offered a pulpit in Linux Journal. Richard Stallman, pioneer of the free software movement, flirted with adopting the term, but changed his mind.[36] Those people who adopted the term used the opportunity before the release of Navigator's source code to free themselves of the ideological and confrontational connotations of the term free software. Netscape released its source code under the Netscape Public License and later under the Mozilla Public License.[37]The term was given a big boost at an event organized in April 1998 by technology publisher Tim O'Reilly. Originally titled the Freeware Summit and later named the Open Source Summit,[38] the event brought together the leaders of many of the most important free and open-source projects, including Linus Torvalds, Larry Wall, Brian Behlendorf, Eric Allman, Guido van Rossum, Michael Tiemann, Paul Vixie, Jamie Zawinski of Netscape, and Eric Raymond. At that meeting, the confusion caused by the name free software was brought up. Tiemann argued for sourceware as a new term, while Raymond argued for open source. The assembled developers took a vote, and the winner was announced at a press conference that evening. Five days later, Raymond made the first public call to the free software community to adopt the new term.[39] The Open Source Initiative was formed shortly thereafter.[1][36] According to the OSI Richard Stallman initially flirted with the idea of adopting the open source term.[40] But as the enormous success of the open source term buried Stallman's free software term and his message on social values and computer users' freedom,[41][42][43] later Stallman and his FSF strongly objected to the OSI's approach and terminology.[44] Due to Stallman's rejection of the term open-source software, the FOSS ecosystem is divided in its terminology; see also Alternative terms for free software. For example, a 2002 FOSS developer survey revealed that 32.6% associated themselves with OSS, 48% with free software, and 19.4% in between or undecided.[45] Stallman still maintained, however, that users of each term were allies in the fight against proprietary software. On 13 October 2000, Sun Microsystems released the StarOffice office suite as free software under the GNU Lesser General Public License. The free software version was renamed OpenOffice.org, and coexisted with StarOffice. By the end of the 1990s, the term open source gained much traction in public media[46] and acceptance in software industry in context of the dotcom bubble and the open-source software driven Web 2.0."
);

doc.moveDown();
title2("DESKTOP (1984–PRESENT)");
brood1(
  "The X Window System was created in 1984, and became the de facto standard window system in desktop free software operating systems by the mid-1990s. X runs as a server, and is responsible for communicating with graphics hardware on behalf of clients (which are individual software applications). It provides useful services such as having multiple virtual desktops for the same monitor, and transmitting visual data across the network so a desktop can be accessed remotely. Initially, users or system administrators assembled their own environments from X and available window managers (which add standard controls to application windows; X itself does not do this), pagers, docks and other software. While X can be operated without a window manager, having one greatly increases convenience and ease of use. Two key heavyweight desktop environments for free software operating systems emerged in the 1990s that were widely adopted: KDE and GNOME. KDE was founded in 1996 by Matthias Ettrich. At the time, he was troubled by the inconsistencies in the user interfaces of UNIX applications. He proposed a new desktop environment. He also wanted to make this desktop easy to use. His initial Usenet post spurred a lot of interest.[47] Ettrich chose to use the Qt toolkit for the KDE project. At the time, Qt did not use a free software license. Members of the GNU project became concerned with the use of such a toolkit for building a free software desktop environment. In August 1997, two projects were started in response to KDE: the Harmony toolkit (a free replacement for the Qt libraries) and GNOME (a different desktop without Qt and built entirely on top of free software).[48] GTK+ was chosen as the base of GNOME in place of the Qt toolkit. In November 1998, the Qt toolkit was licensed under the free/open source Q Public License (QPL) but debate continued about compatibility with the GNU General Public License (GPL). In September 2000, Trolltech made the Unix version of the Qt libraries available under the GPL, in addition to the QPL, which has eliminated the concerns of the Free Software Foundation. KDE has since been split into KDE Plasma Workspaces, a desktop environment, and KDE Software Compilation, a much broader set of software that includes the desktop environment. Both KDE and GNOME now participate in freedesktop.org, an effort launched in 2000 to standardize Unix desktop interoperability, although there is still competition between them.[49]Since 2000, software written for X almost always uses some widget toolkit written on top of X, like Qt or GTK.[citation needed] In 2010, Canonical released the first version of Unity, a replacement for the prior default desktop environment for Ubuntu, GNOME. This change to a new, under-development desktop environment and user interface was initially somewhat controversial among Ubuntu users. In 2011, GNOME 3 was introduced, which largely discarded the desktop metaphor in favor of a more mobile-oriented interface. The ensuing controversy led Debian to consider making the Xfce environment default on Debian 7. Several independent projects were begun to keep maintaining the GNOME 2 code. Fedora did not adopt Unity, retaining its existing offering of a choice of GNOME, KDE and LXDE with GNOME being the default, and hence Red Hat Enterprise Linux (for which Fedora acts as the initial testing ground) did not adopt Unity either. A fork of Ubuntu was made by interested third-party developers that kept GNOME and discarded Unity. In March 2017, Ubuntu announced that it will be abandoning Unity in favour or GNOME 3 in future versions, and ceasing its efforts in developing Unity-based smartphones and tablets.[50][51] When Google built the Linux-based Android operating system, mostly for phone and tablet devices, it replaced X with the purpose-built SurfaceFlinger. Open-source developers also criticized X as obsolete, carrying many unused or overly complicated elements in its protocol and libraries, while missing modern functionality, e.g., compositing, screen savers, and functions provided by window managers.[52] Several attempts have been made or are underway to replace X for these reasons, including: The Y Window System, which had ceased development by 2006.[53]The Wayland project, started in 2008. The Mir project, started in 2013 by Canonical Ltd. to produce a replacement windowing system for Ubuntu."
);

doc.moveDown();
title2("Microsoft, SCO and other attacks (1998–2014");
brood1(
  "As free software became more popular, industry incumbents such as Microsoft started to see it as a serious threat. This was shown in a leaked 1998 document, confirmed by Microsoft as genuine, which came to be called the first of the Halloween Documents. Steve Ballmer once compared the GPL to a cancer, but has since stopped using this analogy. Indeed, Microsoft has softened its public stance towards open source[citation needed] in general, with open source since becoming an important part of the Microsoft Windows ecosystem. However, at the same time, behind the scenes, Microsofts actions have been less favourable toward the open-source community."
);
doc.moveDown();
title3("SCO v. IBM and related bad publicity (2003–present)");
caption("Main article: SCO–Linux disputes");
brood2(
  "In 2003, a proprietary Unix vendor and former Linux distribution vendor called SCO alleged that Unix intellectual property had been inappropriately copied into the Linux kernel, and sued IBM, claiming that it bore responsibility for this. Several related lawsuits and countersuits followed, some originating from SCO, some from others suing SCO. However, SCO's allegations lacked specificity, and while some in the media reported them as credible, many critics of SCO believed the allegations to be highly dubious at best. Over the course of the SCO v. IBM case, it emerged that not only had SCO been distributing the Linux kernel for years under the GPL, and continued to do so (thus rendering any claims hard to sustain legally), but that SCO did not even own the copyrights to much of the Unix code that it asserted copyright over, and had no right to sue over them on behalf of the presumed owner, Novell. This was despite SCO's CEO, Darl McBride, having made many wild and damaging claims of inappropriate appropriation to the media, many of which were later shown to be false, or legally irrelevant even if true. The blog Groklaw was one of the most forensic examiners of SCO's claims and related events, and gained its popularity from covering this material for many years. SCO suffered defeat after defeat in SCO v. IBM and its various other court cases, and filed for Chapter 11 bankruptcy in 2007. However, despite the courts finding that SCO did not own the copyrights (see above), and SCO's lawsuit-happy CEO Darl McBride no longer running the company, the bankruptcy trustee in charge of SCO-in-bankruptcy decided to press on with some portions he claimed remained relevant in the SCO v. IBM lawsuit. He could apparently afford to do this because SCO's main law firm in SCO v. IBM had signed an agreement at the outset to represent SCO for a fixed amount of money no matter how long the case took to complete. In 2004, the Alexis de Tocqueville Institution (ADTI) announced its intent to publish a book, Samizdat: And Other Issues Regarding the 'Source' of Open Source Code, showing that the Linux kernel was based on code stolen from Unix, in essence using the argument that it was impossible to believe that Linus Torvalds could produce something as sophisticated as the Linux kernel. The book was never published, after it was widely criticised and ridiculed, including by people supposedly interviewed for the book. It emerged that some of the people were never interviewed, and that ADTI had not tried to contact Linus Torvalds, or ever put the allegations to him to allow a response. Microsoft attempted to draw a line under this incident, stating that it was a distraction. Many suspected that some or all of these legal and fear, uncertainty and doubt (FUD) attacks against the Linux kernel were covertly arranged by Microsoft, although this has never been proven. Both ADTI and SCO, however, received funding from Microsoft."
);
doc.moveDown();
title3("European Commission v. Microsoft (2004–2007)");
caption("Main article: Microsoft Corp. v. Commission");
brood2(
  "In 2004 the European Commission found Microsoft guilty of anti-competitive behaviour with respect to interoperability in the workgroup software market. Microsoft had formerly settled United States v. Microsoft in 2001, in a case which charged that it illegally abused its monopoly power to force computer manufacturers to preinstall Internet Explorer. The Commission demanded that Microsoft produce full documentation of its workgroup protocols to allow competitors to interoperate with its workgroup software, and imposed fines of 1.5 million euros per day for Microsoft's failure to comply. The Commission had jurisdiction because Microsoft sells the software in question in Europe. Microsoft, after a failed attempt to appeal the decision through the Court of Justice of the European Union, eventually complied with the demand, producing volumes of detailed documentation. The Samba project, as Microsoft's sole remaining competitor in the workgroup software market, was the key beneficiary of this documentation."
);
doc.moveDown();
title3("ISO OOXML controversy (2008–present)");
caption("Main article: Standardization of Office Open XML");
brood2(
  "In 2008 the International Organization for Standardization published Microsoft's Office Open XML as an international standard, which crucially meant that it, and therefore Microsoft Office, could be used in projects where the use of open standards were mandated by law or by policy. Critics of the standardisation process, including some members of ISO national committees involved in the process itself, alleged irregularities and procedural violations in the process, and argued that the ISO should not have approved OOXML as a standard because it made reference to undocumented Microsoft Office behaviour. As of 2012, no correct open-source implementation of OOXML exists, which validates the critics' remarks about OOXML being difficult to implement and underspecified. Presently, Google cannot yet convert Office documents into its own proprietary Google Docs format correctly. This suggests that OOXML is not a true open standard, but rather a partial document describing what Microsoft Office does, and only involving certain file formats."
);
doc.addPage();
title3(
  "Microsoft's contributions to open source and acquisition of related projects"
);
caption("Main article: Microsoft and open source");
brood2(
  "In 2006 Microsoft launched its CodePlex open source code hosting site, to provide hosting for open-source developers targeting Microsoft platforms. In July 2009 Microsoft even open sourced some Hyper-V-supporting patches to the Linux kernel, because they were required to do so by the GNU General Public License,[54][55] and contributed them to the mainline kernel. Note that Hyper-V itself is not open source. Microsoft's F# compiler, created in 2002, has also been released as open source under the Apache license. The F# compiler is a commercial product, as it has been incorporated into Microsoft Visual Studio, which is not open source. Microsoft representatives have made regular appearances at various open source and Linux conferences for many years. In 2012, Microsoft launched a subsidiary named Microsoft Open Technologies Inc., with the aim of bridging the gap between proprietary Microsoft technologies and non-Microsoft technologies by engaging with open-source standards.[56] This subsidiary was subsequently folded back into Microsoft as Microsoft's position on open source and non-Windows platforms became more favourable. In January 2016 Microsoft released Chakra as open source under the MIT License; the code is available on GitHub.[57] Microsoft's stance on open source has shifted as the company began endorsing more open-source software. In 2016, Steve Balmer, former CEO of Microsoft, has retracted his statement that Linux is a malignant cancer.[58] In 2017, the company became a platinum supporter of the Linux Foundation. By 2018, shortly before acquiring GitHub, Microsoft led the charts in the number of paid staff contributing to open-source projects there.[59] While Microsoft may or may not endorse the original philosophy of free software, data shows that it does endorse open source strategically.[original research?] Critics have noted that, in March 2019, Microsoft sued Foxconn's subsidiary over a 2013 patent contract;[60] in 2013, Microsoft had announced a patent agreement with Foxconn related to Foxconn's use of the Linux-based Android and Chrome OS.[61]"
);
doc.moveDown();
title2("Open source and programming languages");
brood1(
  "The vast majority of programming languages in use today have a free software implementation available. Since the 1990s, the release of major new programming languages in the form of open-source compilers and/or interpreters has been the norm, rather than the exception. Examples include Python in 1991, Ruby in 1995, and Scala in 2003. In recent times, the most notable exceptions have been Java, ActionScript, C#, and Apple's Swift until version 2.2 was proprietary. Partly compatible open-source implementations have been developed for most, and in the case of Java, the main open-source implementation is by now very close to the commercial version."
);
doc.moveDown();
title3("Java");
caption("See also: History of free and open-source software § Oracle v Google");
brood2(
  "Since its first public release in 1996, the Java platform had not been open source, although the Java source code portion of the Java runtime was included in Java Development Kits (JDKs), on a purportedly confidential basis, despite it being freely downloadable by the general public in most countries. Sun later expanded this confidential source code access to include the full source code of the Java Runtime Environment via a separate program which was open to members of the public, and later made the source of the Java compiler javac available also. Sun also made the JDK source code available confidentially to the Blackdown Java project, which was a collection of volunteers who ported early versions of the JDK to Linux, or improved on Sun's Linux ports of the JDK. However, none of this was open source, because modification and redistribution without Sun's permission were forbidden in all cases. Sun stated at the time that they were concerned about preventing forking of the Java platform. However, several independent partial reimplementations of the Java platform had been created, many of them by the open-source community, such as the GNU Compiler for Java (GCJ). Sun never filed lawsuits against any of the open source clone projects. GCJ notably caused a bad user experience for Java on free software supporting distributions such as Fedora and Ubuntu which shipped GCJ at the time as their Java implementation. How to replace GCJ with the Sun JDK was a frequently asked question by users, because GCJ was an incomplete implementation, incompatible and buggy. In 2006 Jonathan I. Schwartz became CEO of Sun Microsystems, and signalled his commitment to open source. On 8 May 2007, Sun Microsystems released the Java Development Kit as OpenJDK under the GNU General Public License. Part of the class library (4%) could not be released as open source due to them being licensed from other parties and were included as binary plugs.[citation needed] Because of this, in June 2007, Red Hat launched IcedTea to resolve the encumbered components with the equivalents from GNU Classpath implementation. Since the release, most of the encumbrances have been solved, leaving only the audio engine code and colour management system (the latter is to be resolved using Little CMS)."
);
doc.addPage();
title2("Distributed version control (2001–present)");
caption("See also: Distributed version control system § History");
brood1(
  "The first open-source distributed revision control system (DVCS) was 'tla' in 2001 (since renamed to GNU arch); however, it and its successors 'baz' and 'bzr' (Bazaar) never became very popular, and GNU arch was discontinued, although Bazaar still continues and is used by Canonical. However, other DVCS projects sprung up, and some started to get significant adoption."
);
doc.moveDown();
title3("Git (2005–present)");
caption("See also: Git (software) § History");
brood2(
  "Git, the most popular DVCS, was created in 2005.[62] Some developers of the Linux kernel started to use a proprietary DVCS called BitKeeper, notably Linux founder Linus Torvalds, although some other kernel developers never used it due to its proprietary nature. The unusual situation whereby Linux kernel development involved the use by some of proprietary software came to a head when Andrew Tridgell started to reverse-engineer BitKeeper with the aim of producing an open-source tool which could provide some of the same functionality as the commercial version. BitMover, the company that developed BitKeeper, in response, in 2005 revoked the special free of-charge license it had granted to certain kernel developers. As a result of the removal of the BitKeeper license, Linus Torvalds decided to write his own DVCS, called git, because he thought none of the existing open-source DVCSs were suitable for his particular needs as a kernel maintainer (which was why he had adopted BitKeeper in the first place). A number of other developers quickly jumped in and helped him, and git over time grew from a relatively simple stupid content tracker (on which some developers developed porcelain extensions) into the sophisticated and powerful DVCS that it is today. Torvalds no longer maintains git himself, however; it has been maintained by Junio Hamano for many years, and has continued receiving contributions from many developers. The increasing popularity of open-source DVCSs such as git, and then, later, DVCS hosting sites, the most popular of which is GitHub (founded 2008), incrementally reduced the barriers to participation in free software projects still further. With sites like GitHub, no longer did potential contributors have to do things like hunt for the URL for the source code repository (which could be in different places on each website, or sometimes tucked away in a README file or developer documentation), or work out how to generate a patch, and if necessary subscribe to the right mailing list so that their patch email would get to the right people. Contributors can simply fork their own copy of a repository with one click, and issue a pull request from the appropriate branch when their changes are ready. GitHub has become the most popular hosting site in the world for open-source software, and this, together with the ease of forking and the visibility of forks has made it a popular way for contributors to make changes, large and small."
);
doc.moveDown();
title2("Recent developments");
caption("See also: Free software movement § Legislation");
brood1(
  "While copyright is the primary legal mechanism that FOSS authors use to ensure license compliance for their software, other mechanisms such as legislation, software patents, and trademarks have uses also. In response to legal issues with patents and the DMCA, the Free Software Foundation released version 3 of its GNU Public License in 2007 that explicitly addressed the DMCA's digital rights management (DRM) provisions and patent rights. After the development of the GNU GPLv3, as copyright holder of many pieces of the GNU system, such as the GNU Compiler Collection (GCC) software, the FSF updated most[citation needed] of the GNU programs' licenses from GPLv2 to GPLv3. Apple, a user of GCC and a heavy user of both DRM and patents, decided to switch the compiler in its Xcode IDE from GCC to Clang, another FOSS compiler,[63] but which is under a permissive license.[64] LWN speculated that Apple was motivated partly by a desire to avoid GPLv3.[63] The Samba project also switched to GPLv3, which Apple replaced in their software suite with a closed-source, proprietary software alternative.[65] Recent mergers have affected major open-source software. Sun Microsystems (Sun) acquired MySQL AB, owner of the popular open-source MySQL database, in 2008.[66] Oracle in turn purchased Sun in January 2010, acquiring their copyrights, patents, and trademarks. This made Oracle the owner of both the most popular proprietary database and the most popular open-source database (MySQL).[citation needed] Oracle's attempts to commercialize the open-source MySQL database have raised concerns in the FOSS community.[67] Partly in response to uncertainty about the future of MySQL, the FOSS community forked the project into new database systems outside of Oracle's control. These include MariaDB, Percona, and Drizzle.[68] All of these have distinct names; they are distinct projects and cannot use the trademarked name MySQL.[69]"
);
doc.moveDown();
title3("Android (2008–present)");
caption("See also: Android (operating system) § History");
brood2(
  "In September 2008, Google released the first version of Android, a new smartphone operating system, as open source (some Google applications that are sometimes but not always bundled with Android are not open source). Initially, the operating system was given away for free by Google, and was eagerly adopted by many handset makers; Google later bought Motorola Mobility and produced its own vanilla Android phones and tablets, while continuing to allow other manufacturers to use Android. Android is now the world's most popular mobile platform.[70] Because Android is based on the Linux kernel, this means that Linux is now the dominant kernel on both mobile platforms (via Android), and supercomputers,[71] and a key player in server operating systems too."
);
doc.moveDown();
title3("Oracle v. Google");
caption("Main article: Oracle America, Inc. v. Google, Inc.");
brood2(
  "In August 2010, Oracle sued Google claiming that its use of Java in Android infringed on Oracle's copyrights and patents. The initial Oracle v. Google trial ended in May 2012, with the finding that Google did not infringe on Oracle's patents, and the trial judge ruled that the structure of the Java application programming interfaces (APIs) used by Google was not copyrightable. The jury found that Google made a trivial (de minimis) copyright infringement, but the parties stipulated that Google would pay no damages, because it was so trivial.[72] However, Oracle appealed to the Federal Circuit, and Google filed a cross-appeal on the literal copying claim.[73] The Federal Circuit ruled that the small copyright infringement acknowledged by Google was not de minimis, and sent the fair use issue back to the trial judge for reconsideration. In 2016, the case was retried and a jury found for Google, on the grounds of fair use."
);
doc.addPage();
title3("Chromium OS (2009–present)");
brood2(
  "Until recently, Linux was still a relatively uncommon choice of operating system for desktops and laptops. However, Google's Chromebooks, running Chrome OS which is essentially a web thin client, have captured 20–25% of the sub-$300 US laptop market.[74] Chrome OS is built from the open-source Chromium OS, which is based on Linux, in much the same way that versions of Android shipped on commercially available phones are built from the open source version of Android."
);
doc.moveDown();
title1("SEE ALSO");
appendix([
  "Open-source software § History",
  "Free software § History",
  "History of Mozilla Application Suite",
  "History of software",
  "History of software engineering",
  "List of formerly proprietary software",
  "WebOS",
  "OpenBSD version history",
  "Timeline of free and open-source software",
]);
doc.moveDown();
title1("REFERENCES");
appendix([
  "VM Brasseur (2018). Forge your Future with Open Source. Pragmatic Programmers. ISBN 978-1-68050-301-2.",
  "James J. Flink (1977). The Car Culture. MIT Press. ISBN 978-0-262-56015-3.",
  "Hippel, Eric von; Krogh, Georg von (1 April 2003). Open Source Software and the Private-Collective Innovation Model: Issues for Organization Science (PDF). Organization Science. 14 (2): 209–223. doi:10.1287/orsc.14.2.209.14992. hdl:1721.1/66145. ISSN 1047-7039.",
  "IBM 7090/7094 Page. Archived from the original on 27 August 2015. Retrieved 11 August 2015.",
  "Ceruzzi, Paul (1998). A History of Modern Computing. The MIT Press.",
  "...",
]);

// end and display the document in the iframe to the right
doc.end();
stream.on("finish", function () {
  iframe.src = stream.toBlobURL("application/pdf");
});
