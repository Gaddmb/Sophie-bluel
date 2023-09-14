function displayModalWorks() {
  getWorks().then((works) => {
    /* methode querySelector me permet le renvoie d'un element qui correspond a un selecteur CSS  */
    const galleryModal = document.querySelector(".modal-img-container");

    galleryModal.innerHTML = "";
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
  iconeElement.setAttribute("data-id", work.id);
  figCaptionElement.textContent = "éditer";
  figureElement.appendChild(imgElement); //__ on ajout nos balise dans la balise parente
  figureElement.appendChild(figCaptionElement); //__ pareil
  figureElement.appendChild(iconeElement); //__ pareil
  iconeElement.addEventListener("click", removeProject);
  return figureElement;
}

// gere tout les actions relative a la modal
function handleModal() {
  const closeModalElements = document.querySelectorAll(".close-modal");
  const openMainModal = document.querySelector(".modal-btn-title");
  const addImg = document.querySelector(".modal-add .add-picture");
  const inputFile = document.querySelector(".img-selected");
  const addPictureButton = document.querySelector(".add-picture.modal-trigger");
  const modalAdd = document.querySelector(".modal-container.modal-add");
  const backModalButton = document.querySelector(".back-modal");
  const galleryModal = document.querySelector(".modal-main");
  const addProjectForm = document.getElementById("add-project-form");

  // even me renvoie a l'autre modal
  addPictureButton.addEventListener("click", () => {
    modalAdd.classList.remove("hidden");
    galleryModal.classList.add("hidden");
  });

  backModalButton.addEventListener("click", () => {
    modalAdd.classList.add("hidden");
    galleryModal.classList.remove("hidden");
  });

  // Event pour supprimer les images
  addImg.addEventListener("click", () => {
    const inputFile = document.querySelector(".img-selected");
    inputFile.click();
  });

  inputFile.addEventListener("change", function (event) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const placeholder = document.querySelector(".placeholder");
      const url = URL.createObjectURL(file);
      placeholder.setAttribute("src", url);
      const disappearsBalise = document.getElementById("disappears-balise");
      disappearsBalise.style.display = "none";
    }
  });

  // Even pour Ouvrir le modal
  openMainModal.addEventListener("click", () => {
    document.querySelector(".modal-main").classList.remove("hidden");
  });

  // Even pour fermer les modal
  closeModalElements.forEach((element) => {
    element.addEventListener("click", (event) => {
      // correspond a mon bouton close modal
      event.target.closest(".modal-container").classList.add("hidden");
    });
  });

  addProjectForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const categorie = document.getElementById("categorie").value;
    const imageFile = document.querySelector(".img-selected").files[0];
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", categorie);
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.status === 201) {
        // display et appelée apres verification de ma réponse
        displayModalWorks();
        displayWorks();

        // Réinitialise le champ titre
        document.getElementById("title").value = ""; 
        // Réinitialise le champ catégorie
        document.getElementById("categorie").value = ""; 
        // Réinitialise l'image
        document.querySelector(".placeholder").setAttribute("src", "");

        const modalAdd = document.querySelector(".modal-container.modal-add");
        modalAdd.classList.add("hidden");
      } else {
        // Gérez les erreurs
        console.error("Erreur lors de l'ajout du projet");
      }
    } catch (error) {
      console.error("Erreur lors de la requête : ", error);
    }
  });
}

// supprimer les images
async function removeProject(event) {
  const id = event.target.dataset.id;
  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
  if (response.status == 204) {
    displayModalWorks();
  }
}

function main() {
  displayModalWorks();
  handleModal();
}

main();
