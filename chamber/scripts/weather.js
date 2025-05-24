document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '8bade8ca64d1617b40bfca8acd5704f4'; // Replace with your actual API key
    const city = 'Carignan';
    const country = 'CA'; // Canada country code
    const units = 'metric'; // Celsius for Canada
    
    // Fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${units}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) throw new Error('Weather data unavailable');
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            document.getElementById('current-weather').innerHTML = `
                <div class="error">Current weather unavailable</div>
            `;
        });
    
    // Fetch 5-day forecast (3-hour intervals)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${units}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) throw new Error('Forecast unavailable');
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            document.getElementById('weather-forecast').innerHTML = `
                <div class="error">Weather forecast unavailable</div>
            `;
        });
    
    function displayCurrentWeather(data) {
        const currentWeather = document.getElementById('current-weather');
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        currentWeather.innerHTML = `
            <div class="weather-main">
                <img src="${iconUrl}" alt="${description}" class="weather-icon">
                <div class="temp">${temp}°C</div>
                <div class="description">${capitalizeFirstLetter(description)}</div>
            </div>
            <div class="weather-details">
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind:</strong> ${Math.round(data.wind.speed * 3.6)} km/h</p>
                <p><strong>Feels Like:</strong> ${Math.round(data.main.feels_like)}°C</p>
            </div>
        `;
    }
    
    function displayForecast(data) {
        const forecastContainer = document.getElementById('weather-forecast');
        forecastContainer.innerHTML = '<h3>3-Day Forecast</h3><div class="forecast-days"></div>';
        
        const forecastDays = forecastContainer.querySelector('.forecast-days');
        const dailyData = {};
        
        // Process 3-hour interval forecast data
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateStr = date.toLocaleDateString('en-CA', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            });
            
            if (!dailyData[dateStr]) {
                dailyData[dateStr] = {
                    temps: [],
                    descriptions: [],
                    icons: []
                };
            }
            
            dailyData[dateStr].temps.push(item.main.temp);
            dailyData[dateStr].descriptions.push(item.weather[0].main);
            dailyData[dateStr].icons.push(item.weather[0].icon);
        });
        
        // Get next 3 days (skip today if needed)
        const nextDays = Object.keys(dailyData).slice(0, 3);
        
        nextDays.forEach(day => {
            const temps = dailyData[day].temps;
            const high = Math.round(Math.max(...temps));
            const low = Math.round(Math.min(...temps));
            const mostCommonDesc = getMostCommon(dailyData[day].descriptions);
            const mostCommonIcon = getMostCommon(dailyData[day].icons);
            
            forecastDays.innerHTML += `
                <div class="forecast-day">
                    <div class="day">${day}</div>
                    <img src="https://openweathermap.org/img/wn/${mostCommonIcon}.png" 
                        alt="${mostCommonDesc}" class="forecast-icon">
                    <div class="forecast-temp">${high}°/${low}°</div>
                    <div class="forecast-desc">${mostCommonDesc}</div>
                </div>
            `;
        });
    }
    
    // Helper functions
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function getMostCommon(array) {
        const count = {};
        array.forEach(item => {
            count[item] = (count[item] || 0) + 1;
        });
        return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    }
});