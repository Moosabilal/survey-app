"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoSurveyRepository = void 0;
const inversify_1 = require("inversify");
const SurveySchema_1 = require("../Mongo/SurveySchema");
const SurveyMapper_1 = require("../../../Core/Application/Mappers/SurveyMapper");
let MongoSurveyRepository = class MongoSurveyRepository {
    _mapper;
    constructor(mapper) {
        this._mapper = mapper;
    }
    async save(survey) {
        const newSurvey = new SurveySchema_1.SurveyModel({
            name: survey.name,
            gender: survey.gender,
            nationality: survey.nationality,
            email: survey.email,
            phone: survey.phone,
            address: survey.address,
            message: survey.message
        });
        await newSurvey.save();
        return this._mapper.toEntity(newSurvey);
    }
    async findAll() {
        const docs = await SurveySchema_1.SurveyModel.find().exec();
        return docs.map(doc => this._mapper.toEntity(doc));
    }
};
exports.MongoSurveyRepository = MongoSurveyRepository;
exports.MongoSurveyRepository = MongoSurveyRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(SurveyMapper_1.SurveyMapper)),
    __metadata("design:paramtypes", [SurveyMapper_1.SurveyMapper])
], MongoSurveyRepository);
