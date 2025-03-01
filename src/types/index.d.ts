import "next-auth"
import type { DefaultSession } from "next-auth"

declare type newUserParams = {
    username: string
    password: string
    email: string
}

declare module "next-auth" {
    interface User {
        _id?: string
        username?: string
        email?: string
    }

    interface Session {
        user : {
            _id: string
            email: string
            username: string
        } & DefaultSession['User']
    }
}