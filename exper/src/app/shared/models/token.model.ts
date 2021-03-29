export class TokenModel {
    token: string;
    validUntil: string;

    constructor(token, validUntil) {
        this.token = token;
        this.validUntil = validUntil;
    }
}