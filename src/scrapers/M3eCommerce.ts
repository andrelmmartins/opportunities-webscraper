
import $, { Element, Cheerio } from 'cheerio'
import { Opportunity } from "../types/Opportunity";
import { Scraper } from "../types/Scraper";
import { getContentOfPage } from '../utils/puppeteer'

export class M3eCommerce implements Scraper {

    url = "https://m3ecommerce.com/trabalhe-conosco/"

    async execute() : Promise<Opportunity[]> {

        let opportunities: Opportunity[] = []

        const content = await getContentOfPage(this.url)
        
        let elements : Cheerio<Element>[] = []

        $('.join-us-container__vagas__list.ready', content)
            .each(function () { elements.push($(this)) })

        elements.forEach((element) => {
            let name = element
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

            opportunities.push(
                new Opportunity( name, type + ' | ' + extra, this.url )
            )
        })

        return opportunities
    }

}
