function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng
  });

  // setMarkers(map);
};

parkingSpots = []

function getPinInfo() {
		var lat = $("#latitude").text();
		var long = $("#longitude").text();
		var parsed_lat = parseFloat(lat);
		var parsed_long = parseFloat(long);
		parkingSpots.push(parsed_lat, parsed_long)
}

function formMarkerArray() {
	$("#search_results").each(function() {
		$(this).find('li').each(function(){
     getPinInfo();
		});
	});
	return parkingSpots
};