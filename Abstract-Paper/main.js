import "regenerator-runtime/runtime";
import PDFDocument, { text } from "pdfkit";
import blobStream from "blob-stream";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [595, 841],
  });

  const stream = doc.pipe(blobStream());

  //loop

  // const res = await fetch("/data/abstract-paper.json");
  // const paragraphs = await res.json();

  // for (const paragraph of paragraphs) {
  //   doc.moveDown();
  //   doc.fontSize(11).font("Times-Roman").text(paragraph.tit, {
  //     indent: 10,
  //   });
  //   doc.text(paragraph.par, {
  //     width: 290,
  //   });
  //   doc.fontSize(10).font("Times-Roman").text(paragraph.cit, {
  //     width: 190,
  //     oblique: "yes",
  //   });
  // }

  //met functies
  function tit(text) {
    doc.fontSize(14).font("Times-Roman").text(text);
  }

  function brood(text) {
    doc.fontSize(14).font("Times-Roman").text(text, {
      width: 430,
      indent: 15,
    });
  }

  function cit(text) {
    doc.fontSize(14).font("Times-Roman").text(text, {
      align: "center",
      oblique: 4,
      width: "330",
    });
  }

  function vra(list) {
    doc.fontSize(14).font("Helvetica").list(list, {
      bulletRadius: 7,
      lineGap: 1,
    });
  }

  doc.text("", 35, 35);
  tit("Free and Open Source Software");
  tit("& Boek ontwerp");
  doc.moveDown();
  tit("1 — Een kennismaking");
  brood(
    "Vorig jaar begeleidde Gijs de Heij een workshop-week voor Bachelor 2 en 3 Grafische Vormgeving. Hij is een Open-source grafisch ontwerper en aangesloten bij Open Source Publishing. OSP is een groep geïnteresseerd in grafisch ontwerp, typografie en development. Op hun website presenteren ze waar ze voor staan, welke tools ze gebruikten en maakten, hoe het proces verliep per project en welk grafisch werk daaruit voort kwam."
  );
  brood(
    "Ze werken zo veel mogelijk met Free & Open Source Software (F/OSS). Dit staat voor tools die gratis te gebruiken zijn en hun broncode openbaar maken. Iedereen die wil, kan bijdragen tot de werking van een programma en het gebruiken ervan zonder meer. "
  );
  doc.moveDown();
  cit(
    "“A recipe is important as a metaphor. A recipe can only be secret. Maybe your grandmother told you the recipe for her apple pie. It’s no longer a secret because she told it to you. You can now pass it on to someone else. But what you also can do is, you can change it and then pass your version on to someone else.”"
  );
  doc.moveDown();
  brood(
    "Ik bekijk een lezing van OSP. Eric Schrijver (ook deel van OSP) en Gijs de Heij vergelijken hun omgang met software met de omgang die we hanteren omtrent recepten. Ze hebben het ook over het belang van tools. Volgens beide heeft elke tool zijn eigen karakter. Omdat ze steeds gemaakt zijn met een specifieke reden zijn ze nooit neutraal. Het is daarom belangrijk om je te verdiepen in welke tool je gaat gebruiken bij welk project. Tools bepalen je perspectief en daardoor ook je resultaat."
  );
  doc.moveDown();
  cit(
    "“There are people who use it, people who make it, people who do both.” "
  );
  doc.moveDown();
  brood(
    "Naast de werkomgeving en omgang die Free and Open Software met zich meebrengt is ook de gemeenschap die wordt samengebracht door deze manier van werken waardevol. Naarmate ik verder zoek kom ik verschillende namen en praktijken tegen. Het is niet één groep die zo werkt. Het is een blik die een heel netwerk van grafisch ontwerpers en developers delen."
  );
  doc.moveDown(2);
  tit("2 — Boek ontwerp en Open Source Design");
  brood(
    "Tijdens de workshop-week (waar ik het eerder over had) toonde de Heij een aantal van zijn projecten. Éen daarvan was een gecodeerde magazine. Hij had een publicatie ontworpen in code. Niet in Indesign."
  );
  doc.addPage();
  doc.text("", 35, 35);
  brood(
    "Ik dacht aan de moeilijkheden die ik ervaar tijdens het werken in Indesign. Of het zijn eerder de gemakken die het me moeilijk maken. Omdat de hoeveelheid aan opties zo groot is, raak ik makkelijk afgeleid door details. Terwijl ik die, in een begin-fase van een ontwerp, niet zo belangrijk vind. De omgeving van deze tool zorgt ervoor dat ik spread per spread ontwerp. Hierdoor vind ik het moeilijk overzicht te houden op iets wat ik maak en eindig ik met een onzuivere blik en eindeloze documenten vol schetsen waarvan ik niets goed vind."
  );
  brood(
    "Wanneer je al coderend ontwerpt is de nood er om eerst een idee te bedenken dat het zicht van twee naasteenstaande pagina’s overstijgt. Omdat ongeveer alles mogelijk is als je zelf codeert moet je voor je begint weten wat je plan is."
  );
  doc.moveDown();
  tit("3 — de proef (praktijk)");
  brood(
    "Ik las Post-Digital Print, The Mutation of Publishing since 1894. Het boek werd geschreven door Alessandro Ludovico en in 2012 uitgebracht. Het gaat over print en de plek ervan in de digitale wereld van nu. Over waarom het geprinte boek al zoveel keren werd doodverklaard maar nog steeds niet dood is. Over de oer-eigenschappen van een geprint boek die best belangrijk voor ons blijken te zijn; de drang naar bladeren, de mogelijkheid te noteren, hoeken omslagen, de concentratie die het medium met zich meebrengt door de afwezigheid van hyperlinks, … Veel van deze eigenschappen helpen ons iets te onthouden doordat ze ons fotografisch geheugen voeden."
  );
  brood(
    "Het boek van Ludovico, Post-Digital Print, gaat ook over de samenvloeiing van het digitale en analoge. Over het flexibele parcours dat print reeds heeft afgelegd en blijft afleggen."
  );
  brood(
    "De gecodeerde magazine die Gijs de Heij vorig jaar meebracht is daar een voorbeeld van. Het is een geprint object dat in een digitale structuur bijeen werd gebracht."
  );
  brood(
    "Als masterproef ben ik manieren om deze twee ‘werelden’ samen te brengen aan het onderzoeken. Van de digitale kant naar de analoge kant. Ik wil vanuit een omgeving van Free and Open Source Software print leren benaderen."
  );
  doc.moveDown(2);
  vra([
    "Wat kan de netwerkstructuur van het web bieden voor het geprinte boek?",
    "Welke denk-oefeningen zijn hiervoor nodig?",
    "Hoe kunnen digitale structuren er geprint uitzien?",
  ]);
  doc.addPage();
  tit("4 — Wat dan aan de paper-kant? (onderzoeksvra(a)g(en))");
  brood(
    "Voor deze paper kan ik de plaats nemen om te bestuderen welke verbindingen er reeds bestaan tussen Free and Open Source Software en print."
  );
  doc.moveDown(2);
  vra([
    "Wat heeft de blik van F/OSS al voor boekontwerp betekent?",
    "Wat betekent het voor distributie van leesvoer? Archieven? Vergeten boeken? Magazines?",
    "Wat zijn specifieke voorbeelden van een relatie tussen deze twee? (op verschillende niveaus, niet enkel coderen, vooral van de blik, hun inclusieve filosofie)",
    "Welke vormen kan het aannemen (binnen de vorm van print)?",
    "Wat zijn er cons? Wat met de toegankelijkheid van coderen? Niet voor iedereen kan coderen? En er zijn zoveel ‘soorten’ coderen?",
    "Populaire, betalende programma’s systemen wel voor iedereen maar gewoon geld voor nodig om ze toegankelijk te maken? Is daar iets dwars aan?",
  ]);

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
