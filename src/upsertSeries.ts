// Convert series data to CSV files to upload to mySQL db
import { config } from "./lib/config.js";
import * as types from "./types/tvdb.js";
import fs from "fs";
import { conn } from "./db/db.js";
import { processSeries, upsert } from "./lib/utils.js";

async function main() {
  try {
    const series: types.TVDB.Series.Extended.Data[] = JSON.parse(
      fs.readFileSync(`${config.outDir}/series.json`, "utf8")
    );

    // Preprocess series data to prepare for upsert
    const processedSeries = processSeries(series);
    await upsert({ category: "tv_show", entries: processedSeries });
  } finally {
    console.log("Closing connection");
    await conn.end();
  }
}

await main();
