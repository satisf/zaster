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

const createHttpServer = () => {
    http.createServer((req, res) => {
        let target = proxyRules.match(req)
        if (target) {
            return proxy.web(req, res, {
                target
            })
        }
    }).listen(80)
}
const createHttpsServer = () => {
    https.createServer(options, (req, res) => {
        let target = proxyRules.match(req)
        if (target) {
            return proxy.web(req, res, {
                target
            })
        }
    }).listen(443);
}

try {
    createHttpServer()
} catch (e) {
    console.log(e)
    createHttpServer()
}

try {
    createHttpsServer()
} catch (e) {
    console.log(e)
    createHttpsServer()
}
