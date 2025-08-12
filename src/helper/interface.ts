import { Response } from 'express';
import { HttpStatusCode } from "./enum";

export interface ISuccessResponse {
    <T>(res: Response, body: T, statusCode?: HttpStatusCode): Response;
}

export interface IErrorResponse {
    statusCode: HttpStatusCode;
    errorCode: string;
    message: string;
}

export interface IConfiguration {
    opencage_api: string;
    opencage_api_key: string;
    mock_base_api: string;
    wikipedia_api: string;
    username: string;
    password: string;
}

export interface City {
    name: string;
    pollution: number;
}

export interface PollutionData {
    meta: {
        page: number;
        totalPages: number;
    }
    results: City[];
  }

  export interface EnrichedCity {
    name: string;
    country: string;
    pollution: number;
    description: string;
  }
  
  export interface PaginatedResponse {
    page: number;
    limit: number;
    total: number;
    cities: EnrichedCity[];
  }