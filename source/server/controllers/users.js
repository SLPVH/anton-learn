import { UserNotFoundError } from "../errors";
import { jwtSign } from "../helpers";

export const createUserController = async (usersModel, login, password) => {
    let user;
    try {
        user = await usersModel.getUserByLoginAndPassword(login, password);
    } catch (e) {
        if (e instanceof UserNotFoundError) {
            user = await usersModel.createUser(login, password);
        } else {
            console.error(e);
            throw e;
        }
    }

    const { token } = jwtSign(user);
    user = { ...user, token };

    return user;
};
