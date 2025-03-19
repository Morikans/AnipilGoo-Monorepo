import { Response } from "express";
import { AuthenticatedRequest } from "middlewares/authenticateToken";
export declare const updateUser: (req: AuthenticatedRequest, res: Response) => Promise<void>;
