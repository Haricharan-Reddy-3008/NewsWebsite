const apikey = "9f2dc5470f2f484fba523b2c2eeb96a8";
const url = "https://newsapi.org/v2/everything?q=";
let inputField = document.getElementById("inp");
let loader = document.getElementById("ld");
let btn = document.getElementById("btn");
let fin = document.getElementById("fin");
let pol = document.getElementById("pol");
let tech = document.getElementById("tech");
let logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  fetchNnews("Computer Science engineering");
});
window.addEventListener("load", () => {
  fetchnews("Computer Science engineering");
});

fin.addEventListener("click", () => {
  fetchNnews("finance");
});
pol.addEventListener("click", () => {
  fetchNnews("politics");
});
tech.addEventListener("click", () => {
  fetchNnews("technology");
});

async function fetchnews(query) {
  loader.style.visibility = "visible";

  try {
    const res = await fetch(`${url}${query}&apiKey=${apikey}`);
    const data = await res.json();
    console.log(data);

    // Bind the fetched data
    binddata(data.articles);
  } catch (error) {
    console.error("Error fetching the news:", error);
    alert("Error fetching the news. Please try again later.");
  } finally {
    // Hide loader after fetching
    loader.style.visibility = "hidden";
    window.scrollTo(0, 0);
  }
}
btn.addEventListener("click", () => {
  const query = inputField.value.trim();
  console.log("Input Value:", query);

  if (query) {
    fetchNnews(query);
  } else {
    console.log("No input provided.");
    alert("No input provided.");
  }
  inputField.value = "";
});

async function fetchNnews(query) {
  loader.style.visibility = "visible";
  document.body.style.visibility = "hidden";
  try {
    const res = await fetch(`${url}${query}&apiKey=${apikey}`);
    const data = await res.json();
    console.log(data);

    // Bind the fetched data
    binddata(data.articles);
  } catch (error) {
    console.error("Error fetching the news:", error);
    alert("Error fetching the news. Please try again later.");
  } finally {
    // Hide loader after fetching
    loader.style.visibility = "hidden";
    document.body.style.visibility = "visible";
    window.scrollTo(0, 0);
  }
}

function binddata(articles) {
  const cardscont = document.getElementById("cardscontainer");
  const template = document.getElementById("tem");

  cardscont.innerHTML = ""; // Clear previous articles
  articles.forEach((article) => {
    if (!article.urlToImage) return; // Skip if there's no image
    const cardclone = template.content.cloneNode(true);
    filldata(cardclone, article);
    cardscont.appendChild(cardclone); // Append cloned template to container
  });
}

function filldata(cardclone, article) {
  const newsimg = cardclone.querySelector("#nwsimg");
  const newssrc = cardclone.querySelector("#source");
  const newstitle = cardclone.querySelector("#title");
  const newsmatter = cardclone.querySelector("#matter");
  const newslink = cardclone.querySelector(".news");
  newsimg.src = article.urlToImage;
  newstitle.textContent = article.title;
  newssrc.textContent = article.publishedAt;
  newsmatter.textContent = article.description;

  newslink.addEventListener("click", () => {
    window.location.href = article.url;
  });
}
