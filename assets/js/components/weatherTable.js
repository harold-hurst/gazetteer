function createWeatherTable(countryName, forecastArray) {
  function cardsHTML(forecastArray) {
    return forecastArray
      .map((data) => {
        const date = new Date(data.dt * 1000).toLocaleString();
        const tempC = (data.main.temp - 273.15).toFixed(1);
        const feelsLikeC = (data.main.feels_like - 273.15).toFixed(1);
        const weather = data.weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

        return `

     <div class="col">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">
              <img src="${iconUrl}" alt="${weather.description}" class="me-2" />
              ${weather.main}
            </h5>
            <p class="card-text text-muted">${weather.description}</p>
            <ul class="list-group list-group-flush small">
              <li class="list-group-item"><strong>Date:</strong> ${date}</li>
              <li class="list-group-item"><strong>Temp:</strong> ${tempC}°C (Feels like: ${feelsLikeC}°C)</li>
              <li class="list-group-item"><strong>Humidity:</strong> ${data.main.humidity}%</li>
              <li class="list-group-item"><strong>Wind:</strong> ${data.wind.speed} m/s</li>
              <li class="list-group-item"><strong>Clouds:</strong> ${data.clouds.all}%</li>
              <li class="list-group-item"><strong>Pressure:</strong> ${data.main.pressure} hPa</li>
            </ul>
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

            <div id="forecastContainer" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-3">
            
              ${cardsHTML(forecastArray)}
            
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
