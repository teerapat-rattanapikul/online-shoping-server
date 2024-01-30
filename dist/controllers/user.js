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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    try {
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        throw new Error('Error hashing password');
    }
});
const comparePasswords = (enteredPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(enteredPassword, hashedPassword);
    }
    catch (error) {
        throw new Error('Error comparing passwords');
    }
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    try {
        const findExistingUser = yield user_1.default.findOne({ username });
        if (findExistingUser) {
            throw new Error('ไม่สามารถใช้ Username นี้ได้');
        }
        else {
            const newHashPassword = yield hashPassword(String(password));
            const result = yield user_1.default.create({
                username,
                password: newHashPassword
            });
            res.json(result);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    try {
        const findExistingUser = yield user_1.default.findOne({ username });
        if (findExistingUser) {
            const isCorrectPassword = yield comparePasswords(String(password), findExistingUser.password);
            if (!isCorrectPassword)
                throw new Error('รหัสผ่านไม่ถูกต้อง');
            res.json(findExistingUser);
        }
        else {
            throw new Error('ไม่พบ Username นี้ในระบบ');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
