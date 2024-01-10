import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getAirDetails = async (city: string) =>{
    const API = "741eca894b264c9f05a6554cc3ee54c5";
    console.log(process.env.API_KEY2);
    try{
        const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API}`);
        const lat = res.data[0].lat;
        const long = res.data[0].lon;
        const airResponse:any = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${API}`);
        return airResponse.data.list[0].components;
    }catch(error:any)
    {
        throw new Error(error.message);
    }
}
