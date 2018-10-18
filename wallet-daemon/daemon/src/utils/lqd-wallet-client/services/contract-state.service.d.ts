import { Observable } from "rxjs";
import { Observer } from "rxjs";
import { ContractApiService } from "./contract-api.service";
import { StatePoll } from "../models/state/state-poll.model";
import { ContractState } from "../models/state/contract-state.model";
import { Wallet } from "../models/wallet/wallet.model";
export declare class ContractStateService {
    walletStatePollObservable: Observable<StatePoll>;
    private contractStateFetchObserver;
    private contractApi;
    constructor(walletStatePollObservable: Observable<StatePoll>, contractStateFetchObserver: Observer<ContractState>, contractApi: ContractApiService);
    fetchContractState(wallet: Wallet): Promise<ContractState>;
}
