function createCurrencyCard(countryName, currencyObject, flag) {

  const currency = Object.keys(currencyObject)[2];

  const currencyName = currencyObject.name;
  console.log(countryName);
const currencySymbol = currencyObject.symbol;

  let rate = currencyObject[currency];
  rate = 1 / rate;
  rate = parseFloat(rate.toFixed(3));

  return `
    <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content shadow">
        <div class="modal-header bg-primary text-white align-items-start">

        <div class="w-100">
            <h5 class="modal-title">Currency in ${countryName}: </h5>
            <h6>Exchange rate for ${currencyName} (${currencySymbol})</h6>
        </div>

        <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
        ></button>
        </div>
        <div class="modal-body">
        <div
            class="w-100 d-inline-flex mb-4 p-3 border rounded shadow-sm bg-light"
        >
            <span class="flex-fill">${currencyName} [${currency}]: </span>
            <span class="mx-2">$${rate} [USD]</span>
            <span>${flag}</span>
        </div>
        </div>
        <div class="modal-footer">
        <button
            id="responsiveBtn"
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
