(function($) {
  $(document).ready(function() {

    $('#date').text($.datepicker.formatDate('M d yy', new Date()));

    $('.nav-toggle').click(function() {
      $('.nav-menu').toggleClass('is-active');
    });

    function getLocation() {
      if ("geolocation" in navigator){ //check geolocation available 
          //try to get user current location using getCurrentPosition() method
          navigator.geolocation.getCurrentPosition(function(position){ 
                  console.log(position.coords.latitude);
                  console.log(position.coords.longitude);
                  getWeather(position.coords.longitude, position.coords.latitude, "metric", "Pune", "India");
              });
      } else{
          console.log("Browser doesn't support geolocation!");
      }
    }

     getLocation();

    function getWeather(long, lat, unit, city, country) {
      var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + long +
        "&units=" + unit +
        "&appid=" + "54dbbad81431def0526364a71dcdf1a1";
      console.log(url);
      $.getJSON(url, function(data) {
        $('.temp').text(data.main.temp + "°");
        $('#city').text(data.name+ ', '+ data.sys.country);
        $('#main').text(data.weather[0].main);
        $('#precipitation').text(data.main.pressure+ ' hPa');
        $('#humidity').text(data.main.humidity+'%');
        $('#wind').text(data.wind.speed+" km/h");
      });
    }

  });
})(jQuery);
