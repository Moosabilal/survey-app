"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyMapper = void 0;
const inversify_1 = require("inversify");
const Survey_1 = require("../../Domain/Entities/Survey");
let SurveyMapper = class SurveyMapper {
    toEntity(doc) {
        return new Survey_1.Survey(doc.name, doc.gender, doc.nationality, doc.email, doc.phone, doc.address, doc.message, doc._id, doc.createdAt);
    }
};
exports.SurveyMapper = SurveyMapper;
exports.SurveyMapper = SurveyMapper = __decorate([
    (0, inversify_1.injectable)()
], SurveyMapper);
