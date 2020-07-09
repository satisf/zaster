'use strict';

const fs = require('fs');
const http = require('http')
const https = require('https');
const httpProxy = require('http-proxy');
const HttpProxyRules = require('http-proxy-rules');

const options = {
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('cert.pem')
};

const proxyRules = new HttpProxyRules({
    rules: {'.*/api': 'http://localhost:5000/api'},
    default: 'http://localhost:5001'
});

const proxy = httpProxy.createProxy();

http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80)

https.createServer(options, (req, res) => {
    let target = proxyRules.match(req)
    if(target) {
        return proxy.web(req, res, {
            target
        })
    }
}).listen(443);
