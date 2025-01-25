const API_KEY = ""

const cityInput = document.getElementById("cityInput")
const searchBtn = document.getElementById("searchBtn")
const weatherCard = document.getElementById("weatherCard")

const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
    )
    if (!response.ok) {
      throw new Error("City not found")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching weather data:", error)
    alert(error.message)
  }
}

const updateWeatherCard = (data) => {
  const cityName = weatherCard.querySelector(".city-name")
  const temperature = weatherCard.querySelector(".temperature")
  const description = weatherCard.querySelector(".description")

  cityName.textContent = data.name
  temperature.textContent = `${Math.round(data.main.temp)}°C`
  description.textContent = data.weather[0].description

  const desc = data.weather[0].main.toLowerCase()
  let gradient

  if (desc.includes("clear") || desc.includes("sun")) {
    gradient = "linear-gradient(135deg,hsl(46, 89.00%, 68.00%) 0%,hsl(13, 96.80%, 75.70%) 100%)"
  } else if (desc.includes("cloud")) {
    gradient = "linear-gradient(135deg,hsl(222, 25.00%, 92.20%) 0%,hsl(214, 25.90%, 94.70%) 100%)"
  } else if (desc.includes("rain") || desc.includes("drizzle")) {
    gradient = "linear-gradient(135deg,hsl(221, 72.60%, 62.70%) 0%,hsl(184, 70.30%, 53.70%) 100%)"
  } else if (desc.includes("thunderstorm")) {
    gradient = "linear-gradient(135deg,hsl(210, 3.00%, 26.30%) 0%,hsl(200, 4.10%, 14.30%) 100%)"
  } else if (desc.includes("snow")) {
    gradient = "linear-gradient(135deg,hsl(0, 19.40%, 87.80%) 0%,hsl(0, 0.00%, 100.00%) 100%)"
  } else if (desc.includes("mist") || desc.includes("fog")) {
    gradient = "linear-gradient(135deg,hsl(215, 60.00%, 88.20%) 0%,hsl(219, 82.40%, 93.30%) 100%)"
  } else {
    gradient = "linear-gradient(135deg,hsl(46, 89.00%, 68.00%) 0%,hsl(13, 96.80%, 75.70%) 100%)"
  }

  weatherCard.style.background = gradient
  weatherCard.classList.remove("hidden")
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim()
  if (city) {
    fetchWeatherData(city).then((data) => {
      if (data) {
        updateWeatherCard(data)
      }
    })
  }
})

cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click()
  }
})

const updateTime = (() => {
  const timeElement = weatherCard.querySelector(".time")
  return () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const seconds = now.getSeconds().toString().padStart(2, "0")
    timeElement.textContent = `${hours}:${minutes}:${seconds}`
  }
})()

setInterval(updateTime, 1000)

updateTime()

