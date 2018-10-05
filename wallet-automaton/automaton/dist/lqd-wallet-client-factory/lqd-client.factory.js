"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lqd_wallet_client_1 = require("lqd-wallet-client");
const api_service_1 = require("./api.service");
const web3_service_1 = require("./web3.service");
const storage_manager_service_1 = require("./storage-manager.service");
const logging_service_1 = require("./logging.service");
function LQDClientFactory(web3ProviderURL) {
    return lqd_wallet_client_1.WalletClassesContainerFactory.createClassContainer(new api_service_1.ApiService(), web3_service_1.Web3ServiceFactory(web3ProviderURL), new storage_manager_service_1.StorageManagerService(), new logging_service_1.LoggingService()).get(lqd_wallet_client_1.LQDClient);
}
exports.LQDClientFactory = LQDClientFactory;
//# sourceMappingURL=lqd-client.factory.js.map