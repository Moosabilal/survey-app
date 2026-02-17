import { injectable } from "inversify";

@injectable()
export class AdminLoginUseCase {
    execute(email: string, password: string): boolean {
        return email === "admin@gmail.com" && password === "admin123";
    }
}
