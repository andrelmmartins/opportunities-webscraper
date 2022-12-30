import { Opportunity } from '../types/Opportunity';

import { M3 } from './M3'
import { Avanti } from './Avanti'
import { closeBrowser, openBrowser } from '../utils/puppeteer';

export async function runScrapers() : Promise<Opportunity[]> {

    const browser = await openBrowser()

    const scrapers = [
        M3,
        Avanti
    ]
    
    let map = await Promise.all(
        scrapers.map((scraper) => new scraper().execute(browser))
    )

    closeBrowser()

    return map.reduce((all, array) => all.concat(array))
}