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

const findCountry = country =>
  countries.findIndex(
    c => c.alpha2Code === country.alpha2Code || c.alpha3Code === country.alpha3Code
  );

export const getAllCountries = (req, res) => {
  const {
    query: { sort }
  } = req;
  if (sort) return res.json([...countries].sort((a, b) => (a.name > b.name ? 1 : -1)));
  res.json(countries);
};

export const createCountry = (req, res) => {
  const { body } = req;
  const newCountry = { id: countries.length + 1, ...body };
  const found = findCountry(body);
  if (found > 0) return res.status(403).json({ error: 'Country already exists' });
  countries.push(newCountry);
  res.status(201).send(newCountry);
};
