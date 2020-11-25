const lat = 59.329323;
const long = 18.068581; 
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", ()=>{
    console.log("button pressed")
    sendAPIRequest()
  })
async function sendAPIRequest(){
    let API_KEY = "fdSFchz2wIqT1ZnJuhklfhIAyYRHCj3MKz88E5uR" 
    let response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${long}&lat=${lat}&&dim=1&api_key=${API_KEY}`);
    let data = await response.json();
    console.log(data); 
    useAPIdata(data); 
}

function useAPIdata(data){
     document.querySelector("#content").innerHTML += `<img src="${data.url}">`; 
}