const fs = require('fs');

['app.js', 'smartlearn.js', 'smartlearn_3d.js'].forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  const lines = code.split('\n');
  console.log(`\n=== Scanning ${file} for unsafe DOM access ===`);
  
  lines.forEach((line, idx) => {
    // Check for document.getElementById('...').addEventListener
    if (/document\.getElementById\([^)]+\)\.(addEventListener|innerHTML|style|classList|value|focus)/.test(line)) {
      console.log(`Line ${idx + 1}: Unsafe chained access -> ${line.trim()}`);
    }
    // Check for const x = document.getElementById; x.addEventListener without if (x)
    // (We will also test by running the functions)
  });
});
