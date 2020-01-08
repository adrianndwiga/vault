import * as http from 'http'
import { router } from './router'

http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    request.on('data', (chunk) => {
        router[request.url](chunk)
    })
    response.end()
}).listen(8080)
