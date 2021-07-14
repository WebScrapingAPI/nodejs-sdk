const axios = require('axios');

class WebScrapingApiClient {
    constructor(api_key) {
        this.api_key = api_key;
        this.api_url = "https://api.webscrapingapi.com/v1";
    }
    request(method, url, params = {}, headers = {}, data = {}) {
        params['url'] = url;
        params['api_key'] = this.api_key;

        let queryString = Object.keys(params).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(params[key]);
        }).join('&');
        let final_url = this.api_url + '?' + queryString;

        return new Promise(resolve => {
            axios({
                method: method,
                url: final_url,
                data: data,
                headers: headers,
            }).then(function (response){
                resolve({success: true, response: response});
            }).catch(function (error) {
                resolve({success: false, error: error});
            })
        });
    }
    async get(url, params = {}, headers = {}) {
        return await this.request('GET', url, params, headers, {});
    }
    async post(url, params = {}, headers = {}, data={}) {
        return await this.request('POST', url, params, headers, data);
    }
}

module.exports = WebScrapingApiClient
