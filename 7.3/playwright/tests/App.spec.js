const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {email, password, invalidEmail, invalidPassport} = require("./user.js");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click;
  await page.locator('[placeholder="Email"]').fill(email);
  await page.locator('[placeholder="Пароль"]').click;
  await page.locator('[placeholder="Пароль"]').fill(password);
  await page.click('[data-testid="login-submit-btn"]');
  const header = page.locator("h2.src-components-pages-Profile-Programs--title--Kw5NH");
  await expect(header).toHaveText("Мои курсы и профессии");
  page.close();
});

test("Failed authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click;
  await page.locator('[placeholder="Email"]').fill(invalidEmail);
  await page.locator('[placeholder="Пароль"]').click;
  await page.locator('[placeholder="Пароль"]').fill(invalidPassport);
  await page.click('[data-testid="login-submit-btn"]');
  const error = page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
  page.close();
});