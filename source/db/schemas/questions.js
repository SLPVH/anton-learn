export default `
CREATE TABLE IF NOT EXISTS questions(
	id INTEGER PRIMARY KEY,
	title TEXT NOT NULL,
	content TEXT NOT NULL
)`;
