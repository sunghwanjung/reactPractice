import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import sqlite from './sqlite3';

require("babel-core/register");//generator를 ES5 문법으로 바꾸기 위해서 필요하다고 함
require("babel-polyfill");
require("babel-core").transform("code", {
    presets: ["es2017"]
});

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

app.get('/getJobData', (req, res) => {
    var callback = (value) =>{
        res.send(value);
    }
    try{
        sqlite.sqlSelectList(callback, "selectJob" , req.query.day);
    }catch(e){
        res.send("오류");
    }
});

app.post('/insertjob', (req, res) => {
    var body = req.body;
    var callback = (value) =>{
        res.send(value);
    }
    sqlite.sqlInsert(callback,"insertJob", body);
});


app.get('/queryTest', (req, res) => {
    var test = sqlite.sqlSelectList("selectJob",function(value){
        res.send(value);
    });
    console.log("test 값 받아옴");
    console.log(test);
   // return res.send("");
});

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});