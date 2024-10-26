export type NominatimData = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    municipality: string;
    state: string;
    "ISO3166-2-lvl4": string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
};

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
