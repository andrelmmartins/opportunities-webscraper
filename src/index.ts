import cron from 'node-cron'

import { Console, publishAll } from './publishers'
import { runScrapers } from './scrapers'

cron.schedule('0 0 * * *', execution, { runOnInit: true, timezone: 'America/Sao_Paulo' })

// */30 * * * * * every 30 seconds
// * * * * * every minute
// 0 0 * * * every day at midnight

async function execution(now: Date | "manual" | "init") {

    console.log('start', now)

    let opportunities = await runScrapers()
    
    const publisher = new Console()
    publishAll(opportunities, publisher)    

    console.log('end', new Date())
}