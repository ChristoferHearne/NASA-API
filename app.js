// NASA API 
let lat;
let long; 
var previousMarker;
var img = document.querySelector("img");
img.addEventListener("load", removeLoadingClass);
function removeLoadingClass(){
  satelliteButton.classList.toggle('.satellite_button'); 
}

let satelliteButton = document.querySelector(".satellite_button");
satelliteButton.addEventListener("click", function (event){
    event.preventDefault();
    this.classList.toggle('is-loading');
    clearIMG(); 
    sendAPIRequest();
  })

async function sendAPIRequest(){
    let API_KEY = "fdSFchz2wIqT1ZnJuhklfhIAyYRHCj3MKz88E5uR" 
    let response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${long}&lat=${lat}&date=2019-10-11&&dim=0.5&api_key=${API_KEY}`);
    let data = await response.json();
    useAPIdata(data); 
}

function clearIMG(){
  document.querySelector(".satellite_img").innerHTML = ""; 
}

// Get satellite Image from NASA API
function useAPIdata(data){
     document.querySelector(".satellite_img").innerHTML += `<img src="${data.url}">`; 
}
// Google Maps
  let map;
  
  function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 60.00418, lng: 15.79316 },
  zoom: 8,
  });
  
  google.maps.event.addListener(map, 'click', function(event) {
    if (previousMarker)
        previousMarker.setMap(null);
    placeMarker(event.latLng);
 });
 
 function placeMarker(location) {
     previousMarker = new google.maps.Marker({
         position: location, 
         map: map,
     });

     lat = previousMarker.getPosition().lat();
     long = previousMarker.getPosition().lng();
 } 

}






