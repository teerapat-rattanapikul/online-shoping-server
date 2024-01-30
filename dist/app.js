"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const apis_1 = __importDefault(require("./apis"));
mongoose_1.default.connect('mongodb+srv://teerapat:gYzbHn2NbZGANlcA@online-shoping.lxvuyky.mongodb.net/?retryWrites=true&w=majority', {
    dbName: 'online-shoping'
}).then(() => {
    console.log('connect db success');
});
const app = (0, express_1.default)();
const port = 8000;
app.get('/', (_req, res) => {
    res.json({
        message: 'Hello Express + TypeScirpt!!',
    });
});
app.use(apis_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        error: {
            message: err.message,
        },
    });
});
app.listen(port, () => console.log(`Application is running on port ${port}`));
