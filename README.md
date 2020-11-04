# capybara-monitor
System monitor tool

## Pré-requisitos

Para testar a aplicação, instale Node JS e NPM em https://nodejs.org/en/download/

Com o NodeJS instalado, inicie a instalação no terminal com o comando
`npm run setup`

## Execução

### Docker

Para executar com docker, é necessário ter Docker Compose instalado. Então execute:

    docker-compose up

Isto irá automaticamente configurar e rodar o projeto. Porém, os dados de processos e rede se limitarão ao docker.

### Node

para inicializar a aplicação, execute no terminal o comando

`npm start`

Uma janela será aberta no seu navegador. Caso contrário, acesse a url que será mostrada no terminal.

Para compilar o código, execute `npm run build`
para testar o código, execute `npm test`

## Rotas

O projeto possui apenas duas rotas, a raíz, que ira carregar a interface WEB, e a rota `/api` que fornece todos os dados do sistema:

```json
{
    "cpu": 36,          // Uso de CPU em %
    "memory": {         // uso de memória em MB
        "total": 15854,
        "used": 4717,
        "free": 4373,
        "computed": 30  // Porcentagem de uso
    }, "processes": [   // Processos em execução
        {
            "name": "npm",
            "cpu": 0.4,
            "mem": 0.2
        }
    ],"network": [      // interfaces de rede
        {
            "interface": "lo",
            "inputBytes": "1280",
            "outputBytes": "1280"
        }
    ]
}
```
