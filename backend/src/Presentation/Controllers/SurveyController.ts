import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { SubmitSurveyUseCase } from "../../Core/Application/UseCases/SubmitSurveyUseCase.js";
import { GetAllSurveysUseCase } from "../../Core/Application/UseCases/GetAllSurveysUseCase.js";
import { SurveySubmissionDTO } from "../../Core/Application/DTOs/SurveySubmissionDTO.js";
import { SurveyValidator } from "../../Core/Application/Validators/SurveyValidator.js";

@injectable()
export class SurveyController {
    private _submitSurveyUseCase: SubmitSurveyUseCase;
    private _getAllSurveysUseCase: GetAllSurveysUseCase;
    private _validator: SurveyValidator;

    constructor(
        @inject(SubmitSurveyUseCase) submitSurveyUseCase: SubmitSurveyUseCase,
        @inject(GetAllSurveysUseCase) getAllSurveysUseCase: GetAllSurveysUseCase,
        @inject(SurveyValidator) validator: SurveyValidator
    ) {
        this._submitSurveyUseCase = submitSurveyUseCase;
        this._getAllSurveysUseCase = getAllSurveysUseCase;
        this._validator = validator;
    }

    async submit(req: Request, res: Response) {
        try {
            const validation = this._validator.validate(req.body);
            if (!validation.success) {
                res.status(400).json({ errors: (validation.error as any).errors });
                return;
            }

            const { name, gender, nationality, email, phone, address, message } = req.body;
            const dto = new SurveySubmissionDTO(name, gender, nationality, email, phone, address, message);
            const result = await this._submitSurveyUseCase.execute(dto);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const result = await this._getAllSurveysUseCase.execute();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
