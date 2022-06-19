const apiKey = "5b29d3a944cf570aed7ff89539a2bce5";
async function fetchWithZipCode(zipCode) {
  try {
    // Fetch Data From EndPoint
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}`
    );

    let data = await response.json();
    // Send Data To Server
    let serverResponse = await fetch("http://localhost:7000/addWeather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // Recive Data From Server
    let serverData = await serverResponse.json();
    return serverData;
  } catch (error) {
    return error.message;
  }
}

document.querySelector("#generate").addEventListener("click", async (e) => {
  e.preventDefault();
  let dom = "";
  let zipCode = document.querySelector("#zip").value;
  let data = await fetchWithZipCode(zipCode);
  if (data.cod === "200") {
    data.list.map((d) => {
      dom += `
              <tr>
                  <td> ${d.main.temp} </td>
                  <td> ${d.main.feels_like} </td>
                  <td> ${d.dt_txt} </td>
              </tr>
            `;
    });
    document.querySelector(
      "#cityName"
    ).textContent = `City Name: ${data.city.name}`;
    document.querySelector("#entryHolder_table").innerHTML = `
      <tr>
          <th>TEMP</th>
          <th>FEEL</th>
          <th>DATE</th>
      </tr>
      ${dom}
  `;
  } else {
    document.querySelector("#cityName").textContent = "";
    document.querySelector(
      "#entryHolder_table"
    ).innerHTML = `${data.message}, Please try another zip-code`;
  }
});
