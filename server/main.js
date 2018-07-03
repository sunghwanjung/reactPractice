import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const devPort = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}
app.use('/', express.static(__dirname + '/../public'));

app.get('/test', (req, res) => {
    var result = [
        {
            content : "출근",
            time : "07:00~08:00"
        },
        {
            content : "퇴근",
            time : "17:00~18:00"
        }
    ]
    return res.send(result);
});

app.post('/insertjob', (req, res) => {
    var body = req.body;
    console.log(body.day)
    return res.send("");
});

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});