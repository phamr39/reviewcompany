import { PersistentUnorderedMap } from "near-sdk-core";
import { Company } from "../model/company.model";

const companies = new PersistentUnorderedMap<String, Company>("Company");

export class CompanyStorage {
    static get(id: String): Company | null {
        if (!companies.contains(id)) {
            return null;
        }
        return companies.getSome(id);
    }

    static set(company: Company): void {
        companies.set(company.id, company);
    }

    static contains(id: String): bool {
        return companies.contains(id);
    }

    static delete(id: String): void {
        if (!companies.contains(id)) {
            return;
        }
        companies.delete(id);
    }
}
