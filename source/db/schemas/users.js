export default `
CREATE TABLE IF NOT EXISTS users(
	id INTEGER PRIMARY KEY,
	login	TEXT NOT NULL UNIQUE,
	password_hash	TEXT NOT NULL,
	slp_address	TEXT,
	current_balance	INTEGER NOT NULL DEFAULT 0,
	UNIQUE(login)
)`;
