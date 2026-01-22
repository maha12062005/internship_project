let historyData = [];

function checkStatus() {
  const temp = document.getElementById("temp").value;
  const humidity = document.getElementById("humidity").value;
  const soil = document.getElementById("soil").value;
  const result = document.getElementById("result");

  if(!temp || !humidity || !soil){
    result.innerHTML = "All values are required!";
    result.style.color = "red";
    return;
  }

  let status = "Normal 🌱";

  if(temp > 35) status = "High Temp 🔥 → Fan ON";
  else if(temp < 18) status = "Low Temp ❄ → Heater ON";

  if(soil < 30) status += " | Soil Dry → Sprinkler ON";

  result.innerHTML = status;
  result.style.color = "green";

  const newEntry = {
    temperature: temp,
    humidity: humidity,
    soilMoisture: soil,
    status: status,
    time: new Date().toLocaleString()
  };

  historyData.push(newEntry);
  displayHistory();
}

function displayHistory(){
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  historyData.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      🌡 ${item.temperature}°C | 💧 ${item.humidity}% | 🌱 ${item.soilMoisture}%  
      <br>Status: ${item.status}  
      <br>🕒 ${item.time}
      <hr>`;
    list.appendChild(li);
  });
}