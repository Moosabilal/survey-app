import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { ISubmitSurveyUseCase } from "../../Core/Application/Interfaces/UseCases/ISubmitSurveyUseCase";
import { IGetAllSurveysUseCase } from "../../Core/Application/Interfaces/UseCases/IGetAllSurveysUseCase";
import { SurveySubmissionDTO } from "../../Core/Application/DTOs/SurveySubmissionDTO";
import { SurveyValidator } from "../../Core/Application/Validators/SurveyValidator";

@injectable()
export class SurveyController {
    private _submitSurveyUseCase: ISubmitSurveyUseCase;
    private _getAllSurveysUseCase: IGetAllSurveysUseCase;
    private _validator: SurveyValidator;

    constructor(
        @inject("ISubmitSurveyUseCase") submitSurveyUseCase: ISubmitSurveyUseCase,
        @inject("IGetAllSurveysUseCase") getAllSurveysUseCase: IGetAllSurveysUseCase,
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
