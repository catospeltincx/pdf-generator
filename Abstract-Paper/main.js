import "regenerator-runtime/runtime";
import PDFDocument, { text } from "pdfkit";
import blobStream from "blob-stream";

async function makePdf() {
  const iframe = document.querySelector("iframe");
  const doc = new PDFDocument({
    size: [595, 841],
  });

  const stream = doc.pipe(blobStream());

  //met functies
  function tit(text) {
    doc.fontSize(12).font("Helvetica").text(text);
  }

  function brood(text) {
    doc.fontSize(13).font("Times-Roman").text(text, {
      width: 430,
      indent: 15,
    });
  }

  function cit(text) {
    doc.fontSize(11).font("Helvetica").text(text, {
      oblique: "yes",
      width: 330,
    });
  }

  function caption(text) {
    doc.fontSize(7).font("Times-Roman").text(text, {
      indent: 50,
    });
  }

  function vra(list) {
    doc.fontSize(12).font("Helvetica").list(list, {
      bulletRadius: 7,
      lineGap: 1,
    });
  }

  doc.text("", 35, 35);
  tit("Free and Open Source Software");
  tit("& Boek ontwerp");
  doc.moveDown();
  tit("1 — Introductie tot Free and open-source software");
  brood(
    "Vorig jaar begeleidde Gijs de Heij een projectweek voor Bachelor 2 en 3 Grafische Vormgeving. Hij is een Open-source grafisch ontwerper en aangesloten bij Open Source Publishing. OSP is een groep geïnteresseerd in grafisch ontwerp, typografie en development. Op hun website presenteren ze waar ze voor staan, welke tools ze gebruiken en maken, hoe het proces verloopt voor elk project en welk grafisch werk daaruit voort komt."
  );
  brood(
    "Ze werken zo veel mogelijk met Free and open source software (F/OSS). Dit zijn tools die gratis te gebruiken zijn en hun broncode openbaar maken. Iedereen die wil, kan zonder meer bijdragen tot de werking van een programma en het gebruiken."
  );
  doc.moveDown();
  cit(
    "“A recipe is important as a metaphor. A recipe can only be secret. Maybe your grandmother told you the recipe for her apple pie. It’s no longer a secret because she told it to you. You can now pass it on to someone else. But what you also can do is, you can change it and then pass your version on to someone else.”"
  );
  caption("Eric Schrijver tijdens een lezing van FCForum Lab2014");
  caption("in Bau, Design College of Barcelona");
  doc.moveDown();
  brood(
    "Ik bekijk een lezing van OSP. Eric Schrijver (ook deel van OSP) en Gijs de Heij vergelijken hun omgang met software met de omgang die we hanteren omtrent recepten. Ze hebben het ook over het belang van tools. Volgens beide heeft elke tool zijn eigen karakter. Omdat ze steeds gemaakt zijn met een specifieke reden zijn ze nooit neutraal. Het is daarom belangrijk om je te verdiepen in welke tool je gaat gebruiken bij welk project. Tools bepalen je perspectief en daardoor ook je resultaat."
  );
  doc.moveDown();
  cit(
    "“There are people who use it, people who make it, people who do both.” "
  );
  caption("Gijs de Heij tijdens een lezing van FCForum Lab2014");
  caption("in Bau, Design College of Barcelona");
  doc.moveDown();
  brood(
    "Naast de open werkmethode die F/OSS met zich meebrengt is ook de gemeenschap die wordt samengebracht door deze manier van werken waardevol. Naarmate ik verder zoek kom ik verschillende namen, praktijken en projecten tegen. Een groot deel daarvan in Brussel gevestigd: Constant vzw, Lorraine Furter, Luuse, OSP, Femke Snelting, … Maar ook buiten België: Julien Deswaef, Manuel Schmalstieg, Ana Isabel Carvalho … Van deze collectieven en personen zijn er veel met elkaar gelinkt. Ook wordt er jaarlijks in een verschillende stad een Libre Graphics Meeting georganiseerd. Libre Graphics staat voor grafisch ontwerp binnen de context van FOSS. Het is niet één groep die zo werkt. Een heel netwerk van mensen deelt deze visie."
  );
  doc.moveDown();
  tit("2 — Indesign");
  brood(
    "Tijdens de workshopweek (waar ik het eerder over had) toonde de Heij een aantal van zijn projecten. Een daarvan was een gecodeerde magazine. Hij had een publicatie ontworpen in code, niet in Indesign."
  );
  brood(
    "Ik dacht aan de moeilijkheden die ik ervaar tijdens het werken in Indesign. Of het zijn eerder de gemakken die het me moeilijk maken. Omdat de hoeveelheid aan opties zo groot is, raak ik makkelijk afgeleid door details."
  );
  doc.addPage();
  doc.text("", 35, 35);
  brood(
    "Terwijl ik die, in een beginfase van een ontwerp, niet zo belangrijk vind. De omgeving van deze tool zorgt ervoor dat ik spread per spread ontwerp. Hierdoor vind ik het moeilijk overzicht te houden op iets wat ik maak en eindig ik met een onzuivere blik en eindeloze documenten vol schetsen waarvan ik niet veel goed vind."
  );
  brood(
    "Wanneer je al coderend ontwerpt is het praktisch om eerst een idee te bedenken dat het zicht van twee aanliggende pagina’s overstijgt. Omdat ongeveer alles mogelijk is als je zelf codeert, moet je voor je begint weten wat je plan is."
  );
  doc.moveDown();
  tit("3 — Web <-> Print ");
  brood(
    "Ik las Post-Digital Print, The Mutation of Publishing since 1894. Het boek werd geschreven door Alessandro Ludovico en in 2012 uitgebracht. Het gaat over print en de plek ervan in de digitale wereld van nu. Over waarom het geprinte boek al zoveel keren werd doodverklaard, maar nog steeds niet dood is. Over de oereigenschappen van een geprint boek die best belangrijk voor ons blijken te zijn: pagina’s omdraaien, de mogelijkheid te noteren, hoeken omslaan, de geur… Deze fysieke kenmerken helpen ons iets te onthouden doordat ze ons fotografisch geheugen voeden. Een print, een boek brengt een concentratie met zich mee door de afwezigheid van hyperlinks, search bars en andere dienstige onderdelen van het internet die je vaak te snel kunnen doorverwijzen naar het volgende interessante onderwerp."
  );
  brood(
    "Het boek van Ludovico, gaat over de samenvloeiing van het digitale en analoge, over het flexibele parcours dat print reeds heeft afgelegd en blijft afleggen. Het gecodeerde magazine dat Gijs de Heij vorig jaar meebracht is daar een voorbeeld van. Het is een geprint, analoog object dat in een digitale structuur bijeen werd gebracht."
  );
  doc.moveDown();
  tit("4 — Beschrijving masterproef");
  brood(
    "Om mijn vaardigheid in het ontwerpen van boeken en programmeren te ontwikkelen gebruik ik Wikipedia als databron om pdf’s te genereren. Via deze weg ben ik aan het onderzoeken hoe digitale structuren er geprint uit kunnen zien. Ik ben geïnteresseerd in deze manier van naar boeken kijken. Wat er gebeurt wanneer de drukke netwerkstructuren van het web die je leesgedrag beïnvloeden op een onrustige manier worden gecombineerd met het rustige lineair gestructureerde medium van print. Wat er tot stand komt wanneer deze twee ‘werelden’ samen worden gebracht."
  );
  doc.moveDown();
  tit("5 — Beschrijving paper");
  cit(
    "“The resurrection of forgotten or hard-to-find materials from the past stems from a widespread need to reconstruct, to reassemble, even to somehow re-enact the original publishing gesture; a need which obviously goes much deeper than the mere thrill of exploiting new technological possibilities.”"
  );
  caption("Alessandro Ludovico");
  caption("Post-Digital Print, The Mutation of Publishing since 1894");
  doc.moveDown();
  brood(
    "Alessandro Ludovico vertelt in het vijfde hoofdstuk van zijn boek over de toegankelijkheid van print. Hij benoemt print als vertrouwd medium en benadrukt het belang ervan het openbaar te houden."
  );
  doc.addPage();
  doc.text("", 35, 35);
  brood(
    "Online giants als Google en Amazon merkten deze nood op en zijn er in geslaagd toegankelijk te lijken op het eerste zicht maar het niet te zijn. Je kan op Google Books publicaties raadplegen maar slechts een deel van de PDF bekijken. Om de hele versie te bezichtigen moet je het kopen."
  );
  brood(
    "Vanuit de context van FOSS wordt dit anders benaderd. Een voorbeeld is The Internet Archive. Het heeft een tool die boeken online beschikbaar maakt en rekent op individuele en collectieve initiatieven om een zo volledig mogelijk en gratis collectie aan te bieden."
  );
  doc.moveDown();
  doc.text("Dit leidt mij tot mijn onderzoeksvraag:");
  doc.moveDown(0.5);
  cit(
    "Dit leidt mij tot mijn onderzoeksvraag: Wat is de bijdrage van de visie van Free and open source software tot het toegankelijk maken van vergeten geprinte uitgaven en wat is hierbij de rol van Libre Graphics?"
  );

  // end and display the document in the iframe to the right
  doc.end();
  stream.on("finish", function () {
    iframe.src = stream.toBlobURL("application/pdf");
  });
}

makePdf();
