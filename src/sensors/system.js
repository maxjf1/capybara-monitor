
import Sensor, {
    CpuSensor,
    MemorySensor,
    ProcessSensor
} from './index';


export default class SystemSensor extends Sensor {
    constructor() {
        super({
            title: 'System Sensor',
            description: 'Sensor de Sistema'
        })
        this.sensors = {
            cpu: new CpuSensor(),
            memory: new MemorySensor(),
            processes: new ProcessSensor()
        }
    }

    /**
     * Obtém dados de todos os monitoramentos
     * 
     * @param {number} [time=0] Tempo mínimo de espera para a obtenção dos dados
     * @returns {Promise} 
     * @memberof SystemSensor
     */
    pool(time = 0) {
        return Promise
            .all([
                this.sensors.cpu.pool(),
                this.sensors.memory.pool(),
                this.sensors.processes.pool(),
                this.wait(time)
            ])
            .then(([cpu, memory, processes]) => ({
                cpu,
                memory,
                processes,
            }))
            .catch(console.error)
    }
}
