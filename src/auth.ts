import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUser } from "./lib/database/actions/user.action"
import bcrypt from "bcryptjs"
import { loginFormSchema } from "./types/zod"
// import { loginFormSchema } from "@/types"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                let user = null

                const { email, password } = await loginFormSchema.parseAsync(credentials)

                user = await getUser({email: email})

                if (!user) {
                    throw new Error("Invalid credentials. 1")
                }

                const passCheck = await bcrypt.compare(password, user.password)

                if (!passCheck) {
                    throw new Error("Invalid credentials. 2")
                }

                return user
            },
        }),
        GitHub,
        Google,
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token._id = user._id?.toString()
                token.email = user.email
                token.username = user.username
            }
            return token
        },
        async session({session, token}) {
            if(token) {
                session.user._id = token._id
                session.user.email = token.email
                session.user.username = token.username
            }
            return session
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/sign-in"
    },
    secret: process.env.AUTH_SECRET,
})