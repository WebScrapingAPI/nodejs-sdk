# WebScrapingApi NodeJS SDK

WebScrapingApi is an API that allows scraping websites while using rotating proxies to prevent bans. This SDK for Python makes the usage of the API easier to implement in any project you have.

## Installation

Run the following command in the main folder of your project:

```
npm i rand-user-agent
```

## API Key

To use the API and the SDK you will need a API Key. You can get one by registering at [WebScrapingApi](https://app.webscrapingapi.com/register)

## Usage

Using the SDK it's quite easy.
An example of a GET call to the API is the following:

```
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
```

For a better understanding of the parameters, please check out [our documentation](https://docs.webscrapingapi.com/#request-parameters)