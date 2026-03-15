import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { ISubmitSurveyUseCase } from "../../Core/Application/Interfaces/UseCases/ISubmitSurveyUseCase";
import { IGetAllSurveysUseCase } from "../../Core/Application/Interfaces/UseCases/IGetAllSurveysUseCase";
import { SurveyValidator } from "../../Core/Application/Validators/SurveyValidator";
import { HttpStatus } from "../../Core/Domain/Enums/HttpStatus";
import { Messages } from "../../Core/Application/Constants/Messages";
import { ZodError } from "zod";

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
                const errors = validation.error instanceof ZodError ? validation.error.issues : validation.error;
                res.status(HttpStatus.BAD_REQUEST).json({ errors });
                return;
            }

            const result = await this._submitSurveyUseCase.execute(req.body);
            res.status(HttpStatus.CREATED).json(result);
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                res.status(HttpStatus.BAD_REQUEST).json({ errors: error.issues });
            } else if (error instanceof Error) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: Messages.INTERNAL_SERVER_ERROR });
            }
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const searchQuery = req.query.search as string | undefined;
            const gender = req.query.gender as string | undefined;
            const nationality = req.query.nationality as string | undefined;

            const options = {
                page,
                limit,
                searchQuery,
                filters: {
                    ...(gender ? { gender } : {}),
                    ...(nationality ? { nationality } : {})
                }
            };

            const result = await this._getAllSurveysUseCase.execute(options);
            res.status(HttpStatus.OK).json(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: Messages.INTERNAL_SERVER_ERROR });
            }
        }
    }
}
