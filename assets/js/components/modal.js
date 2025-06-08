function createCard(string, countryInfo) {
  function tableRows(dataObject) {
    console.log(dataObject);

    const orderedKeys = [
      "flag",
      "capital",
      "region",
      "population",
      "area",
      "currencies",
      "continents",
    ];

    return orderedKeys
      .map((key) => {
        let value = dataObject[key];

        // Skip if key is not in object or value is null/undefined
        if (value === undefined || value === null) return "";

        // Format arrays or objects for display
        if (Array.isArray(value)) {
          value = value.join(", ");
        } else if (typeof value === "object") {
          // e.g. currencies might be an object: { EUR: { name: "Euro", ... } }
          value = Object.values(value)
            .map((v) => v.name || JSON.stringify(v))
            .join(", ");
        }

        // Optionally format numbers (like population, area)
        if (typeof value === "number") {
          value = value.toLocaleString();
        }

        const label = key.charAt(0).toUpperCase() + key.slice(1);

        return `
        <tr>
          <td class="text-center">
            <i class="fa-solid fa-street-view fa-xl text-success"></i>
          </td>
          <td>${label}</td>
          <td class="text-end">${value}</td>
        </tr>
      `;
      })
      .join("");
  }

  return `

        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content shadow">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title">${countryInfo.name.common} ${string}</h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table class="table table-striped">
              ${tableRows(countryInfo)}
              </table>
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
        </div>`;
}
