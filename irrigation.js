let irrigationHistory = [];

function calculateIrrigation(){
  const crop = document.getElementById("crop").value.trim();
  const soil = document.getElementById("soil").value;
  const weather = document.getElementById("weather").value;
  const result = document.getElementById("result");

  if(!crop || !soil || !weather){
    result.innerHTML = "All fields are required!";
    result.style.color = "red";
    return;
  }

  let water = 0;
  let schedule = "";

  // Simple rule-based logic
  if(soil < 30){
    water = 40;
    schedule = "Immediate irrigation needed";
  }
  else if(soil >= 30 && soil <= 60){
    water = 25;
    schedule = "Irrigate after 12 hours";
  }
  else{
    water = 10;
    schedule = "No irrigation needed now";
  }

  if(weather === "Rainy"){
    water = 0;
    schedule = "Rain expected – skip irrigation";
  }

  result.innerHTML = `
    🌾 Crop: ${crop}<br>
    💧 Water Required: ${water} liters<br>
    ⏰ Schedule: ${schedule}
  `;
  result.style.color = "green";

  const newEntry = {
    crop: crop,
    soilMoisture: soil,
    weather: weather,
    waterRequired: water,
    schedule: schedule,
    time: new Date().toLocaleString()
  };

  irrigationHistory.push(newEntry);
  displayHistory();
}

function displayHistory(){
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  irrigationHistory.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      🌾 ${item.crop} | 🌱 Soil: ${item.soilMoisture}% | ☁ ${item.weather}<br>
      💧 Water: ${item.waterRequired} L | ⏰ ${item.schedule}<br>
      🕒 ${item.time}
      <hr>
    `;
    list.appendChild(li);
  });
}