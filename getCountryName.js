const https = require('https');

function filterDataBasedOnCountryCode(data, countryCode) {
  return data.filter(function(countryData) {
    return countryData.alpha2Code === countryCode;
  });
}

function sendRequest(pageNumber, code) {
  return new Promise((resolve, reject) => {

    https.get(`https://jsonmock.hackerrank.com/api/countries?page=${pageNumber}`, (response) => {
      let data;

      response.on('data', (chunk) => {
        data = JSON.parse(Buffer.from(chunk).toString('utf8'));
      });

      response.on('end', () => {
        resolve(data);
      });

    }).on('error', error => {
        reject(error);
    });
  });
}

async function getCountryName(code) {
  const data = await sendRequest(1, code);
  const filteredArray = filterDataBasedOnCountryCode(data.data, code);

  if(filteredArray.length === 1) {
    return filteredArray[0].name;
  } else {
    const totalPages = data.total_pages;
    for (let i = 2; i <= totalPages ; i++) {
      const data = await sendRequest(i, code);
      const filteredArray = filterDataBasedOnCountryCode(data.data, code);
      if (filteredArray.length === 1) {
        return filteredArray[0].name;
      }
    }
  }
}


async function testFunction() {
  const countryCode = await getCountryName('LU');

  console.log(`CountryCode: ${countryCode}`);
}

testFunction();