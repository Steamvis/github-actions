import http from 'node:http'
import os from 'node:os'

const server = http.createServer((req, resp) => {
    const output = `
        Hello, world!
        arch: ${os.arch}
        arch: ${os.hostname}
    `
    resp.end(output.trim())
})


export default server
