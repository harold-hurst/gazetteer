function createWeatherTable(countryName, forecastArray) {
  function cardsHTML(forecastArray) {
    return forecastArray
      .map((data) => {
        const date = new Date(data.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long", // Full weekday name (e.g., "Monday")
          month: "long", // Full month name (e.g., "June")
          day: "numeric", // Day of the month (e.g., "9")
        });
        const sunrise = new Date(data.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sunset * 1000).toLocaleTimeString();
        const tempDay = (data.temp.day - 273.15).toFixed(1);
        const tempMin = (data.temp.min - 273.15).toFixed(1);
        const tempMax = (data.temp.max - 273.15).toFixed(1);
        const feelsLike = (data.feels_like.day - 273.15).toFixed(1);

        const weather = data.weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

        return `
      <div class="row align-items-center mb-4 p-3 border rounded shadow-sm bg-light">

        <div class="col-2 text-center">
          <img src="${iconUrl}" alt="${
          weather.description
        }" class="img-fluid" />
          <div class="small text-muted mt-1">${weather.main}</div>
        </div>

        <div class="col-10">
          <h6>${date} – ${weather.description}</h6>
          <p class="mb-2"><em>${data.summary}</em></p>
          <div class="row small">
            <div class="col-md-4"><strong>Temp:</strong> ${tempDay}°C (min: ${tempMin}°C, max: ${tempMax}°C)</div>
            <div class="col-md-4"><strong>Feels Like:</strong> ${feelsLike}°C</div>
            <div class="col-md-4"><strong>Humidity:</strong> ${
              data.humidity
            }%</div>
            <div class="col-md-4"><strong>Rain:</strong> ${
              data.rain ?? 0
            } mm</div>
            <div class="col-md-4"><strong>Wind:</strong> ${
              data.wind_speed
            } m/s</div>
            <div class="col-md-4"><strong>Pressure:</strong> ${
              data.pressure
            } hPa</div>
            <div class="col-md-4"><strong>Sunrise:</strong> ${sunrise}</div>
            <div class="col-md-4"><strong>Sunset:</strong> ${sunset}</div>
            <div class="col-md-4"><strong>UV Index:</strong> ${data.uvi}</div>
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
              <h5 class="modal-title">${countryName} Forecast</h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">

            <div id="forecastContainer" class="container my-4">
            
              ${cardsHTML(forecastArray)}
            
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
