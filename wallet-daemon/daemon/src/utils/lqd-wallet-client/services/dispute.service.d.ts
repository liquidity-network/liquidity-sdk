import { ContractApiService } from "./contract-api.service";
import { Wallet } from "../models/wallet/wallet.model";
import { Signature } from "../models/primitives/signature.model";
import { ProofOfStake } from "../models/primitives/proof-of-stake.model";
import { WalletUpdateError } from "../models/state/wallet-update-error.model";
import { Transfer } from "../models/transactions/transfer.model";
import { ContractState } from "../models/state/contract-state.model";
export declare class DisputeService {
    contractApi: ContractApiService;
    constructor(contractApi: ContractApiService);
    canIssueStateUpdateChallenge(wallet: Wallet, contractState: ContractState): Promise<boolean>;
    private canIssueStateUpdateChallengeInternal(wallet, contractState);
    canRecoverAllFunds(wallet: Wallet, contractState: ContractState): Promise<boolean>;
    private canRecoverAllFundsInternal(wallet, contractState);
    canRecoverOnChainFunds(wallet: Wallet, contractState: ContractState): Promise<boolean>;
    private canRecoverOnChainFundsInternal(wallet, contractState);
    issueStateUpdateChallenge(wallet: Wallet, contractState: ContractState): Promise<any>;
    checkStateUpdateChallengeResponse(wallet: Wallet, contractState: ContractState): Promise<[ProofOfStake, Signature]>;
    resolveOnChainStateUpdateDispute(wallet: Wallet, proofOfStake: ProofOfStake, hubPaintSig: Signature): Promise<WalletUpdateError>;
    private resolveOnChainStateUpdateDisputeInternal(wallet, proofOfStake, hubPaintSig);
    static canIssueDeliveryChallenge(wallet: Wallet, transfer: Transfer, contractState: ContractState): boolean;
    issueDeliveryChallenge(wallet: Wallet, transfer: Transfer, contractState: ContractState): Promise<any>;
}
