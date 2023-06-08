let works = []

document.addEventListener('DOMContentLoaded', () => {
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
    const filter = works.filter()
        displayImages(filter);
  }

  function displayImages(imagesData) {
    galleryContainer.innerHTML = '';

    imagesData.forEach(imageData => {
      console.log(imageData)
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

