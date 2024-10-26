import {
  getGeolocationByMunicipalityId,
  getMunicipalities,
  postGeolocation,
} from "../../lib/index.ts";
import { getNominatimGeolocationByCity } from "../api/index.ts";
import { randomDelay } from "../index.ts";

const data = await getMunicipalities();

for (const mun of data) {
  try {
    const { id, municipality } = mun;
    const exists = await getGeolocationByMunicipalityId(id);

    if (exists) {
      console.log(
        `Geolocation data already exists for municipality: ${municipality}. Skipping...`,
      );
    } else {
      await randomDelay(10, 20);
      const res = await getNominatimGeolocationByCity(municipality);
      if (res.length > 0) {
        const geoData = { ...res[0] };

        await postGeolocation(id, geoData);
      } else {
        console.log(`No geolocation data found for ${municipality}`);
      }
    }
  } catch (error) {
    console.error(
      `Failed to process municipality: ${mun.municipality}`,
      error,
    );
  }
}
