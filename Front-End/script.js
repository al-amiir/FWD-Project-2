const apiKey = "5b29d3a944cf570aed7ff89539a2bce5&units=metric";
async function fetchWithZipCode(zipCode, feelings, apiKey) {
  try {
    // Fetch Data From EndPoint
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`
    );
    let data = await response.json();
    data = { ...data, feelings: feelings };
    // Send Data To Server
    await fetch("http://localhost:7000/addWeather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  let zipCode = document.querySelector("#zip").value;
  let feelings = document.querySelector("#inputFeelings").value;
  // Fetch From End Point Then Send Data to sever
  await fetchWithZipCode(zipCode, feelings, apiKey);

  // Fetch Data From Server
  let response = await fetch("http://localhost:7000/all");
  let data = await response.json();

  // Update UI
  let dom = "";
  for (let i = Object.keys(data).length - 1; i >= 0; i--) {
    let singleData = data[Object.keys(data)[i]];
    let date = new Date(singleData.date);
    let dateText = `Date: ${
      date.getMonth() + 1
    }/${date.getDay()}/${date.getFullYear()}`;
    console.log(singleData);
    dom += `
    <div class="entryHolder_container">
      <div id="cityName">City Name: ${singleData.cityName}</div>
      <div id="temp">Temp: ${singleData.temp}${
      apiKey.includes("imperial") ? "/Fahrenheit" : "/Celcius"
    }</div>
      <div id="content">Feel: ${singleData.feeling}</div>
      <div id="date">${dateText}</div>
    </div>
    `;
  }
  document.querySelector("#entryHolder").innerHTML = dom;
});
