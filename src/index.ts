import { Console, publishAll } from './publishers'
import { runScrapers } from './scrapers'

async function execution() {
        
    let opportunities = await runScrapers()
    
    const publisher = new Console()
    publishAll(opportunities, publisher)
    
    setTimeout(execution, 1000 * 60 * 60 * 24 ) // 1 day
}

execution()