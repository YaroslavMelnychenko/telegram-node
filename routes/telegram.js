var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var config = require('../config');
var axios = require('axios');

router.use(bodyParser.json());

router.route('/')
.all((req, res, next) => {
    axios.post(config.api_link() + 'getMe')
    .then(response => {
        console.log(response.data);
        res.statusCode = response.status;
        res.setHeader('Content-Type', 'application/json');
        res.json(response.data);
    }, error => next(error))
    .catch(error => next(error));
});

router.route('/config')
.all((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ 
        bot_token: config.bot_token,
        api_link: config.api_link(),
        application_url: config.application_url,
        bot_url: config.bot_url()  
    });
});

router.route('/setWebhook')
.all((req, res, next) => {
    axios.post(config.api_link() + 'setWebhook', {
        url: config.bot_url()
    }).then(response => {
        console.log(response.data);
        res.statusCode = response.status;
        res.setHeader('Content-Type', 'application/json');
        res.json(response.data);
    }, error => next(error))
    .catch(error => next(error));
});

router.route('/getWebhookInfo')
.all((req, res, next) => {
    axios.get(config.api_link() + 'getWebhookInfo')
    .then(response => {
        console.log(response.data);
        res.statusCode = response.status;
        res.setHeader('Content-Type', 'application/json');
        res.json(response.data);
    }, error => next(error))
    .catch(error => next(error));
});

router.route('/webhook')
.all((req, res, next) => {
    console.log(req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ status: 'ok' });
});

module.exports = router;