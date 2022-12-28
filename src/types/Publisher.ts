import { Opportunity } from "./Opportunity";

export interface Publisher {
    publish(ppportunity: Opportunity): void
}