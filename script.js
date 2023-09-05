//get the reference const

const input = document.querySelector(".input");
const button = document.querySelector(".btn");
const weatherCard = document.querySelector(".weather-cards");
//const locationName = document.querySelector(".location");
//const temperature = document.querySelector(".temperature");
//const description = document.getElementById("description");

//designing a card format
function designCard(results,name,weather,timeUpdate){
    let card = document.createElement("div")
    card.classList.add("card")

    let location = document.createElement("p");
    location.setAttribute("id","location");
    location.textContent = "location:-";

    let labelLocation = document.createElement("label");
    labelLocation.classList.add("location");
    labelLocation.textContent = name;
    location.appendChild(labelLocation);

    card.appendChild(location)
    
    const para = document.createElement("p");
    para.setAttribute("id","temperature");
    para.textContent = "Temperature:-";
    card.appendChild(para);

    let label = document.createElement("label");
    label.classList.add("temperature");
    label.textContent =` ${results}°C`
    card.appendChild(label);

    let image = document.createElement("p");
    image.classList.add("image");
    image.textContent = "weather image"
    card.appendChild(image)
    
    let description = document.createElement("p");
    description.classList.add("description");
    description.textContent =`weather condition is :-${weather}`
    card.appendChild(description)
     
    let time = document.querySelector("p");
    time.classList.add("time");
    time.textContent = `lastly updated ::${timeUpdate}`
    card.appendChild(time);

    weatherCard.appendChild(card);
}

//function to fetch the data from server
async function getApiData(place){
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=fa24b51fdf1440d289a114727233008&q=${place}&aqi=no`,{mode:"cors"});
        const data = await response.json();
        assignData(data);
    }
    catch(error){
        console.error(`${error},error caught`)
    }
}

//assigning the data to designCard
function assignData(data){
       let results = data.current.temp_c;
        let name = data.location.name;
        let weather = data.current.condition.text;
        let timeUpdate = data.current.last_updated;
      //  getData(results,name,weather,timeUpdate);
        designCard(results,name,weather,timeUpdate)
}

//function  getData(results,name,weather){
   // temperature.textContent = `${results}°C`;
  //  locationName.textContent = `${name}`;
   // description.textContent = `weather condition: ${weather}`
   // }


//try to resolve all the apis called
function callApis(){
    const promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(
                getApiData("london"),
                getApiData("kenya"),
                getApiData("uganda"),
                 
        )
    },5000)
    reject(
        setTimeout(()=>{
            alert("network Error cant resolve all apis")
        },20000)
    )})
    
}

callApis();

//search location function
function searchLocation(){
    let search = input.value;
    let data = search
    getApiData(data);
}

//search eventListener
button.addEventListener("click",searchLocation);