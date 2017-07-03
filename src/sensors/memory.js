
import Sensor from './sensor';
import ChildProcess from 'child_process';

export default class MemorySensor extends Sensor {
    constructor() {
        super({
            title: 'Memory Sensor',
            description: 'Sensor de memória'
        })
    }

    pool() {

        return new Promise((resolve, reject) => {
            // obtem o status da memória pelo comando free -m
            ChildProcess.exec('free -m', (err, stdout) => {
                // trata erros
                if (err)
                    return reject(err);

                // trata saída do comando
                const [total, used, free] = stdout
                    .split('\n')[1] // quebra linhas e pega a segunda
                    .replace(/[\s\n\r]+/g, ' ') // limpa espaçamentos da linha
                    .split(' ') // quebra linha nos espaços
                    .slice(1, 4) // obtém apenas as 3 colunas de valores
                    .map(value => parseFloat(value)) // faz parse do valor string

                const computed = Math.round(100 * (used / total))

                return resolve({
                    total,
                    used,
                    free,
                    computed
                })
            })
        })

    }
}