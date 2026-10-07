const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const jsFiles = fs.readdirSync('.').filter(f => f.endsWith('.js'));

console.log('=== HTML Files & Scripts Loaded ===');
const htmlData = {};
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const scripts = [];
  const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = scriptRegex.exec(content)) !== null) {
    scripts.push(m[1]);
  }
  const ids = new Set();
  const idRegex = /\bid=["']([^"']+)["']/gi;
  const duplicateIds = [];
  while ((m = idRegex.exec(content)) !== null) {
    if (ids.has(m[1])) {
      duplicateIds.push(m[1]);
    }
    ids.add(m[1]);
  }
  
  // inline on* handlers
  const inlineHandlers = [];
  const handlerRegex = /\son\w+=["']([^"'(]+)\(/gi;
  while ((m = handlerRegex.exec(content)) !== null) {
    inlineHandlers.push(m[1].trim());
  }

  // check stylesheets
  const cssFiles = [];
  const cssRegex = /<link\s+[^>]*href=["']([^"']+\.css)["'][^>]*>/gi;
  while ((m = cssRegex.exec(content)) !== null) {
    cssFiles.push(m[1]);
  }

  htmlData[file] = { scripts, ids, duplicateIds, inlineHandlers, cssFiles };
  console.log('\n--- ' + file + ' ---');
  console.log('Scripts:', scripts);
  console.log('CSS:', cssFiles);
  if (duplicateIds.length > 0) {
    console.log('  [DUPLICATE IDs]:', duplicateIds);
  }
  console.log('Inline handlers:', [...new Set(inlineHandlers)]);
});

console.log('\n=== Check CSS file existence ===');
Object.keys(htmlData).forEach(file => {
  htmlData[file].cssFiles.forEach(css => {
    if (!css.startsWith('http') && !fs.existsSync(css)) {
      console.log(`[BROKEN CSS LINK] in ${file}: ${css}`);
    }
  });
  htmlData[file].scripts.forEach(s => {
    if (!s.startsWith('http') && !fs.existsSync(s)) {
      console.log(`[BROKEN SCRIPT SRC] in ${file}: ${s}`);
    }
  });
});
