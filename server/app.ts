import express from 'express';
import * as dotenv from 'dotenv';
import moviesRouter from './routes/movies.js';
import genresRouter from './routes/genres.js';
import cors from 'cors';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use('/api', moviesRouter);
app.use('/api', genresRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})