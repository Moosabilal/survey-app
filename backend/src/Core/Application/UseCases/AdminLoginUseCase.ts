import { injectable } from "inversify";
import { IAdminLoginUseCase } from "../Interfaces/UseCases/IAdminLoginUseCase";
import jwt from "jsonwebtoken";

@injectable()
export class AdminLoginUseCase implements IAdminLoginUseCase {
    execute(email: string, password: string): string | null {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
        const jwtSecret = process.env.JWT_SECRET || "JWT_SECRET";

        if (email === adminEmail && password === adminPassword) {
            return jwt.sign({ email, role: 'admin' }, jwtSecret, { expiresIn: '1h' });
        }
        return null;
    }
}
