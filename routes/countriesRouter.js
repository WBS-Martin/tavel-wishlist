import { Router } from 'express';
import { body } from 'express-validator';
import { createCountry, getAllCountries, getSingleCountry } from '../controllers/countries.js';

const countriesRouter = Router();

countriesRouter
  .route('/')
  .get(getAllCountries)
  .post(
    body('name').not().isEmpty().isLength({ min: 2 }),
    body('alpha2Code').isISO31661Alpha2(),
    body('alpha3Code').isISO31661Alpha3(),
    createCountry
  );
countriesRouter.route('/:code').get(getSingleCountry);

export default countriesRouter;
