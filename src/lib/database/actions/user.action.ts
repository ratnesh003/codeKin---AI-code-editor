import { handleError } from "@/lib/utils"
import { connectToDatabase } from "@/lib/database/db"
import User from "@/lib/database/models/user.model"
import { newUserParams } from "@/types"

export const createUser = async (user: newUserParams) => {

    try {

        await connectToDatabase()

        const newUser = await User.create({user})

        return newUser

    } catch (error: any) {
        handleError(error)
    }
}

export const getUser = async ({email}: {
    email: string,
}) => {

    try {

        await connectToDatabase();

        const user = await User.findOne({email})

        return user;

    } catch (error) {
        handleError(error)
    }
}