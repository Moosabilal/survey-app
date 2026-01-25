import { injectable, inject } from "inversify";
import { ISurveyRepository } from "../../../Core/Application/Interfaces/ISurveyRepository.js";
import { Survey } from "../../../Core/Domain/Entities/Survey.js";
import { SurveyModel, ISurveyDocument } from "../Mongo/SurveySchema.js";
import { SurveyMapper } from "../../../Core/Application/Mappers/SurveyMapper.js";

@injectable()
export class MongoSurveyRepository implements ISurveyRepository {
    private _mapper: SurveyMapper;

    constructor(@inject(SurveyMapper) mapper: SurveyMapper) {
        this._mapper = mapper;
    }

    async save(survey: Survey): Promise<Survey> {
        const newSurvey = new SurveyModel({
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

    async findAll(): Promise<Survey[]> {
        const docs = await SurveyModel.find().exec();
        return docs.map(doc => this._mapper.toEntity(doc));
    }
}
