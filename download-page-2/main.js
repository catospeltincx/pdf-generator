import "regenerator-runtime/runtime";

const seen = [];
async function getPage(pageName, count = 20) {
  console.log(pageName);

  // Note that we've seen this page.
  seen.push(pageName);

  // Fetch the page
  const url = "https://en.wikipedia.org/api/rest_v1/page/html/" + pageName;
  const res = await fetch(url);
  const text = await res.text();
  // console.log(text);

  // Turn the page text into HTML code.
  const div = document.createElement("div");
  div.innerHTML = text;
  document.body.appendChild(div);

  // Get all links
  let links = Array.from(div.querySelectorAll('a[rel="mw:WikiLink"]'));

  // FIX THIS CATO
  links = links.filter((link) => !link.title.includes("page does not exist"));

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
  pageNames = pageNames.filter((pageName) => !seen.includes(pageName));

  const firstPageName = pageNames[0];

  // Show the first link as a <li> tag
  const pageNameDiv = document.createElement("div");
  pageNameDiv.innerHTML = firstPageName;
  document.body.appendChild(pageNameDiv);

  if (count > 0) {
    getPage(firstPageName, count - 1);
  }
}

getPage("bean");
