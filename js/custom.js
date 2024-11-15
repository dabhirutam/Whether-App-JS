const apiKey = "cd8ca905e6fa54a511ca5b7957524e0b";
async function getLocation() {
    try {
        const location = document.getElementById('searchLocation').value;
        const bgimg = document.getElementById("bgimg");

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!res.ok) throw new Error("Unable to fetch data. Please check the location input.");
        const result = await res.json();

        // Cache DOM elements and Update DOM with weather data
        document.getElementById("temperature").innerHTML = `${parseInt(result.main.temp)}°`;
        document.getElementById("city").innerHTML = result.name;
        document.getElementById("date-time").innerHTML = formatDateTime(new Date());
        document.getElementById("condition").innerHTML = result.weather[0].description;
        document.getElementById("cloudly").innerHTML = `${result.clouds.all}%`;
        document.getElementById("humidity").innerHTML = `${result.main.humidity}%`;
        document.getElementById("wind").innerHTML = `${result.wind.speed} km/h`;
        document.getElementById("conditionIcon").src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;

        // Determine background image based on weather condition
        let imgCondition = '';
        const iconId = result.weather[0].id;

        if (iconId >= 200 && iconId <= 232) imgCondition = 'Thunderstorm';
        else if (iconId >= 300 && iconId <= 321) imgCondition = 'Drizzle';
        else if (iconId >= 500 && iconId <= 531) imgCondition = 'Rain';
        else if (iconId >= 600 && iconId <= 622) imgCondition = 'Snow';
        else if (iconId >= 701 && iconId <= 781) imgCondition = 'Atmosphere';
        else if (iconId === 800) imgCondition = 'Clear';
        else if (iconId >= 801 && iconId <= 804) imgCondition = 'Clouds';

        // Set background image
        bgimg.style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(78, 78, 78, 0.5)), url('images/${imgCondition}.jpg') no-repeat center center/cover`;

    } catch (error) {
        alert("Failed to load weather data. Please try again.");
        location. reload(); 
    }
}

// Helper function to format the date and time
function formatDateTime(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes} - ${dayOfWeek} ${day}, ${month} ${year}`;
}