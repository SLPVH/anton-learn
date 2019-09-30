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

    static fib(n) {
        let a = 1;
        let b = 2;
        for (let i = 3; i <= n; i++) {
            let c = a + b;
            a = b;
            b = c;
        }
        if (n === 0) return 0;
        if (n === 1) return 1;

        return b;
    }

    async updateUserQuestionInAnswerIsValid(userId, questionId, answerId) {
        const row = await this.db.get(
            `SELECT 
                answers.question_id
            FROM answers
            JOIN user_questions
            ON user_questions.question_id = answers.question_id
            WHERE
            answers.question_id = $question_id
            AND answers.id = $answer_id
            AND answers.is_valid = 1
            AND user_questions.status = 0
            `,
            { $question_id: questionId, $answer_id: answerId }
        );
        console.log(row);
        const totalValidAnswersRow = await this.db.get(
            `
            SELECT COUNT(*) AS count FROM user_questions
            WHERE user_id = $user_id AND status = 1
        `,
            { $user_id: userId }
        );
        console.log(totalValidAnswersRow);
        const currentBalanceRow = await this.db.get(
            `
        SELECT current_balance FROM users WHERE id = $user_id`,
            { $user_id: userId }
        );
        console.log(currentBalanceRow);
        const currentPointsBalance = currentBalanceRow.current_balance;
        const totalPointsEarn = UserQuestions.fib(totalValidAnswersRow.count);
        console.log(totalPointsEarn);
        if (row) {
            // valid answer
            const newPointsToAdd = UserQuestions.fib(
                totalValidAnswersRow.count + 1
            );
            // update balance
            await this.db.run(
                `UPDATE users
                SET
                    current_balance = $points,
                    balance_updated_at = $updated_at
                WHERE id = $user_id`,
                {
                    $points: currentPointsBalance + newPointsToAdd,
                    $user_id: userId,
                    $updated_at: (new Date()).toISOString()
                }
            );
            console.log(
                await this.db.get(
                    `
        SELECT current_balance FROM users WHERE id = $user_id`,
                    { $user_id: userId }
                )
            );
            //update question
            await this.db.run(
                `UPDATE user_questions
                SET status = 1
                WHERE user_id = $user_id AND question_id = $question_id`,
                {
                    $user_id: userId,
                    $question_id: questionId
                }
            );
        } else {
            // invalid answer
            // update balance
            await this.db.run(
                `UPDATE users
                SET
                    current_balance = $points,
                    balance_updated_at = $updated_at
                WHERE id = $user_id`,
                {
                    $points:
                        currentPointsBalance - totalPointsEarn - 1 > 0
                            ? currentPointsBalance - totalPointsEarn - 1
                            : 0,
                    $user_id: userId,
                    $updated_at: (new Date()).toISOString()
                }
            );

            //update question
            await this.db.run(
                `UPDATE user_questions SET status = -1
                WHERE user_id = $user_id AND question_id = $question_id`,
                {
                    $question_id: questionId,
                    $user_id: userId
                }
            );

            console.log(
                "fail answer",
                "userId",
                userId,
                "questionId",
                questionId,
                await this.db.all("SELECT * FROM user_questions")
            );
        }
    }
}
