const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=Travnik&APPID=";
const API_KEY = "7890d190f2b467ed6b8866f49be5dd2e";

// Get weather details in travnik
export async function getCityWeather() {
    try {
        const res = await fetch(`${API_URL}${API_KEY}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)    
    }
}