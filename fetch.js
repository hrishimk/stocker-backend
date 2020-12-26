const fetch = require('node-fetch');

const url = 'https://www.nseindia.com/market-data/live-market-indices'

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

fetch(url, init).then(res => {
    const cookies = res.headers.get('set-cookie').split(',').map(cookie => cookie.split(';')[0].trim())
    console.log(res)
})

