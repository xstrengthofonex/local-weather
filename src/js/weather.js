
$(document).ready(function(){
  getLocation();
});

var measurement = "C",
	temperature;

function getLocation(){
	if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(setPosition);
	} else {
	  return "Geolocation is not supported";
	}
};

function setPosition(position) {
	var lat = position.coords.latitude.toFixed(6),
	    lon = position.coords.longitude.toFixed(6);
	getWeather(lat, lon);
}

function getTemperature(temp){
	var celsius = String.fromCharCode(176)+"C",
	    farenheit = String.fromCharCode(176)+"F";
	if (measurement === "C"){
		return temp + celsius;
	} else if (measurement === "F"){
		f_temp = (parseInt(temp) * 1.8) + 32;
		return f_temp.toString() + farenheit;
	}
}

var conditions = {Cloudy: "src/css/img/cloudy.jpeg", 
                  Rain: "src/css/img/rainy.jpeg",
                  Snow: "src/css/img/snowy.jpeg", 
                  Sunny: "src/css/img/sunny.jpg", 
                  Breezy: "src/css/img/breezy.jpg",
              	  Clear: "src/css/img/clear.jpeg"}

function getWeather(lat, lon){
	$.ajax({
		headers: {
			'X-Mashape-Key': 'JDiz2qDa3HmshwAtrLdMWP7teES6p17xFsojsnaC17Xq1yOjhG',
			Accept: 'application/json'
		},	
		url: 'https://simple-weather.p.mashape.com/weatherdata?lat='+lat+'&lng='+lon,
		dataType: "json",
		success: function(response){
			var weather = response.query.results.channel.item.condition,
			    location = response.query.results.channel.location,
			    image;

			$(".card").fadeIn("slow");
			$(".card").css("display", "table");
			
			if (conditions[weather.text]){
				image = conditions[weather.text];
			} else {
				image = "src/css/img/clear.jpeg";
			}

			temperature = weather.temp
			
			$(".card").css("background-image", "url(" + image + ")");
			$("#temp").text(getTemperature(temperature));
			$("#description").text(weather.text);
			$("#location").text(location.city+", "+location.region+", "+location.country)
		}
	});
	$("#temp").click(function(){
		if (measurement === "C"){
			measurement = "F";
		} else if (measurement === "F"){
			measurement = "C"
		}
		$("#temp").text(getTemperature(temperature));
	});
};

