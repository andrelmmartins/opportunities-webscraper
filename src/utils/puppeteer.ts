import puppeteer, { Browser, Page } from 'puppeteer'

var browser : undefined | Browser; 
var page : undefined | Page;

export async function openBrowser() {
    browser = await puppeteer.launch()

    let pages = await browser.pages()
    if (pages?.[0]) page = pages[0]
    else {
        page = await browser.newPage()
    }
}

export async function closeBrowser() {
    if(browser) {
        await browser.close()
        browser = undefined; 
        page = undefined;
    }
}

export async function clickOnButton(selector: string) {

    if (page) {
        // let element = await page.$(selector)
        // if(element) await element.click()

        // return page.url()

        const buttons = await page.$$(selector) // ("//button[@aria-label='VER VAGA']")
        for( let button of buttons) {
            console.log(page.url())

            await button.click(),

            console.log(page.url())
        }

    }

    return ''
}

export async function getContentOfPage(url: string) {
    if (page) {
        await page.goto(url)
        return await page.content()
    }

    return ''
}
