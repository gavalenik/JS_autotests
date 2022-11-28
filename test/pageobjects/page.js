module.exports = class Page {
  open(path) {
    return browser.url(`http://pizzeria.skillbox.cc/${path}`);
  }

  async expectUrlIs(url) {
    await expect(await browser.getUrl()).toEqual(url);
  }

  async pause(ms) {
    await browser.pause(ms)
  }
};
