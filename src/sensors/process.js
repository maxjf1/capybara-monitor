
import Sensor from './sensor';
import ChildProcess from 'child_process';


export default class ProcessSensor extends Sensor {
    constructor() {
        super({
            title: 'Process Sensor',
            description: 'Sensor de processos'
        })
    }

    pool() {

        return new Promise((resolve, reject) => {
            // obtém o status dos processos com o comando ps
            ChildProcess.exec('ps -ewwwo %cpu,%mem,comm', (error, stdout, stderr) => {
                // error handler
                if (error)
                    return reject(error)

                // const stats = {}
                const lines = stdout.split('\n')
                // obtem arrat de processos da saida
                const processes = stdout
                    .split('\n') // quebra a saida em linhas
                    .slice(1, -1) // remove primeira linha
                    .map(line => { // formata cada linha
                        let [cpu, mem, ...name] = line // extrai valores da linha
                            .trim()
                            .replace('  ', ' ')
                            .split(' ');

                        // parse da cpu e memoria para float
                        cpu = parseFloat(cpu.replace(',', '.'))
                        mem = parseFloat(mem.replace(',', '.'))

                        // join do nome do processo
                        name = name.join(' ')

                        return {
                            name,
                            cpu,
                            mem
                        };
                    })
                return resolve(processes);
            })
        })

    }
}