import { getUser, getAllUsers } from "../controllers";
import express from "express";

const router = express.Router();

router.get("/getUser/:id", getUser);
router.get("/getAllUsers", getAllUsers);

export default router;
