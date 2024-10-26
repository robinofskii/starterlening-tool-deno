import type { NominatimData } from "../../types/api/index.ts";

export const getNominatimGeolocationByCity = async (
    municipality: string,
): Promise<NominatimData[]> => {
    console.log(`Fetching data for ${municipality}`);

    const data = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&city=${municipality}&country=nl&limit=1`,
    );
    const res = await data.json();

    return res;
};