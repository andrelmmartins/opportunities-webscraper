import { Opportunity } from '../types/Opportunity';
import { Publisher } from '../types/Publisher';

export * from './Console'

export function publishAll(opportunities: Opportunity[], publisher: Publisher) {
    opportunities.forEach((opportunity) => {
        publisher.publish(opportunity)
    })
}