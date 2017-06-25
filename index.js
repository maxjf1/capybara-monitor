const SystemSensor = require('./dist/sensors').SystemSensor

console.error(SystemSensor)

const system = new SystemSensor();

function logSystem(time = 2000) {
    return system
        .pool(time)
        .then(data => {
            console.log(data);
            return logSystem(time);
        })
}

logSystem();