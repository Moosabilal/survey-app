import { injectable } from "inversify";
import { IAdminLoginUseCase } from "../Interfaces/UseCases/IAdminLoginUseCase";

@injectable()
export class AdminLoginUseCase implements IAdminLoginUseCase {
    execute(email: string, password: string): boolean {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        return email === adminEmail && password === adminPassword;
    }
}
