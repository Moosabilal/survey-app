import { injectable } from "inversify";
import { z } from "zod";

@injectable()
export class SurveyValidator {
    private schema = z.object({
        name: z.string().min(1, "Name is required"),
        gender: z.enum(["Male", "Female", "Other"], { message: "Invalid gender" }),
        nationality: z.string().min(1, "Nationality is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().regex(/^\d+$/, "Phone must be numeric").min(10, "Phone number too short"),
        address: z.string().min(1, "Address is required"),
        message: z.string().optional()
    });

    validate(data: any) {
        return this.schema.safeParse(data);
    }
}
