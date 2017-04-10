const config = {
	SERVER: {
		HOST: process.env.IP || 'localhost',
		PORT: process.env.PORT || 3000
	},
	CLIENT: {
		HOST: process.env.IP || 'localhost',
		PORT: process.env.PORT || 3300
	},
	DATABASE: {
		HOST: process.env.IP || 'localhost',
		NAME: 'newsdb' 
	},
	API: {
		KEY: '855715bb-5109-45bd-a90d-d6b26d50bf10',
		SECTIONS: ['world', 'sport', 'football', 'commentisfree', 'culture', 'business', 'lifeandstyle', 'fashion', 'environment', 'technology', 'travel'],
		FIELDS: ['headline', 'trailText', 'byline', 'main', 'body', 'shortUrl', 'thumbnail']
	}
};

module.exports = config;