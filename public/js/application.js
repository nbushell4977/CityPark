function initMap() {
  // var myLatLng = {lat: 37.7576793, lng: -122.5076402};

  var centerInfo = getPinInfo($("#search_results").first().find('li').first());
  var myLatLng = {lat: centerInfo[0], lng: centerInfo[1]};


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng
  });

  setMarkers(map);
};

parkingSpots = []

// function getPinInfo(element) {
// 		var lat = $(element).children(".latitude").text();
// 		var long = $(element).children(".longitude").text();
// 		var parsed_lat = parseFloat(lat);
// 		var parsed_long = parseFloat(long);
// 		parkingSpots.push([parsed_lat, parsed_long]);
// };

// function createMarkerArray() {
// 	$("#search_results").each(function() {
// 		$(this).find('li').each(function(){
//       getPinInfo(this);
// 		});
// 	});
// 	return parkingSpots;
// };

function getPinInfo(element) {
        var lat = $(element).children(".latitude").text();
        var long = $(element).children(".longitude").text();
        var parsed_lat = parseFloat(lat);
        var parsed_long = parseFloat(long);
        return [parsed_lat, parsed_long];
};

//this should push pinInfo onto parkingSpots
function createMarkerArray() {
    $("#search_results").each(function() {
        $(this).find('li').each(function(){
      parkingSpots.push(getPinInfo(this));
        });
    });
    return parkingSpots;
};

function setMarkers(map) {
  createMarkerArray();
   console.log(parkingSpots)
  for (var i = 0; i < parkingSpots.length; i++) {
    var spot = parkingSpots[i];
    var marker = new google.maps.Marker({
      position: {lat: spot[0], lng: spot[1]},
      map: map,
      title: "spot"
    });
  };
};