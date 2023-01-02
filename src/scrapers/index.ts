import { Opportunity } from '../types/Opportunity';

import { Scraper } from '../types/Scraper';
import { M3 } from './M3'
import { Avanti } from './Avanti'
import { AgenciaMetodo } from './AgenciaMetodo'
import { Hibrido } from './Hibrido'

import { closeBrowser, openBrowser } from '../utils/puppeteer';

export async function runScrapers() : Promise<Opportunity[]> {

    await openBrowser()

    const scrapers : Scraper[] = [
        new M3(),
        new Avanti(),
        new AgenciaMetodo(),
        new Hibrido()
    ]

    let opportunities : Opportunity[] = []  
    
    try {

        for (let scraper of scrapers) {
            opportunities = opportunities.concat(
                await scraper.execute()
            )
        }

        await closeBrowser()
        
        return opportunities

    } catch (err) {
        console.log(err)
    }

    return []

}