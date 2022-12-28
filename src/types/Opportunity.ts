export class Opportunity {
    #title: string
    #extra: string
    #url: string

    constructor(title: string, extra: string, url: string) {
        this.#title = title
        this.#extra = extra
        this.#url = url
    }

    get title() {
        return this.#title
    }

    get extra() {
        return this.#extra
    }

    get url() {
        return this.#url
    }
}