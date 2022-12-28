import puppeteer from 'puppeteer'

export async function getContentOfPage(url: string) {
    let browser = await puppeteer.launch()
    let page = await browser.newPage() 
    await page.goto(url)
    
    let ret = await page.content()
    browser.close()

    return ret
}