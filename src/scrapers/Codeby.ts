import $, { Element, Cheerio } from 'cheerio'

import { Opportunity } from "../types/Opportunity";
import { Scraper } from "../types/Scraper";
import { getContentOfPage } from '../utils/puppeteer'

export class Codeby implements Scraper {

    url = "https://codeby.global/pages/vagas/"

    async execute() {
        
        let opportunities: Opportunity[] = []
        
        const content = await getContentOfPage(this.url)
        
        let element = $('main > section > div > div.rte', content)

        let title = ''
        let description = ''

        element.children().each((index, child) => {
            
            if(child.tagName == 'h2') {
                let text = $(child).text().trim()
                if(text) title = text
            } else if(child.tagName == 'hr') {
                opportunities.push(
                    new Opportunity(title, '', description, this.url)
                )

                title = ''
                description = ''
            } else {
                
                if(child.tagName == 'div') {
                    let parsed = $(child)
                    let text = parsed.text().trim()
                    if(text) {
                        description += '\n'

                        if(parsed.children('strong').length == 1) {
                            description += '\n' + parsed.text().trim() + '\n'
                        } else {
                            description += text
                        }
                    }
                }

                else if(child.tagName == 'ul') {
                    $(child).children('li').each((index, li) => {
                        description += '\n - ' + $(li).text().trim()
                    })
                }

                else if(child.tagName == 'p') {
                    let parsed = $(child)
                    let text = parsed.text().trim()
                    if(text && text != '&nbsp;') {
                        description += '\n'
                        description += '\n' + text + '\n'
                    }
                }
            }
        })

        return opportunities
    }

}
