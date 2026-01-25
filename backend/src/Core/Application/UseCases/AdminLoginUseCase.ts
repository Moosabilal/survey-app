import { injectable } from "inversify";

@injectable()
export class AdminLoginUseCase {
    execute(password: string): boolean {
        // Hardcoded for now as per requirements allowing "hardcoded"
        // In a real app, this would check a hash in DB
        return password === "admin123";
    }
}
