import { Request, Response } from 'express';
import { fetchCities } from '../services/cityService';
import { SuccessResponse } from '../helper/common-response';

export const searchCities = async (req: Request, res: Response) => {
  const { country, page=1, limit=10 } = req.query;
  
  const cities = await fetchCities(String(country), Number(page), Number(limit));
  return SuccessResponse(res, cities);
};
