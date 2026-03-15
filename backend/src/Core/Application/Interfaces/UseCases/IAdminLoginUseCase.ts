export interface IAdminLoginUseCase {
    execute(email: string, password: string): string | null;
}
