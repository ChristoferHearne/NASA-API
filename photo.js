// Variables
let API_KEY = "fdSFchz2wIqT1ZnJuhklfhIAyYRHCj3MKz88E5uR"
let photoFeedURL = "https://api.nasa.gov/planetary/apod?api_key="

//Selectors
const photoele = document.getElementById("photo_div");
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
    clearPhotoDIV();
    sendCustomAPIRequest(datepicker.value); 
})

//Functions
async function sendAPIRequest(){
    let response = await fetch(`${photoFeedURL}${API_KEY}`);
    let data = await response.json();
    if (!response.ok){
        alert(data.msg);
    }
    else{
        useAPIData(data); 
    }
} 

async function sendCustomAPIRequest(date){
    let response = await fetch(`${photoFeedURL}${API_KEY}&date=${date}`)
    let data = await response.json();
    if (!response.ok){
        removeLoadingClass();
        alert(data.msg)
    }
    else{
        useAPIData(data); 
    }
}


function useAPIData(data){
    photoele.innerHTML = `
    <img onload="removeLoadingClass()" src=${data.hdurl}>
    <h2>${data.title}</h2>
    <p>${data.explanation}</p>
    <p>Date: ${data.date}</p>
    <strong>Copyright: ${data.copyright}</strong>`

    return photoele; 
}

function clearPhotoDIV(){
    photoele.innerHTML = ""; 
}


function handleError(error){
    alert(error.message); 
}

function setTodaysDate(){
    var today = new Date(); 
    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1).toISOString().slice(0,10);
    datepicker.value = date; 
}

function removeLoadingClass(){
    photobutton.classList.remove('is-loading'); 
}




