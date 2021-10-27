import { context, u128, PersistentVector } from "near-sdk-as";

/** 
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class PostedComment {
  premium: boolean;
  sender: string;
  storageUsage: u64;
  usedGas: u64;
  accountBalance: u128;
  blockTimestamp: u64;
  companyId: String
  constructor(public text: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
    this.storageUsage = context.storageUsage;
    this.usedGas = context.usedGas;
    this.accountBalance = context.accountBalance;
    this.blockTimestamp = context.blockTimestamp;
  }
}