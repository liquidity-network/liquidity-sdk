import { Observer } from "rxjs";
import { StatePoll } from "../models/state/state-poll.model";
import { Wallet } from "../models/wallet/wallet.model";
export declare class PollService {
    walletStatePollObserver: Observer<StatePoll>;
    private pollTimer;
    private pollTrigger;
    private pollSubscription;
    constructor(walletStatePollObserver: Observer<StatePoll>);
    startSynchronization(wallet: Wallet, initialDelay: number, period: number): void;
    stopSynchronization(): void;
    triggerSynchronization(wallet: Wallet): void;
    private subscribeToPollTrigger(wallet);
}
