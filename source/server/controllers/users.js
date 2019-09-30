import { UserNotFoundError } from "../errors";
import { jwtSign } from "../helpers";

export const createUserController = async (
    usersModel,
    login,
    password,
    userQuestionModel
) => {
    let user;
    try {
        user = await usersModel.getUserByLoginAndPassword(login, password);
    } catch (e) {
        if (e instanceof UserNotFoundError) {
            user = await usersModel.createUser(login, password);
            await userQuestionModel.createUserQuestions(user.id);
        } else {
            console.error(e);
            throw e;
        }
    }

    const { token } = jwtSign(user);
    user = { ...user, token };

    return user;
};

export const getAllUserInformation = async (
    userModel,
    userQuestionModel,
    userId
) => {
    const userInfo = await userModel.getUserById(userId);
    const userQuestions = await userQuestionModel.getUserQuestions(userId);

    return {
        ...userInfo,
        questions: userQuestions
    };
};
