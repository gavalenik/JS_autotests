module.exports = class Page {
  async expectUrlIs(url) {
    await expect(await browser.getUrl()).toEqual(url);
  }

  open(path) {
    browser.deleteCookies()
    return browser.url(`http://pizzeria.skillbox.cc/${path}`);
  }
};
