import { Opportunity } from './types/Opportunity'
import { Console } from './publishers'
import * as scrapers from './scrapers'

let opportunities : Opportunity[] = []

for ( let scraper of Object.values(scrapers)) {
    opportunities = opportunities.concat(
        await new scraper().execute()
    )
}

const publisher = new Console()

for (let opportunity of opportunities) {
    publisher.publish(opportunity)
}