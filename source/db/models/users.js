import bcrypt from "bcrypt";
import {
    LoginOrPasswordIncorrect,
    UserNotFoundError
} from "../../server/errors";

export class Users {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async createUser(login, password) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const { lastId } = await this.db.run(
            `INSERT INTO users(login, password_hash, current_balance)
            VALUES($login, $password_hash, 3)`,
            { $login: login, $password_hash: passwordHash }
        );
        return {
            id: lastId,
            login
        };
    }

    async getUserByLoginAndPassword(login, password) {
        const row = await this.db.get(
            `SELECT * FROM users WHERE login = $login`,
            { $login: login }
        );
        console.log("row", row);
        if (!row) {
            throw new UserNotFoundError("user not found");
        }

        const isValid = await bcrypt.compare(password, row.password_hash,);

        if (!isValid) {
            throw new LoginOrPasswordIncorrect(
                "Login not found or incorrect password"
            );
        }

        return {
            login: row.login
        };
    }

    async getUserById(userId) {
        const row = await this.db.get(
            `SELECT * FROM users WHERE id = $id`,
            { $id: userId }
        );
        return {
            login: row.login,
            points: row.current_balance,
            slpAddress: row.slp_address
        };
    }
}
