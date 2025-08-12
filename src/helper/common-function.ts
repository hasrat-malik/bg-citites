import { isCelebrateError } from 'celebrate';
import { ErrorMessages, ErrorCode, HttpStatusCode } from './enum';
import { IErrorResponse } from './interface';
import axios, { isAxiosError } from 'axios';
import { Configuration } from '../config/config';

export function getCommonErrorResponse(error: any): IErrorResponse {
  console.error('API Error: ', error.message);
  const errorCode = setErrorCode(error);
  console.log('error code: ', errorCode);
  let errorResponse;
  switch (errorCode) {
    case ErrorCode.VALIDATION:
      // Celebrate validation errors are stored in a Map
      const segment = error.details.keys().next().value; // 'body', 'query', etc.
      const validationError = error.details.get(String(segment));
      const message = validationError?.details?.[0]?.message || 'Validation failed';
      errorResponse = {
        statusCode: HttpStatusCode.BAD_REQUEST,
        errorCode: ErrorCode.VALIDATION,
        message: message.replace(/['"]/g, '')
      }
      break;
    case ErrorCode.AXIOS_ERROR:
      errorResponse = {
        statusCode: error.response?.status as HttpStatusCode,
        errorCode: String(error.response?.statusText),
        message: error.response.data.error
      }
      break;
    default:
      errorResponse = {
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        errorCode: ErrorCode.SERVER,
        message: ErrorMessages.SERVER
      }
      break;
  }
  return errorResponse;
}

export const titleCase = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // Normalize spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const normalizeString = (str: string): string => {
  return str
    .normalize("NFD") // Split accented characters into base + diacritic
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .split(' ').join('_') // join words using underscore
};

function setErrorCode(error: any): string {
  let errorCode = "";
  if (isCelebrateError(error)) {
    errorCode = ErrorCode.VALIDATION;
  } else if (isAxiosError(error)) {
    errorCode = ErrorCode.AXIOS_ERROR;
  } else {
    errorCode = error.name;
  }
  return errorCode;
}

export async function isValidCity(cityName: string): Promise<boolean> {
  try {
    const response = await axios.get(Configuration.opencage_api, {
      params: {
        q: normalizeString(cityName),
        key: Configuration.opencage_api_key
      }
    });
    const result = response.data?.results[0] || {};
    const components = result.components;
    const validCity: string = components.city || components.town || components.village;
    return (
      normalizeString(cityName) === normalizeString(validCity)
    );
  } catch (error) {
    console.error(`Error validating city "${cityName}":`, error);
    return false;
  }
}

export async function getWikipediaDescription(cityName: string): Promise<string> {
  try {
    const response = await axios.get(`${Configuration.wikipedia_api}/${normalizeString(cityName)}`);
    return response.data?.extract || "No description available.";
  } catch (err) {
    console.warn(`Wikipedia fetch failed for ${cityName}:`, (err as Error).message);
    return "No description available.";
  }
}