"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
function Web3ServiceFactory(providerUrl) {
    var Web3Service_1;
    let Web3Service = Web3Service_1 = class Web3Service {
        constructor() {
            this.web3 = new Web3Service_1.Web3(new Web3Service_1.Web3.providers.HttpProvider(providerUrl));
        }
        get rpc() {
            return this.web3;
        }
        get isConnected() {
            return (typeof this.web3 !== 'undefined') && this.web3.isConnected();
        }
        get accounts() {
            return this.isConnected
                ? this.web3.eth.accounts.map((address) => this.web3.toChecksumAddress(address))
                : [];
        }
    };
    Web3Service.Web3 = require('web3');
    Web3Service = Web3Service_1 = __decorate([
        inversify_1.injectable()
    ], Web3Service);
    return Web3Service;
}
exports.Web3ServiceFactory = Web3ServiceFactory;
//# sourceMappingURL=web3.service.js.map