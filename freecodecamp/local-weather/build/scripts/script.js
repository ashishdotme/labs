!function(e){e(document).ready(function(){function t(){"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(t){a=t.coords.latitude,i=t.coords.longitude;var o="https://maps.googleapis.com/maps/api/geocode/json?latlng="+t.coords.latitude+"%2C"+t.coords.longitude+"&language=en";e.getJSON(o).done(function(t){console.log(t),e("#city").text(t.results[0].address_components[2].long_name+", "+t.results[0].address_components[5].long_name)}),n(i,a)}):console.log("Browser doesn't support geolocation!")}function n(t,n){var o="https://api.darksky.net/forecast/bd13a764c88aca6537d81ce6d844f380/"+n+","+t+"?exclude=minutely,hourly,daily,alerts,flags&units=si";console.log(o),e.getJSON(o,function(t){e(".temp").text(t.currently.temperature+"°"),e("#main").text(t.currently.summary),e("#precipitation").text(t.currently.pressure+" hPa"),e("#humidity").text(t.currently.humidity+"%"),e("#wind").text(t.currently.windSpeed+" km/h")})}function o(t,n){var o="https://api.darksky.net/forecast/bd13a764c88aca6537d81ce6d844f380/"+n+","+t+"?exclude=minutely,hourly,daily,alerts,flags&units=us";console.log(o),e.getJSON(o,function(t){console.log(t.currently.temperature),e(".temp").text(t.currently.temperature+" F"),e("#main").text(t.currently.summary),e("#precipitation").text(t.currently.pressure+" hPa"),e("#humidity").text(t.currently.humidity+"%"),e("#wind").text(t.currently.windSpeed+" mph")})}var a="",i="";e("#date").text(e.datepicker.formatDate("M d yy",new Date)),e(".nav-toggle").click(function(){e(".nav-menu").toggleClass("is-active")}),e.LoadingOverlaySetup({color:"rgba(0, 0, 0, 0.8)",image:"img/loader.svg"}),e(document).ajaxSend(function(t,n,o){e.LoadingOverlay("show")}),e(document).ajaxComplete(function(t,n,o){e.LoadingOverlay("hide")}),t(),e("#farenheit").click(function(){console.log("Ashish rules the world"),e("#farenheit-active").addClass("is-active"),e("#celsius-active").removeClass("is-active"),o(i,a)}),e("#celsius").click(function(){console.log("Ashish rules the world"),e("#celsius-active").addClass("is-active"),e("#farenheit-active").removeClass("is-active"),n(i,a)})})}(jQuery);