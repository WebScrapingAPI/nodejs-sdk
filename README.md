# WebScrapingApi NodeJS SDK

WebScrapingApi is an API that allows scraping websites while using rotating proxies to prevent bans. This SDK for NodeJS makes the usage of the API easier to implement in any project you have.

## Installation

Run the following command in the main folder of your project:

```
npm i webscrapingapi --save
```

## API Key

To use the API and the SDK you will need a API Key. You can get one by registering at [WebScrapingApi](https://app.webscrapingapi.com/register)

## Usage

Using the SDK it's quite easy.
An example of a GET call to the API is the following:

```
// import webScrapingApiClient from 'webscrapingapi'; // For ES6
const webScrapingApiClient = require('webscrapingapi'); // For CommonJS

const client = new webScrapingApiClient("API_KEY");

async function exampleUsage() {
    let response = await client.get("https://webscrapingapi.com", {
        // API Parameters
        // Set to 0 (off, default) or 1 (on) depending on whether or not to render JavaScript on the target web page. JavaScript rendering is done by using a browser.
        'render_js': 1,
        // Set datacenter (default) or residential depending on whether proxy type you want to use for your scraping request. Please note that a single residential proxy API request is counted as 25 API requests.
        'proxy_type': 'datacenter',
        // Specify the 2-letter code of the country you would like to use as a proxy geolocation for your scraping API request. Supported countries differ by proxy type, please refer to the Proxy Locations section for details.
        'country': 'us',
        // Set depending on whether or not to use the same proxy address to your request.
        'session': 1,
        // Specify the maximum timeout in milliseconds you would like to use for your scraping API request. In order to force a timeout, you can specify a number such as 1000. This will abort the request after 1000ms and return whatever HTML response was obtained until this point in time.
        'timeout': 10000,
        // Set desktop (default) or mobile or tablet, depending on whether the device type you want to your for your scraping request.
        'device': 'desktop',
        // Specify the option you would like to us as conditional for your scraping API request. Can only be used when the parameter render_js=1 is activated.
        'wait_until': 'domcontentloaded',
        // Some websites may use javascript frameworks that may require a few extra seconds to load their content. This parameters specifies the time in miliseconds to wait for the website. Recommended values are in the interval 5000-10000.
        'wait_for': 0,
    }, {
        // API Headers
        'authorization': 'bearer test',
        // Specify custom cookies to be passed to the request.
        'cookie': 'test_cookie=abc; cookie_2=def'
    });
    if (response.success) {
        console.log(response.response);
    } else {
        console.log(response.error);
    }
} 

exampleUsage();
```

For a better understanding of the parameters, please check out [our documentation](http://docs.webscrapingapi.com)

## CHANGELOG

**1.1.0**
- Added support for `http.maxHeaderSize` 
- Switched from `axios` to `got`

Transitioning from `axios` to `got` was required in order to implement the `http.maxHeaderSize` property. This property allows us to overwrite NodeJS' default maximum allowed http header size ([`--max-http-header-size`](https://nodejs.org/api/cli.html#--max-http-header-sizesize)) and overcome scenarios in which certain scraped websites (i.e. Wallmart), would result in a `Header overflow` error, becasue the scraped headers size would exceed the maximum 16KiB allowed by NodeJS. 

**Important!** Please note that the response structure in `v.1.1.0` follows `got` response structure and the Object received is differeent compared to previous versions! If you update `webscrapingapi` in your current project, please also consider updating the way you're handling the response!
