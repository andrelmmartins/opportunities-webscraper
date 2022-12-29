import puppeteer, { Browser } from 'puppeteer'

export async function openBrowser() {
    return await puppeteer.launch()
}

export async function closeBrowser() {
    return await puppeteer.launch()
}

export async function getContentOfPage(url: string, browser: Browser) {
    let page = await browser.newPage() 
    await page.goto(url)
    return await page.content()
}