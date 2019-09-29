export class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 404;
    }
    statusCode() {
        return this.status;
    }
}

export class LoginOrPasswordIncorrect extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 403;
    }
    statusCode() {
        return this.status;
    }
}
