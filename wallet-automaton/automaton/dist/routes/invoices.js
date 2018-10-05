"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invoices_1 = __importDefault(require("../controllers/invoices"));
const filter_1 = __importDefault(require("../models/filter"));
function route(app) {
    app.route('/invoices/list')
        .get((request, response) => {
        response.send(invoices_1.default.list(new filter_1.default(request.query)));
    });
    app.route('/invoices/generate')
        .post((request, response) => {
        response.send(invoices_1.default.generate(request.body.amount, request.body.details, request.body.currency));
    });
}
exports.route = route;
//# sourceMappingURL=invoices.js.map