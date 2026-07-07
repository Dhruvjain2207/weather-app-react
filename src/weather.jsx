import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './weather.css'
import { useState } from 'react';

function Weather(){
    let[city,setCity]=useState("");
    let[weatherInfo,setWeatherInfo]=useState({temperature:"",Max_temperature:"",Min_temperature:"",Humidity:""});
    let[showCard,setShowCard]=useState(false);
    let[error,setError]=useState("");
    let handleChange=(event)=>{
        setCity(event.target.value);
    }
    let handleSubmit=(event)=>{
        event.preventDefault();
        geoCode();
        setCity("");
    }
    let API="https://api.openweathermap.org/data/2.5/weather"
    let geo_API="https://api.openweathermap.org/geo/1.0/direct"
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    
    let geoCode=async()=>{
        try{
            setError("");
            setShowCard(false);

            if(!key){
                throw new Error("Weather API key is missing. Add VITE_WEATHER_API_KEY in Vercel environment variables.");
            }

            let res= await fetch(`${geo_API}?q=${encodeURIComponent(city)}&limit=1&appid=${key}`);
            if(!res.ok){
                throw new Error("Could not find that city.");
            }

            let jsonres= await res.json();
            if(!jsonres.length){
                throw new Error("City not found. Please try another city name.");
            }

            let latitude=jsonres[0].lat;
            let longitude=jsonres[0].lon;
            let info= await fetch(`${API}?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`);
            if(!info.ok){
                throw new Error("Weather service is unavailable right now.");
            }

            let jsoninfo=await info.json();
            setWeatherInfo((prev)=>{
                return{
                    ...prev,
                    temperature:jsoninfo.main.temp,
                    Max_temperature:jsoninfo.main.temp_max,
                    Min_temperature:jsoninfo.main.temp_min,
                    Humidity:jsoninfo.main.humidity
                }
            })
            setShowCard(true);
        }catch(err){
            setError(err.message);
        }
        
        
    }

    return(
        <div className="container">
         <h1>Weather App</h1>
         <form onSubmit={handleSubmit}>
                 <TextField required id="cityName" label="City Name" variant="outlined" value={city} onChange={handleChange} /><br></br><br></br>
                   <Button variant="contained" type="submit">Get weather Info</Button>

         </form>
         {error ? <p className="error">{error}</p> : null}
         <div className="weatherCard">
            {
                showCard ? (
                    <>
                    <h3>weather details</h3>
                    Temperature:{weatherInfo.temperature};<br></br><br></br>
                    Maximum Temperature:{weatherInfo.Max_temperature}<br></br><br></br>
                    Minimum Temoerature:{weatherInfo.Min_temperature}<br></br><br></br>
                    Humidity:{weatherInfo.Humidity}
                    </>
                ):null
            }
         </div>
        

        </div>
    )
}
export default Weather
