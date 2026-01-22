let fertilizerHistory = [];

function recommendFertilizer(){
  const n = document.getElementById("n").value;
  const p = document.getElementById("p").value;
  const k = document.getElementById("k").value;
  const crop = document.getElementById("crop").value.trim();
  const result = document.getElementById("result");

  if(!n || !p || !k || !crop){
    result.innerHTML = "All fields are required!";
    result.style.color = "red";
    return;
  }

  let recommendation = "";

  // Simple NPK logic
  if(n < 50) recommendation += "Add Nitrogen fertilizer (Urea). ";
  if(p < 40) recommendation += "Add Phosphorus fertilizer (DAP). ";
  if(k < 30) recommendation += "Add Potassium fertilizer (MOP). ";

  if(recommendation === ""){
    recommendation = "Soil nutrients are balanced. No extra fertilizer needed 🌱";
  }

  result.innerHTML = `
    🌾 Crop: ${crop}<br>
    🧪 N: ${n}, P: ${p}, K: ${k}<br>
    ✅ Recommendation: ${recommendation}
  `;
  result.style.color = "green";

  const newEntry = {
    crop: crop,
    nitrogen: n,
    phosphorus: p,
    potassium: k,
    recommendation: recommendation,
    time: new Date().toLocaleString()
  };

  fertilizerHistory.push(newEntry);
  displayHistory();
}

function displayHistory(){
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  fertilizerHistory.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      🌾 ${item.crop}<br>
      🧪 N:${item.nitrogen}, P:${item.phosphorus}, K:${item.potassium}<br>
      📌 ${item.recommendation}<br>
      🕒 ${item.time}
      <hr>
    `;
    list.appendChild(li);
  });
}