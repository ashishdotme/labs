(function($) {
  $(document).ready(function() {

    $('#date').text($.datepicker.formatDate('M d yy', new Date()));

    $('.nav-toggle').click(function() {
      $('.nav-menu').toggleClass('is-active');
    });

    $.getJSON("http://freegeoip.net/json/", function(data) {
      var city = data.city
      var country = data.country_name;
      var ip = data.ip;
      var long = data.longitude;
      var lat = data.latitude;
      getWeather(long, lat, "metric", city, country);
    });

    function getWeather(long, lat, unit, city, country) {
      console.log(long);
      console.log(lat);
      console.log(unit);
      var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + long +
        "&units=" + unit +
        "&appid=" + "54dbbad81431def0526364a71dcdf1a1";
      console.log(url);
      $.getJSON(url, function(data) {
        console.log(data);
        $('.temp').text(data.main.temp + "°");
        $('#city').text(city+ ', '+ country);
        $('#main').text(data.weather[0].main);
      });
    }

  });
})(jQuery);
