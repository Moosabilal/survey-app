"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveySubmissionDTO = void 0;
class SurveySubmissionDTO {
    name;
    gender;
    nationality;
    email;
    phone;
    address;
    message;
    constructor(name, gender, nationality, email, phone, address, message) {
        this.name = name;
        this.gender = gender;
        this.nationality = nationality;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.message = message;
    }
}
exports.SurveySubmissionDTO = SurveySubmissionDTO;
