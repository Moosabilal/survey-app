import { injectable } from "inversify";
import { Survey } from "../../Domain/Entities/Survey.js";
import { ISurveyDocument } from "../../../Infrastructure/Persistence/Mongo/SurveySchema.js";

@injectable()
export class SurveyMapper {
    toEntity(doc: ISurveyDocument): Survey {
        return new Survey(
            doc.name,
            doc.gender,
            doc.nationality,
            doc.email,
            doc.phone,
            doc.address,
            doc.message,
            (doc._id as unknown) as string,
            doc.createdAt
        );
    }
}
