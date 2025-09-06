import { auth } from "express-oauth2-jwt-bearer";
let jwtCheckInstance = null;
/**
 * Middleware to validate the JWT using Auth0
 */
export const jwtCheck = (req, res, next) => {
    if (!jwtCheckInstance) {
        jwtCheckInstance = auth({
            audience: process.env.AUTH0_AUDIENCE,
            issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
            tokenSigningAlg: "RS256",
        });
    }
    jwtCheckInstance(req, res, (err) => {
        if (err) {
            console.error("JWT validation failed:", err);
            return res.status(401).json({ message: "Invalid or missing token" });
        }
        next();
    });
};
/**
 * Middleware to parse the Auth0 user ID (sub) from the JWT
 */
export const jwtParse = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token required" });
    }
    try {
        const token = authHeader.split(" ")[1];
        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
        req.auth0Id = payload.sub;
        if (!req.auth0Id) {
            return res.status(401).json({ message: "Auth0 ID missing in token" });
        }
        next();
    }
    catch (error) {
        console.error("JWT parsing error:", error);
        return res.status(401).json({ message: "Invalid token format" });
    }
};
//# sourceMappingURL=auth.js.map