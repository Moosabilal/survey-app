"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Survey = void 0;
class Survey {
    name;
    gender;
    nationality;
    email;
    phone;
    address;
    message;
    id;
    createdAt;
    constructor(name, gender, nationality, email, phone, address, message, id, createdAt) {
        this.name = name;
        this.gender = gender;
        this.nationality = nationality;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.message = message;
        this.id = id;
        this.createdAt = createdAt;
    }
}
exports.Survey = Survey;
