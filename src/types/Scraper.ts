import { Browser } from "puppeteer";
import { Opportunity } from "./Opportunity";

export interface Scraper {
    url: string
    execute(browser: Browser): Promise<Opportunity[]>
}