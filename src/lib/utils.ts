import fs from "fs";
import * as types from "../types/tvdb.js";
import { db } from "../db/db.js";
import { media, mediaGenre, remoteId } from "../db/schema.js";
import { and, eq, sql } from "drizzle-orm";

export function createDir(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

export const processSeries = (
  seriesList: types.TVDB.Series.Extended.Data[]
) => {
  return seriesList.map((s) => {
    return getSeriesData(s);
  });
};

const getSeriesData = (series: types.TVDB.Series.Extended.Data) => {
  let ageRating = "NR"; // Default to NR
  if (series.contentRatings) {
    const ageRatingObj = series.contentRatings.find((c) => c.country === "usa");
    if (ageRatingObj) {
      ageRating = ageRatingObj.name;
    }
  }

  // Look for english translation
  let title = "";
  const nameTranslations = series.translations.nameTranslations;
  if (nameTranslations) {
    const nameTranslation = nameTranslations.find(
      (t) => t.language === types.TVDB.Params.Language.English
    );
    if (nameTranslation) {
      title = nameTranslation.name;
    }
  } else {
    // Default to primary name
    title = series.name;
  }

  // Look for english translation
  let description = null;
  const overviewTranslations = series.translations.overviewTranslations;
  if (overviewTranslations) {
    const overviewTranslation = overviewTranslations.find(
      (t) => t.language === "eng"
    );
    if (overviewTranslation) {
      description = overviewTranslation.overview;
    }
  } else if (series.overview) {
    // Default to primary overview
    description = series.overview;
  }

  // Look for TMDB id
  let tmdbId = -1;
  const remoteIds = series.remoteIds;
  if (remoteIds) {
    const remoteId = remoteIds.find((r) => r.sourceName === "TheMovieDB.com");
    if (remoteId) {
      tmdbId = parseInt(remoteId.id) || -1;
    }
  }

  let tvdbId = series.id;
  let thumbnailUrl = series.image ? series.image : null;
  let rating = series.score ? series.score : null;
  let runtime = series.averageRuntime ? series.averageRuntime : null;
  let genres = series.genres ? series.genres.map((g) => g.name) : [];
  let releaseDate = series.firstAired;

  return {
    tvdbId,
    tmdbId,
    title,
    description,
    releaseDate,
    ageRating,
    thumbnailUrl,
    rating,
    runtime,
    genres,
  };
};

export const processMovies = (movies: types.TVDB.Movies.Extended.Data[]) => {
  return movies.map((m) => {
    return getMovieData(m);
  });
};

const getMovieData = (movie: types.TVDB.Movies.Extended.Data) => {
  let ageRating = "NR"; // Default to NR
  if (movie.contentRatings) {
    const ageRatingObj = movie.contentRatings.find((c) => c.country === "usa");
    if (ageRatingObj) {
      ageRating = ageRatingObj.name;
    }
  }

  // Look for english translation
  let title = "";
  const nameTranslations = movie.translations.nameTranslations;
  if (nameTranslations) {
    const nameTranslation = nameTranslations.find(
      (t) => t.language === types.TVDB.Params.Language.English
    );
    if (nameTranslation) {
      title = nameTranslation.name;
    }
  } else {
    // Default to primary name
    title = movie.name;
  }

  // Look for english translation
  let description = null;
  const overviewTranslations = movie.translations.overviewTranslations;
  if (overviewTranslations) {
    const overviewTranslation = overviewTranslations.find(
      (t) => t.language === types.TVDB.Params.Language.English
    );
    if (overviewTranslation) {
      description = overviewTranslation.overview;
    }
  }
  // Movies do not have a primary overview for some reason

  // Look for TMDB id
  let tmdbId = -1;
  const remoteIds = movie.remoteIds;
  if (remoteIds) {
    const remoteId = remoteIds.find((r) => r.sourceName === "TheMovieDB.com");
    if (remoteId) {
      tmdbId = parseInt(remoteId.id) || -1;
    }
  }

  let tvdbId = movie.id;
  let thumbnailUrl = movie.image ? movie.image : null;
  let rating = movie.score ? movie.score : null;
  let runtime = movie.runtime ? movie.runtime : null;
  let genres = movie.genres ? movie.genres.map((g) => g.name) : [];
  let releaseDate = movie.first_release.date;

  return {
    tvdbId,
    tmdbId,
    title,
    description,
    releaseDate,
    ageRating,
    thumbnailUrl,
    rating,
    runtime,
    genres,
  };
};

export const upsert = async ({
  category,
  entries,
}: {
  category: "movie" | "tv_show";
  entries: {
    tvdbId: number;
    tmdbId: number;
    title: string;
    description: string | null;
    releaseDate: string;
    ageRating: string;
    thumbnailUrl: string | null;
    rating: number | null;
    runtime: number | null;
    genres: string[];
  }[];
}) => {
  let updatedCount = 0;
  let insertedCount = 0;
  let failedCount = 0;
  for (const {
    releaseDate,
    ageRating,
    description,
    thumbnailUrl,
    rating,
    runtime,
    title,
    genres,
    tmdbId,
    tvdbId,
  } of entries) {
    const total = insertedCount + updatedCount + failedCount;
    if (total % 100 === 0) {
      console.log(`Progress: ${total}/${entries.length}`);
    }

    try {
      const [row] = await db
        .insert(media)
        .values({
          category,
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
            and(eq(media.title, title), eq(media.category, category)),
            eq(media.releaseDate, releaseDate)
          )
        );

      const genresToInsert = genres.map((g) => ({ mediaId: id, genre: g }));
      await db
        .insert(mediaGenre)
        .values(genresToInsert)
        .onDuplicateKeyUpdate({ set: { id: sql`id` } });

      await db
        .insert(remoteId)
        .values({ id, tvdbId, tmdbId })
        .onDuplicateKeyUpdate({ set: { tvdbId, tmdbId } });
    } catch (error) {
      console.log(`Error inserting: ${title}\n`, error);
      failedCount++;
    }
  }
  console.log(
    `Finished!\n${insertedCount} Inserts, ${updatedCount} Updates, ${failedCount} Failed`
  );
};
