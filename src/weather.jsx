import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './weather.css'
import { useState } from 'react';

function Weather(){
    let[city,setCity]=useState("");
    let[weatherInfo,setWeatherInfo]=useState({temperature:"",Max_temperature:"",Min_temperature:"",Humidity:""});
    let[showCard,setShowCard]=useState(false);
    let handleChange=(event)=>{
        setCity(event.target.value);
    }
    let handleSubmit=(event)=>{
        event.preventDefault();
        setCity("");
        geoCode();
    }
    let API="https://api.openweathermap.org/data/2.5/weather"
    let geo_API="http://api.openweathermap.org/geo/1.0/direct"
    let key="d50b5d441872d17ab494506a14226056";
    
    let geoCode=async()=>{
        let res= await fetch(`${geo_API}?q=${city}&appid=d50b5d441872d17ab494506a14226056`);
        let jsonres= await res.json();
        let latitude=jsonres[0].lat;
        let longitude=jsonres[0].lon;
        let info= await fetch(`${API}?lat=${latitude}&lon=${longitude}&appid=d50b5d441872d17ab494506a14226056&units=metric`);
        let jsoninfo=await info.json();
        console.log(jsoninfo);
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
        
        
    }

    return(
        <div className="container">
         <h1>Weather App</h1>
         <form onSubmit={handleSubmit}>
                 <TextField required id="cityName" label="City Name" variant="outlined" value={city} onChange={handleChange} /><br></br><br></br>
                   <Button variant="contained" type="submit">Get weather Info</Button>

         </form>
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