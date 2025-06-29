# Weather-website
Lea Daou
-> A simple weather web application that shows the current weather based on the user's location or a searched city. Built using JavaScript, HTML, and CSS with data powered by [WeatherAPI.com](https://weatherapi.com/).
-> API Used: https://api.weatherapi.com/v1/current.json , WeatherAPI.com
-> Brief: Homepage automatically detect the user's location using Geolocation API and request weather data via WeatherAPI then display the weather info such as city and country, Temperature, weather condition + icon, wind speed and humidity. 
Search page: where the user can manually search for weather by city name. 
Contact us page: where they can request something by contacting us. 
-> Custom requirement: Spinner shown while API request is pending, hidden when complete. 
On the homepage:
  - The spinner appears while waiting for the user to give location access.
  - Once permission is granted (or denied), the spinner is hidden.
  On the search page:
  - Spinner appears during API requests and disappears once data is loaded.
