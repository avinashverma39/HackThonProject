const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// Collect all getElementById in each JS file
const jsFiles = [
  'app.js',
  'smartlearn.js',
  'smartlearn_3d.js',
  'api_service.js',
  'supabase_client.js',
  'insforge_client.js'
];

const jsDomQueries = {};
jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const ids = new Set();
  const regex = /getElementById\(["']([^"']+)["']\)/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    ids.add(m[1]);
  }
  jsDomQueries[file] = [...ids];
});

console.log('=== Checking getElementById across pages ===');

htmlFiles.forEach(htmlFile => {
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  
  // Extract all IDs from HTML
  const pageIds = new Set();
  const idRegex = /\bid=["']([^"']+)["']/gi;
  let m;
  while ((m = idRegex.exec(htmlContent)) !== null) {
    pageIds.add(m[1]);
  }

  // Find scripts included in this HTML
  const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  const includedJs = [];
  while ((m = scriptRegex.exec(htmlContent)) !== null) {
    if (jsDomQueries[m[1]]) {
      includedJs.push(m[1]);
    }
  }

  console.log(`\nPage: ${htmlFile} (Total IDs in HTML: ${pageIds.size})`);
  includedJs.forEach(js => {
    const queried = jsDomQueries[js];
    const missing = queried.filter(id => !pageIds.has(id));
    console.log(`  [${js}] Queries ${queried.length} IDs -> Missing in this page: ${missing.length}`);
  });
});
