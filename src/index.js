let imagesContainer = document.querySelector("#dog-image-container");
let ul = document.querySelector("#dog-breeds");
let dogBreeds;

fetch("https://dog.ceo/api/breeds/image/random/4")
  .then((res) => res.json())
  .then((data) => {
    // let info = Object.entries(data);
    // console.log(data.message);

    data.message.forEach((dogUrl) => {
      let image = document.createElement("img");
      image.setAttribute("src", dogUrl);
      //   image.src = dogUrl;
      imagesContainer.appendChild(image);
    });
  });

fetch("https://dog.ceo/api/breeds/list/all")
  .then((res) => res.json())
  .then((data) => {
    dogBreeds = Object.keys(data.message);

    dogBreeds.forEach((dogbreed) => {
      let li = document.createElement("li");
      li.textContent = dogbreed;
      ul.appendChild(li);

      li.addEventListener("click", () => {
        li.style.color === "blue"
          ? (li.style.color = "black")
          : (li.style.color = "blue");
      });
    });
  });

let dropdown = document.querySelector("#breed-dropdown");

dropdown.addEventListener("change", (event) => {
  makeFetch().then((res) => {
    dogBreeds = Object.keys(res.message);

    let filterArray = dogBreeds.filter((breed) => {
      return breed.startsWith(event.target.value);
    });

    ul.innerHTML = "";
    filterArray.forEach((breed) => {
      let li = document.createElement("li");
      li.textContent = breed;
      ul.appendChild(li);

      li.addEventListener("click", () => {
        li.style.color === "blue"
          ? (li.style.color = "black")
          : (li.style.color = "blue");
      });
    });
  });
});

function makeFetch() {
  return fetch("https://dog.ceo/api/breeds/list/all").then((res) => res.json());
}
