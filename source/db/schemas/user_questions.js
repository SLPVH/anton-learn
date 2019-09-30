export default `
CREATE TABLE IF NOT EXISTS user_questions(
	id INTEGER PRIMARY KEY,
	user_id INTEGER NOT NULL,
	question_id INTEGER NOT NULL,
	status INTEGER NOT NULL DEFAULT 0,
	FOREIGN KEY(user_id) REFERENCES users(id)
	FOREIGN KEY(question_id) REFERENCES questions(id)
)`;
