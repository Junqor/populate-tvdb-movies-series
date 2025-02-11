import pThrottle from "p-throttle";
import * as types from "../types/tvdb.js";
import pSettle from "p-settle";
const baseURL = "https://api4.thetvdb.com/v4/";

// 30 req/s
const throttle = pThrottle({
  limit: 30,
  interval: 1000,
});

export class TVDB {
  private _bearerToken: string;

  constructor(key: string) {
    this._bearerToken = key;
  }

  public async getSeries(filters: Record<string, string>, limit: number) {
    // Get base series
    const baseSeries = await this.getBaseSeries(filters, limit);
    const searchParams = new URLSearchParams({
      meta: types.TVDB.Params.Meta.translations,
    });

    const extendedSeries = await pSettle(
      baseSeries.slice(0, limit).map(async (series) => {
        const result = await this._get<types.TVDB.Series.Extended.Root>(
          `series/${series.id}/extended`,
          searchParams
        );
        return result.data;
      })
    );

    const resolvedSeries = extendedSeries
      .filter((result) => result.isFulfilled)
      .map((result) => result.value);

    return resolvedSeries;
  }

  // Get the base series info
  public async getBaseSeries(filters: Record<string, string>, limit: number) {
    const series = [];

    let page = 0;
    do {
      const searchParams = new URLSearchParams({
        ...filters,
        page: JSON.stringify(page++),
      });
      const response = await this._get<types.TVDB.Series.Short.Root>(
        "series/filter",
        searchParams
      );
      series.push(...response.data);
      if (response.links.next === null) break; // No more pages
    } while (series.length < limit);

    return series;
  }

  private _get = throttle(this._getInit);

  private async _getInit<T>(
    path: string,
    params?: URLSearchParams
  ): Promise<T> {
    const url = `${baseURL}${path}${params ? `?${params.toString()}` : ""}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this._bearerToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
}
