// Variables
let API_KEY = "fdSFchz2wIqT1ZnJuhklfhIAyYRHCj3MKz88E5uR"
let mediaFeedURL = "https://api.nasa.gov/planetary/apod?api_key="

//Selectors
const mainele = document.getElementById("photo_div");
const photobutton = document.getElementById("photo_btn");
const datepicker = document.getElementById("date_picker"); 

// EventListeners

window.onload = (event) => {
    setTodaysDate();
    sendAPIRequest();  
}

photobutton.addEventListener("click", function(event){
    event.preventDefault();
    this.classList.add('is-loading');
    clearMainDIV();
    sendCustomAPIRequest(datepicker.value); 
})

//Functions
async function sendAPIRequest(){
    let response = await fetch(`${mediaFeedURL}${API_KEY}`);
    let data = await response.json();
    if (!response.ok){
        alert(data.msg);
    }
    else{
        useAPIData(data);
        console.log(data); 
    }
} 

async function sendCustomAPIRequest(date){
    let response = await fetch(`${mediaFeedURL}${API_KEY}&date=${date}`)
    let data = await response.json();
    if (!response.ok){
        removeLoadingClass();
        alert(data.msg)
    }
    else{
        useAPIData(data); 
        console.log(data); 
    }
}


function useAPIData(data){
    const youtubelink = "https://www.youtube.com/watch?v="+data.url.slice(30,41);
    if (data.media_type === "image")
    {
        
        mainele.innerHTML = `
        <img onload="removeLoadingClass()" src=${data.url}>
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
        <p>Date: ${data.date}</p>
        <strong>Copyright: ${data.copyright}</strong>`
    }
    else if(data.media_type === "video"){
        mainele.innerHTML = `
        <iframe src=${data.url}&autoplay=1 controls height="800" width="1280" onload="removeLoadingClass()" allow="autoplay" allowfullscreen="true"></iframe>
        <a href=${youtubelink} target="_blank">Watch on Youtube</a>
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
        <p>Date: ${data.date}</p>`
    }
    return mainele; 
}

function clearMainDIV(){
    mainele.innerHTML = ""; 
}

function setTodaysDate(){
    var today = new Date(); 
    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1).toISOString().slice(0,10);
    datepicker.value = date; 
}

function removeLoadingClass(){
    photobutton.classList.remove('is-loading'); 
}




