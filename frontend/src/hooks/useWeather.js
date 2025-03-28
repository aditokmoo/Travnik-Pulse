import { useQuery } from "@tanstack/react-query";
import { getCityWeather } from "../services/weatherServices";

// Get Travnik Weather
export function useGetWeather() {
    const { data, isLoading } = useQuery({
        queryFn: getCityWeather,
        queryKey: ["weather"]
    });
    
    return { data, isLoading }
}