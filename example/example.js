const webScrapingApiClient = require('../src/index');
const client = new webScrapingApiClient("API_KEY");

let response = client.get("https://webscrapingapi.com", params={
    'render_js': 0,
    'proxy_type': 'datacenter',
    'device': 'desktop',
}, headers={
    'authorization': 'bearer test'
}, function(response) {
    if (response.success) {
        console.log(response.response);
    } else {
        console.log(response.error);
    }
});