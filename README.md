Scripts for pulling movie and series information from the tvdb api and upserting them to mySQL.

Used in [Archivr](https://github.com/Junqor/Archivr)

## Usage:

- modify filters in [getMovies.ts](https://github.com/Junqor/populate-tvdb-movies-series/blob/7bf5ee6b0fb7526c835a46d1ff8b50440d197b1c/src/getMovies.ts#L19) and [getseries.ts](https://github.com/Junqor/populate-tvdb-movies-series/blob/7bf5ee6b0fb7526c835a46d1ff8b50440d197b1c/src/getSeries.ts#L19) as desired
  - See the [tvdb api docs](https://thetvdb.github.io/v4-api/) for examples
- `npx tsx src/getMovies.ts` to populate movies
- `npx tsx src/upsertMovies.ts` to upsert them to the db

[![](https://thetvdb.com/images/logo.svg)](https://thetvdb.com/)
