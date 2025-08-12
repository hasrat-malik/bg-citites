import dotenv from 'dotenv';
import { IConfiguration } from "../helper/interface";

dotenv.config();

export const Configuration: IConfiguration = {
    opencage_api: process.env.OPENCAGE_API!,
    opencage_api_key: process.env.OPENCAGE_API_KEY!,
    mock_base_api: process.env.MOCK_API_ENDPOIND!,
    wikipedia_api: process.env.WIKIPEDIA_API!,
    username: process.env.MOCK_API_USERNAME!,
    password: process.env.MOCK_API_PASSWORD!
}