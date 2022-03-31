import express from 'express';
import countriesRouter from './routes/countriesRouter.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/countries', countriesRouter);
app.get('/', (req, res) => res.send('Travel Wishlist API'));

app.listen(port, () => console.log(`Server running at http://localhost:5000`));
