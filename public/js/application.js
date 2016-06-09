function initMap() {
  // var myLatLng = {lat: 37.7576793, lng: -122.5076402};
  var bounds = new google.maps.LatLngBounds();
  var centerInfo = getPinInfo($(".center-coordinates").first());
  if(isNaN(centerInfo[0]) || isNaN(centerInfo[1])){
    centerInfo = [37.773285, -122.445155];
  }
  var myLatLng = {lat: centerInfo[0], lng: centerInfo[1]};


  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: myLatLng
  });

  setMarkers(map, bounds);
  if(parkingSpots.length > 0){
    map.fitBounds(bounds);
  }
};

var map;
parkingSpots = []

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

function setMarkers(map, bounds) {
  createMarkerArray();
  for (var i = 0; i < parkingSpots.length; i++) {
    var spot = parkingSpots[i];
    var marker = new google.maps.Marker({
      position: {lat: spot[0], lng: spot[1]},
      map: map,
      title: "spot"
    });
    bounds.extend(marker.position);
  };
};

$(document).ready(function() {
  eventListeners();
});

var eventListeners = function() {
  showContactForm();
  sendMessageToPoster();
  changeCenter();
  highLightSelected();
};

var showContactForm = function() {
  $("#contact_user").on('click', function(e) {
    e.preventDefault();
    var userId = $('#contact_user').siblings(".contact_user_id").text();
    $.ajax({
      url: "/users/"+userId+"/contact",
      type: "GET"
    })
    .done(function(data) {
      $("#search_results").append(data);
    });
  });
};

var sendMessageToPoster = function() {
  $("#search_results").on("submit", ".contact_user_form", function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    var userId = $('#contact_user').siblings(".contact_user_id").text();
    $.ajax({
      url: "/users/"+userId+"/contact",
      type: "POST",
      data: data
    })
    .done(function(data2) {
      $("#search_results").append(data2);
      $(".contact_user_form").hide();
    })
  })
};

var pan = function(element){
    var centerInfo = getPinInfo(element);
    var center = {lat: centerInfo[0], lng: centerInfo[1]};
    map.panTo(center);
}

// var highlightMarker = function(element){
//     var marker = setMarker(element)
//     var icon = new google.maps.Icon({
//       anchor:marker.getPosition(),
//       url:'http://maps.google.com/intl/en_us/mapfiles/ms/micons/purple.png',
//       scaledSize: 10
//     })
//     marker.setIcon(icon);
//     return marker;
// };

// var resetMarker = function(element){
//     var marker = setMarker(element)
//     marker.setIcon();
//     return marker;
// };

// var setMarker = function(element){
//   var centerInfo = getPinInfo(element);
//   var location = {lat: centerInfo[0], lng: centerInfo[1]};
//   var marker = new google.maps.Marker({
//       position: location,
//       map: map,
//       title: "spot",
//     });
//     return marker;
// };


var changeCenter = function(){
  $("#search_results li a").click(function (e) {
    e.stopPropagation();
  });
  $("#search_results li").on("click", function(e){
    e.preventDefault();
    pan(this);

    if(map.getZoom()<13){
      map.setZoom(13);
    }
  })
};

var highLightSelected = function(){
  var color;
  var marker;
  $("#search_results li").hover(
    function () {
      color = $(this).css('background-color');
      $(this).css('background-color','rgba(224, 224, 126, 0.6)')
      //marker = highlightMarker(this);
    },
    function(){
      $(this).css('background-color',color)
      //resetMarker(marker);
    }
  );
};














