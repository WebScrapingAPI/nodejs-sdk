import axios from 'axios';

class WebScrapingApiClient {
    constructor(api_key) {
        this.api_key = api_key;
        this.api_url = "https://api.webscrapingapi.com/v1";
    }
    #request(method, url, params = {}, headers = {}, data = {}, callback) {
        params['url'] = url;
        params['api_key'] = this.api_key;

        let queryString = Object.keys(params).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(params[key]);
        }).join('&');
        let final_url = this.api_url + '?' + queryString;

        axios({
            method: method,
            url: final_url,
            data: data,
            headers: headers,
        }).then(function (response){
            callback({success: true, response: response});
        }).catch(function (error) {
            callback({success: false, error: error});
        })
    }
    get(url, params = {}, headers = {}, callback) {
        this.#request('GET', url, params, headers, {}, callback);
    }
    post(url, params = {}, headers = {}, data={}, callback) {
        this.#request('POST', url, params, headers, data, callback);
    }
}

export default WebScrapingApiClient