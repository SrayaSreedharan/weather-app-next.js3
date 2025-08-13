"use client";
import { useState } from "react";
import { Container, TextField, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import OpacityIcon from "@mui/icons-material/Opacity";
// import AirIcon from "@mui/icons-material/Air";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
);

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getWeatherIcon = () => {
    if (!weather) return null;
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("cloud")) return <CloudIcon fontSize="large" />;
    if (condition.includes("rain")) return <OpacityIcon fontSize="large" />;
    return <WbSunnyIcon fontSize="large" />;
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
        gap: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🌤 Weather App
      </Typography>

      <TextField
        label="Enter City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        fullWidth
        sx={{
          background: "white",
          borderRadius: 2,
        }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        weather && weather.main && (
          <Card
            sx={{
              width: "100%",
              background: "linear-gradient(135deg, #6DD5FA, #2980B9)",
              color: "white",
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h5">{weather.name}, {weather.sys.country}</Typography>
              <Typography variant="h2" fontWeight="bold">
                {Math.round(weather.main.temp)}°C
              </Typography>
              <Typography variant="h6" gutterBottom>
                {weather.weather[0].description}
              </Typography>
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
                {getWeatherIcon()}
              </div>
              <Typography>
                💧 Humidity: {weather.main.humidity}%
              </Typography>
              <Typography>
                🌬 Wind: {weather.wind.speed} m/s
              </Typography>
            </CardContent>
          </Card>
        )
      )}
    </Container>
  );
}
