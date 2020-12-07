let API_KEY = "fdSFchz2wIqT1ZnJuhklfhIAyYRHCj3MKz88E5uR";
let photoFeedURL = "https://api.nasa.gov/planetary/apod?api_key="
async function sendAPIRequest(){
    let response = await fetch(`${photoFeedURL}${API_KEY}`);
    let data = await response.json();
    
    console.log(data);
    useAPIData(data);  
} 

function useAPIData(data){
 const photoele = document.getElementById("photo_div");
    photoele.innerHTML = `
    <img src=${data.hdurl}>
    <h2>${data.title}</h2>
    <p>${data.explanation}</p>
    <p>Date: ${data.date}</p>
    <strong>Copyright: ${data.copyright}</strong>`

    return photoele; 
}


function handleError(error){
    alert(error.message); 
}
