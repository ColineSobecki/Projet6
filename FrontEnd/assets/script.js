let works = [];
const token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', () => {

  const publishBar = document.getElementById('publish_bar');

  if (token) {
    publishBar.classList.remove('publish_bar_show'); 
  } else {
    publishBar.classList.add('publish_bar_show'); 
  }

  const filterBoxes = document.querySelectorAll('.box');
  const galleryContainer = document.querySelector('.gallery');

  filterBoxes.forEach(filterBox => {
    filterBox.addEventListener('click', () => {
      const selectedCategory = filterBox.textContent;
      fetchImagesByCategory(selectedCategory);
    });
  });

  fetch('http://localhost:5678/api/categories/')
    .then(response => response.json())
    .then(data => {
      filterBoxes.forEach(filterBox => {
        filterBox.addEventListener('click', () => {
          const selectedCategory = filterBox.textContent;
          fetchImagesByCategory(selectedCategory);
        });
      });
    })
    .catch(error => {
      console.error('Erreur:', error);
    });

  fetch('http://localhost:5678/api/works/')
    .then(response => response.json())
    .then(data => {
      works = data;
      displayImages(data);
    })
    .catch(error => {
      console.error('Erreur:', error);
    });

  function fetchImagesByCategory(category) {
    const filter = works.filter();
    displayImages(filter);
  }

  function displayImages(imagesData) {
    galleryContainer.innerHTML = '';

    imagesData.forEach(imageData => {
      console.log(imageData);
      const imgElement = document.createElement('img');
      imgElement.src = imageData.imageUrl;
      imgElement.alt = imageData.title;

      const figureElement = document.createElement('figure');
      figureElement.appendChild(imgElement);

      const figcaptionElement = document.createElement('figcaption');
      figcaptionElement.textContent = imageData.title;
      figureElement.appendChild(figcaptionElement);

      galleryContainer.appendChild(figureElement);
      
    });
  }
});

const addButton = document.getElementById('add_button');

addButton.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', '');
    formData.append('category', '');

    try {
      const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        fetchImages();
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  });
  //fileInput.click();
});



function fetchImages() {
  fetch('http://localhost:5678/api/works/')
    .then(response => response.json())
    .then(data => {
      displayImages(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Images de la modale
function displayImages(imagesData) {
  const galleryContainer = document.getElementById('photo');
  galleryContainer.innerHTML = '';

  imagesData.forEach(imageData => {
    const imgElement = document.createElement('img');
    imgElement.src = imageData.imageUrl;
    imgElement.alt = imageData.title;

    const figureElement = document.createElement('figure');
    figureElement.appendChild(imgElement);

    // Bouton poubelle pour supprimer les images
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    
    deleteButton.addEventListener('click', () => {
      deleteImageFromModal(imageData.id);
    });

    figureElement.appendChild(deleteButton);

    galleryContainer.appendChild(figureElement);
  });
}

function deleteImageFromModal(imageId) {
  fetch(`http://localhost:5678/api/works/${imageId}`, {
    method: 'DELETE',
    headers: {   
    Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.ok) {
        // Supprimer l'image du tableau imagesData
        imagesData = imagesData.filter(imageData => imageData.id !== imageId);
        displayImages(imagesData);
      } else {
        console.error('Error deleting image:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting image:', error);
    });
}


fetchImages();

//Ouvrir et fermer la modale
const editMode = document.getElementById('edit_mode');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal_content');

editMode.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Add event listener to close the modal
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal || event.target === modalContent) {
    modal.style.display = 'none';
  }
});


const addPhotoButton = document.getElementById('add_button');
const addModal = document.getElementById('add_modal');
const mainModal = document.getElementById('modal'); 



addPhotoButton.addEventListener('click', () => {
  addModal.style.display = 'block';
  mainModal.style.display = 'none'; 
});


const addModalCloseBtn = document.querySelector('#add_modal .close');

addModalCloseBtn.addEventListener('click', () => {
  addModal.style.display = 'none';
});

const previousArrow = document.querySelector('#add_modal .previous_arrow');

previousArrow.addEventListener('click', () => {
  addModal.style.display = 'none';
  modal.style.display = 'block';
});

// Sélection de l'input et du menu déroulant
const categoryInput = document.getElementById('category');
const dropdownMenu = document.getElementById('category-dropdown');

// Ajout d'un gestionnaire d'événements au changement de l'input
categoryInput.addEventListener('change', () => {
  const selectedCategory = categoryInput.value;
  console.log(selectedCategory);
});

// Appel de l'API Swagger pour récupérer les catégories
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    // Appel de la fonction pour afficher les catégories dans le menu déroulant
    displayCategories(categories);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des catégories:', error);
  });

// Fonction pour afficher les catégories dans un menu déroulant
function displayCategories(categories) {
  dropdownMenu.innerHTML = '';

  // Créer une option vide par défaut
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  dropdownMenu.appendChild(defaultOption);

  // Créer une option pour chaque catégorie
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    dropdownMenu.appendChild(option);
  });
}





