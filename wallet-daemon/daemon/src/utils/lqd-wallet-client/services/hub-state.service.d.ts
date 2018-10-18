import { Observer } from "rxjs";
import { HubApiService } from "./hub-api.service";
import { HubState } from "../models/state/hub-state.model";
import { StatePoll } from "../models/state/state-poll.model";
import { Observable } from "rxjs";
import { Wallet } from "../models/wallet/wallet.model";
export declare class HubStateService {
    walletStatePollObservable: Observable<StatePoll>;
    private hubStateFetchObserver;
    private hubApi;
    constructor(walletStatePollObservable: Observable<StatePoll>, hubStateFetchObserver: Observer<HubState>, hubApi: HubApiService);
    fetchHubState(wallet: Wallet): Promise<HubState>;
}
