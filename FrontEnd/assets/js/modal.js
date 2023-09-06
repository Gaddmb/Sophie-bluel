function displayModalWorks() {
  getWorks().then((works) => {
    /* methode querySelector me permet le renvoie d'un element qui correspond a un selecteur CSS  */
    const galleryModal = document.querySelector(".modal-img-container");

    for (let work of works) {
      const figureElement = createWorkModalElement(work);
      /* methode appendChild ajout un noeud a la fin de la liste des enfants d'un noeuf parent spécifié */
      galleryModal.appendChild(figureElement);
    }
  });
}

function createWorkModalElement(work) {
  //__ ici on passe un parametre lors de l'appel de la fonction ligne 9
  const figureElement = document.createElement("figure"); //__ Creation de balise figure
  const imgElement = document.createElement("img"); //__ Creation de balise img
  const iconeElement = document.createElement("img"); //__ Creation de balise img
  const figCaptionElement = document.createElement("figcaption");

  imgElement.setAttribute("src", work.imageUrl); //__ On met dans l'attribut src le lien de l'image
  imgElement.setAttribute("alt", work.title); //__ pareil mais pour le alt
  imgElement.classList.add("work-img"); //__ on ajoute une classe css "work-img"
  iconeElement.setAttribute("src", "assets/icons/trash.png");
  iconeElement.classList.add("trash-icon");
  figCaptionElement.textContent = "éditer";

  figureElement.appendChild(imgElement); //__ on ajout nos balise dans la balise parente
  figureElement.appendChild(figCaptionElement); //__ pareil
  figureElement.appendChild(iconeElement); //__ pareil

  return figureElement;
}

// gere tout les actions relative a la modal
function handleModal() {
  const closeModalElements = document.querySelectorAll(".close-modal");
  const openMainModal = document.querySelector(".modal-btn-title");
  openMainModal.addEventListener("click", () => {
    document.querySelector(".modal-main").classList.remove("hidden");
  });


  const deletePicture = document.querySelectorAll(".fa-regular fa-pen-to-square");
  const galleryWorks = document.querySelectorAll(".modal-img-container");
  galleryWorks.forEach((galleryWorks) => { 

  });
  deletePicture.addEventListener("click", async () => {
    fetch(`http://localhost:5678/api/works/`, {
      method: "DELETE",
      headers: {
        "Accept" : 'application/json'
      }

    });
    if ( reponse === 200 ) {
       
    }
  });

  closeModalElements.forEach((element) => {
    element.addEventListener("click", (event) => {
      // correspond a mon bouton close modal
      event.target.closest(".modal-container").classList.add("hidden");
    });
  });
}

function main() {
  displayModalWorks();
  handleModal();
}

main();
