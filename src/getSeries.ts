import * as types from "./types/tvdb.js";
import fs from "fs";
import dotenv from "dotenv";
import { config } from "./lib/config.js";
import { TVDB } from "./lib/tvdb.js";
import { createDir, getTvdbToken } from "./lib/utils.js";

dotenv.config();

const LIMIT = 1500;

async function main() {
  if (!process.env.TVDB_API_KEY) {
    throw new Error("Missing TVDB API key");
  }
  const key = await getTvdbToken(process.env.TVDB_API_KEY); // get bearer token
  const tvdb = new TVDB(key);

  // Customize as needed
  const filters = {
    sort: types.TVDB.Params.Sort.score,
    sortType: types.TVDB.Params.SortType.desc,
    genre: types.TVDB.Params.Genres.Anime,
    country: types.TVDB.Params.Country.Japan,
  };

  const series = await tvdb.getSeries(filters, LIMIT);

  createDir(config.outDir);
  fs.writeFileSync(
    `${config.outDir}/series.json`,
    JSON.stringify(series, null, 2).replaceAll(/^\s*\n/gm, "")
  );
}

await main();
