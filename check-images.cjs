const fs = require('fs');
const https = require('https');

const data = fs.readFileSync('src/mocks/data.ts', 'utf8');
const urls = [...new Set(data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^'"]*/g) || [])];

console.log('Found ' + urls.length + ' unique URLs');

const checkUrl = (url) => new Promise((resolve) => {
  https.request(url, { method: 'HEAD' }, (res) => {
    resolve({ url, status: res.statusCode });
  }).on('error', () => {
    resolve({ url, status: 500 });
  }).end();
});

Promise.all(urls.map(checkUrl)).then(results => {
  const broken = results.filter(r => r.status !== 200);
  console.log('Broken URLs:');
  console.log(JSON.stringify(broken, null, 2));
});
