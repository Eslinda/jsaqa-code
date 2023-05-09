let page;
const timeout = 60000; 

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, timeout);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, timeout);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, timeout);
});

describe("New Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com");
  });
  test("The page contains Sign up button", async () => {
    const btn = ".btn-signup-mktg.btn-mktg";
    await page.waitForSelector(btn, {
      visible: true,
    });
    const actual = await page.$eval(btn, link => link.textContent);
    expect(actual).toContain("Sign up for GitHub");
  }, timeout);

  test("The page has a greeting", async () => {
    const firstLink = await page.$("main div div button");
    await firstLink.click();
    await page.waitForSelector('h1');
    const actual = await page.$eval("main div h1", link => link.textContent);
    expect(actual).toContain("Welcome to GitHub! Let's begin the adventure");
  }, timeout);

  test("The page has a header menu", async () => {
    await page.click("div > nav > ul > li");
    const menu = ".pb-lg-3.HeaderMenu-dropdown-link";
    await page.waitForSelector(menu, {
      visible: true,
    });
    const actual = await page.$eval("ul > li > a > div", link => link.textContent);
    expect(actual).toContain("Automate any workflow");
  }, timeout);
})