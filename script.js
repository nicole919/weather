let units = 'imperial';

$(document).ready(function () {
    $('#getYouWeather').click(function () {
        return getWeatherYou();
    });

    activatePlacesSearch();


    //geocoding
    $('#you-location').click(function (event) {
        event.preventDefault();
        console.log(google.maps);
        window.navigator.geolocation.getCurrentPosition((position) => {
            const googleGeocoder = new google.maps.Geocoder()
            googleGeocoder.geocode({ 'location': { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) } }, function (results) {
                console.log(getCityGoogle(results))
                const city = getCityGoogle(results);
                $('#city').val(city);
            })
        })
    })
});

function getCityGoogle(googleGeocodeResult) {
    const firstResult = googleGeocodeResult[0];
    if (!firstResult) {
        return null;
    }
    const city = firstResult.address_components.find(function (addressComponent) {
        return addressComponent.types.includes('locality');
    }).long_name;
    return city;
}

//you results

function youResults(data) {
    const unitText = units === 'imperial' ? 'F' : 'C';
    return '<h2 style="font-weight: bold; font-size:50px; padding-top:30px;" class="text-center">Current Weather for ' + data.name + ', ' + data.sys.country + '</h2>' +
        "<h3 style='padding-left:40px;'><strong>Weather</strong>: " + data.weather[0].main + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Description</strong>:<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> " + data.weather[0].description + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Temperature</strong>: " + data.main.temp + " &deg;" + unitText + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Humidity</strong>: " + data.main.humidity + "%</h3>" +
        "<h3 style='padding-left:40px;'><strong>Min Temperature</strong>: " + data.main.temp_min + " &deg;" + unitText + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Max Temperature</strong>: " + data.main.temp_max + " &deg;" + unitText + "</h3>";
}

//them results
function themResults(data) {
    const unitText = units === 'imperial' ? 'F' : 'C';
    return '<h2 style="font-weight: bold; font-size:50px; padding-top:30px;" class="text-center">Current Weather for ' + data.name + ', ' + data.sys.country + '</h2>' +
        "<h3 style='padding-left:40px;'><strong>Weather</strong>: " + data.weather[0].main + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Description</strong>:<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> " + data.weather[0].description + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Temperature</strong>: " + data.main.temp + " &deg;" + unitText + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Humidity</strong>: " + data.main.humidity + "%</h3>" +
        "<h3 style='padding-left:40px;'><strong>Min Temperature</strong>: " + data.main.temp_min + " &deg;" + unitText + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Max Temperature</strong>: " + data.main.temp_max + " &deg;" + unitText + "</h3>";
}

//autofill functions
function activatePlacesSearch() {
    let options = {
        types: ['(cities)'],
        componentRestrictions: { country: "us" }
    };
    let you = document.getElementById('city');
    let them = document.getElementById('city2');
    let autocomplete = new google.maps.places.Autocomplete(you);
    let autocomplete2 = new google.maps.places.Autocomplete(them);

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace()
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        getWeather(latitude, longitude, (data) => {
            let widget = youResults(data)

            $('#results-you').html(widget);

        })


    })
    autocomplete2.addListener('place_changed', function () {
        const place = autocomplete2.getPlace()
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        getWeather(latitude, longitude, (data) => {
            let widget = youResults(data)

            $('#results-them').html(widget);

        })
    })

    //toggle temp buttons

    $('#metric').click((e) => {
        e.preventDefault();
        $('#metric').addClass('selected');
        $('#imperial').removeClass('selected');
        units = "metric";
        const place = autocomplete.getPlace();

        if (place) {
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            getWeather(latitude, longitude, (data) => {
                let widget = youResults(data)
                $('#results-you').html(widget);
            })
        }
    })

    $('#metric2').click((e) => {
        e.preventDefault();
        $('#metric2').addClass('selected');
        $('#imperial2').removeClass('selected');
        units = "metric";
        const place = autocomplete2.getPlace();
        if (place) {
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            getWeather(latitude, longitude, (data) => {
                let widget = youResults(data)
                $('#results-them').html(widget);
            })
        }
    })

    $('#imperial').click((e) => {
        e.preventDefault();
        $('#imperial').addClass('selected');
        $('#metric').removeClass('selected');
        units = "imperial";
        const place = autocomplete.getPlace();
        if (place) {
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            getWeather(latitude, longitude, (data) => {
                let widget = youResults(data)
                $('#results-you').html(widget);
            })
        };

    })

    $('#imperial2').click((e) => {
        e.preventDefault();
        $('#imperial2').addClass('selected');
        $('#metric2').removeClass('selected');
        units = "imperial";
        const place = autocomplete2.getPlace()
        if (place) {
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            getWeather(latitude, longitude, (data) => {
                let widget = youResults(data)
                $('#results-them').html(widget);
            })
        }
    })
}

// unit toggle call
function getWeather(lat, lng, callback) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&units=' + units + '&APPID=e03c2a2f3a20aa1dad04f3d7ed15b3ae',
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            callback(data)
        }
    });
}

