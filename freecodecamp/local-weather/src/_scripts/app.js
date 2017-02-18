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
      if ("geolocation" in navigator){ //check geolocation available 
          navigator.geolocation.getCurrentPosition(function(position){ 
                  lat = position.coords.latitude;
                  long = position.coords.longitude;
                  getWeatherInCelsius(long, lat);
              });
      } else{
          console.log("Browser doesn't support geolocation!");
      }
    }

    getLocation();

    function getWeatherInCelsius(long, lat) {
      var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + long +
        "&units=metric" +
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

    function getWeatherInFarenheit(long, lat) {
      var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + long +
        "&units=imperial" +
        "&appid=" + "54dbbad81431def0526364a71dcdf1a1";
      console.log(url);
      $.getJSON(url, function(data) {
        $('.temp').text(data.main.temp + " F");
        $('#city').text(data.name+ ', '+ data.sys.country);
        $('#main').text(data.weather[0].main);
        $('#precipitation').text(data.main.pressure+ ' hPa');
        $('#humidity').text(data.main.humidity+'%');
        $('#wind').text(data.wind.speed+" mph");
      });
    }

    $('#farenheit').click(function(){
      console.log("Ashish rules the world");
      $("#farenheit-active").addClass("is-active");
      $("#celsius-active").removeClass("is-active");
      getWeatherInFarenheit(long, lat);
    });

    $('#celsius').click(function(){
      console.log("Ashish rules the world");
      $("#celsius-active").addClass("is-active");
      $("#farenheit-active").removeClass("is-active");
      getWeatherInCelsius(long, lat);
    });

  });

})(jQuery);
