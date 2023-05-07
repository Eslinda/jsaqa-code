const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {email, password, invalidEmail, invalidPassport} = require("./user.js");

test("Successful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: true
  });
  const page = await browser.newPage("https://netology.ru/?modal=sign_in");
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');
  const header = page.locator("h2.src-components-pages-Profile-Programs--title--Kw5NH");
  await expect(header).toHaveText("Мои курсы и профессии");
  browser.close();
});

test("Failed authorization", async () => {
  const browser = await chromium.launch({
  });
  const page = await browser.newPage("https://netology.ru/?modal=sign_in");
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', invalidEmail);
  await page.fill('[placeholder="Пароль"]', invalidPassport);
  await page.click('[data-testid="login-submit-btn"]');
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
  browser.close();
});