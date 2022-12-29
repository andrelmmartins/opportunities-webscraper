import cron from 'node-cron'

import { Console, publishAll } from './publishers'
import { runScrapers } from './scrapers'

// monday to friday at midnight
cron.schedule("0 0 0 * * 1,2,3,4,5", async () => {

    let opportunities = await runScrapers()

    const publisher = new Console()
    publishAll(opportunities, publisher)
})