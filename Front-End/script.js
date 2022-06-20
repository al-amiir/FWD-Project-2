const apiKey = "5b29d3a944cf570aed7ff89539a2bce5";
async function fetchWithZipCode(zipCode) {
  try {
    // Fetch Data From EndPoint
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=imperial`
    );
    let data = await response.json();
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

function handleUI(data) {
  if (data.cityName) {
    // Convert Date
    let date = new Date(data.date);
    let dateText = `Date: ${date.getDay()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    // City Name
    document.querySelector("#cityName").textContent = `City: ${data.cityName}`;
    // Temp
    document.querySelector("#temp").textContent = `Temp: ${Math.round(
      data.temp
    )} Degrees`;
    // Feel
    document.querySelector(
      "#content"
    ).textContent = `Feel: ${data.feeling} Degrees`;
    // Date
    document.querySelector("#date").textContent = dateText;
    document.querySelector("#error").textContent = "";
  } else {
    // Reset All
    document.querySelector("#cityName").textContent = "";
    document.querySelector("#temp").textContent = "";
    document.querySelector("#content").textContent = "";
    document.querySelector("#date").textContent = "";
    // Handle Error
    if (data.cod == 404) {
      document.querySelector(
        "#error"
      ).textContent = `${data.message}, Please try another zip code`;
    } else if (data.cod == 400) {
      document.querySelector(
        "#error"
      ).textContent = `${data.message}, Please enter zip code`;
    } else {
      document.querySelector("#error").textContent = data.message;
    }
  }
}

document.querySelector("#generate").addEventListener("click", async (e) => {
  e.preventDefault();
  let zipCode = document.querySelector("#zip").value;

  // Fetch From End Point Then Send Data to sever
  await fetchWithZipCode(zipCode);

  // Fetch Data From Server
  let response = await fetch("http://localhost:7000/all");
  let data = await response.json();

  // Update UI
  handleUI(data);
});
