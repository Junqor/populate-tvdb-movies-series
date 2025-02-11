import fs from "fs";
import * as types from "../types/tvdb.js";

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
  if (series.translations.nameTranslations.length > 0) {
    const nameTranslation = series.translations.nameTranslations.find(
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
  if (series.translations.nameTranslations.length > 0) {
    const overviewTranslation = series.translations.overviewTranslations.find(
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
  if (series.remoteIds.length > 0) {
    const remoteId = series.remoteIds.find(
      (r) => r.sourceName === "TheMovieDB.com"
    );
    if (remoteId) {
      tmdbId = parseInt(remoteId.id);
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
