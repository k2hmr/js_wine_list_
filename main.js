const makeWineList = async (wineType) => {
  const apiURL = `https://api.sampleapis.com/wines/${wineType}`;
  const resp = await fetch(apiURL);
  const data = await resp.json();

  const wineList = document.getElementsByClassName("wine_list")[0];
  while (wineList.firstChild) {
    wineList.removeChild(wineList.firstChild);
  }

  for (let i = 0; i < data.length; i++) {
    const listItem = document.createElement("li");
    const wineName = document.createElement("p");
    const winery = document.createElement("div");
    const location = document.createElement("div");
    const reviews = document.createElement("div");
    wineName.innerHTML = `名前: ${data[i].wine}`;
    winery.innerHTML = `ワイナリー: ${data[i].winery}`;
    location.innerHTML = `住所: ${data[i].location}`;
    reviews.innerHTML = `評価した人数: ${data[i].rating.reviews.replace(
      " ratings",
      "人"
    )}`;
    const wineImg = document.createElement("img");
    const stars = document.createElement("div");
    stars.className = "stars";
    for (let j = 0; j < Math.floor(data[i].rating.average); j++) {
      const starImg = document.createElement("img");
      starImg.src = "./star.jpg";
      stars.appendChild(starImg);
    }
    wineImg.src = data[i].image;
    listItem.appendChild(wineName);
    listItem.appendChild(wineImg);
    listItem.appendChild(winery);
    listItem.appendChild(location);
    listItem.appendChild(stars);
    listItem.appendChild(reviews);
    wineList.appendChild(listItem);
  }
};

const selectWine = async (selected) => {
  const spinner = document.getElementById("loading");
  spinner.classList.remove("loaded");
  setTimeout(() => {
    spinner.classList.add("loaded");
  }, 4000);
  selected.checked && makeWineList(selected.value);
};

window.onload = async () => {
  makeWineList("reds");
};
