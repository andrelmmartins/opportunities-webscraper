import $, { Element } from 'cheerio'

import { Scraper } from "../types/Scraper";
import { Opportunity } from "../types/Opportunity";
import { getContentOfPage } from "../utils/puppeteer";

export class AgenciaMetodo implements Scraper {

    url = "https://talentos.agenciametodo.com/"

    async execute() {
        
        let opportunities : Opportunity[] = []
            
        const content = await getContentOfPage(this.url)    
        
        let elements : Element[] = []

        $('.job_listings > ul.job-list > li > a', content)
            .each(function () { 
                elements.push(this)
            })
    
        for (let element of elements) {
            let opportunity = await this.getOpportunityFromPage( element.attribs.href ) 
            opportunities.push(opportunity)
        }
        
        return opportunities
    }

    async getOpportunityFromPage(url: string) : Promise<Opportunity> {

        let title = ''        
        let subtitle = ''
        let description = ''

        const content = await getContentOfPage(url)

        $('div.job_description > p', content).each(function () {
            if(description != '') description += '\n'
            
            let element = $(this)
            let isStrong = !!element.children('strong').text().trim()

            if(isStrong && description != '') description += '\n' 
            description += element.text()
            if(isStrong) description += '\n'
        })

        $('#job-details .job-overview > ul > li > div', content).each(function () {
            if(subtitle != '') subtitle += ' | '
            let element = $(this)

            let job_details_title = element.children('strong').text().trim()
            let job_details_value = element.children('span').text().trim()

            if(job_details_title.toLowerCase().includes('cargo')) title = job_details_value
            else subtitle += job_details_title + ' ' + job_details_value
        })

        return new Opportunity(
            title,
            subtitle,
            description,
            url
        )
    }

}