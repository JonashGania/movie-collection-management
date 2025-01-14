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
    } catch (error) {
        console.error('Error creating user', error)
        res.status(500).json({
            status: 500,
            message: "An error occured while creating a user" 
        })
    }
}