import { signIn } from "@/auth";
import { connectToDatabase } from "@/lib/database/db";
import User from "@/lib/database/models/user.model";
import { handleError, saltAndHashPassword } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    await connectToDatabase()

    const user = await req.json()

    console.log(user)

    try {
        const oldUser = await User.findOne({
            $or: [
                { email: user?.email },
                { username: user?.username }
            ]
        })

        if (oldUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 429 })
        }
    } catch (error) {
        handleError(error)
    }

    const hashedPassword = await saltAndHashPassword(user.password)

    const newUser = await User.create({
        email: user.email,
        username: user.username,
        password: hashedPassword
    })

    console.log(newUser)

    if (!newUser) throw new Error("User can't register now")

    try {
        const { email, password } = user
        const loginUser = await signIn("credentials", {
            redirect: true,
            redirectTo: "/profile",
            email,
            password
        })
        console.log(loginUser)
    } catch (error) {
        handleError(error)
    }
}