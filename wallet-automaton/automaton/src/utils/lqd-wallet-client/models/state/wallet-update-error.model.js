!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("lqd-wallet-client",[],n):"object"==typeof exports?exports["lqd-wallet-client"]=n():e["lqd-wallet-client"]=n()}(global,function(){return function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r.w={},r(r.s=0)}([function(e,n,r){"use strict";var t=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])};return function(n,r){function t(){this.constructor=n}e(n,r),n.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}}();Object.defineProperty(n,"__esModule",{value:!0});var o=function(e){function n(n){var r=e.call(this,n)||this;return r._reason=n,r}return t(n,e),Object.defineProperty(n.prototype,"reason",{get:function(){return this._reason},enumerable:!0,configurable:!0}),n.NO_WALLET_SPECIFIED=new n("No wallet specified for update."),n.NO_CONTRACT_STATE_SPECIFIED=new n("No contract state provided for update."),n.INCORRECT_NETWORK_ID=new n("Incorrect Blockchain Network Identifier."),n.UNREGISTERED=new n("Unregistered wallet."),n.UNREGISTERED_NO_REQUEST=new n("Unregistered wallet with no registration request provided."),n.UNREGISTERED_BAD_REQUEST=new n("Unregistered wallet with invalid registration request provided."),n.UNREGISTERED_APPROVAL_NOT_PENDING=new n("Unregistered wallet with no approval pending."),n.UNREGISTERED_APPROVAL_NOT_PROVIDED=new n("Unregistered wallet with no registration approval provided."),n.UNREGISTERED_APPROVAL_INVALID=new n("Unregistered wallet with invalid registration approval provided."),n.LOGIC_PROOF_ALREADY_UPDATED=new n("Proof of stake already updated."),n.LOGIC_OLD_ROUNDS_NOT_UPDATED=new n("Older rounds not updated."),n.LOGIC_PREVIOUS_ROUND_NOT_UPDATED=new n("Previous round not updated."),n.LOGIC_AGGREGATION_FORK=new n("Fork in transfer aggregation."),n.LOGIC_TRANSFER_CONFIRM_ERROR_OUTGOING=new n("Could not confirm outgoing transfer."),n.LOGIC_TRANSFER_CONFIRM_ERROR_INCOMING=new n("Could not confirm incoming transfer."),n.LOGIC_TRANSFER_CONFIRM_ERROR=new n("Could not confirm transfer."),n.LOGIC_RECEIPT_VALIDATION_ERROR_MISSING_CONFIRMATION=new n("Could not confirm receipt due to missing confirmation signatures."),n.LOGIC_PREMATURE_ROUND_ADVANCEMENT=new n("Cannot advance latest local round ahead of on-chain round."),n.LOGIC_UNKNOWN=new n("Unknown Logic Error"),n.LOCAL_DATA_MISSING_LATEST_ROUND=new n("Missing local data of latest round."),n.LOCAL_DATA_MISSING_PREVIOUS_ROUND=new n("Missing local data of previous round."),n.LOCAL_DATA_MISSING_MERKLE_PROOF=new n("Missing required merkle proof."),n.REMOTE_DATA_NO_MERKLE_PROOFS=new n("No merkle proof data available in update."),n.REMOTE_DATA_MISSING_MERKLE_PROOF=new n("Missing required merkle proof in update."),n.REMOTE_DATA_MISSING_DELIVERY_RECEIPT=new n("Missing required delivery receipt in update."),n.REMOTE_DATA_INVALID_DELIVERY_RECEIPT=new n("Invalid delivery receipt in update."),n.PROOF_OF_STAKE_INSUFFICIENT_BALANCE=new n("Granted balance in proof of stake is less than expected."),n.PROOF_OF_STAKE_INVALID=new n("Unverifiable proof of stake."),n.PROOF_OF_STAKE_INVALID_TRAIL=new n("Incorrect proof of stake trail."),n.PROOF_OF_STAKE_UNEXPECTED_PAINT=new n("Unexpected paint used in provided proof of stake."),n.AGGREGATE_DEBIT_WALLET_SIGNATURE_INVALID=new n("Invalid aggregate signature provided by sender on debit of transfer."),n.AGGREGATE_CREDIT_WALLET_SIGNATURE_INVALID=new n("Invalid aggregate signature provided by recipient on credit of transfer."),n.AGGREGATE_DEBIT_HUB_SIGNATURE_INVALID=new n("Invalid aggregate signature provided by hub on debit of transfer."),n.AGGREGATE_CREDIT_HUB_SIGNATURE_INVALID=new n("Invalid aggregate signature provided by hub on credit of transfer."),n.AGGREGATE_TX_SET_ROOT_INVALID_INCOMING=new n("Invalid aggregate transfer set root provided for next incoming transfer."),n.AGGREGATE_TX_SET_ROOT_INVALID_OUTGOING=new n("Invalid aggregate transfer set root provided for next outgoing transfer."),n.PROVIDER_PUNISHED=new n("This provider is not longer operational."),n.PROVIDER_NOT_AUDITABLE=new n("This provider has not synchronized with the parent chain."),n}(Error);n.WalletUpdateError=o}])});