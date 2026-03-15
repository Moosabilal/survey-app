import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: string | JwtPayload;
}
import { HttpStatus } from "../../Core/Domain/Enums/HttpStatus";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.adminToken;
    if (!token) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "Authentication required" });
        return;
    }

    try {
        const jwtSecret = process.env.JWT_SECRET || "JWT_SECRET";
        const decoded = jwt.verify(token, jwtSecret);
        (req as AuthRequest).user = decoded;
        next();
    } catch (error) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }
};
