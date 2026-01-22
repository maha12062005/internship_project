let pestHistory = [];

function predictPest(){
  const crop = document.getElementById("crop").value.trim();
  const color = document.getElementById("color").value;
  const spots = document.getElementById("spots").value;
  const insects = document.getElementById("insects").value;
  const result = document.getElementById("result");

  if(!crop || !color || !spots || !insects){
    result.innerHTML = "All fields are required!";
    result.style.color = "red";
    return;
  }

  let prediction = "";
  let solution = "";

  // Simple rule based prediction
  if(color === "Yellow" && insects === "Yes"){
    prediction = "Aphids Attack 🐜";
    solution = "Use Neem oil spray or mild insecticide.";
  }
  else if(spots === "Yes" && color === "Brown"){
    prediction = "Leaf Spot Disease 🍂";
    solution = "Remove infected leaves and apply fungicide.";
  }
  else if(color === "Yellow" && insects === "No"){
    prediction = "Nutrient Deficiency 🌱";
    solution = "Apply Nitrogen fertilizer.";
  }
  else{
    prediction = "Crop is Healthy 🌾";
    solution = "No action needed.";
  }

  result.innerHTML = `
    🌾 Crop: ${crop}<br>
    🔍 Prediction: <b>${prediction}</b><br>
    💡 Solution: ${solution}
  `;
  result.style.color = "green";

  const newEntry = {
    crop: crop,
    color: color,
    spots: spots,
    insects: insects,
    prediction: prediction,
    solution: solution,
    time: new Date().toLocaleString()
  };

  pestHistory.push(newEntry);
  displayHistory();
}

function displayHistory(){
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  pestHistory.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      🌾 ${item.crop}<br>
      🔍 ${item.prediction}<br>
      💡 ${item.solution}<br>
      🕒 ${item.time}
      <hr>
    `;
    list.appendChild(li);
  });
}