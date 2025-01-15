import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

passport.deserializeUser(async (id: string | undefined, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        done(null, user);
    } catch (error) {
        done(error);
    }
})


export default passport.use(
    new LocalStrategy(async(username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            })

            if (!user) {
                return done(null, false, { message: "Username does not exist." })
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return done(null, false, { message: "Incorrect Password." })
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
)