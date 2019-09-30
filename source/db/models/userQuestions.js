import bcrypt from "bcrypt";
import {
    LoginOrPasswordIncorrect,
    UserNotFoundError
} from "../../server/errors";

export class UserQuestions {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async createUserQuestions(userId) {
        await this.db.run(
            `
        INSERT INTO user_questions(user_id, question_id)
        SELECT $user_id, id FROM questions`,
            { $user_id: userId }
        );
        console.log("createUserQuestions");
    }

    async getUserQuestions(userId) {
        const rows = await this.db.all(
            `
            SELECT
                user_questions.question_id AS question_id,
                questions.title AS question_title,
                questions.content AS question_content,
                answers.id AS answer_id,
                answers.text AS answer_text,
                user_questions.status
            FROM user_questions
            JOIN questions
            ON user_questions.question_id = questions.id
            JOIN answers
            ON answers.question_id = questions.id
            WHERE user_id = $user_id
            ORDER BY question_id
            `,
            { $user_id: userId }
        );

        console.log("getUserQuestions", rows);
        const userQuestionsMap = new Map();

        for (const row of rows) {
            const currentUserQuestion = userQuestionsMap.get(row.question_id);
            if (!currentUserQuestion) {
                userQuestionsMap.set(row.question_id, {
                    id: row.question_id,
                    status: row.status,
                    title: row.question_title,
                    content: row.question_content,
                    answers: [
                        {
                            id: row.answer_id,
                            text: row.answer_text
                        }
                    ]
                });
            } else {
                userQuestionsMap.set(row.question_id, {
                    ...currentUserQuestion,
                    answers: [
                        ...currentUserQuestion.answers,
                        {
                            id: row.answer_id,
                            text: row.answer_text
                        }
                    ]
                });
            }
        }

        return [...userQuestionsMap.values()];
    }
}
