const { Browser } = require("puppeteer");
const { clickElement, putText, getText, getDays, getMovieTime, getSeatSelector } = require("./lib/commands.js");
const { bookTickets, selectedTickets, bookingCode } = require("./lib/selectors");


let page;
let reminderText = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await getDays(page, 5); 
  await clickElement(page, "a.movie-seances__time");
});

afterEach(() => {
  page.close();
});

describe("Ticket buying tests", () => {
  test("Should buy available ticket for free seat", async () => {
    await getSeatSelector(page, 2, 1); 
    await clickElement(page, bookTickets); 
    await page.waitForSelector(selectedTickets);
    await clickElement(page, bookingCode); 
    const actual = await getText(page, selectedTickets);
    expect(actual).toContain(reminderText);
  });

  test("Should buy two tickets for free seat", async () => {
    await getSeatSelector(page, 7, 10);
    await getSeatSelector(page, 7, 9);
    await clickElement(page, bookTickets);
    await page.waitForSelector(selectedTickets);
    await clickElement(page, bookingCode);
    const actual = await getText(page, selectedTickets);
    expect(actual).toContain(reminderText);
  });

  test("Should try to buy ticket for booked seat", async () => {
    await getSeatSelector(page, 2, 1);
    expect(
      await page.$eval("button", (button) => {
        return button.disabled;
      })
    ).toBe(true);
  });
});