import { Opportunity } from '../types/Opportunity';

import { M3eCommerce } from './M3eCommerce'

export async function runScrapers() : Promise<Opportunity[]> {

    let opportunities : Opportunity[] = [] 
    
    let scrapers = [
        M3eCommerce
    ]

    for ( let scraper of scrapers) {
        opportunities = opportunities.concat(
            await new scraper().execute()
        )
    }

    return opportunities
}