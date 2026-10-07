const fs = require('fs');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');

const htmlFiles = fs.readdirSync(repoDir).filter(f => f.endsWith('.html'));
const jsFiles = fs.readdirSync(repoDir).filter(f => f.endsWith('.js') && !f.startsWith('audit') && !f.startsWith('test') && !f.startsWith('check') && !f.startsWith('find'));

console.log('HTML files:', htmlFiles);
console.log('JS files:', jsFiles);

// 1. Collect all HTML IDs, onclicks, script tags, hrefs
const htmlData = {};
htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(repoDir, file), 'utf-8');
  const ids = [];
  const idRegex = /id=["']([^"']+)["']/g;
  let m;
  while ((m = idRegex.exec(content)) !== null) {
    ids.push(m[1]);
  }

  const handlers = [];
  const handlerRegex = /on(?:click|change|submit|input|keydown|keyup)=["']([^"']+)["']/g;
  while ((m = handlerRegex.exec(content)) !== null) {
    handlers.push({ raw: m[1], type: m[0].split('=')[0] });
  }

  const scripts = [];
  const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/g;
  while ((m = scriptRegex.exec(content)) !== null) {
    scripts.push(m[1]);
  }

  const hrefs = [];
  const hrefRegex = /href=["']([^"']+)["']/g;
  while ((m = hrefRegex.exec(content)) !== null) {
    hrefs.push(m[1]);
  }

  htmlData[file] = { ids: new Set(ids), handlers, scripts, hrefs, content };
});

console.log('\n--- SCRIPT INCLUSION PER HTML ---');
for (const [file, data] of Object.entries(htmlData)) {
  console.log(`${file}: scripts -> ${JSON.stringify(data.scripts)}`);
}

// 2. Extract all SmartLearnApp and SmartLearn3D methods and global functions in JS files
const jsFunctions = new Set();
const smartLearnAppMethods = new Set();
const smartLearn3DMethods = new Set();
const windowMethods = new Set();

jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join(repoDir, file), 'utf-8');
  
  // function name(...)
  const fnRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
  let m;
  while ((m = fnRegex.exec(content)) !== null) {
    jsFunctions.add(m[1]);
  }

  // window.name = ...
  const winRegex = /window\.([a-zA-Z0-9_$]+)\s*=/g;
  while ((m = winRegex.exec(content)) !== null) {
    windowMethods.add(m[1]);
  }
});

// Parse SmartLearnApp return exports in smartlearn.js
const smartlearnJs = fs.readFileSync(path.join(repoDir, 'smartlearn.js'), 'utf-8');
const returnMatch = smartlearnJs.match(/return\s*\{([\s\S]*?)\}\s*;\s*\}\)\(\);/);
if (returnMatch) {
  const returnBlock = returnMatch[1];
  returnBlock.split(',').forEach(line => {
    const trimmed = line.trim();
    if (trimmed) {
      const parts = trimmed.split(':');
      smartLearnAppMethods.add(parts[0].trim());
    }
  });
}

// Parse SmartLearn3D return exports in smartlearn_3d.js
const smartlearn3dJs = fs.readFileSync(path.join(repoDir, 'smartlearn_3d.js'), 'utf-8');
const return3dMatch = smartlearn3dJs.match(/return\s*\{([\s\S]*?)\}\s*;\s*\}\)\(\);/);
if (return3dMatch) {
  const returnBlock = return3dMatch[1];
  returnBlock.split(',').forEach(line => {
    const trimmed = line.trim();
    if (trimmed) {
      const parts = trimmed.split(':');
      smartLearn3DMethods.add(parts[0].trim());
    }
  });
}

console.log('\nSmartLearnApp exported methods:', Array.from(smartLearnAppMethods));
console.log('\nSmartLearn3D exported methods:', Array.from(smartLearn3DMethods));
console.log('\nWindow attached methods:', Array.from(windowMethods));

