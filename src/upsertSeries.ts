// Convert series data to CSV files to upload to mySQL db
import { config } from "./lib/config.js";
import * as types from "./types/tvdb.js";
import fs from "fs";
import { conn, db } from "./db/db.js";
import { media, mediaGenre, remoteId } from "./db/schema.js";
import { processSeries } from "./lib/utils.js";
import { and, eq, sql } from "drizzle-orm";

async function main() {
  const series: types.TVDB.Series.Extended.Data[] = JSON.parse(
    fs.readFileSync(`${config.outDir}/series.json`, "utf8")
  );
  let updatedCount = 0;
  let insertedCount = 0;
  let failedCount = 0;

  // Preprocess series data to prepare for upsert
  const processedSeries = processSeries(series);
  for (const {
    releaseDate,
    ageRating,
    description,
    thumbnailUrl,
    rating,
    runtime,
    title,
    genres,
    tvdbId,
    tmdbId,
  } of processedSeries) {
    try {
      const [row] = await db
        .insert(media)
        .values({
          category: "tv_show",
          title,
          description,
          releaseDate,
          ageRating,
          thumbnailUrl,
          rating,
          runtime,
        })
        .onDuplicateKeyUpdate({
          set: {
            title,
            description,
            releaseDate,
            ageRating,
            thumbnailUrl,
            rating,
            runtime,
          },
        })
        .$returningId();

      if (row.id === 0) {
        updatedCount++;
      } else {
        insertedCount++;
      }

      const [{ id }] = await db
        .select({ id: media.id })
        .from(media)
        .where(
          and(
            and(eq(media.title, title), eq(media.category, "tv_show")),
            eq(media.releaseDate, releaseDate)
          )
        );

      for (const genre of genres) {
        await db
          .insert(mediaGenre)
          .values({
            mediaId: id,
            genre,
          })
          .onDuplicateKeyUpdate({ set: { id: sql`id` } });
      }

      await db
        .insert(remoteId)
        .values({ id, tvdbId, tmdbId })
        .onDuplicateKeyUpdate({ set: { tvdbId, tmdbId } });
    } catch (error) {
      console.log(`Error inserting: ${title}`, error);
      failedCount++;
    }
  }
  await conn.end();
  console.log(
    `Finished!\n${insertedCount} Inserts, ${updatedCount} Updates, ${failedCount} Failed`
  );
}

await main();
