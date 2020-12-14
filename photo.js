// Variables
let API_KEY = "fdSFchz2wIqT1ZnJuhklfhIAyYRHCj3MKz88E5uR"
let mediaFeedURL = "https://api.nasa.gov/planetary/apod?api_key="

//Selectors
const mainele = document.getElementById("photo_div");
const photobutton = document.getElementById("photo_btn");
const datepicker = document.getElementById("date_picker"); 

// EventListeners

// Gets photo of the day on page load
window.onload = (event) => {
    setTodaysDate();
    sendAPIRequest();  
}

// Gets media based on dateinput
photobutton.addEventListener("click", function(event){
    // Prevent form from submitting 
    event.preventDefault();

    // Add loading animation 
    this.classList.add('is-loading');

    //Clear main content
    clearMainDIV();

    // Send API Request
    sendCustomAPIRequest(datepicker.value); 
})

//Functions
async function sendAPIRequest(){
    // Assign response
    let response = await fetch(`${mediaFeedURL}${API_KEY}`);
    //Get data
    let data = await response.json();
    // Error Handling 
    if (!response.ok){
        alert(data.msg);
    }
    else{
        useAPIData(data);
        scrollToMedia();
        console.log(data); 
    }
} 

async function sendCustomAPIRequest(date){
    // Assign response
    let response = await fetch(`${mediaFeedURL}${API_KEY}&date=${date}`)
    // Get data 
    let data = await response.json();
    // Error Handling
    if (!response.ok){
        removeLoadingClass();
        alert(data.msg)
    }
    else{
        useAPIData(data);
        scrollToMedia();  
        console.log(data); 
    }
}


function useAPIData(data){
    // Format youtube.watch link from data 
    const youtubelink = "https://www.youtube.com/watch?v="+data.url.slice(30,41);

    // If photo of the day is an image 
    if (data.media_type === "image")
    {
        mainele.innerHTML = `
        <img onload="removeLoadingClass()" src=${data.url}>
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
        <p>Date: ${data.date}</p>
        <strong>Copyright: ${data.copyright}</strong>`
    }
    // If photo of the day is a video
    else{
        mainele.innerHTML = `
        <iframe src=${data.url}&autoplay=1 controls height="800" width="1280" onload="removeLoadingClass()" allow="autoplay" allowfullscreen="true"></iframe>
        <a href=${youtubelink} target="_blank">Watch on Youtube</a>
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
        <p>Date: ${data.date}</p>`
    }
    return mainele; 
}

// Clear content on page 
function clearMainDIV(){
    mainele.innerHTML = ""; 
}

// Sets todays date in the date-input 
function setTodaysDate(){
    var today = new Date(); 
    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1).toISOString().slice(0,10);
    datepicker.value = date; 
}

// Stop loading animation 
function removeLoadingClass(){
    photobutton.classList.remove('is-loading'); 
}

function scrollToMedia(){
    window.scrollTo(0, 250); 
}




