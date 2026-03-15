import { injectable, inject } from "inversify";
import { ISurveyRepository } from "../../../Core/Application/Interfaces/ISurveyRepository";
import { Survey } from "../../../Core/Domain/Entities/Survey";
import { SurveyModel } from "../Mongo/SurveySchema";
import { SurveyMapper } from "../../../Core/Application/Mappers/SurveyMapper";

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

    async findAll(options: import("../../../Core/Application/Interfaces/ISurveyRepository").PaginationOptions): Promise<import("../../../Core/Application/Interfaces/ISurveyRepository").PaginatedResult<Survey>> {
        const { page, limit, searchQuery, filters } = options;
        interface SearchQuery {
            $or?: Array<{ name: { $regex: string, $options: string } } | { email: { $regex: string, $options: string } }>;
            gender?: string;
            nationality?: string;
        }
        const query: SearchQuery = {};

        if (searchQuery) {
            query.$or = [
                { name: { $regex: searchQuery, $options: "i" } },
                { email: { $regex: searchQuery, $options: "i" } }
            ];
        }

        if (filters) {
            if (filters.gender) query.gender = filters.gender;
            if (filters.nationality) query.nationality = filters.nationality;
        }

        const skip = (page - 1) * limit;

        const totalCount = await SurveyModel.countDocuments(query).exec();
        const docs = await SurveyModel.find(query).skip(skip).limit(limit).exec();

        return {
            data: docs.map(doc => this._mapper.toEntity(doc)),
            totalCount,
            page,
            totalPages: Math.ceil(totalCount / limit) || 1
        };
    }
}
