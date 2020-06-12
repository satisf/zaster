
'use strict';
const restify = require('restify');
const server = restify.createServer();

const httpProxy = require('http-proxy');
const HttpProxyRules = require('http-proxy-rules');
const proxy = httpProxy.createProxy();

let proxyRules = new HttpProxyRules({
    rules: {'.*/api': 'http://localhost:5000/api'},
    default: 'http://localhost:5001'
});

// pre() runs before routing occurs; allowing us to proxy requests to different targets.
server.pre(function (req, res, next) {
    // Checks request to see if it matches one of the specified rules
    let target = proxyRules.match(req);
    if (target) {
        return proxy.web(req, res, { "target": target });
    }
    return next();
});


server.listen(80, function() {
    console.log('Proxy server started up on port 80');
});