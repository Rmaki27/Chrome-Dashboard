const authorDiv = document.getElementById("author-div");
const cryptoDiv = document.getElementById("crypto-div");
const cryptoTopDiv = document.getElementById("crypto-top-div");
const timeEl = document.getElementById("time");
const weatherEl = document.getElementById("weather-div");
const weatherTopEl = document.getElementById("weather-top-line");

function getCurrentTime() {
  const date = new Date();
  const time = date.toLocaleTimeString("en-us", { timeStyle: "short" });
  timeEl.textContent = time;
}

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    const authorName = document.createElement("p");
    authorName.textContent = `By: ${data.user.name}`;
    authorName.className = "author";
    authorDiv.appendChild(authorName);
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1448518340475-e3c680e9b4be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQ5ODQ5MTF8&ixlib=rb-4.0.3&q=80&w=1080")`;
    const authorName = document.createElement("p");
    authorName.textContent = `By: ${data.user.name}`;
    authorDiv.appendChild(authorName);
  });

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => res.json())
  .then((data) => {
    const cryptoIcon = document.createElement("img");
    const cryptoName = document.createElement("p");
    let cryptoCurrentPrice = document.createElement("p");
    let price24HrHigh = document.createElement("p");
    let price24HrLow = document.createElement("p");
    cryptoIcon.src = data.image.small;
    cryptoName.textContent = data.name;
    cryptoCurrentPrice.textContent = `Current Price: $${data.market_data.current_price.usd}`;
    price24HrHigh.textContent = `24hr High: $${data.market_data.high_24h.usd}`;
    price24HrLow.textContent = `24hr Low: $${data.market_data.low_24h.usd}`;
    cryptoTopDiv.appendChild(cryptoIcon);
    cryptoTopDiv.appendChild(cryptoName);
    cryptoDiv.appendChild(cryptoCurrentPrice);
    cryptoDiv.appendChild(price24HrHigh);
    cryptoDiv.appendChild(price24HrLow);
  })
  .catch((err) => console.error(err));

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const weatherIcon = document.createElement("img");
      const weather = document.createElement("p");
      const location = document.createElement("p");
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weather.textContent = `${Math.round(data.main.temp)}°F`;
      console.log(weather);
      location.textContent = `${data.name}`;
      location.className = "location";
      weatherTopEl.appendChild(weatherIcon);
      weatherTopEl.appendChild(weather);
      weatherEl.appendChild(location);
    })
    .catch((err) => console.error(err));
});
