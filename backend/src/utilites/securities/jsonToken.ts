import { Jwt } from "jsonwebtoken";
import { InternalServerError } from "../errorHandling";
import { users } from "../../model/userModel";


export const loginToken = (user: String, password: String) => {
    const JWT_TOKEN = process.env.JWT_SECRET
    try {
        const user = users
    } catch (err) {
        if(err instanceof Error){
            return {error: 'token creation failed: ' + err.message}
        }
        return {error: 'token creation failed: unknown error occured'}
    }

}