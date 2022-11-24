class Request {
    constructor(url, postData, queryParams, headers) {
        this.url = url;
        this.postData = postData;
        this.queryParams = queryParams;
        this.headers = headers;
    }
}

class Response {
    constructor(url, body, headers) {
        this.url = url;
        this.body = body;
        this.headers = headers;
    }
}

class NetworkService {
    constructor(options) {
        this.options = options;
    }

    static requests = [];
    static responses = [];

    objectsComparingProcessing(object1, object2) {
        for (var key in object2) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }
        return true;
    }

    firstObjContainsAllKeysOfSecondObj(object1, object2) {
        if (Array.isArray(object1)) {
            const result = object1.filter((item) => {
                return this.objectsComparingProcessing(item, object2);
            });
            if (result.length > 0) return true;
            else return false;
        } else {
            return this.objectsComparingProcessing(object1, object2);
        }
    }

    before() {
        browser.addCommand('networkSubscribe', async () => {
            await global.page.on('request', (request) => {
                const requestUrl = request.url();
                if (requestUrl.includes('https://skillbox.ru/api')) {
                    const requestQueryParams = Object.fromEntries(
                        new URLSearchParams(requestUrl),
                    );
                    NetworkService.requests.push(
                        new Request(
                            requestUrl,
                            request.postData(),
                            requestQueryParams,
                            request.headers(),
                        ),
                    );
                }
            });
            await global.page.on('response', async (response) => {
                if (response.url().includes('https://skillbox.ru/api')) {
                    const responseBody = (await response.json()).data;
                    NetworkService.responses.push(
                        new Response(response.url(), responseBody, response.headers()),
                    );
                }
            });
        });

        browser.addCommand(
            'waitForRequest',
            async (url = '', postData = null, queryParams = {}, headers = {}) => {
                let result = [];
                await browser.waitUntil(() => {
                    result = NetworkService.requests.filter((item) => {
                        return (
                            item.url === url &&
                            item.postData == postData &&
                            this.firstObjContainsAllKeysOfSecondObj(
                                item.queryParams,
                                queryParams,
                            ) &&
                            this.firstObjContainsAllKeysOfSecondObj(item.headers, headers)
                        );
                    });
                    if (result.length < 1) return false;
                    else return true;
                }, 2000);
            },
        );

        browser.addCommand(
            'waitForResponse',
            async (url = '', body = {}, headers = {}) => {
                let result = [];
                await browser.waitUntil(() => {
                    result = NetworkService.responses.filter((item) => {
                        return (
                            item.url === url &&
                            this.firstObjContainsAllKeysOfSecondObj(item.body, body) &&
                            this.firstObjContainsAllKeysOfSecondObj(item.headers, headers)
                        );
                    });
                    if (result.length < 1) return false;
                    else return true;
                }, 2000);
            },
        );
    }
}

module.exports = { NetworkService: NetworkService };
