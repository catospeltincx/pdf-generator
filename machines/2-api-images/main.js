import "regenerator-runtime/runtime";
console.log("images");

function loadImagesForPages(pages) {
  console.log(pages);
  for (const pageName of pages.slice(0, 1)) {
    loadImagesForPage(pageName);
  }
}

async function loadImagesForPage(pageName, count = 100) {
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
  //document.body.appendChild(div);

  // Get all images
  let images = Array.from(div.querySelectorAll("img"));
  //- figcaption --> neemt de links in de captions van de beelden, plaats dit in de js van de folder: 4-api-caption-links
  console.log(images);

  for (const image of images) {
    const grid = document.querySelector(".grid");
    grid.appendChild(image);
  }

  //json uit laten rollen
  const json = [];
  for (const pageName of pageNames) {
    json.push(pageName);
  }

  downloadText(JSON.stringify(json), "images-for-captions.json");
}

document.getElementById("file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  // console.log(file);
  // console.log(imageUrl);
  // console.log("input");
  // console.log(e);
  const imageUrl = URL.createObjectURL(file);
  fetch(imageUrl)
    .then((res) => res.json())
    .then((json) => loadImagesForPages(json));
});
