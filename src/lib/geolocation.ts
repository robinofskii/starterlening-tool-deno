import { postgresClient } from "../helpers/db/index.ts";
import type {
    Geolocation,
    Municipality,
} from "../types/api/index.ts";

export const getGeolocations = async (): Promise<Geolocation[]> => {
    const data = await postgresClient<Geolocation[]>`
    SELECT * FROM geolocation
    `;

    return data;
};

export const getGeolocation = async (
    geolocationId: Geolocation["id"],
): Promise<Geolocation> => {
    const data = await postgresClient<Geolocation[]>`
    SELECT * FROM geolocation WHERE id = ${geolocationId}
    `;

    return data[0];
};

export const getGeolocationByMunicipalityId = async (
    municipalityId: Municipality["id"],
): Promise<Geolocation[]> => {
    const data = await postgresClient<Geolocation[]>`
    SELECT * FROM geolocation WHERE municipality_id = ${municipalityId}
    `;

    return data;
}

export const postGeolocation = async (
    municipalityId: Municipality["id"],
    geoData: Omit<Geolocation, "id">,
) => {
    const data = await postgresClient<Geolocation[]>`
    INSERT INTO geolocation (
        municipality_id, place_id, osm_type, osm_id, latitude, longitude, class, type, place_rank, importance, addresstype, display_name, state, country, country_code, boundingbox
    )
    VALUES (
       ${municipalityId}, ${geoData.place_id}, ${geoData.osm_type}, ${geoData.osm_id}, ${geoData.lat}, ${geoData.lon}, ${geoData.class}, ${geoData.type}, ${geoData.place_rank}, ${geoData.importance}, ${geoData.addresstype}, ${geoData.display_name}, ${geoData.address.state}, ${geoData.address.country}, ${geoData.address.country_code}, ${geoData.boundingbox}::jsonb
    );
    `;

    return data;
};

export const deleteGeolocation = async (
    geolocationId: Geolocation["id"],
) => {
    const data = await postgresClient<Geolocation[]>`
    DELETE FROM geolocation WHERE id = ${geolocationId}
    `;

    return data;
}
