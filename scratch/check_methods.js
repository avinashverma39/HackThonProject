const fs = require('fs');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');
const smartlearnCode = fs.readFileSync(path.join(repoDir, 'smartlearn.js'), 'utf-8');

// Find all function declarations in smartlearn.js
const fnMatches = smartlearnCode.matchAll(/(?:async\s+)?function\s+([a-zA-Z0-9_$]+)\s*\(/g);
const functions = new Set();
for (const match of fnMatches) {
  functions.add(match[1]);
}

console.log('All functions in smartlearn.js (count:', functions.size, '):');
console.log(Array.from(functions).sort());

// Find all SmartLearnApp.xxx calls across all html and js files
const htmlFiles = fs.readdirSync(repoDir).filter(f => f.endsWith('.html') || f.endsWith('.js'));
const calledMethods = new Set();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(repoDir, file), 'utf-8');
  const matches = content.matchAll(/SmartLearnApp\.([a-zA-Z0-9_$]+)/g);
  for (const match of matches) {
    calledMethods.add(match[1]);
  }
});

console.log('\nAll SmartLearnApp methods called across the repo:');
console.log(Array.from(calledMethods).sort());

// Check which called methods are missing from smartlearn.js functions or return block
console.log('\nCalled methods that are NOT directly a declared function in smartlearn.js:');
for (const method of calledMethods) {
  if (!functions.has(method)) {
    console.log(' -', method);
  }
}
