import "regenerator-runtime/runtime";

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

async function getPage(pageName, count = 100) {
  console.log(pageName);

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

  // Get all links
  let links = Array.from(div.querySelectorAll('a[rel="mw:WikiLink"]'));

  // FIX THIS CATO
  //   links = links.filter((link) => !link.title.includes("page does not exist"));

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

  for (const pageName of pageNames) {
    // Show the first link as a <li> tag
    const pageNameDiv = document.createElement("div");
    pageNameDiv.innerHTML = pageName;
    document.body.appendChild(pageNameDiv);
  }

  const json = [];
  for (const pageName of pageNames) {
    json.push(pageName);
  }
  downloadText(JSON.stringify(json), "page-links.json");

  //   if (count > 0) {
  //     getPage(firstPageName, count - 1);
  //   }
}

// getPage("catalogue");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(e);
  const form = e.target;
  const pageName = form.elements.pageName.value;
  if (!pageName) return;
  console.log(pageName);
  getPage(pageName);
});