// 3. Check inline event handlers in HTML against defined methods
console.log('\n--- AUDITING HTML EVENT HANDLERS ---');
const handlerErrors = [];
for (const [file, data] of Object.entries(htmlData)) {
  data.handlers.forEach(h => {
    const raw = h.raw.trim();
    
    // Check SmartLearnApp.xxx(
    const slaMatches = raw.match(/SmartLearnApp\.([a-zA-Z0-9_$]+)/g);
    if (slaMatches) {
      slaMatches.forEach(call => {
        const method = call.replace('SmartLearnApp.', '');
        if (!smartLearnAppMethods.has(method)) {
          handlerErrors.push({ file, handler: raw, missing: `SmartLearnApp.${method}` });
        }
      });
    }

    // Check SmartLearn3D.xxx(
    const sl3dMatches = raw.match(/SmartLearn3D\.([a-zA-Z0-9_$]+)/g);
    if (sl3dMatches) {
      sl3dMatches.forEach(call => {
        const method = call.replace('SmartLearn3D.', '');
        if (!smartLearn3DMethods.has(method)) {
          handlerErrors.push({ file, handler: raw, missing: `SmartLearn3D.${method}` });
        }
      });
    }

    // Check standalone function calls like openModal('xxx'), showToast('xxx')
    const standaloneMatches = raw.match(/^([a-zA-Z0-9_$]+)\s*\(/);
    if (standaloneMatches) {
      const fn = standaloneMatches[1];
      if (fn !== 'SmartLearnApp' && fn !== 'SmartLearn3D' && fn !== 'console' && fn !== 'alert' && fn !== 'event' && fn !== 'confirm') {
        if (!windowMethods.has(fn) && !jsFunctions.has(fn)) {
          handlerErrors.push({ file, handler: raw, missing: `Global function ${fn}` });
        }
      }
    }
  });
}

if (handlerErrors.length > 0) {
  console.log('FOUND HANDLER ERRORS:', handlerErrors);
} else {
  console.log('No handler errors found!');
}

// 4. Check unsafe DOM access in JS (e.g. document.getElementById('x').value without checking or null check)
console.log('\n--- AUDITING UNSAFE DOM GETS IN JS FILES ---');
const unsafeGets = [];
jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join(repoDir, file), 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Look for document.getElementById("...").something
    const getElUnsafe = line.match(/document\.getElementById\((['"`][^'"`]+['"`])\)\.([a-zA-Z0-9_$]+)/g);
    if (getElUnsafe) {
      getElUnsafe.forEach(match => {
        unsafeGets.push({ file, lineNum: idx + 1, code: line.trim(), match });
      });
    }
    const queryUnsafe = line.match(/document\.querySelector\((['"`][^'"`]+['"`])\)\.([a-zA-Z0-9_$]+)/g);
    if (queryUnsafe) {
      queryUnsafe.forEach(match => {
        unsafeGets.push({ file, lineNum: idx + 1, code: line.trim(), match });
      });
    }
  });
});

console.log(`Found ${unsafeGets.length} potentially unsafe DOM accesses without optional chaining or null check:`);
unsafeGets.slice(0, 30).forEach(u => console.log(`  ${u.file}:${u.lineNum} -> ${u.match}`));
if (unsafeGets.length > 30) console.log(`  ... and ${unsafeGets.length - 30} more`);

// 5. Check links (href) in HTML
console.log('\n--- AUDITING HREFS ---');
const brokenLinks = [];
for (const [file, data] of Object.entries(htmlData)) {
  data.hrefs.forEach(href => {
    if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('javascript:') || href.startsWith('mailto:')) {
      return;
    }
    const cleanHref = href.split('?')[0].split('#')[0];
    if (cleanHref && !fs.existsSync(path.join(repoDir, cleanHref))) {
      brokenLinks.push({ file, href, cleanHref });
    }
  });
}
console.log('Broken href links:', brokenLinks);
