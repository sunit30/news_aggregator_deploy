//  Enter your JS code here

//passed all tests in actual code;cannot use multiple classes/images
let test_var = ``;
for (let i = 0; i < 20; i++) {
  test_var += `<li class="article" style="display: none;">
<img src="" alt="" class="article-img" style="display: none;" />
<h2 class="article-title" style="display: none;"></h2>
<p class="article-description" style="display: none;"></p>
<span class="article-author" style="display: none;"></span>
<a href="" class="article-link" style="display: none;"></a>
</li>`;
}
//document.querySelector(`ul[style = "display: none;"]`).innerHTML = test_var;

//display news on page load
document.getElementById("display").innerHTML = `-- Top Headlines --`;
window.addEventListener("load", load_func);
let search_text = `svc/topstories/v2/arts.json?`;
const key = `9DaPmZcGWgK0GxGP1ehuEUbEjIF8LbkN`;

async function load_func() {
  document.getElementsByClassName(
    "card-deck"
  )[0].innerHTML = `<div id="loader"></div>`;

  let response = await fetch(
    `https://api.nytimes.com/${search_text}api-key=${key}`
  );

  let data = await response.json();
  let output = ``;

  if (data.response) {
    if (data.response.docs.length) {
      // console.log(
      //   "docs",
      //   `"https://static01.nyt.com/"${data.response.docs[0].multimedia[3].url}`
      // );

      data.response.docs.forEach((item, i) => {
        output += `<li class="card shadow article" id="news_card">`;
        if (data.response.docs[i].multimedia[0]) {
          output += `<img src=https://static01.nyt.com/${data.response.docs[i].multimedia[0].url} class="article-img card-img-top" alt="news_image"/>`;
        } else {
          output += `<img src=# class="article-img card-img-top" alt="news_image" style="height:200px;"/>`;
        }
        output += `<a href=${data.response.docs[i].web_url} class="article-link" target="_blank">`;

        output += `<div class="card-body" id="card_main">`;
        output += `<h2 class="card-title article-title">${data.response.docs[i].headline["main"]}</h2>`;
        output += `<p class="card-text article-description">${data.response.docs[i].abstract}</p>`;
        output += `<p class="card-text" id="text_author"><span class="article-author"> - ${data.response.docs[i].byline["original"]}</span></p>`;
        output += `</div>`;

        output += `</a>`;
        output += `</li>`;
      });

      document.getElementsByClassName("card-deck")[0].innerHTML = output;
    } else {
      output = `No article was found based on the search.`;
      document.getElementById("display").innerHTML = output;
      document.getElementsByClassName("card-deck")[0].innerHTML = ``;
    }
  }
  if (!data.results && !data.response) {
    output = `No article was found based on the search.`;
    document.getElementById("display").innerHTML = output;
    document.getElementsByClassName("card-deck")[0].innerHTML = ``;
  } else {
    console.log("results", data.results);
    if (data.results) {
      data.results.forEach((item, i) => {
        output += `<li class="card shadow article" id="news_card">`;

        if (
          data.results[i].multimedia[3]["url"].includes(
            "https://static01.nyt.com/"
          )
        ) {
          output += `<img src=${data.results[i].multimedia[3]["url"]} class="article-img card-img-top" alt="news_image"/>`;
        } else {
          output += `<img src=https://static01.nyt.com/${data.results[i].multimedia[0]["url"]} class="article-img card-img-top" alt="news_image"/>`;
        }
        output += `<a href=${data.results[i].url} class="article-link" target="_blank">`;

        output += `<div class="card-body" id="card_main">`;
        output += `<h2 class="card-title article-title">${data.results[i].title}</h2>`;
        output += `<p class="card-text article-description">${data.results[i].abstract}</p>`;
        output += `<p class="card-text" id="text_author"><span class="article-author"> - ${data.results[i].byline}</span></p>`;
        output += `</div>`;

        output += `</a>`;
        output += `</li>`;
      });

      document.getElementsByClassName("card-deck")[0].innerHTML = output;
    }
  }
}

document.getElementById("search").addEventListener("keyup", search_func); //display on enter key press

function search_func(keyletter) {
  let val = keyletter.target.value;

  if (keyletter.which == 13) {
    document.title = `${val}`; // change the doc title according to search
    if (val === "") {
      search_text = `svc/topstories/v2/arts.json?`;
      document.getElementById("display").innerHTML = `-- Top Headlines --`;
      load_func();
    } else {
      search_text = `svc/search/v2/articlesearch.json?q=${val}&`;
      console.log("search text", search_text);
      load_func();
      document.getElementById(
        "display"
      ).innerHTML = `-- Search results for : ${val} --`;
    }
  }
}

document.getElementById("check").addEventListener("click", theme_func); //dark mode
function theme_func(val) {
  if (val.target.checked) {
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "./dark.css";
    document.head.appendChild(link);
  } else {
    let sheet = document.querySelector(`link[href="./dark.css"]`);
    if (sheet) {
      // if sheet exists
      sheet.disabled = true;
      sheet.parentNode.removeChild(sheet);
    }
  }
}
document.getElementById("head_div").addEventListener("click", logo_func); //display on logo click
function logo_func() {
  search_text = `svc/topstories/v2/arts.json?`;
  document.getElementById("display").innerHTML = `-- Top Headlines --`;
  load_func();
}
