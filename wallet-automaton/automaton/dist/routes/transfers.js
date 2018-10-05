"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transfers_1 = require("../controllers/transfers");
const filter_1 = __importDefault(require("../models/filter"));
function route(app) {
    app.route('/transfers/list')
        .get((request, response) => {
        response.send(transfers_1.Transfers.list(new filter_1.default(request.query)));
    });
    app.route('/transfers/send')
        .post((request, response) => __awaiter(this, void 0, void 0, function* () {
        response.send(yield transfers_1.Transfers.send(request.body.recipient, request.body.amount));
    }));
}
exports.route = route;
//# sourceMappingURL=transfers.js.map