import sqlite from "sqlite3";
import users from "./schemas/users";
import { Users } from "./models/users";

class DB {
    constructor(db) {
        this.db = db;
    }

    async get(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.get(sql, params || [], (err, row) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(row);
                });
            });
        });
    }

    async all(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(sql, params || [], (err, rows) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(rows);
                });
            });
        });
    }

    async run(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run(sql, params || [], function(err) {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve({ lastId: this.lastID });
                });
            });
        });
    }
}

export const initDB = async (dbPath = ":memory:") => {
    const sqliteDB = new sqlite.Database(dbPath);
    const db = new DB(sqliteDB);

    await db.run(users);
    const usersModel = new Users(db);

    return {
        usersModel
    };
};
