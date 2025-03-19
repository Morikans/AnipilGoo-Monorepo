import { Response } from "express";
import { AuthenticatedRequest } from "middlewares/authenticateToken";
export declare const getUser: (req: AuthenticatedRequest, res: Response) => Promise<void>;
