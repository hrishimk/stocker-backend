const http = require('http');
const port = 3000;
const { getIndex } = require('nse-indices')

http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Accept-Encoding', 'gzip, deflate, br')
    const data = await getData();
    res.end(JSON.stringify(data));
}).listen(port);

const getData = async () => {

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
    },
    {
        name: 'momentum',
        key: 'NIFTY200 MOMENTUM 30'
    },
    {
        name: 'alpha_low_volatile',
        key: 'NIFTY ALPHA LOW-VOLATILITY 30'
    },
    {
        name: 'dividend_50',
        key: 'NIFTY DIVIDEND OPPORTUNITIES 50'
    }
    ]


    try {
        return Promise.all(indices.map(async index => {
            index.data = await getIndex(index.key)
            return index;
        }));
    } catch (e) {
        console.log(e);
    };
}