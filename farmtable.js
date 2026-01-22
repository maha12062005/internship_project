let supplyData = [];

function addSupply(){
  const farmer = document.getElementById("farmer").value.trim();
  const crop = document.getElementById("crop").value.trim();
  const qty = document.getElementById("qty").value;
  const price = document.getElementById("price").value;
  const msg = document.getElementById("msg");

  if(!farmer || !crop || !qty || !price){
    msg.innerHTML = "All fields are required!";
    msg.style.color = "red";
    return;
  }

  const total = qty * price;

  msg.innerHTML = `✅ Supply Added. Total Value: ₹${total}`;
  msg.style.color = "green";

  const newSupply = {
    farmer: farmer,
    crop: crop,
    quantity: qty,
    pricePerKg: price,
    totalAmount: total,
    time: new Date().toLocaleString()
  };

  supplyData.push(newSupply);
  displaySupplies();
}

function displaySupplies(){
  const list = document.getElementById("supplyList");
  list.innerHTML = "";

  supplyData.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      👨‍🌾 Farmer: ${item.farmer}<br>
      🌾 Crop: ${item.crop}<br>
      ⚖ Quantity: ${item.quantity} Kg<br>
      💰 Price: ₹${item.pricePerKg}/Kg<br>
      📊 Total: ₹${item.totalAmount}<br>
      🕒 ${item.time}
      <hr>
    `;
    list.appendChild(li);
  });
}