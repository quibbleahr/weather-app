window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconID = document.querySelector('.icon');

    if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(pos => {
            long = pos.coords.longitude;
            lat = pos.coords.latitude;
            
            //paste your openweathermap api key here
            const apiKey = "";

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;
                    let tempC = Math.round(((temp - 273.15) + Number.EPSILON) * 100) / 100; // convert from K to C and round to two decimals
                    const {description, icon} = data.weather[0];
                    const {name} = data;

                    //Set DOM Elements from API
                    temperatureDegree.textContent = tempC;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = name;
                    //create img icon
                    console.log(icon);
                    let img = document.createElement('img');
                    img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    iconID.appendChild(img);

                })
         })
        
    }
});