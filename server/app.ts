import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import passport from 'passport';
import cors from 'cors';
import router from './routes/index.js';
import { pool } from './config/dbConnect.js';
import * as dotenv from 'dotenv';
import './config/local-strategy.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000;

const pgSession = connectPgSimple(session);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24     // 1 day
    }
}))

app.use(passport.session());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})