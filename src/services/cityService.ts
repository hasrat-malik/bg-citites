import axios, { AxiosError } from 'axios';
import NodeCache from "node-cache";
import { Configuration } from '../config/config';
import { City, EnrichedCity, PaginatedResponse, PollutionData } from '../helper/interface';
import { getAccessToken, refreshAccessToken } from './authService';
import { getWikipediaDescription, isValidCity, titleCase } from '../helper/common-function';
import { CountryMap, HttpStatusCode } from '../helper/enum';
import { error } from 'console';

const cache = new NodeCache({ stdTTL: 600 }); // Cache expires after 10 minutes

export const fetchCities = async (country: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse> => {
  const cacheKey = `cities-${country}`;
  // fetch cities from cache first
  const cachedCities = cache.get<EnrichedCity[]>(cacheKey);
  if (cachedCities) {
    // set paginated records
    const total = cachedCities.length;
    const start = (page - 1) * limit;
    const paginatedCities = cachedCities.slice(start, start + limit);

    return {
      page,
      limit,
      total,
      cities: paginatedCities
    };
  }
  // when no cache found then below code will execute
  const MAX_LIMIT = 100;
  let allCities: City[] = [];
  let currentPage = 1;
  let hasMore = true;
  // We have used while hasMore here to load all cities first from mock API with 100 max limit
  while (hasMore) {
    const accessToken = await getAccessToken();
    const response = await axios.get<PollutionData>(`${Configuration.mock_base_api}/pollution`, {
      params: { country, page: currentPage, limit: MAX_LIMIT },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).catch(async (error: AxiosError) => {
      if (error.status === HttpStatusCode.UNAUTHORIZED) {
        // Refresh token
        await refreshAccessToken();
        const newAccessToken = await getAccessToken();
        return axios.get<PollutionData>(`${Configuration.mock_base_api}/pollution`, {
          params: { country, page: currentPage, limit: MAX_LIMIT },
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          }
        });
      }
      throw error;
    });

    const results = response.data.results;
    allCities.push(...results);
    hasMore = results.length === MAX_LIMIT; // If fewer than MAX_LIMIT, it's the last page
    currentPage++;
  }
  const validCities: EnrichedCity[] = [];

  // used promise.all to call isValidCity and getWikipediaDescription methods concurrently
  await Promise.all(
    allCities.map(async (city) => {
      const { name, pollution } = city;
      if (await isValidCity(name)) {
        const description = await getWikipediaDescription(name);
        validCities.push({ name: titleCase(name), country: CountryMap[country], pollution, description });
      }
    })
  );
  // store data into cache
  cache.set(cacheKey, validCities);

  // Set paginated records
  const total = validCities.length;
  const start = (page - 1) * limit;
  const paginatedCities = validCities.slice(start, start + limit);

  return {
    page,
    limit,
    total,
    cities: paginatedCities
  };
};
