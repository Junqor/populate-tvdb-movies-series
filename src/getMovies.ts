import * as types from "./types/tvdb.js";
import fs from "fs";
import dotenv from "dotenv";
import { config } from "./lib/config.js";
import { TVDB } from "./lib/tvdb.js";
import { createDir } from "./lib/utils.js";

dotenv.config();

const LIMIT = 500;

async function main() {
  if (!process.env.TVDB_API_KEY) {
    throw new Error("Missing TVDB API key");
  }
  const tvdb = new TVDB(process.env.TVDB_API_KEY);

  // Customize as needed
  const filters = {
    sort: types.TVDB.Params.Sort.score,
    sortType: types.TVDB.Params.SortType.desc,
    genre: types.TVDB.Params.Genres.Anime,
    country: types.TVDB.Params.Country.Japan,
  };

  const movies = await tvdb.getMovies(filters, LIMIT);

  createDir(config.outDir);
  fs.writeFileSync(
    `${config.outDir}/movies.json`,
    JSON.stringify(movies, null, 2).replaceAll(/^\s*\n/gm, "")
  );
}

await main();
