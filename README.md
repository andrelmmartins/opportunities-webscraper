# Opportunities WebScraper

WebScraper para capturar vagas de empregos de sites e publica-las no lugar que quiser. Basta implementar.

## Funcionamento

O funcionamento tem como base o node-cron (https://github.com/node-cron/node-cron) que é capaz de agendar a execução de um script. Com isso podemos agendar a captura e publicação das vagas. 

## Configuração

Usando TypeScript criamos 2 interfaces que trabalham em cima de uma classe Opportunity.

##### Interface Scraper
Responsável por guardar o link do site de vagas de emprego e um método para pegar essas vagas
```TypeScript
export interface Scraper {
    url: string
    execute(): Promise<Opportunity[]>
}
```

##### Interface Scraper
Responsável por publicar a vaga de alguma forma.
```TypeScript
export interface Publisher {
    publish(ppportunity: Opportunity): void
}
```

## Instalação

```sh
opportunities-webscraper
npm i
```

## Executar
Executar em desenvolvimento
```sh
npm run dev
```

Executar para produção
```sh
npm run build
npm run start
```
ou
```sh
npm run build:start
```