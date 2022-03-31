import { Router } from 'express';
import { createCountry, getAllCountries } from '../controllers/countries.js';

const countriesRouter = Router();

countriesRouter.route('/').get(getAllCountries).post(createCountry);

export default countriesRouter;
