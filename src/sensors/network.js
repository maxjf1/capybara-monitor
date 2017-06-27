import Sensor from './sensor';
import ChildProcess from 'child_process';

export default class NetworkSensor extends Sensor {

    constructor() {
        super({
            title: 'Network Sensor',
            description: 'Sensor de rede'
        });
    }

    pool() {
        return new Promise((resolve, reject) => {
            ChildProcess.exec('ip -s link', (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }
                var regexRX = new RegExp(/    RX: bytes  packets  errors  dropped overrun mcast\s*\n\s*([0-9]+) /gm);
                var regexTX = new RegExp(/    TX: bytes  packets  errors  dropped carrier collsns \s*\n\s*([0-9]+) /g);
                var regexIfNames = new RegExp(/[0-9]+: ([\S]+): /g);

                var stats = [];
                var i = 0, totalIn = 0, totalOut = 0, res;

                while ((res = regexIfNames.exec(stdout)) !== null) {
                    stats[i++] = {
                        interface: res[1]
                    };
                }

                i = 0;
                while ((res = regexRX.exec(stdout)) !== null) {
                    stats[i++].inputBytes = res[1];
                }

                i = 0;
                while ((res = regexTX.exec(stdout)) !== null) {
                    stats[i++].outputBytes = res[1];
                }

                resolve(stats);
            })
        })
    }
}