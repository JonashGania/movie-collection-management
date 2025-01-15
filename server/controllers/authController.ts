import { Request, Response, NextFunction } from "express"
import { createUserQuery } from "../db/queries.js"
import bcrypt from 'bcryptjs';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await createUserQuery(username, hashedPassword);

        res.status(201).json({ 
            status: 201,
            message: "User created successfully."
        })
    } catch (error: any) {
        console.error('Error creating user', error)

        if (error.code === 'P2002' && error.meta?.target.includes('username')) {
            res.status(409).json({
                status: 409,
                message: "Username is already taken."
            })
        } else {
            res.status(500).json({
                status: 500,
                message: "An error occured while creating a user" 
            })
        }
    }
}