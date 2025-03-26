import { getUser, getAllUsers, updateUser } from "../controllers";
import express from "express";

const router = express.Router();

router.get("/getUser/:id", getUser);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser/:id", updateUser);

export default router;
