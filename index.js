const http = require('http');
const fetch = require('node-fetch');

const port = 3000;

http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Accept-Encoding', 'gzip, deflate, br')
    const data = await getData();
    res.end(JSON.stringify(data));
}).listen(port);

const getData = async () => {
    const init = {
        headers: {
            'Host': 'www.nseindia.com',
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:77.0) Gecko/20100101 Firefox/77.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': 1,
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
        },
    };

    const indices = [{
            name: 'quality',
            key: 'NIFTY200 QUALITY 30'
        },
        {
            name: 'low_volatile',
            key: 'NIFTY100 LOW VOLATILITY 30'
        },
        {
            name: 'nifty_200',
            key: 'NIFTY 200'
        }
    ];

    const url = 'https://www.nseindia.com/api/equity-stockIndices?index=';

    try {
        return Promise.all(indices.map(async index => {
            const indexURL = url + index.key;
            index.data = await fetch(indexURL, init).then(res => res.text())
            return index;
        }));
    } catch (e) {
        console.log(e);
    };
}