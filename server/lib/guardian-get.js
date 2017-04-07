
 var http = require('http'),
	https  = require('https'),
	config = require('C:/Nodejs/etc/config');
	
	var httpGET = (options, done, err) => { }
	
	var httpGET = (options, done, err) => {
	// Определить подключение: защищенное / незащищенное
	var server = options.port === 443 ? https : http;
	// Запустить асинхронное выполнение запроса
	var req = server.request(options, res => {
		// Строка, в которую мы будем собирать входящие данные
		let output = '';
		// Кодировка, в которой мы хотим получить данные
		res.setEncoding('utf8');
		// Собирать данные по мере их поступления
		res.on('data', chunk => output += chunk);
		// По окончании запроса вызвать callback "done" и передать в него полученные данные
		res.on('end', () => done(JSON.parse(output)));
		// Выведем состояние запроса
		console.log(`Request status: ${options.host}:${res.statusCode}`);
	});

	// При возникновении ошибки вызвать обработчик
	req.on('error', err);
	// Закрыть подключение
	req.end();
}

module.exports = (query, done, err) => {
	// Шаблон запроса к The Guardian
    var queryTemplate = `/search?show-fields=${config.API.FIELDS.join(',')}&api-key=${config.API.KEY}&${query}`;
    var requestOptions = {
        host: 'content.guardianapis.com',	// API-endpoint
        port: 443,
        path: queryTemplate,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    httpGET(requestOptions, done, err);
};