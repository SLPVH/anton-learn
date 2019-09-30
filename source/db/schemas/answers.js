export default `
CREATE TABLE IF NOT EXISTS answers(
	id INTEGER PRIMARY KEY,
	question_id INTEGER NOT NULL,
	text TEXT NOT NULL,
	is_valid INTEGER NOT NULL DEFAULT 3,
	FOREIGN KEY(question_id) REFERENCES questions(id)
)`;
