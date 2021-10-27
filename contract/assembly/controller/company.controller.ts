import { Company } from "../model/company.model";
import { TimeLog } from "../model/comment.model";
import { CompanyStorage } from "../storage/company.storage";
import { Context } from "near-sdk-core";

export function setData(hash: String, receiver: String): Company | null {
    let cr_hash: Company | null;
    if (!UserStorage.contains(Context.sender)) {
        cr_hash = new Company(hash, receiver);
        cr_hash.save();
        return cr_hash;
    }
    cr_hash = UserStorage.get(Context.sender);
    if (cr_hash) {
        cr_hash.updateHash(hash);
        cr_hash.updateReceiver(receiver);
        cr_hash.save();
        return cr_hash;
    }
    return null;
}

export function getData(sender: String): String | null {
    if (UserStorage.contains(sender)) {
        let hash: Company | null = UserStorage.get(sender);
        if (hash && (Context.sender == hash.getReceiver())) {
            return hash.getHash();
        }
    }
    return null;
}

export function updateHash(hash: String): u64 {
    if (UserStorage.contains(Context.sender)) {
        let cr_hash = UserStorage.get(Context.sender);
        if (cr_hash) {
            cr_hash.updateHash(hash);
            cr_hash.save();
            let time: u64 = cr_hash.getHashUpdateTimestamp();
            if (time) {
                return time;
            }
        }
        return 0;
    }
    return 0;
}

export function updateReceiver(receiver: String): u64 {
    if (UserStorage.contains(Context.sender)) {
        let cr_hash = UserStorage.get(Context.sender);
        if (cr_hash) {
            cr_hash.updateReceiver(receiver);
            cr_hash.save();
            let time: u64 = cr_hash.getReceiverUpdateTimestamp();
            if (time) {
                return time;
            }
        }
        return 0;
    }
    return 0;
}

export function getUpdateTimeStamp(): TimeLog | null {
    if (!UserStorage.contains(Context.sender)) {
        return null;
    }
    let hash = UserStorage.get(Context.sender);
    let hashTime: u64;
    let receiverTime: u64;
    if (hash) {
        hashTime = hash.getHashUpdateTimestamp();
        receiverTime = hash.getReceiverUpdateTimestamp();
        return new TimeLog(hashTime, receiverTime);
    }
    return null;
}