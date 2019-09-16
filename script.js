$(document).ready(function () {
    $('#getYouWeather').click(function () {
        return getWeatherYou();


    });
    //geocoding api 

    $('#you-location').click(function (event) {
        event.preventDefault();
        console.log(google.maps);
        window.navigator.geolocation.getCurrentPosition((position) => {
            const googleGeocoder = new google.maps.Geocoder()
            googleGeocoder.geocode({ 'location': { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) } }, function (results) {
                console.log(getCityGoogle(results))
                const city = getCityGoogle(results);
                $('#city').val(city);
                getWeatherYou();
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

function getWeatherYou() {
    let city = $('#city').val();

    if (city != '') {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&APPID=e03c2a2f3a20aa1dad04f3d7ed15b3ae',

            type: "GET",
            dataType: "jsonp",
            success: function (data) {
                let widget = youResults(data)

                $('#results-you').html(widget);
                $('#city').val('');

            }
        });


    } else {
        $('#js-error').html('something went wrong');
    }
}


function youResults(data) {
    return '<h2 style="font-weight: bold; font-size:30px; padding-top:30px;" class="text-center">Current Weather for ' + data.name + ', ' + data.sys.country + '</h2>' +
        "<h3 style='padding-left:40px;'><strong>Weather</strong>: " + data.weather[0].main + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Description</strong>:<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> " + data.weather[0].description + "</h3>" +
        "<h3 style='padding-left:40px;'><strong>Temperature</strong>: " + data.main.temp + " &deg;F</h3>" +
        "<h3 style='padding-left:40px;'><strong>Humidity</strong>: " + data.main.humidity + "%</h3>" +
        "<h3 style='padding-left:40px;'><strong>Min Temperature</strong>: " + data.main.temp_min + " &deg;F</h3>" +
        "<h3 style='padding-left:40px;'><strong>Max Temperature</strong>: " + data.main.temp_max + " &deg;F</h3>";
}

//"them" container
$('#getThemWeather').click(function () {
    return getWeatherThem();

});


function getWeatherThem() {
    let city = $('#city2').val();

    if (city != '') {

        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&APPID=e03c2a2f3a20aa1dad04f3d7ed15b3ae',
            type: "GET",
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                let widget = themResults(data)
                $('#results-them')
                    .html(widget);
                $('#city').val('');

            }
        });


    } else {
        $('#js-error2').html('something went wrong');
    }
}

function themResults(data) {
    return '<h2 style="font-weight: bold; font-size:40px; padding-top:30px;" class="text-center">Current Weather for ' + data.name + ', ' + data.sys.country + '</h2>' +
        "<h3 style='padding-left:40px; font-size: 50px;'><strong>Weather</strong>: " + data.weather[0].main + "</h3>" +
        "<h3 style='padding-left:40px; font-size: 50px;'><strong>Description</strong>:<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> " + data.weather[0].description + "</h3>" +
        "<h3 style='padding-left:40px; font-size: 50px;'><strong>Temperature</strong>: " + data.main.temp + " &deg;F</h3>" +
        "<h3 style='padding-left:40px; font-size: 50px;'><strong>Humidity</strong>: " + data.main.humidity + "%</h3>" +
        "<h3 style='padding-left:40px; font-size: 50px;'><strong>Min Temperature</strong>: " + data.main.temp_min + " &deg;F</h3>" +
        "<h3 style='padding-left:40px; font-size: 50px;'><strong>Max Temperature</strong>: " + data.main.temp_max + " &deg;F</h3>";
}

//autofill????
function activatePlacesSearch() {
    let options = {
        types: ['(cities)'],
        componentRestrictions: { country: "us" }
    };
    let input = document.getElementById('city');
    let autocomplete = new google.maps.places.Autocomplete(input);
}

