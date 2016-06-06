function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng
  });

  setMarkers(map);
};

// var parkingSpots = function() {
//   document.getElementBy
// }

callAjax();

function callAjax() {
	$.ajax({
	  url: '/spots/index',
	  type: 'GET'
		})
		.done(function(data) {
		  console.log(data);
		})
};
