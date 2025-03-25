"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const utils_1 = require("../../utils");
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield utils_1.supabase.auth.signOut();
        if (error)
            throw error;
        res.status(200).send({ message: 'ログアウトが完了しました' });
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.logout = logout;
