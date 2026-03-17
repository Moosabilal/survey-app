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
            const token = this._adminLoginUseCase.execute(email, password);
            if (token) {
                res.cookie("adminToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    maxAge: 60 * 60 * 1000 // 1hr
                });
                res.status(HttpStatus.OK).json({ message: Messages.LOGIN_SUCCESS });
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: Messages.INVALID_CREDENTIALS });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: Messages.INTERNAL_SERVER_ERROR });
            }
        }
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });
        res.status(HttpStatus.OK).json({ message: "Logged out successfully" });
    }
}
