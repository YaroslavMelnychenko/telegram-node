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

    if(req.body.update_id !== undefined) {

        if(req.body.callback_query === undefined) {

            axios.post(config.api_link() + 'sendMessage', {
                chat_id: req.body.message.chat.id,
                text: 'Hello! A I\'m bot!',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Test inline button',
                                callback_data: 'this_is_callback'
                            }
                        ],
                        [
                            {
                                text: 'Test inline button with alert',
                                callback_data: 'this_is_callback_alert'
                            }
                        ],
                        [
                            {
                                text: 'Test inline button with url',
                                callback_data: 'this_is_callback_with_url'
                            }
                        ]
                    ]
                }
            })
            .then(response => {
                console.log(response.data);
            }, error => next(error))
            .catch(error => next(error));

        } else {

            var answerData = {};

            switch(req.body.callback_query.data) {
                case 'this_is_callback':
                    answerData = {
                        callback_query_id: req.body.callback_query.id,
                        text: 'Callback successful'
                    }
                    break;

                case 'this_is_callback_alert':
                    answerData = {
                        callback_query_id: req.body.callback_query.id,
                        show_alert: true,
                        text: 'Callback error :)'
                    }
                    break;
                
                case 'this_is_callback_with_url':
                    answerData = {
                        callback_query_id: req.body.callback_query.id,
                        url: 't.me/yarikmelnychenko',
                        text: 'Callback error :)'
                    }
                    break;
            }

            axios.post(config.api_link() + 'answerCallbackQuery', answerData).then(response => {
                console.log(response.data);
            }, error => next(error))
            .catch(error => next(error));

        }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ status: 'ok' });
});

module.exports = router;