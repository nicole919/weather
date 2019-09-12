'use strict';

$(() => {
    function formatQueryParams(params) {
        const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
        return queryItems.join('&');
    }
    // form for "you"
    function displayResults(responseJson) {
        console.log(responseJson);
        
        $('#js-error').empty();
        $('#results-you').empty();
        $('#results-you').removeClass('hidden');
    }
    
    function getWeather(baseUrl, cityName, apiKey) {
       
        const params = {
            q: cityName,
            appid: 'e03c2a2f3a20aa1dad04f3d7ed15b3ae'
        }
       
        const queryString = formatQueryParams(params);
        const url = baseUrl + '?' + queryString;
        console.log(url);
       
        
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error').text("Something went wrong");
        });
    }
    
    
        $('#you-form').on('submit', function() {
            event.preventDefault();
            const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
            const cityName = $('#js-city-search').val();
            console.log(cityName)
    
            getWeather(baseUrl, cityName);
        })

        
}


// form for "them"
function displayResults(responseJson) {
    console.log(responseJson);
    
    $('#js-error').empty();
    $('#results-them').empty();
    $('#results-them').removeClass('hidden');
}

function getWeather(baseUrl, cityName, apiKey) {
   
    const params = {
        q: cityName,
        appid: 'e03c2a2f3a20aa1dad04f3d7ed15b3ae'
    }
   
    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString;
    console.log(url);
   
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error').text("Something went wrong");
    });
}


    $('#them-form').on('submit', function() {
        event.preventDefault();
        const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
        const cityName = $('#js-city-search').val();
        console.log(cityName)

        getWeather(baseUrl, cityName);
    })

});
