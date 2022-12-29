import $, { Element, Cheerio } from 'cheerio'
import { Browser } from 'puppeteer';

import { Scraper } from "../types/Scraper";
import { Opportunity } from "../types/Opportunity";
import { getContentOfPage } from "../utils/puppeteer";

export class Avanti implements Scraper {

    url = "https://penseavanti.enlizt.me/"

    async execute(browser: Browser) {
        
        let opportunities : Opportunity[] = []
            
        const content = await getContentOfPage(this.url, browser)    
        
        let elements : Cheerio<Element>[] = []

        $('.department-list > ul > li > a', content)
            .each(function () { 
                if( this.attribs?.['data-title'] ) elements.push($(this))
            })
    
        for (let element of elements) {
            if(element.attr()?.href && element.attr()?.['data-title']) {
                let hrefWithoutFirstBar = element.attr()?.href.slice(1)
                let opportunity = await this.getOpportunityFromPage( this.url + hrefWithoutFirstBar, browser) 

                opportunities.push(opportunity)
            }
        }
        
        return opportunities
    }

    async getOpportunityFromPage(url: string, browser: Browser) : Promise<Opportunity> {
        
        const content = await getContentOfPage(url, browser)
        const main = $('#main-content', content)

        let title = main.children('header').children('div').children('h1').text().trim()

        let id = main.children('header').children('div').children('.text-container').children('p').first().text().trim()
        let city = main.children('header').children('div').children('.text-container').children('p').last().text().trim()
        
        let subtitle = id + ' | ' + city

        return new Opportunity(
            title,
            subtitle,
            '',
            url
        )
    }

}