import * as http from 'http'

http.createServer((request, response) => {
    // console.log(request)

    request.on('data', (chunk) => console.log(`on data, ${chunk}`))
    request.on('end', () => console.log('finished'))
    
    response.write('hello, world')
    response.end()
}).listen(8080)
