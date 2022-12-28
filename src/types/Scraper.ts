import { Opportunity } from "./Opportunity";

export interface Scraper {
    url: string
    execute(): Promise<Opportunity[]>
}