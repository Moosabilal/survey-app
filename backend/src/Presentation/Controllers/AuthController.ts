import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { IAdminLoginUseCase } from "../../Core/Application/Interfaces/UseCases/IAdminLoginUseCase";
import { HttpStatus } from "../../Core/Domain/Enums/HttpStatus";
import { Messages } from "../../Core/Application/Constants/Messages";

@injectable()
export class AuthController {
    private _adminLoginUseCase: IAdminLoginUseCase;

    constructor(@inject("IAdminLoginUseCase") adminLoginUseCase: IAdminLoginUseCase) {
        this._adminLoginUseCase = adminLoginUseCase;
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const success = this._adminLoginUseCase.execute(email, password);
            if (success) {
                res.status(HttpStatus.OK).json({ message: Messages.LOGIN_SUCCESS, token: "admin-token-placeholder" });
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: Messages.INVALID_CREDENTIALS });
            }
        } catch (error: unknown) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error instanceof Error ? error.message : Messages.INTERNAL_SERVER_ERROR });
        }
    }
}
