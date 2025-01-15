import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import passport from 'passport';
import cors from 'cors';
import router from './routes/index.js';
import { pool } from './config/dbConnect.js';
import { limiter } from './middlewares/rateLimiter.js';
import * as dotenv from 'dotenv';
import './config/local-strategy.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000;

const pgSession = connectPgSimple(session);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'Session'
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24     // 1 day
    }
}))

app.use(passport.session());

app.use('/api', limiter);
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})