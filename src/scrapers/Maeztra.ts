import $ from 'cheerio'

import { Opportunity } from "../types/Opportunity";
import { Scraper } from "../types/Scraper";
import { getContentOfPage } from '../utils/puppeteer'

export class Maeztra implements Scraper {

    url = "https://maeztra.com/vagas/"

    async execute() {
        
        let opportunities: Opportunity[] = []
        
        const content = await getContentOfPage(this.url)
        
        let title = ''
        let description = ''

        $(' div[data-elementor-type="wp-page"] > div.has_eae_slider.elementor-element.e-con-boxed.e-con > div.e-con-inner', content).each(( index, element) => {

            title = $(element)
                    .children('div.elementor-widget-heading')
                    .children('div.elementor-widget-container')
                    .children('h3').text().trim()

            $(element)
                .children('div.elementor-widget-text-editor')
                .children('div.elementor-widget-container')
                .children().each((index, child) => {
                    if(child.tagName == 'p') {
                        if(description != '') description += '\n'
                        description += $(child).find('br').replaceWith('\n').end().text().trim()
                    }
                })

            if(title) {
                opportunities.push(
                    new Opportunity(title, '', description, this.url)
                )
    
                title = ''
                description = ''
            }
        })

        return opportunities
    }

}
