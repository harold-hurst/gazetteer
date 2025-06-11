function createPhotoCarousel(countryName, photoArray) {
function itemHTML(photoArray) {
  return photoArray
    .map((data, index) => {
      // Get the correct image source, alt text, and link
      const imageSrc = data.webformatURL;
      const altText = data.tags || "Image from Pixabay";
      const photoLink = data.pageURL;

      // If it's the first item, make it active by default
      const activeClass = index === 0 ? 'active' : '';

      return `
        <div class="carousel-item ${activeClass}" data-bs-interval="4000">
            <div class="carousel-image-container">
            <img src="${imageSrc}" class="d-block w-100" alt="${altText}">
            </div>
          <div class="carousel-caption d-none d-md-block">
            <p></p>
          </div>
        </div>
      `;
    })
    .join('');
}


  return `
    <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content shadow">
        <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Photos of ${countryName}</h5>
        <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
        ></button>
        </div>
        <div class="modal-body">
        <div
            id="carouselExampleInterval"
            class="carousel slide"
            data-bs-ride="carousel"
        >
            <div class="carousel-inner">${itemHTML(photoArray)}</div>
            <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
            >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
            >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>
        </div>
        <div class="modal-footer">
        <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            data-bs-dismiss="modal"
        >
            Close
        </button>
        </div>
    </div>
    </div>
  `;
}







