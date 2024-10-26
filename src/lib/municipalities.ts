import { postgresClient } from "../helpers/db/index.ts";
import type { Municipality } from "../types/api/index.ts";

export const getMunicipalities = async (): Promise<Municipality[]> => {
    const data = await postgresClient<Municipality[]>`
            SELECT * FROM municipalities
        `;

    return data;
};

export const getMunicipality = async (
    id: Municipality["id"],
): Promise<Municipality> => {
    const data = await postgresClient<Municipality[]>`
            SELECT * FROM municipalities WHERE id = ${id}
        `;

    return data[0];
};

export const postMunicipality = async (
    municipality: Omit<Municipality, "id">,
) => {
    const data = await postgresClient<Municipality[]>`
            INSERT INTO municipalities (
                municipality, loan
            )
            VALUES (
                ${municipality.municipality}, ${municipality.loan}
            );
        `;

    return data;
};

export const deleteMunicipality = async (
    id: Municipality["id"],
) => {
    const data = await postgresClient<Municipality[]>`
            DELETE FROM municipalities WHERE id = ${id}
        `;

    return data;
};