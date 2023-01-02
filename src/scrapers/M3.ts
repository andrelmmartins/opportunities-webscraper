import $, { Element, Cheerio } from 'cheerio'

import { Opportunity } from "../types/Opportunity";
import { Scraper } from "../types/Scraper";
import { getContentOfPage } from '../utils/puppeteer'

export class M3 implements Scraper {

    url = "https://m3ecommerce.com/trabalhe-conosco/"

    async execute() {
        
        let opportunities: Opportunity[] = []
        
        const content = await getContentOfPage(this.url)
        
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

            let description = ''

            element.children('.join-us-container__vagas__list__content').children().each((index, child) => {
                if(description != '') description += '\n\n'

                if(child.tagName == 'p') description += $(child).text().trim() 
                else if(child.tagName == 'ul') {
                    $(child).children('li').each((index, li) => {
                        description += ' - ' + $(li).text().trim() + '\n'
                    })
                }
                else if (child.tagName == 'div') {
                    description += $(child).children('span').text().trim()
                    $(child).children('ul').children('li').each((index, li) => {
                        description += ' - ' + $(li).text().trim() + '\n'
                    })
                }
            })

            description += '\n\nLINK DO FORMULÁRIO: https://app.pipefy.com/public/form/cjJmu6-g'

            opportunities.push(
                new Opportunity( title, subtitle, description, this.url)
            )

        })

        return opportunities
    }

}
