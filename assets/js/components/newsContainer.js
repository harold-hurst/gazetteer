function createNewsContainer(countryName, newsData) {
  function renderArticlesToHTML(articles) {
    return articles
      .map((article) => {
        const {
          title,
          description,
          url, // Correct key for the article's URL
          published, // Correct key for the published date
          image, // Correct key for image
          author,
          category, // Correct key for category (it’s an array)
        } = article;

        // Format categories if available
        const categoryList = category ? category.join(", ") : "General";

        // Format published date
        const publishedDate = new Date(published).toLocaleString();

        return `
        <div class="col-xl-6">
          <div class="card h-100 shadow-sm">
            ${
              image
                ? `<img src="${image}" class="card-img-top" alt="News image" />`
                : ""
            }
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${title}</h5>
              ${description ? `<p class="card-text">${description}</p>` : ""}
              <p class="card-text mt-auto">
                <small class="text-muted">
                  ${author ? "By " + author : "Unknown Author"}<br />
                  Categories: ${categoryList}<br />
                  ${publishedDate}
                </small>
              </p>
              <a href="${url}" target="_blank" class="btn btn-primary btn-sm mt-2">Read More</a>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  return `
        <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content shadow">
            <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Latest news in ${countryName}</h5>
            <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
            </div>
            <div class="modal-body">
            <div class="container my-4">
                <div id="news-container" class="row gy-4">
                ${renderArticlesToHTML(newsData)}
                </div>
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
