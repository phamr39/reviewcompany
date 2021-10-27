import * as user from "./controller/company.controller"
import { Company } from "./model/company.model";
import { TimeLog } from "./model/comment.model";

export function setData(data: String, receiver: String): Company | null {
    return user.setData(data, receiver);
}

export function getData(sender: String): String | null {
    return user.getData(sender);
}

export function updateData(data: String): u64 {
    return user.updateHash(data);
}

export function updateReceiver(receiver: String): u64 {
    return user.updateReceiver(receiver);
}

export function getUpdateTimeStamp(): TimeLog | null {
    return user.getUpdateTimeStamp();
}