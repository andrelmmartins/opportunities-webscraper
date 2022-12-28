import { Opportunity } from "../types/Opportunity";
import { Publisher } from "../types/Publisher";

export class Console implements Publisher {
    publish(opportunity: Opportunity) {
        console.log(opportunity.title)
    }
}