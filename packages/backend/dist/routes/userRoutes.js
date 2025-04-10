"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/getUser/:id", controllers_1.getUser);
router.get("/getAllUsers", controllers_1.getAllUsers);
router.put("/updateUser/:id", controllers_1.updateUser);
exports.default = router;
