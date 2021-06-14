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

//geen dubbele images van de verschillende fetches in de lijst hebben
//als die er al is, overslaan
const seenImages = new Set();

// een json lijst maken van al die images
async function loadImagesForPages(pages) {
  // console.log(pages);
  const allImageObjects = [];
  //voor elke pagina alle images loaden
  for (const pageName of pages.slice(0, 100)) {
    const imageObjects = await loadImagesForPage(pageName);
    //om lijst in lijst te vermijden
    //steek de elementen van de lijst erin
    allImageObjects.push(...imageObjects);
  }
  //verander hier de file name
  downloadText(JSON.stringify(allImageObjects), "images.json");
}
//(, count)
async function loadImagesForPage(pageName) {
  // console.log(pageName);

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
  //document.body.appendChild(div);

  // Get all thumbs
  let thumbs = Array.from(div.querySelectorAll(".gallerybox"));
  console.log(thumbs);

  //alle images met captions bij
  for (const thumb of thumbs) {
    //alle images aanduiden
    const image = thumb.querySelector("img");
    console.log("image");
    //als er geen image is in een gallery box --> skip
    if (!image) continue;
    if (seenImages.has(image.src)) continue;
    seenImages.add(image.src);
    //get the captions
    const captionDiv = thumb.querySelector(".gallerytext");
    //kijken of die caption div echt bestaat
    //en daar dan de caption uithalen
    let caption = "";
    if (captionDiv) {
      caption = captionDiv.textContent;
    }

    //opzoek naar het grid
    const grid = document.querySelector(".grid");
    //per beeld een div
    const div = document.createElement("div");
    //naam div die we in css dus kunnen aanspreken
    div.className = "image-with-caption";
    div.appendChild(image);
    const span = document.createElement("span");
    //span.textContent = caption;
    div.appendChild(span);
    //alle gegevens die we van die image bijhouden
    grid.appendChild(div);
    imageObjects.push({
      src: image.src,
      caption: caption,
      page: pageName,
    });
  }

  //ook alle images die we ervoor overgeslagen hebben
  //die geen captions hebben
  //ALLE images,
  //Ook icoontjes enzo
  let images = Array.from(div.querySelectorAll("img"));
  for (const image of images) {
    //de images die we al gezien hebben niet dubbel nemen
    if (seenImages.has(image.src)) continue;
    //toevoegen aan de lijst van images die we al gemaakt hebben
    seenImages.add(image.src);
    const grid = document.querySelector(".grid");
    grid.appendChild(image);
    imageObjects.push({
      src: image.src,
      caption: "",
      page: pageName,
    });
  }

  //download json
  //why is this here?
  //first there was 'pageName' instead of 'thumb'
  // const json = [];
  // for (const thumb of thumbs) {
  //   json.push(thumb);
  // }
  // downloadText(JSON.stringify(json), "images.json");

  //
  return imageObjects;
}

// een input veld, search bar die vertrekt vanaf een file
document.getElementById("file").addEventListener("change", (e) => {
  //files 'toelaten'
  //wij laten er hier maar eentje toe
  //haalt de files eruit
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

// const jsonUrl = "/data/page-links-to-test.json";
// fetch(jsonUrl)
//   .then((res) => res.json())
//   .then((json) => loadImagesForPages(json));
