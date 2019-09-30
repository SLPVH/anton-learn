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
            `INSERT INTO users(login, password_hash, current_balance, balance_updated_at)
            VALUES($login, $password_hash, 3, $updated_at)`,
            {
                $login: login,
                $password_hash: passwordHash,
                $updated_at: (new Date()).toISOString()
            }
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

        const isValid = await bcrypt.compare(password, row.password_hash);

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
        const row = await this.db.get(`SELECT * FROM users WHERE id = $id`, {
            $id: userId
        });
        if (!row) {
            return null;
        }
        return {
            login: row.login,
            points: row.current_balance,
            slpAddress: row.slp_address,
            points_update_at: row.balance_updated_at
        };
    }

    async addFreePoints(userId, pointsToAdd) {
        const { points } = await this.getUserById(userId);

        await this.db.run(
            `UPDATE users
                SET
                    current_balance = $points,
                    balance_updated_at = $updated_at
                WHERE id = $user_id`,
            {
                $points: points + pointsToAdd,
                $user_id: userId,
                $updated_at: (new Date()).toISOString()
            }
        );
    }
}
