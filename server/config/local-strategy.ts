import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "./dbConnect.js";

declare global {
    namespace Express {
        interface User {
            username: string;
            id?: string
        }
    }
}

passport.serializeUser((user, done) => {
    done(null, user.id)
}) 

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    } catch (error) {
        done(error);
    }
})


export default passport.use(
    new LocalStrategy(async(username, password, done) => {
        try {
            const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect Username" })
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return done(null, false, { message: "Incorrect Password" })
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
)