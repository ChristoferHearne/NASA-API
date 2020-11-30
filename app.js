// NASA API 
let lat;
let long; 

let satelliteButton = document.querySelector(".satellite_button");
satelliteButton.addEventListener("click", ()=>{
    console.log("button pressed")
    sendAPIRequest()
  })

async function sendAPIRequest(){
    let API_KEY = "fdSFchz2wIqT1ZnJuhklfhIAyYRHCj3MKz88E5uR" 
    let response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${long}&lat=${lat}&date=2019-10-11&&dim=0.5&api_key=${API_KEY}`);
    let data = await response.json();
    useAPIdata(data); 
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
    placeMarker(event.latLng);
 });
 
 function placeMarker(location) {
     var marker = new google.maps.Marker({
         position: location, 
         map: map,
     });

     lat = marker.getPosition().lat();
     long = marker.getPosition().lng();
 } 

}






