export const addDefaultQuestions = async db => {
    const questions = [
        {
            title: "Question Title",
            content: "Question content",
            answers: [
                {
                    text: "Answer text1",
                    isValid: true
                },
                {
                    text: "Answer text2"
                },
                {
                    text: "Answer text3"
                }
            ]
        },
        {
            title: "Question Title",
            content: "Question content",
            answers: [
                {
                    text: "Answer text1"
                },
                {
                    text: "Answer text2",
                    isValid: true
                },
                {
                    text: "Answer text3"
                }
            ]
        },
        {
            title: "Question Title",
            content: "Question content",
            answers: [
                {
                    text: "Answer text1"
                },
                {
                    text: "Answer text2"
                },
                {
                    text: "Answer text3",
                    isValid: true
                }
            ]
        },
        {
            title: "Question Title",
            content: "Question content",
            answers: [
                {
                    text: "Answer text1",
                    isValid: true
                },
                {
                    text: "Answer text2"
                },
                {
                    text: "Answer text3"
                }
            ]
        },
        {
            title: "Question Title",
            content: "Question content",
            answers: [
                {
                    text: "Answer text1"
                },
                {
                    text: "Answer text2"
                },
                {
                    text: "Answer text3",
                    isValid: true
                }
            ]
        }
    ];

    for (const question of questions) {
        const { lastId: questionId } = await db.run(
            `INSERT INTO questions(title, content)
          VALUES($title, $content)`,
            { $title: question.title, $content: question.content }
        );

        for (const answer of question.answers) {
            await db.run(
                `INSERT INTO answers(question_id, text, is_valid)
              VALUES($question_id, $text, $is_valid)`,
                {
                    $question_id: questionId,
                    $text: answer.text,
                    $is_valid: answer.isValid ? 1 : 0
                }
            );
        }
    }
};
