import os from 'os';

const platform = os.platform();
const isLinux = platform().includes('linux');

/**
 * Classe de sensor base
 *
 * Os sensores devem extender esta classe e implementar os métodos básicos
 *
 * @class Sensor
 */
class Sensor {

    /**
     * Creates an instance of Sensor.
     * 
     * A classe a extender deverá passar suas configurações para esse construtor
     * 
     * @memberof Sensor
     */
    constructor({ title = 'Sensor', description = 'Sensor', state = null } = {}) {
        Object.assign(this, {
            title,
            description,
            platform,
            isLinux
        })
    }

    pool() {
        return new Promise(
            (resolve, reject) => reject('Not implemented')
        )
    }


    /**
     * Helper - Promise Timeout
     * 
     * @param {any} [time=1000] Tempo de espera
     * @param {boolean} [error=false] erro que deve ser retornado
     * @returns {Promise}
     * @memberof Sensor
     */
    wait(time = 1000, error = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => error ? reject(error) : resolve());
        });
    }
}