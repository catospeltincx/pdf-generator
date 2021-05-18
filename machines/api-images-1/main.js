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

const seenImages = new Set();

async function loadImagesForPages(pages) {
  console.log(pages);
  const allImageObjects = [];
  for (const pageName of pages) {
    const imageObjects = await loadImagesForPage(pageName);
    allImageObjects.push(...imageObjects);
  }
  downloadText(JSON.stringify(allImageObjects), "all-images.json");
}

async function loadImagesForPage(pageName, count = 100) {
  console.log(pageName);

  const imageObjects = [];

  // Fetch the page
  const url = "https://en.wikipedia.org/api/rest_v1/page/html/" + pageName;
  const res = await fetch(url);
  const text = await res.text();
  // console.log(text);

  // Turn the page text into HTML code.
  const div = document.createElement("div");
  div.innerHTML = text;
  //de volgende afzetten als je enkel titels van links wil zien
  //en niet ook de alle andere tekst
  //   document.body.appendChild(div);

  // Get all thumbs
  let thumbs = Array.from(div.querySelectorAll(".gallerybox"));
  console.log(thumbs);
  for (const thumb of thumbs) {
    const image = thumb.querySelector("img");
    if (!image) continue;
    if (seenImages.has(image.src)) continue;
    seenImages.add(image.src);
    const captionDiv = thumb.querySelector(".gallerytext");
    let caption = "";
    if (captionDiv) {
      caption = captionDiv.textContent;
    }
    const grid = document.querySelector(".grid");
    const div = document.createElement("div");
    div.className = "image-with-caption";
    div.appendChild(image);
    const span = document.createElement("span");
    span.textContent = caption;
    div.appendChild(span);

    grid.appendChild(div);
    imageObjects.push({
      src: image.src,
      caption: caption,
      page: pageName,
    });
  }

  let images = Array.from(div.querySelectorAll("img"));
  for (const image of images) {
    if (seenImages.has(image.src)) continue;
    seenImages.add(image.src);
    const grid = document.querySelector(".grid");
    grid.appendChild(image);
    imageObjects.push({
      src: image.src,
      caption: "",
      page: pageName,
    });
  }

  // const json = [];
  // for (const pageName of pageNames) {
  //   json.push(pageName);
  // }
  // downloadText(JSON.stringify(json), "page-links.json");
  return imageObjects;
}

document.getElementById("file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log(file);
  console.log(imageUrl);
  console.log("input");
  console.log(e);
  const imageUrl = URL.createObjectURL(file);
  fetch(imageUrl)
    .then((res) => res.json())
    .then((json) => loadImagesForPages(json));
});
