const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const HEADLESS = process.env.HEADLESS !== 'false';

jest.setTimeout(60000);

let driver;

beforeAll(async () => {
  const options = new chrome.Options();
  if (HEADLESS) options.addArguments('--headless=new');
  options.addArguments('--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,900');
  driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
});

afterAll(async () => {
  if (driver) await driver.quit();
});

async function login(email, password) {
  await driver.get(`${BASE_URL}/login`);
  await driver.wait(until.elementLocated(By.id('email')), 15000);
  await driver.findElement(By.id('email')).sendKeys(email);
  await driver.findElement(By.id('password')).sendKeys(password);
  await driver.findElement(By.css('button[type="submit"]')).click();
}

describe('E2E - Gestion des tâches', () => {
  test("connexion + création d'une tâche visible dans la liste", async () => {
    await login('admin@test.com', 'password');

    const h1 = await driver.wait(until.elementLocated(By.css('h1')), 15000);
    expect(await h1.getText()).toMatch(/Gestionnaire de Tâches/i);

    const newBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(., 'Nouvelle Tâche')]")), 15000
    );
    await newBtn.click();

    const taskTitle = `Tâche E2E ${Date.now()}`;
    await driver.wait(until.elementLocated(By.id('title')), 15000);
    await driver.findElement(By.id('title')).sendKeys(taskTitle);
    await driver.findElement(
      By.xpath("//button[@type='submit' and contains(., 'Créer')]")
    ).click();

    const card = await driver.wait(
      until.elementLocated(
        By.xpath(`//*[contains(@class,'task-title') and text()='${taskTitle}']`)
      ), 15000
    );
    expect(await card.getText()).toBe(taskTitle);
  });

  test('connexion refusée avec un mauvais mot de passe', async () => {
    await login('admin@test.com', 'mauvais');
    const err = await driver.wait(
      until.elementLocated(By.css('.error-message')), 15000
    );
    expect(await err.getText()).toBeTruthy();
    expect(await driver.getCurrentUrl()).toContain('/login');
  });
});
