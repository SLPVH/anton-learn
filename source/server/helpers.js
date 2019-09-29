import jwt from 'jsonwebtoken';
import config from './config';


const sign = (payload, params) => {
    const jwtid = uuid();
    const token = jwt.sign(payload, config.jwtSecret, { jwtid, expiresIn, ...params });
    const decodedToken = jwt.decode(token);

    return { token, decodedToken };
};

export default {
    sign,
};
