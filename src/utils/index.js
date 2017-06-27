import net from 'net';


/**
 * Obtém a primeira porta livre
 * 
 * @export
 * @param {Number} [port=3000] Porta a começar
 * @param {Number} [limit=port + 100] Porta limite
 * @returns {Promise}
 */
export function getPort(port = 3000, limit = port + 100) {
    return new Promise((resolve, reject) => {
        if (port > limit)
            return reject(new Error('limit reached'))
        const server = net.createServer()
        server.listen(port, () => {
            server.once('close', function () {
                resolve(port)
            })
            server.close()
        })
        server.on('error', () => getPort(port + 1).then(resolve).catch(reject))
    });
}