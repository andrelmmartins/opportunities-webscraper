import $, { Element, Cheerio } from 'cheerio'
import { Browser } from 'puppeteer';

import { Opportunity } from "../types/Opportunity";
import { Scraper } from "../types/Scraper";
import { getContentOfPage } from '../utils/puppeteer'

export class M3 implements Scraper {

    url = "https://m3ecommerce.com/trabalhe-conosco/"

    async execute(browser: Browser) {
        
        let opportunities: Opportunity[] = []
        
        const content = await getContentOfPage(this.url, browser)
        
        let elements : Cheerio<Element>[] = []

        $('.join-us-container__vagas__list.ready', content)
            .each(function () { elements.push($(this)) })

        elements.forEach((element) => {

            let title = element
                .children('.join-us-container__vagas__list__text')
                .children('.join-us-container__vagas__list__text__title')
                .children('h3').text()
            
            let type = element
                .children('.join-us-container__vagas__list__text')
                .children('.join-us-container__vagas__list__text__content')
                .children('span').text()

            let extra = element
                .children('.join-us-container__vagas__list__text')
                .children('.join-us-container__vagas__list__text__content')
                .children('p').text()

            let subtitle = type + ' | ' + extra

            opportunities.push(
                new Opportunity( title, subtitle, '', this.url)
            )
        })

        return opportunities
    }

}
