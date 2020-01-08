import * as http from 'http'

describe('token server', () => {
    it('should send http get request', (done) => {
        const options: http.RequestOptions = {
            host: 'localhost',
            port: 8080,
            path: '/dummy-get-request'
        }

        // options.host
        http.get(options, (response) => {
            response.on('data', (chunk: Buffer) => console.log(chunk.toString()))
            done()
        })
    })

    it('should send http post request', (done) => {
        const options: http.RequestOptions = {
            host: 'localhost',
            port: 8080,
            method: 'POST',
            path: '/dummy-post-request'
        }

        const request = http.request(options, (response) => {
            response.on('data', (chunk: Buffer) => console.log(chunk.toString()))
            done()
        })

        request.write('hello')
        request.end()
    })
})
