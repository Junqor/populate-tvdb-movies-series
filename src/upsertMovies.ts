// Convert series data to CSV files to upload to mySQL db
import { config } from "./lib/config.js";
import * as types from "./types/tvdb.js";
import fs from "fs";
import { conn } from "./db/db.js";

import { processMovies, upsert } from "./lib/utils.js";

async function main() {
  try {
    const movies: types.TVDB.Movies.Extended.Data[] = JSON.parse(
      fs.readFileSync(`${config.outDir}/movies.json`, "utf8")
    );

    // Preprocess data to prepare for upsert
    const entries = processMovies(movies);
    await upsert({ category: "movie", entries: entries });
  } finally {
    console.log("Closing connection");
    await conn.end();
  }
}

await main();
