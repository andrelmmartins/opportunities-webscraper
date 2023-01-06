import { Opportunity } from "./Opportunity";

export interface Publisher {
    publish(opportunity: Opportunity): void
}