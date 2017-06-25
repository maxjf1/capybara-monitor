
import Sensor from './sensor';
import OsUtils from 'os-utils';

/**
 * CPU Sensor
 * 
 * @class CpuSensor
 * @extends {Sensor}
 */
export default class CpuSensor extends Sensor {
    constructor() {
        super({
            title: 'CPU Sensor',
            description: 'Sensor de CPU'
        })
    }

    pool() {
        return new Promise((resolve, reject) => {
            OsUtils.cpuUsage(usage => resolve(usage));
        });
    }
}