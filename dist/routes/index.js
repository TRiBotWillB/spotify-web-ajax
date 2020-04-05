var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express"], factory);
    }
})(function (require, exports) {
    "use strict";
    const express_1 = __importDefault(require("express"));
    const router = express_1.default.Router();
    router.get('/', (req, res, next) => {
        res.render('index');
    });
    router.get('/callback', (req, res, next) => {
        const { error, state, access_token, expires_in } = req.query;
        // Access Token is sent in a hash fragment - read from client side
        // Error is sent normally, read it here and display an error message
        let at = req.query['#access_token'];
        console.log(req.params);
        console.log('CALLBACK!');
        if (error) {
            console.log('ERROR!');
            return res.render('index', { error: error });
        }
        else if (at) {
            console.log('NO ERROR!');
            return res.render('index', {
                access_token: at,
                expires_in: expires_in
            });
        }
        return res.redirect('/');
    });
    return router;
});
//# sourceMappingURL=index.js.map