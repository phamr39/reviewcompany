import { base58, Context, u128, util, logging } from "near-sdk-as";
import { CompanyStorage } from "../storage/company.storage";

@nearBindgen
export class Company {
    public country: String;
    public name: String;
    public rating: f64 = 0;
    public field: String;
    public location: String;
    public num_employes: i32;
    public id: String;
    private num_of_votes: f64 = 0;
    constructor(country: String, name: String, field: String, location: String = '', num_employes: i32 = 0) {
        this.country = country;
        this.name = name.toLowerCase().replace(' ', '');
        this.field = field;
        if (location === '') {
            this.location = country;
        } else {
            this.location = location;
        }
        this.num_employes = num_employes;
        this.id = `${country}_${this.name}`;
    }

    cash_vote(point: f64): f64 | null {
        if (point >= 0 && point <= 5) {
            this.rating = (this.rating * this.num_of_votes + point)/(this.num_of_votes + 1);
            this.num_of_votes++;
            this.save();
            return this.rating;
        }
        return null
    }

    save(): void {
        CompanyStorage.set(this);
    }
}
