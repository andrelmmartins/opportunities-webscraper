import { Opportunity } from "../types/Opportunity";
import { Publisher } from "../types/Publisher";

export class Console implements Publisher {
    publish(opportunity: Opportunity) {
        console.log(opportunity.title)
        console.log(opportunity.subtitle)
        console.log(opportunity.url)
        console.log(opportunity.description)        
    }
}