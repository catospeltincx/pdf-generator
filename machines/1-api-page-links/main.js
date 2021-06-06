import "regenerator-runtime/runtime";

//deze functie is raar
//en super specifiek
//herbruiken voor alle machines
//is niet zo belangrijk om te snappen
function downloadText(text, filename) {
  //we maken een blob
  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8",
  });
  //we maken een url van die blob
  const url = window.URL.createObjectURL(blob);
  //zetten we in een verborgen link
  var a = document.createElement("a");
  a.style = "display: none";
  //toevoegen aan de pagina
  document.body.appendChild(a);
  //mee in de link zetten (href)
  a.href = url;
  //downloaden
  a.download = filename;
  //klikken op de link
  a.click();
  window.URL.revokeObjectURL(url);
  //de link van de pagina verwijderen
  document.body.removeChild(a);
}

async function getPage(pageName, count = 100) {
  console.log(pageName);

  // Fetch the page
  const url = "https://en.wikipedia.org/api/rest_v1/page/html/" + pageName;
  const res = await fetch(url);
  //neem alle tekst
  const text = await res.text();
  console.log(text);

  // Turn the page text into HTML code.
  const div = document.createElement("div");
  div.innerHTML = text;
  //zet aan om de volledige html pagina te kunnen zien
  document.body.appendChild(div);

  // Get all links
  let links = Array.from(div.querySelectorAll('a[rel="mw:WikiLink"]'));
  //- figcaption --> neemt de links in de captions van de beelden, plaats dit in de js van de folder: 4-api-caption-links

  //vanaf hier is het opkuisen
  //alle pagina namen eruit halen

  let pageNames = links.map((link) => {
    // Get the page name of the link
    let pageName = link.getAttribute("href");
    // Skip first two letters "./"
    pageName = pageName.substring(2);
    return pageName;
  });

  pageNames = pageNames.filter(
    (pageName) => !pageName.includes("disambiguation")
  );
  pageNames = pageNames.filter((pageName) => !pageName.includes("Help:"));
  pageNames = pageNames.filter((pageName) => !pageName.includes("Wikipedia:"));
  pageNames = pageNames.filter((pageName) => !pageName.includes("Talk:"));
  pageNames = pageNames.filter((pageName) => !pageName.includes("User:"));
  pageNames = pageNames.filter((pageName) => !pageName.includes("Template:"));
  pageNames = pageNames.filter((pageName) => !pageName.includes("Special:"));
  pageNames = pageNames.filter((pageName) => !pageName.includes("Portal:"));
  pageNames = pageNames.filter((pageName) => !pageName.includes("Category:"));
  pageNames = pageNames.filter(
    (pageName) => !pageName.includes("Wikipedia_talk:")
  );
  pageNames = pageNames.filter((pageName) => !pageName.includes("MOS:"));

  //get all the page names

  for (const pageName of pageNames) {
    //
    // Show the first link as a <li> tag
    //maakt div
    const pageNameDiv = document.createElement("div");
    //maakt de inner html
    pageNameDiv.innerHTML = pageName;
    //voegt het toe
    document.body.appendChild(pageNameDiv);
  }

  //json uit laten rollen
  const json = [];
  for (const pageName of pageNames) {
    json.push(pageName);
  }
  //iets mee doen
  //hier: als een file laten downloaden door de gebruiker
  //verander hier ook de file-name
  downloadText(JSON.stringify(json), "links-for-images.json");
}

// getPage("catalogue");
//invulstukje laten werken
//dien het woord in
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(e);
  const form = e.target;
  const pageName = form.elements.pageName.value;
  // als er niets in staat en je drukt op 'Run' blijft het leeg
  if (!pageName) return;
  console.log(pageName);

  //tekst eruit halen
  //html van maken
  //alle links eruit halen
  //= een functie, zie bovenaan
  getPage(pageName);
});
