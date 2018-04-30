var newTemp;
var celsiusTemp
(function() {
  var latitude;
  var longitude;
  var city;
  var country;
  var weather;
  var temperature;
  var humidity;
  var wind;
  var clouds;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $("#data").html("latitude:" + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      function getWeather(callback) {
        $.ajax({
          url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=a4c15ec8ffb9cf9066531a9aa021b5d1`,
          json: "json",
          dataType: "json",
          data: {
            method: "GET",
            format: "json"
          },
          success: function(response) {
            city = response.name;
            country = response.sys.country;
            weather = response.weather[0].description;
            temperature = response.main.temp;
            newTemp = temperature;
            humidity = response.main.humidity;
            wind = response.wind.speed;
            clouds = response.clouds.all;
            $("#city").text(city);
            $("#country").text(country);
            $("#weather").text(weather);
            $("#temperature").text(temperature + "°F");
            $("#humidity").text(humidity + "%");
            $("#wind").text(Math.round(wind) + "m/s");
            $("#clouds").text(clouds + "%");
            newTemp = temperature;
            changeIcon();            
          }
        }); //close ajax
    } //close getWeather
      getWeather();
    });
  }
  
  function changeIcon () {
    if ($("#weather").text().includes("rain")) {
        document.body.style.backgroundImage = "url('https://s-media-cache-ak0.pinimg.com/originals/29/86/5b/29865b8a4c5ce79c7ce8ce404e2a2534.jpg')";                        
        return $("#rain").css('display', 'inherit');
    } else if ($("#weather").text().includes("sun")) {
        document.body.style.backgroundImage = "url('http://18press.com/photos/18press/61/300431.jpg')"; 
        return $("#sun").css('display', 'inherit');
    } else if ($("#weather").text().includes("snow")) {
        document.body.style.backgroundImage = "url('https://newevolutiondesigns.com/images/freebies/winter-wallpaper-17.jpg')";
        return $("#snow").css('display', 'inherit');
    }else if ($("#weather").text().includes("wind")) {
        document.body.style.backgroundImage = "url('https://wallpaperstock.net/wallpapers/thumbs1/51583hd.jpg')";
        return $("#windy").css('display', 'inherit');
    }else if ($("#weather").text().includes("cloud")) {
        document.body.style.backgroundImage = "url('https://2.bp.blogspot.com/-F7I4S4FGZWk/WPJ-T09TJlI/AAAAAAAANiA/yYX9APcnbW07OzjXqxpgfVXF4vXvE-llQCLcB/s640/Mammatus%2Bclouds%2BMost%2Bamazing.jpg')";
        return $("#cloudy").css('display', 'inherit');
    }else if ($("#weather").text().includes("fog")) {
        document.body.style.backgroundImage = "url('http://i.dailymail.co.uk/i/pix/2012/01/03/article-2081742-0F53520500000578-550_964x634.jpg')"; 
        return $("#fog").css('display', 'inherit');
    } else {
        return $("#cloudy").css('display', 'inherit');
    }
  }
})();

function toCelsius () {
    if ($('#temperature').text().includes("°F")) {
       celsiusTemp = (5 / 9) * (newTemp - 32);
        return $('#temperature').text(Math.round((5 / 9) * (newTemp - 32)) + "°C");

     }
}

function toFahrenheit () {
    if ($('#temperature').text().includes("°C")) {
        return $('#temperature').text(Math.round(celsiusTemp * 9 / 5 + 32) + "°F");

     }
}
