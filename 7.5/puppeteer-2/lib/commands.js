module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },

  getDays: async function (page, number) {
      let selector = `nav > a:nth-child(${number}) > span.page-nav__day-number`;
      await page.waitForSelector(selector);
      await page.click(selector);
  },
  getSeatSelector: async function (page, row, seat) {
    try {
      let selector = `main > section div:nth-child(${row}) > span:nth-child(${seat})`;
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Free seat(s)`);
    }
  },
};
