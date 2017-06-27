import { SystemSensor } from './src/sensors'

import * as Utils from './src/utils'
import express from 'express'
import opn from 'opn'


const system = new SystemSensor();
const app = express();
let port = 3000


app.use(express.static('./static'))
app.use(express.static('./node_modules/uikit/dist'))
app.use('/js', express.static('./node_modules/vue/dist'))
app.use('/js', express.static('./node_modules/jquery/dist'))
app.use('/js', express.static('./node_modules/bluebird/js/browser'))


app.get('/api', (req, res) => {
    system
        .pool()
        .then(data => res.send(data))
        .catch(error => res.status(500).send({ error: error.toString() }))
})

function openBrowser() {
    opn('http://localhost:' + port)
}

Utils
    .getPort()
    .then(theport => new Promise(resolve => {
        port = theport;
        app.listen(port, resolve)
    }))
    .then(() => console.log('App iniciado em localhost:' + port))
    .then(openBrowser)
    .catch(err => console.error('ERRO: ', err))