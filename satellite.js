// Variables  
let lat;
let long; 
var previousMarker;
let API_KEY = "fdSFchz2wIqT1ZnJuhklfhIAyYRHCj3MKz88E5uR" 

// Selectors
let satelliteButton = document.querySelector(".satellite_button");

// EventListeners

// Get satellite image on click
satelliteButton.addEventListener("click", function (event){
    // Prevent form from submitting
    event.preventDefault();

    // Add loading animation
    this.classList.add('is-loading');

    // Clear img-section 
    clearIMG(); 

    // Get API data
    sendAPIRequest();
  })

async function sendAPIRequest(){
    // Assign response
    let response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${long}&lat=${lat}&date=2019-10-11&&dim=0.5&api_key=${API_KEY}`);

    // Get data
    let data = await response.json();

    // Error Handling
    if (!response.ok){
      removeLoadingClass(); 
      alert(data.msg);
    }
    else{
      useAPIdata(data); 
    }
}

// Clear main img-section 
function clearIMG(){
  document.querySelector(".satellite_img").src = ""; 
}

// Load satellite image into page 
function useAPIdata(data){
     document.querySelector(".satellite_img").src = data.url;
}

// Google Maps

  // Assign map-variable
  let map;
  
  // Create Google Map
  function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 60.00418, lng: 15.79316 },
  zoom: 8,
  });

  // Place new location marker on click
  google.maps.event.addListener(map, 'click', function(event) {
    if (previousMarker)
        previousMarker.setMap(null);
    placeMarker(event.latLng);
 });

 // Get position of marker and place it
 function placeMarker(location) {
     previousMarker = new google.maps.Marker({
         position: location, 
         map: map,
     });

     lat = previousMarker.getPosition().lat();
     long = previousMarker.getPosition().lng();
 } 

}

// Stop loading animation
function removeLoadingClass(){
  satelliteButton.classList.remove('is-loading'); 
}






