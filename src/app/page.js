"use client";
import { useState } from "react";
import {Container,TextField,Card,CardContent,Typography,CircularProgress,} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";

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
    <div style={{minHeight: "100vh",background: "linear-gradient(to bottom right, #6DD5FA, #2980B9)",display: "flex",alignItems: "center",justifyContent: "center",padding: "20px",}}>
      <Container maxWidth="sm" sx={{textAlign: "center",color: "white",}}>

        <Typography variant="h3" fontWeight="bold" gutterBottom>
          🌤 Weather App
        </Typography>

        <TextField 
          label="Enter City" variant="outlined"
          value={city}  
          onChange={(e) => setCity(e.target.value)} 
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          fullWidth  
          sx={{background: "white",borderRadius: 2,marginBottom: 3,}}/>

        {loading ? (
          <CircularProgress sx={{ color: "white" }} />
        ) : (
          weather && weather.main && (
            <Card sx={{background: "rgba(255,255,255,0.2)",color: "white",borderRadius: 4,boxShadow: "0 8px 32px rgba(0,0,0,0.2)",backdropFilter: "blur(10px)",}}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {weather.name}, {weather.sys.country}
                </Typography>
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
                  Humidity: {weather.main.humidity}%
                </Typography>
                <Typography>
                  Wind: {weather.wind.speed} m/s
                </Typography>
              </CardContent>
            </Card>
          )
        )}
      </Container>
    </div>
  );
}
