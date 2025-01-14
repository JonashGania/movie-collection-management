import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserQuery = async (username: string, password: string) => {
    return await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })
}