import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { AdminLoginUseCase } from "../../Core/Application/UseCases/AdminLoginUseCase";

@injectable()
export class AuthController {
    private _adminLoginUseCase: AdminLoginUseCase;

    constructor(@inject(AdminLoginUseCase) adminLoginUseCase: AdminLoginUseCase) {
        this._adminLoginUseCase = adminLoginUseCase;
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const success = this._adminLoginUseCase.execute(email, password);
            if (success) {
                res.status(200).json({ message: "Login successful", token: "admin-token-placeholder" });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
