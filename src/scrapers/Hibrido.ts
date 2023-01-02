import $, { Element } from 'cheerio'

import { Scraper } from "../types/Scraper";
import { Opportunity } from "../types/Opportunity";
import { getContentOfPage } from "../utils/puppeteer";

export class Hibrido implements Scraper {

    url = "https://hibrido.gupy.io/"

    async execute() {
        
        let opportunities : Opportunity[] = []
            
        const content = await getContentOfPage(this.url)    
        
        let elements : Element[] = []

        $('section#job-listing > ul > li > a', content)
            .each(function () { 
                if(this.attribs.href) {
                    elements.push(this)
                }
            })
    
        for (let element of elements) {
            let hrefWithoutFirstBar = element.attribs.href.slice(1)
            let opportunity = await this.getOpportunityFromPage( this.url + hrefWithoutFirstBar) 
            opportunities.push(opportunity)
        }
        
        return opportunities
    }

    async getOpportunityFromPage(url: string) : Promise<Opportunity> {
        
        let title = ''        
        let subtitle = ''
        let description = ''

        const content = await getContentOfPage(url)

        $('#__next > header > div > div', content).each((index, element) => {
            if(index == 1) {
                title = $(element).children('h1').text().trim()
            } else if (index == 2) {
                $(element).children('div').children('span').each((index, span) => {
                    if(subtitle != '') subtitle += ' | '
                    subtitle += $(span).text()
                })
            }
        })

        $('#__next > main > section > div[data-testid="text-section"]', content).each(function () {
            
            let el = $(this)

            let h2 = el.children('h2').text().trim().toUpperCase()
            if(!!h2) description += '\n' + h2 + '\n'
            
            el.children('div').children().each((index, child) => {
                description += '\n'
                
                if(child.tagName == 'p') description += $(child).text()
                else if(child.tagName == 'ul') {
                    $(child).children('li').each((index, li) => {
                        description += ' - ' + $(li).text().trim() + '\n'
                    })
                }
            })
        })

        return new Opportunity(
            title,
            subtitle,
            description,
            url
        )
    }

}