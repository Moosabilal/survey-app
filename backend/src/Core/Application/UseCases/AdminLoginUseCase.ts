import { injectable } from "inversify";
import { IAdminLoginUseCase } from "../Interfaces/UseCases/IAdminLoginUseCase";

@injectable()
export class AdminLoginUseCase implements IAdminLoginUseCase {
    execute(email: string, password: string): boolean {
        return email === "admin@gmail.com" && password === "admin123";
    }
}
