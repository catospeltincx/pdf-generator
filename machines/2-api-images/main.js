import "regenerator-runtime/runtime";
console.log("images");

function downloadText(text, filename) {
  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8",
  });
  const url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.style = "display: none";
  document.body.appendChild(a);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

async function loadImagesForPages(pages) {
  console.log(pages);
  const allImageObjects = [];
  for (const pageName of pages.slice(0, 1)) {
    const imageObjects = await loadImagesForPage(pageName);
    allImageObjects.push(...imageObjects);
  }
  downloadText(JSON.stringify(allImageObjects), "images-for-captions.json");
}

async function loadImagesForPage(pageName, count = 100) {
  console.log(pageName);

  const imageObjects = [];

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
    imageObjects.push({
      src: image.src,
    });
  }

  //json uit laten rollen
  // const json = [];
  // for (const pageName of pageNames) {
  //   json.push(pageName);
  // }

  // downloadText(JSON.stringify(json), "images-for-captions.json");

  return imageObjects;
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
