import {LQDClient, WalletClassesContainerFactory} from 'lqd-wallet-client';
import {ApiService} from './api.service';
import {Web3ServiceFactory} from './web3.service';
import {StorageManagerService} from './storage-manager.service';
import {LoggingService} from './logging.service';

export function LQDClientFactory(web3ProviderURL): LQDClient {
    return WalletClassesContainerFactory.createClassContainer(
        new ApiService(),
        Web3ServiceFactory(web3ProviderURL),
        new StorageManagerService(),
        new LoggingService()).get(LQDClient);
}
