import { test, expect } from "@playwright/test";
import { test as extendedTest } from "../src/fixtures/fixturePages";
import { HomePage } from "../src/pages/HomePage";
import { statSync } from "node:fs";

extendedTest("Basic test for Home Page", async({page, homePage}) => {

  await test.step("Open and init Homepage", async() => {
  })
  
    await page.goto('/#/greenCity')
    // const homePage = new HomePage(page);
    await homePage.waitForPage();
    //HomePage
    const mainTitle = await homePage.getMainHeading();
    const mainDescription = await homePage.getMainContentText();
    const eventsTitle = await homePage.getEventsTitle();
    //Stats Component
    const stats = homePage.statsComponent();
    const statsTitle = await stats.getSectionTitle();
    const statsBagCounter = await stats.getBagsCounter();
    const statsCupCounter = await stats.getCupsCounter();
    //Subscribe Component
    const news = homePage.SubscribeComponent();
    const newsTitle = await news.getSubscribeTitle()
    const newsDescription = await news.getSubcribeDescription();    
    
    //Verifying page elements 
    expect.soft(mainTitle).toBe("A new way to cultivate useful habits");
    expect.soft(mainDescription).toBe("People in Ukraine use an average of 500 disposable bags and 70 paper cups per year. It is as easy as bringing your own eco-bag and cup to save the lives of three dolphins or one turtle and keep the oceans clean for the next generation.")
    expect.soft(eventsTitle).toBe("Eco news");
    expect.soft(statsTitle).toBe("There are of us and today we");
    expect.soft(statsBagCounter).toBe(0);
    expect.soft(statsCupCounter).toBe(0);
    expect.soft(newsTitle).toBe("Receive interesting news");
    expect.soft(newsDescription).toBe("Subscribe for our newsletter and always be up to date with news and updates");
    
    await news.enterEmail("asdsadasd");
    await page.pause();
});



test("Basic test for Home Page 2", async ({ page }) => {

  await test.step("Open Home page", async () => {
    await page.goto('/#/greenCity');
  });

  const homePage = new HomePage(page);

  await test.step("Wait for Home page to load", async () => {
    await homePage.waitForPage();
  });

  let mainTitle: string;
  let mainDescription: string;
  let eventsTitle: string;

  await test.step("Read main Home page content", async () => {
    mainTitle = await homePage.getMainHeading();
    mainDescription = await homePage.getMainContentText();
    eventsTitle = await homePage.getEventsTitle();
  });

  const stats = homePage.statsComponent();

  let statsTitle: string;
  let statsBagCounter: number;
  let statsCupCounter: number;

  await test.step("Read Stats section", async () => {
    statsTitle = await stats.getSectionTitle();
    statsBagCounter = await stats.getBagsCounter();
    statsCupCounter = await stats.getCupsCounter();
  });

  const news = homePage.SubscribeComponent();

  let newsTitle: string;
  let newsDescription: string;

  await test.step("Read Subscribe section", async () => {
    newsTitle = await news.getSubscribeTitle();
    newsDescription = await news.getSubcribeDescription();
  });

  await test.step("Verify Home page data", async () => {
    expect.soft(mainTitle).toBe("A new way to cultivate useful habits");
    expect.soft(mainDescription).toContain("People in Ukraine use an average of 500 disposable bags");
    expect.soft(eventsTitle).toBe("Eco news");

    expect.soft(statsTitle).toBe("There are of us and today we");
    expect.soft(statsBagCounter).toBe(0);
    expect.soft(statsCupCounter).toBe(0);

    expect.soft(newsTitle).toBe("Receive interesting news");
    expect.soft(newsDescription).toContain("Subscribe for our newsletter");
  });

  await test.step("Subscribe with email", async () => {
    await news.enterEmail("asdsadasd");
  });

});
