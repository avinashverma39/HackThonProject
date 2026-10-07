const fs = require('fs');

// Extract all SmartLearnApp.* calls in HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const appMethods = new Set();
const apiMethods = new Set();
const tdMethods = new Set();
const supabaseMethods = new Set();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  const re1 = /SmartLearnApp\.([a-zA-Z0-9_]+)/g;
  while ((m = re1.exec(content)) !== null) {
    appMethods.add(m[1]);
  }
  const re2 = /SmartLearnAPI\.([a-zA-Z0-9_]+)/g;
  while ((m = re2.exec(content)) !== null) {
    apiMethods.add(m[1]);
  }
  const re3 = /SmartLearn3D\.([a-zA-Z0-9_]+)/g;
  while ((m = re3.exec(content)) !== null) {
    tdMethods.add(m[1]);
  }
  const re4 = /SmartLearnSupabase\.([a-zA-Z0-9_]+)/g;
  while ((m = re4.exec(content)) !== null) {
    supabaseMethods.add(m[1]);
  }
});

console.log('App methods referenced in HTML:', [...appMethods]);
console.log('API methods referenced in HTML:', [...apiMethods]);
console.log('3D methods referenced in HTML:', [...tdMethods]);
console.log('Supabase methods referenced in HTML:', [...supabaseMethods]);

// Read smartlearn.js return object
const smartlearnCode = fs.readFileSync('smartlearn.js', 'utf8');
const returnMatch = smartlearnCode.match(/return\s*\{([\s\S]*?)\};\s*\}\)\(\);/);
if (returnMatch) {
  const returnBlock = returnMatch[1];
  const exported = returnBlock.split('\n')
    .map(line => line.trim().replace(/,$/, ''))
    .filter(line => line && !line.startsWith('//'))
    .map(line => {
      const parts = line.split(':');
      return parts[0].trim();
    });
  console.log('\nActual exported methods in SmartLearnApp:', exported);
  
  const missing = [...appMethods].filter(m => !exported.includes(m));
  console.log('\n[CRITICAL] MISSING methods in SmartLearnApp:', missing);
}

// Read api_service.js export
const apiCode = fs.readFileSync('api_service.js', 'utf8');
const apiReturnMatch = apiCode.match(/return\s*\{([\s\S]*?)\};\s*\}\)\(\);/);
if (apiReturnMatch) {
  const returnBlock = apiReturnMatch[1];
  const exported = returnBlock.split('\n')
    .map(line => line.trim().replace(/,$/, ''))
    .filter(line => line && !line.startsWith('//'))
    .map(line => {
      const parts = line.split(':');
      return parts[0].trim();
    });
  console.log('\nActual exported methods in SmartLearnAPI:', exported);
  const missing = [...apiMethods].filter(m => !exported.includes(m));
  console.log('\n[CRITICAL] MISSING methods in SmartLearnAPI:', missing);
}

// Read smartlearn_3d.js export
const tdCode = fs.readFileSync('smartlearn_3d.js', 'utf8');
const tdReturnMatch = tdCode.match(/return\s*\{([\s\S]*?)\};\s*\}\)\(\);/);
if (tdReturnMatch) {
  const returnBlock = tdReturnMatch[1];
  const exported = returnBlock.split('\n')
    .map(line => line.trim().replace(/,$/, ''))
    .filter(line => line && !line.startsWith('//'))
    .map(line => {
      const parts = line.split(':');
      return parts[0].trim();
    });
  console.log('\nActual exported methods in SmartLearn3D:', exported);
  const missing = [...tdMethods].filter(m => !exported.includes(m));
  console.log('\n[CRITICAL] MISSING methods in SmartLearn3D:', missing);
}
