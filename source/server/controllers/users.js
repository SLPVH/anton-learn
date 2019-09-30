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
    console.log(new Date());
    const currentDate = new Date().getTime();
    console.log(userInfo.points_update_at);
    console.log(new Date(userInfo.points_update_at));
    const balanceUpdatedDate = new Date(userInfo.points_update_at).getTime();

    const skippedQuestions = userQuestions.filter(
        userQuestion => userQuestion.status === 3
    );
    const validQuestions = userQuestions.filter(
        userQuestion => userQuestion.status === 1
    );
    return {
        ...userInfo,
        questions: userQuestions,
        isFreePointsAvailable:
            currentDate - balanceUpdatedDate > 10 * 1000 &&
            userInfo.points === 0,
        isWithdrawAvailable:
            validQuestions.length + skippedQuestions.length ===
                userQuestions.length && validQuestions.length > 0
    };
};

export const makeAnswer = async (
    userQuestionModel,
    userId,
    questionId,
    answerId
) => {
    await userQuestionModel.updateUserQuestionInAnswerIsValid(
        userId,
        questionId,
        answerId
    );
};

export const addFreePoints = async (
    usersModel,
    userId,
) => {
    await usersModel.addFreePoints(userId, 1);
};
