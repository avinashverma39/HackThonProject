const fs = require('fs');

fs.readdirSync('.').filter(f => f.endsWith('.html')).forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const match = line.match(/on[a-z]+\s*=\s*["']([^"']+)["']/i);
    if (match) {
      const code = match[1];
      if (code.includes('if') || code.includes('Copilot') || code.includes('clearCopilot') || code.includes('openAIChatAssistant')) {
        console.log(`${file}:${idx+1} [${match[0].slice(0, 30)}...]: ${code}`);
      }
    }
  });
});
