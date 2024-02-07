import { Status } from '../../interfaces/electrs.interface';
import * as btc from '@scure/btc-signer';

export interface TxnOutput {
  txid: string;
  vout: number;
  status: Status;
  value: number;
}

// see https://github.com/leather-wallet/extension/blob/8dbfefe8fcf5de687c2a137bce5eb2ff7a94b794/src/shared/rpc/methods/sign-psbt.ts#L49
export interface LeatherSignPsbtRequestParams {
  hex: string;
  allowedSighash?: any[];
  signAtIndex?: number | number[];
  network?: 'mainnet' | 'testnet' | 'signet' | 'sbtcDevenv' | 'devnet'; // default is user's current network
  account?: number; // default is user's current account
  broadcast?: boolean; // default is false - finalize/broadcast tx
}

export interface LeatherPSBTBroadcastResponse {
  jsonrpc: string;
  id: string;
  result: {
    hex: string;
  };
}

export interface DummyKeypairResult {
  dummyPrivateKey: Uint8Array
  dummyPublicKey: Uint8Array,
  dummyPublicKeyHex: string,
  addressP2PKH: string,
  addressP2WPKH: string,
  addressP2TR: string
  schnorrPublicKey: Uint8Array,
  schnorrPublicKeyHex: string
}

export interface CreateTransactionResult {
  tx: btc.Transaction | null,
  amountToRecipient: bigint, // always 546
  singleInputAmount: bigint,
  changeAmount: bigint,
  finalTransactionFee: bigint
}

export interface SimulateTransactionResult extends CreateTransactionResult {
  vsize: number
}

