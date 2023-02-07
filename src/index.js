class WebScrapingApiClient {
    constructor(api_key) {
        this.api_key = api_key;
        this.api_url = "https://api.webscrapingapi.com/v1";
    }
    async #request(method, url, params = {}, headers = {}, data = {}) {
        const {got} = await import('got')
        const {Options} = await import('got')

        params['url'] = url;
        params['api_key'] = this.api_key;

        let queryString = Object.keys(params).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(params[key]);
        }).join('&');
        let final_url = this.api_url + '?' + queryString;

        return new Promise(resolve => {
            let options = new Options()
            options.method = method
            options.headers = headers
            options.maxHeaderSize = 100000
            if ( method.toLowerCase() !== 'get' )
                typeof data === 'object' 
                    ? options.json = data 
                    : options.body = data 
            got(final_url, undefined, options)
                .then((res) => {
                    resolve({success: true, response: res})
                })
                .catch((e) => {
                    resolve({success: false, error: e});
                })
        });
    }
    async get(url, params = {}, headers = {}) {
        return await this.#request('GET', url, params, headers, {});
    }
    async post(url, params = {}, headers = {}, data={}) {
        return await this.#request('POST', url, params, headers, data);
    }
}

module.exports = WebScrapingApiClient