export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorCode {
    VALIDATION = 'VALIDATION',
    AXIOS_ERROR = 'AXIOS_ERROR',
    SERVER = 'SERVER_ERROR'
}

export enum ErrorMessages {
    SERVER = 'Internal server error.'
};

// NOTE: As mock API is supporting only 4 country. so I have used record data instead of fetching from opencage API.
// We can also use opencage API also for fetching country name by using country code
export const CountryMap: Record<string, string> = {
    PL: 'Poland',
    DE: 'Germany',
    ES: 'Spain',
    FR: 'France'
};
