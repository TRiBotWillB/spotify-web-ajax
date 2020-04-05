var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "path", "less-middleware", "./routes/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const express_1 = __importDefault(require("express"));
    const path_1 = __importDefault(require("path"));
    const less_middleware_1 = __importDefault(require("less-middleware"));
    const index_1 = __importDefault(require("./routes/index"));
    const app = express_1.default();
    app.set('views', path_1.default.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    app.use(less_middleware_1.default(path_1.default.join(__dirname, 'public')));
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use('/', index_1.default);
    app.listen(5000, () => {
        console.log('Running on port 5000');
    });
});
//# sourceMappingURL=index.js.map