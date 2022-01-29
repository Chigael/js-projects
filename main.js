window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // const proxy = 'https://cors-anywhere.herokuapp.com';


            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=81993e93992b30dc223bd0f252b2ae1e`


            //fectint the API
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                 const { temp} = data.main;
                 const { description, icon} = data.weather[0];

                //Set DOM Elements from 
                tempDegree.textContent = temp;
                tempDescription.textContent = description;
                locationTimezone.textContent = data.name;

                //formula for celsuis
                let celsuis = (temp - 32) * (5 / 9);

                //set icon
                setIcons(icon, document.querySelector(".icon"))
                  

                //convert to celsius/Farenheit
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            tempDegree.textContent = Math.floor(celsuis);
                        }else {
                            temperatureSpan.textContent ="F";
                            tempDegree.textContent = temp;
                        }
                    })

            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});