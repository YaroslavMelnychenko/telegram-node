var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

const axios = require('axios');

router.use(bodyParser.json());

router.route('/set-webhook')
.all((req, res) => {

});

router.route('/1157398427:AAGCm29tN3d1cqzhTwtysbxV1ReMVmWWZZY')
.all((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ status: 'ok' });
});

module.exports = router;