(function($) {
  $(document).ready(function() {

    //Variables
    var lat = "";
    var long = "";

    $('#date').text($.datepicker.formatDate('M d yy', new Date()));

    $('.nav-toggle').click(function() {
      $('.nav-menu').toggleClass('is-active');
    });

    $.LoadingOverlaySetup({
      color: "rgba(0, 0, 0, 0.8)",
      image: "img/loader.svg"
    });

    $(document).ajaxSend(function(event, jqxhr, settings) {
      $.LoadingOverlay("show");
    });

    $(document).ajaxComplete(function(event, jqxhr, settings) {
      $.LoadingOverlay("hide");
    });

    function getLocation() {
      if ("geolocation" in navigator) { //check geolocation available 
        navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
          $.getJSON(GEOCODING).done(function(location) {
            console.log(location)
            $("#city").text(location.results[0].address_components[2].long_name + ", " + location.results[0].address_components[5].long_name);
          })
          getWeatherInCelsius(long, lat);
        });
      } else {
        console.log("Browser doesn't support geolocation!");
      }
    }

    getLocation();

    function getWeatherInCelsius(long, lat) {
      var url = "https://api.darksky.net/forecast/bd13a764c88aca6537d81ce6d844f380/" + lat + "," + long + "?exclude=minutely,hourly,daily,alerts,flags&units=si";
      console.log(url);
      $.getJSON(url, function(data) {
        $('.temp').text(data.currently.temperature + "°");
        $('#main').text(data.currently.summary);
        $('#precipitation').text(data.currently.pressure + ' hPa');
        $('#humidity').text(data.currently.humidity + '%');
        $('#wind').text(data.currently.windSpeed  + " km/h");
      });
    }

    function getWeatherInFarenheit(long, lat) {
      var url = "https://api.darksky.net/forecast/bd13a764c88aca6537d81ce6d844f380/" + lat + "," + long + "?exclude=minutely,hourly,daily,alerts,flags&units=us";
      console.log(url);
      $.getJSON(url, function(data) {
        console.log(data.currently.temperature);
        $('.temp').text(data.currently.temperature + " F");
        $('#main').text(data.currently.summary);
        $('#precipitation').text(data.currently.pressure  + ' hPa');
        $('#humidity').text(data.currently.humidity + '%');
        $('#wind').text(data.currently.windSpeed + " mph");
      });
    }

    $('#farenheit').click(function() {
      console.log("Ashish rules the world");
      $("#farenheit-active").addClass("is-active");
      $("#celsius-active").removeClass("is-active");
      getWeatherInFarenheit(long, lat);
    });

    $('#celsius').click(function() {
      console.log("Ashish rules the world");
      $("#celsius-active").addClass("is-active");
      $("#farenheit-active").removeClass("is-active");
      getWeatherInCelsius(long, lat);
    });

  });

})(jQuery);
