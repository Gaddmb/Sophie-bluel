/* async signifie que la function envoyé et une promesse ce qui veut dire qu'elle va transfomer notre renvoie en promesse*/
// Appels
async function getWorks() {
  // je recupere les données pour les importer dans mon code
  const res = await fetch("http://localhost:5678/api/works");
  const data = await res.json();
  return data;
}

async function getCategories() {
  const res = await fetch("http://localhost:5678/api/categories");
  const data = await res.json();
  return data;
}

//** Partie affichage image
function createWorkElement(work) {
  // je crée dans mon DOM l'element figure grace a la methode createElement que je mets dans ma variable
  const figureElement = document.createElement("figure");
  // je crée dans mon DOM l'element img grace a la methode createElement que je mets dans ma variable
  const imgElement = document.createElement("img");
  // j'insers les attribut "SRC" et "Alt"
  imgElement.setAttribute("src", work.imageUrl);
  imgElement.setAttribute("alt", work.title);
  // je crée dans mon DOM l'element figcaption grace a la methode createElement que je mets dans ma variable
  const figCaptionElement = document.createElement("figcaption");
  // j'ajoute du texte grace a propriété textContent
  figCaptionElement.textContent = work.title;
  // methode appendChild ajout un noeud a la fin de la liste des enfants d'un noeuf parent spécifié
  figureElement.appendChild(imgElement);
  figureElement.appendChild(figCaptionElement);
  return figureElement;
}

function displayWorks() {
  // call back de ma function getWorks avec sa promesse
  getWorks().then((works) => {
    // methode querySelector me permet le renvoie d'un element qui correspond a un selecteur CSS
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    // j'utilise la methode
    for (let work of works) {
      const figureElement = createWorkElement(work);
      // methode appendChild ajout un noeud a la fin de la liste des enfants d'un noeuf parent spécifié
      gallery.appendChild(figureElement);
    }
  });
}

//** Partie Onglet
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
  // filtre les objet en fonction de l'id si l'id = -1 tous les  projet sont conservés
  const worksFiltered =
    id == -1 ? works : works.filter((work) => work.categoryId == id);
  const gallery = document.querySelector(".gallery");
  // j'oublie souvent mais la propriete innerhtml réinitialise ou suppirme
  gallery.innerHTML = "";
  for (let work of worksFiltered) {
    const figureElement = createWorkElement(work);
    gallery.appendChild(figureElement);
  }
}

//** Partie Login  ***/
// localeStorage et un espace de stockage present au seins meme du navigateur
// il permet de stocket de l'information qui sera accessible dans le temps
function isConnected() {
  const token = sessionStorage.getItem("token");
  /**  le !! transforme en vrai ou faux */
  return !!token;
}

// gere l'affichage si la personne est connecté ou pas
function handleAdmin() {
  const loginLink = document.querySelector("#login-link");
  if (isConnected()) {
    loginLink.textContent = "Logout";
    loginLink.addEventListener("click", () => {
      sessionStorage.removeItem("token");
      window.location.href = "login.html";
    });
    const adminElements = document.querySelectorAll(".admin-element");
    adminElements.forEach(function (element) {
      element.classList.remove("hidden");
    });
  } else {
    loginLink.textContent = "Login";
  }
}

//** Appel de tout les Function  */
function main() {
  displayOnglets();
  displayWorks();
  handleAdmin();
}
main();
