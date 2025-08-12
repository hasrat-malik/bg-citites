import express from 'express';
import { searchCities } from '../controllers/cityController';
import { citySchema } from '../schema/citySchema';
import { celebrate } from 'celebrate';

const { search } = citySchema;

const router = express.Router();

// GET: Get all cities list
router.get('/cities', celebrate(search), searchCities);

export default router;
