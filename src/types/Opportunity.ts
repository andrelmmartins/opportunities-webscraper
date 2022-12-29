export class Opportunity {
    #title: string
    #subtitle: string
    #description: string
    #url: string

    constructor(title: string, subtitle = "", description: string, url: string) {
        this.#title = title
        this.#subtitle = subtitle
        this.#description = description
        this.#url = url
    }

    get title() {
        return this.#title
    }

    get subtitle() {
        return this.#subtitle
    }

    get description() {
        return this.#description
    }

    get url() {
        return this.#url
    }

}