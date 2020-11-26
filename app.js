const lat = 59.329323;
const long = 18.068581; 
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", ()=>{
    console.log("button pressed")
    sendAPIRequest()
  })
async function sendAPIRequest(){
    let API_KEY = "fdSFchz2wIqT1ZnJuhklfhIAyYRHCj3MKz88E5uR" 
    let response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${long}&lat=${lat}&date=2019-10-11&&dim=0.5&api_key=${API_KEY}`);
    let data = await response.json();
    console.log(data); 
    useAPIdata(data); 
}

function useAPIdata(data){
     //document.querySelector("#content").innerHTML += `<img src="${data.url}">`; 
}

// Google Maps API KEY: AIzaSyC7bJrPuUJsdXZutdVouq0GQmk10SFdVLk