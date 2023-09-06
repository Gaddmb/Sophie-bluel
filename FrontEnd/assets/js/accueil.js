/* async signifie que la function envoyé et une promesse ce qui veut dire qu'elle va transfomer notre renvoie en promesse*/
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

//** Part add picture */

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

function displayWorks() {
  getWorks().then((works) => {
    /* methode querySelector me permet le renvoie d'un element qui correspond a un selecteur CSS  */
    const gallery = document.querySelector(".gallery");
    for (let work of works) {
      const figureElement = createWorkElement(work);
      /* methode appendChild ajout un noeud a la fin de la liste des enfants d'un noeuf parent spécifié */
      gallery.appendChild(figureElement);
    }
  });
}

//** Part tab */
function displayOnglets() {
  getCategories().then((categories) => {
    const container = document.querySelector(".container-onglets");

    /* la methode createElement va me permrettre de créer un element */
    const ulElement = document.createElement("ul");

    /* la methode unshift ajoute un ou plusieurs éléments au début d'un tableau et renvoie la nouvelle longueur du tableau */
    categories.unshift({ id: -1, name: "Tous" });

    for (let categorie of categories) {
      const liElement = document.createElement("li");
      // la propriété textContent définit ou renvoie le contenu textuel du noeud spécifié et de tous ses descendants
      liElement.textContent = categorie.name;
      /* la methode setAttribute Ajoute un nouvel attribut ou change la valeur d'un attribut existant pour l'élément spécifié */
      liElement.setAttribute("id", categorie.id);
      /* la methode addEventListener attache une fonction à appeler à chaque fois que l'évènement spécifié est envoyé à la cible */
      liElement.addEventListener("click", function (event) {
        filtersWorks(event.target.id);
      });
      ulElement.appendChild(liElement);
    }

    container.appendChild(ulElement);
  });
}

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

//** Part Login  ***/

function isConnected() {
  const token = sessionStorage.getItem("token");
  /**  le !! transforme en vrai ou faux */
  return !!token;
}

function handleAdmin() {
  if (isConnected()) {
    const adminElements = document.querySelectorAll(".admin-element");
    adminElements.forEach(function (element) {
      element.classList.remove("hidden");
    });
  }
}

//** call other function en 1  */
function main() {
  displayOnglets();
  displayWorks();
  handleAdmin();
}
main();
