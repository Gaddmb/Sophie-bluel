async function getWorks() {
  const res = await fetch("http://localhost:5678/api/works");
  const data = await res.json();
  return data;
}

async function getCategories() {
  const res = await fetch("http://localhost:5678/api/categories");
  const data = await res.json();
  return data;
}

function displayWorks() {
  getWorks().then((works) => {
    const gallery = document.querySelector(".gallery");
    for (let work of works) {
      const figureElement = createWorkElement(work);
      gallery.appendChild(figureElement);
    }
  });
}
displayWorks();


function displayOnglets() {
  getCategories().then((categories) => {
    const container = document.querySelector(".container-onglets");

    const ulElement = document.createElement("ul");
    
    categories.unshift({ id: -1, name: "Tous" });

    for (let categorie of categories) {
      const liElement = document.createElement("li");

      liElement.textContent = categorie.name;
      liElement.setAttribute("id", categorie.id);
      liElement.addEventListener("click", function (event) {
        filtersWorks(event.target.id);
      });
      ulElement.appendChild(liElement);
     
     
    }


    container.appendChild(ulElement);
  });
}

displayOnglets();

async function filtersWorks(id) {
  const works = await getWorks();

  const worksFiltered =
    id == -1 ? works : works.filter((work) => work.categoryId == id);
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let work of worksFiltered) {
    const figureElement = createWorkElement(work);
    gallery.appendChild(figureElement);
  }
}

function createWorkElement(work) {
  const figureElement = document.createElement("figure");

  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", work.imageUrl);
  imgElement.setAttribute("alt", work.title);

  const figCaptionElement = document.createElement("figcaption");
  figCaptionElement.textContent = work.title;

  figureElement.appendChild(imgElement);
  figureElement.appendChild(figCaptionElement);
  return figureElement;
}




