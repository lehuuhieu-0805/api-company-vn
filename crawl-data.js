const puppeteer = require('puppeteer');
const fs = require('fs');
const { default: axios } = require('axios');

const url = 'https://itviec.com/companies/review-company';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // networkidle2: wait until all elements of page is loaded
  await page.goto(url, { waitUntil: 'networkidle2' });

  let loadMoreVisible = true;

  while (loadMoreVisible) {
    try {

      await page.waitForFunction("document.querySelector('#container > div.company-reviews-index > div.company-reviews-index__content > div.panel.company-list > div > div.show-more.text-center > a') && document.querySelector('#container > div.company-reviews-index > div.company-reviews-index__content > div.panel.company-list > div > div.show-more.text-center > a').clientHeight != 0")
        .catch(error => console.log(error));

      await page.click('#container > div.company-reviews-index > div.company-reviews-index__content > div.panel.company-list > div > div.show-more.text-center > a');
      await new Promise((r) => setTimeout(r, 700));
    } catch (error) {
      console.log(error);
      break;
    }
  }


  const companies = await page.evaluate(() => {
    let companies = [];
    const dataCompanies = document.querySelectorAll('#container > div.company-reviews-index > div.company-reviews-index__content > div.panel.company-list > div > div.companies > a');
    for (let index = 0; index < dataCompanies.length; index++) {
      const company = {
        name: dataCompanies[index].querySelector('h3.company__name').innerText,
        description: dataCompanies[index].querySelector('div.company__desc').innerText,
        address: dataCompanies[index].querySelector('span.company__footer-city').innerText,
      };

      companies = [...companies, company];
    }

    return companies;
  });

  // fs.writeFileSync('dataset-company-vn.json', JSON.stringify(companies));

  // call api to store data in database
  Promise.all(companies.map(async (company, index) => {
    axios({
      url: 'http://localhost:4000/api/v1/company',
      method: 'post',
      data: company
    }).then(() => console.log(`success: ${index}`))
      .catch(err => console.log(err));
  })).catch(err => console.log(err));

  await browser.close();

})();