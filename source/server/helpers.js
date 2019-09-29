import jwt from 'jsonwebtoken';
import { jwtSecret } from "./config";


export const jwtSign = (payload, params = {}) => {
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '30d', ...params });
    const decodedToken = jwt.decode(token);
    return { token, decodedToken };
};
