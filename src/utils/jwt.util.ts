import fs from "fs";
import jwt from "jsonwebtoken";

const publicKey = fs.readFileSync("../../oauth/public.key.pem", {flag:"r"});
const privateKey = fs.readFileSync("../../oauth/private.key.pem", {flag:"r"});

console.log(publicKey);

export const signJwt = function(object: Object, options: jwt.SignOptions|undefined) {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256"
    });
}

export const verifyJwt = function(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch(error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        }
    }
}
