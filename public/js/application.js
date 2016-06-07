function initMap() {
  // var myLatLng = {lat: 37.7576793, lng: -122.5076402};

  var centerInfo = getPinInfo($(".center-coordinates").first());
  if(isNaN(centerInfo[0]) || isNaN(centerInfo[1])){
    centerInfo = [37.773285, -122.445155];
  }
  var myLatLng = {lat: centerInfo[0], lng: centerInfo[1]};


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: myLatLng
  });

  setMarkers(map);
};

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

$(document).ready(function() {
  eventListeners();
});

var eventListeners = function() {
  showContactForm();
  sendMessageToPoster();
  changeCenter();
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


var changeCenter = function(){
  $("#search_results li a").click(function (e) {
    e.stopPropagation();
  });
  $("#search_results li").on("click", function(e){
    e.preventDefault();
    parkingSpots = []
    getPinInfo(this)
    var centerInfo = getPinInfo(this);
    var myLatLng = {lat: centerInfo[0], lng: centerInfo[1]};


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: myLatLng
  });

  setMarkers(map);
  })
};















