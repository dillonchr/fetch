const http = require('http');
const https = require('https');

const HTTPS_REGEX = /^https:\/\//i;
const getProtocolFromUri = (uri) => HTTPS_REGEX.test(uri) ? https : http;

const fetch = ({url, headers, method, body}, callback) => {
    if (!url) {
        return callback(new Error('No `url` provided in options'));
    }

    const options = {
        method,
        headers
    };

    const req = (getProtocolFromUri(url)).request(url, options, (response) => {
        let body = '';
        response.on('data', (chunk) => body += chunk);
        response.on('end', () => {
            try {
                callback(null, JSON.parse(body));
            } catch (ignore) {
                callback(null, body);
            }
        });
    });

    req.on('error', (err) => callback(err));

    if (body) {
        req.write(JSON.stringify(body));
    }

    req.end();
};

module.exports = fetch;

