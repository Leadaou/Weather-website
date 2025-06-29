class WeatherApp {
    constructor() {
        this.apiKey = '750b0f7881cb4934bef180146252406'; // WeatherAPI.com key
        this.weatherInfo = document.getElementById('weather-info');
        this.spinner = document.getElementById('spinner');

        const currentPage = window.location.pathname;

        if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '/weather-website/') {
            this.initHomePage();
        } else if (currentPage.includes('search.html')) {
            this.initSearchPage();
        }
    }

    showSpinner(show) {
        if (this.spinner) {
            this.spinner.style.display = show ? 'inline-block' : 'none';
        }
    }

    initHomePage() {
        this.showSpinner(true);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    await this.fetchWeatherByCoords(latitude, longitude);
                    this.showSpinner(false);
                },
                () => {
                    this.weatherInfo.innerHTML = `<p class="text-danger">Unable to access location. Please allow it.</p>`;
                    this.showSpinner(false);
                }
            );
        } else {
            this.weatherInfo.innerHTML = `<p class="text-danger">Geolocation not supported by your browser.</p>`;
            this.showSpinner(false);
        }
    }

    initSearchPage() {
        const form = document.getElementById('search-form');
        const input = document.getElementById('city-input');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const city = input.value.trim();
            if (city === '') return;

            this.weatherInfo.innerHTML = '';
            this.showSpinner(true);
            await this.fetchWeatherByCity(city);
            this.showSpinner(false);
        });
    }

    async fetchWeatherByCoords(lat, lon) {
        try {
            const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            this.weatherInfo.innerHTML = `<p class="text-danger">Could not load weather data for your location.</p>`;
            console.error(error);
        }
    }

    async fetchWeatherByCity(city) {
        try {
            const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${encodeURIComponent(city)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            this.weatherInfo.innerHTML = `<p class="text-danger">❌ Sorry, could not find weather for "${city}".</p>`;
            console.error(error);
        }
    }

    displayWeather(data) {
        const { location, current } = data;
        this.weatherInfo.innerHTML = `
            <h3>📍 Weather in ${location.name}, ${location.country}</h3>
            <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${current.condition.text}</p>
            <img src="https:${current.condition.icon}" alt="${current.condition.text}" />
            <p><strong>Humidity:</strong> ${current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${current.wind_kph} km/h</p>
        `;
    }
}

// Start the app
window.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
