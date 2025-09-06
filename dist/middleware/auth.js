import dotenv from "dotenv";
dotenv.config();
import { auth } from "express-oauth2-jwt-bearer";
// Debug logging
console.log('AUTH0_AUDIENCE:', process.env.AUTH0_AUDIENCE);
console.log('AUTH0_ISSUER_BASE_URL:', process.env.AUTH0_ISSUER_BASE_URL);
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
});
export const jwtParse = (req, res, next) => {
    try {
        const authorization = req.get("authorization");
        if (!authorization) {
            return res.status(401).json({ message: "Authorization header is required" });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }
        // Decode the JWT token to get the auth0Id (sub claim)
        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
        req.auth0Id = payload.sub;
        next();
    }
    catch (error) {
        console.error("Error parsing JWT:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};
//# sourceMappingURL=auth.js.map