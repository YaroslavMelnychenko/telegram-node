var config = {
    bot_token: '',
    api_link: function() {
        return 'https://api.telegram.org/bot' + this.bot_token + '/';
    },
    application_url: 'https://telegram.yaroslav-melnychenko.pp.ua/',
    bot_url: function() {
        return this.application_url + 'telegram/' + this.bot_token + '/webhook'
    }
}

module.exports = config;