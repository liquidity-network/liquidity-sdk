"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = __importDefault(require("request-promise-native"));
class ApiService {
    static requestToPromise(requestPromise) {
        return new Promise((resolve, reject) => {
            requestPromise.then((result) => resolve(result)).catch(reject);
        });
    }
    static addSuffix(host, path) {
        if (!path) {
            return host.endsWith('/') ? host : `${host}/`;
        }
        return host.endsWith('/') || path.startsWith('/') ? host : `${host}/`;
    }
    get(host, path, query, auth) {
        return ApiService.requestToPromise(request_promise_native_1.default.get(`${ApiService.addSuffix(host, path)}${path}?${query}`, { json: true }));
    }
    post(host, path, body, query, auth) {
        return ApiService.requestToPromise(request_promise_native_1.default.post(`${ApiService.addSuffix(host, path)}${path}?${query}`, {
            body: body,
            json: true
        }));
    }
    submit(host, path, body, query, auth) {
        return undefined;
    }
    put(host, path, body, query, auth) {
        return ApiService.requestToPromise(request_promise_native_1.default.put(`${ApiService.addSuffix(host, path)}${path}?${query}`, {
            body: body,
            json: true
        }));
    }
    patch(host, path, body, query, auth) {
        return ApiService.requestToPromise(request_promise_native_1.default.patch(`${ApiService.addSuffix(host, path)}${path}?${query}`, {
            body: body,
            json: true
        }));
    }
    delete(host, path, body, query, auth) {
        return ApiService.requestToPromise(request_promise_native_1.default.delete(`${ApiService.addSuffix(host, path)}${path}?${query}`, { json: true }));
    }
    options(host, path, body, query, auth) {
        return undefined;
    }
}
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map