import { validationResult } from 'express-validator';

const countries = [
  {
    id: 1,
    name: 'Mexico',
    alpha2Code: 'MX',
    alpha3Code: 'MEX'
  },
  {
    id: 2,
    name: 'France',
    alpha2Code: 'FR',
    alpha3Code: 'FRA'
  },
  {
    id: 3,
    name: 'Norway',
    alpha2Code: 'NO',
    alpha3Code: 'NOR'
  },
  {
    id: 4,
    name: 'Argentina',
    alpha2Code: 'AR',
    alpha3Code: 'ARG'
  }
];

const findCountry = code => {
  if (!code) return null;
  const countryCode = code.toUpperCase();
  return countries.find(c => c.alpha2Code === countryCode || c.alpha3Code === countryCode);
};

export const getAllCountries = (req, res) => {
  const {
    query: { sort }
  } = req;
  if (sort) return res.json([...countries].sort((a, b) => (a.name > b.name ? 1 : -1)));
  res.json(countries);
};

export const createCountry = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { body } = req;
  const newCountry = { id: countries.length + 1, ...body };
  const alreadyExists = [findCountry(body.alpha2Code), findCountry(body.alpha3Code)];
  if (alreadyExists.some(el => el))
    return res.status(403).json({ error: 'Country already exists' });
  countries.push(newCountry);
  res.status(201).send(newCountry);
};

export const getSingleCountry = (req, res) => {
  const {
    params: { code }
  } = req;
  const country = findCountry(code);
  if (!country) return res.status(404).json({ error: 'Country does not exist' });
  res.json(country);
};
