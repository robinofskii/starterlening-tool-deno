import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";
import "@std/dotenv/load";

export const postgresClient = postgres({
  database: Deno.env.get("DB_DATABASE"),
  hostname: Deno.env.get("DB_HOST"),
  port: parseInt(Deno.env.get("DB_PORT") as string),
  user: Deno.env.get("DB_USER"),
  password: Deno.env.get("DB_PASSWORD"),
});
