"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hub_1 = require("../controllers/hub");
function route(app) {
    app.route('/hub/wallets')
        .get((request, response) => __awaiter(this, void 0, void 0, function* () {
        response.send(yield hub_1.Hub.urls.admission());
    }));
    app.route('/hub/audit/:address/registration')
        .get((request, response) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(yield hub_1.Hub.urls.audit(request.params.address));
            response.send((yield hub_1.Hub.urls.audit(request.params.address)).registration);
        }
        catch (err) {
            response.send({});
        }
    }));
    app.route('/hub/audit/:address/transfers')
        .get((request, response) => __awaiter(this, void 0, void 0, function* () {
        try {
            response.send((yield hub_1.Hub.urls.audit(request.params.address)).transfers);
        }
        catch (err) {
            response.send({});
        }
    }));
    app.route('/hub/audit/:address/deposits')
        .get((request, response) => __awaiter(this, void 0, void 0, function* () {
        try {
            response.send((yield hub_1.Hub.urls.audit(request.params.address)).deposits);
        }
        catch (err) {
            response.send({});
        }
    }));
}
exports.route = route;
//# sourceMappingURL=hub.js.map