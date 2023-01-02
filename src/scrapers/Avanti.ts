import $, { Element, Cheerio } from 'cheerio'

import { Scraper } from "../types/Scraper";
import { Opportunity } from "../types/Opportunity";
import { getContentOfPage } from "../utils/puppeteer";

export class Avanti implements Scraper {

    url = "https://penseavanti.enlizt.me/"

    async execute() {
        
        let opportunities : Opportunity[] = []
            
        const content = await getContentOfPage(this.url)    
        
        let elements : Cheerio<Element>[] = []

        $('.department-list > ul > li > a', content)
            .each(function () { 
                if( this.attribs?.['data-title'] ) elements.push($(this))
            })
    
        for (let element of elements) {
            if(element.attr()?.href && element.attr()?.['data-title']) {
                let hrefWithoutFirstBar = element.attr()?.href.slice(1)
                let opportunity = await this.getOpportunityFromPage( this.url + hrefWithoutFirstBar) 

                opportunities.push(opportunity)
            }
        }
        
        return opportunities
    }

    async getOpportunityFromPage(url: string) : Promise<Opportunity> {
        
        const content = await getContentOfPage(url)
        const main = $('#main-content', content)

        let title = main.children('header').children('div').children('h1').text().trim()

        let subtitle = ''

        main.children('header').children('div').children('.text-container').children().each((index, child) => {
            if(subtitle != '') subtitle += ' | '
            subtitle += $(child).text().trim()
        })
        
        let description = ''

        main.children('.frame-content').children('.text-container').each((index, section) => {
            $(section).children().each((index, child) => {
                if(description != '') description += '\n'

                if(child.tagName == 'h2') description += '\n' + $(child).text().trim().toUpperCase() + '\n'
                else if(child.tagName == 'h3') description += '\n' + $(child).text().trim().toUpperCase()
                else if(child.tagName == 'p') description += $(child).text().trim()
                else if(child.tagName == 'hr') description += '----------'
                else if(child.tagName == 'ul') {
                    $(child).children('li').each((index, li) => {
                        description += ' - ' + $(li).text().trim() + '\n'
                    })
                }
                else if(child.tagName == 'div') {
                    $(child).children().each((index, mini_child) => {
                        if(index != 0) description += '\n'

                        if(mini_child.tagName == 'h4') description += '\n' + $(mini_child).text().trim().toUpperCase() + '\n'
                        else if(mini_child.tagName == 'h5') description += $(mini_child).text().trim().toUpperCase() + '\n'
                        else if(mini_child.tagName == 'p') description += $(mini_child).text().trim()
                        else if(mini_child.tagName == 'ul') {
                            $(mini_child).children('li').each((index, li) => {
                                description += ' - ' + $(li).text().trim() + '\n'
                            })
                        }
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