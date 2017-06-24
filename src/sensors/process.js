
import Sensor from './sensor';
import ChildProcess from 'child_process';


class ProcessSensor extends Sensor {
    constructor() {
        super({
            title: 'Process Sensor',
            description: 'Sensor de processos'
        })
    }

    pool() {

        return new Promise((resolve, reject) => {
            // obtém o status dos processos com o comando ps
            childProcess.exec('ps -ewwwo %cpu,%mem,comm', (error, stdout, stderr) => {
                // error handler
                if (error)
                    return reject(error)

                // const stats = {}
                const lines = stdout.split('\n')
                // obtem arrat de processos da saida
                const processes = stdout
                    .split('\n') // quebra a saida em linhas
                    .slice(1) // remove primeira linha
                    .map(line => {
                        // todo
                        return {};
                    })
                // Ditch the first line
                // lines[0] = ''
                // for (const line in lines) {
                //     const currentLine = lines[line].trim().replace('  ', ' ')
                //     const words = currentLine.split(' ')
                //     if (typeof words[0] !== 'undefined' && typeof words[1] !== 'undefined') {
                //         const cpu = words[0].replace(',', '.')
                //         const mem = words[1].replace(',', '.')
                //         const offset = cpu.length + mem.length + 2
                //         let comm = currentLine.slice(offset)
                //         // If we're on Mac then remove the path
                //         if (/^darwin/.test(process.platform)) {
                //             comm = comm.split('/')
                //             comm = comm[comm.length - 1]
                //         } else {
                //             // Otherwise assume linux and remove the unnecessary /1 info like
                //             // you get on kworker
                //             comm = comm.split('/')
                //             comm = comm[0]
                //         }
                //         // If already exists, then add them together
                //         if (typeof stats[comm] !== 'undefined') {
                //             stats[comm] = {
                //                 cpu: parseFloat(stats[comm].cpu, 10) + parseFloat(cpu),
                //                 mem: parseFloat(stats[comm].mem, 10) + parseFloat(mem),
                //                 comm,
                //                 count: parseInt(stats[comm].count, 10) + 1
                //             }
                //         } else {
                //             stats[comm] = {
                //                 cpu,
                //                 mem,
                //                 comm,
                //                 count: 1
                //             }
                //         }
                //     }
                // }
                // const statsArray = []
                // for (const stat in stats) {
                //     // Divide by number of CPU cores
                //     const cpuRounded = parseFloat(stats[stat].cpu / os.cpus().length).toFixed(1)
                //     const memRounded = parseFloat(stats[stat].mem).toFixed(1)
                //     statsArray.push({
                //         'Command': stats[stat].comm,
                //         'Count': stats[stat].count,
                //         'CPU %': cpuRounded,
                //         'Memory %': memRounded,
                //         'cpu': stats[stat].cpu,
                //         'mem': stats[stat].mem // exact cpu for comparison
                //     })
                // }
                // statsArray.sort((a, b) => parseFloat(b[plugin.sort]) - parseFloat(a[plugin.sort]))

                // plugin.currentValue = statsArray
                // plugin.initialized = true
            })
        })

    }
}