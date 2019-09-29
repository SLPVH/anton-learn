const env = process.env;
export const jwtSecret = env.JWT_SECRET || "jwt_secret";
export const isProduction = env.NODE_ENV === "production";
export const host = 'localhost';
export const port = 3000;
