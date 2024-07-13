let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 8000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 8000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 8000);
});

describe("Task №2 New tests should check titles on other app pages", () => {

  test("Header of Security page", async () => {
    await page.goto("https://github.com/features/security");
    const title = await page.title();
    expect(title).toContain("Features • Security · GitHub");
  }, 8000);

  test("Headline github about", async () => {
    await page.goto("https://github.com/about");
    const title = await page.title();
    expect(title).toContain("About GitHub · GitHub");
  }, 8000);
  
  test("Headline github shop", async () => {
    await page.goto("https://www.thegithubshop.com/");
    const actual = await  page.title();
    expect(actual).toEqual("The GitHub Shop | Home");
  }, 8000);
});