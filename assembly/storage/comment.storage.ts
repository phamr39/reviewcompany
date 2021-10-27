import { PersistentUnorderedMap, PersistentVector } from "near-sdk-core";
import { PostedComment } from "../model/comment.model";

const comments = new PersistentUnorderedMap<String, PersistentVector<PostedComment>>("Comment");

export class CommentStorage {
    static get(companyId: String): PersistentVector<PostedComment> | null {
        if (!comments.contains(companyId)) {
            return null;
        }
        return comments.getSome(companyId);
    }

    static add(comment: PostedComment): void {
        comments.getSome(comment.companyId).push(comment);
        const ls_comments: PersistentVector<PostedComment> = comments.getSome(comment.companyId);
        comments.set(comment.companyId, ls_comments);
    }

    // static contains(companyId: String): bool {
    //     return comments.contains(companyId);
    // }

    // static delete(companyId: String): void {
    //     if (!comments.contains(companyId)) {
    //         return;
    //     }
    //     comments.delete(companyId);
    // }
}
