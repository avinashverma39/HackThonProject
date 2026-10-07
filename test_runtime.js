const fs = require('fs');

// Load JS files into a mock environment and check what globals they export
const jsFiles = [
  'course_lectures_data.js',
  'smartlearn_data.js',
  'supabase_client.js',
  'insforge_client.js',
  'api_service.js',
  'ai_engine.js',
  'skills_w3_data.js',
  'app.js',
  'smartlearn.js',
  'smartlearn_3d.js'
];

console.log('Testing JS files for runtime initialization issues...');

// Mock window and document
const mockWindow = {
  location: { href: 'http://localhost:3000/index.html', pathname: '/index.html', search: '', hash: '' },
  localStorage: {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); },
    removeItem(k) { delete this.store[k]; },
    clear() { this.store = {}; }
  },
  addEventListener: () => {},
  removeEventListener: () => {},
  matchMedia: () => ({ matches: false, addEventListener: () => {} }),
  supabase: { createClient: () => ({ auth: { getSession: async () => ({ data: {} }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) } }) },
  document: {
    addEventListener: () => {},
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ style: {}, setAttribute: () => {}, appendChild: () => {}, classList: { add: () => {}, remove: () => {} } }),
    body: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } }
  }
};
mockWindow.window = mockWindow;
mockWindow.document.defaultView = mockWindow;

const context = {
  window: mockWindow,
  document: mockWindow.document,
  localStorage: mockWindow.localStorage,
  location: mockWindow.location,
  navigator: { userAgent: 'node', clipboard: { writeText: async () => {} } },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  fetch: () => Promise.resolve({ ok: true, json: async () => ({}) })
};

const vm = require('vm');
vm.createContext(context);

jsFiles.forEach(file => {
  try {
    const code = fs.readFileSync(file, 'utf8');
    vm.runInContext(code, context);
    console.log(`[SUCCESS] Evaluated ${file}`);
  } catch (err) {
    console.error(`[RUNTIME ERROR] in ${file}:`, err);
  }
});

console.log('\n--- Exported Global Objects & Methods ---');
['SmartLearnApp', 'SmartLearn3D', 'SmartLearnAPI', 'SmartLearnSupabase', 'SmartLearnInsforge', 'SmartLearnData', 'courseLecturesData', 'W3_SKILLS_DATA', 'AIEngine'].forEach(objName => {
  if (context.window[objName] || context[objName]) {
    const obj = context.window[objName] || context[objName];
    console.log(`Global: ${objName} is present (${typeof obj})`);
    if (typeof obj === 'object') {
      console.log(`  Keys (${Object.keys(obj).length}):`, Object.keys(obj).slice(0, 15).join(', '));
    }
  } else {
    console.log(`Global: ${objName} is MISSING!`);
  }
});

// Check if all inline handlers in HTML exist on their target objects
console.log('\n--- Verifying Inline Event Handlers from HTML ---');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
htmlFiles.forEach(htmlFile => {
  const content = fs.readFileSync(htmlFile, 'utf8');
  // Match patterns like onclick="SmartLearnApp.methodName(...)" or onclick="funcName(...)"
  const handlerRegex = /on[a-z]+\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = handlerRegex.exec(content)) !== null) {
    const expr = match[1].trim();
    // simple extraction of function/method call
    const callMatch = expr.match(/^([a-zA-Z0-9_$.]+)\s*\(/);
    if (callMatch) {
      const callPath = callMatch[1];
      if (callPath.startsWith('SmartLearnApp.') || callPath.startsWith('SmartLearn3D.') || callPath.startsWith('SmartLearnAPI.') || callPath.startsWith('SmartLearnSupabase.')) {
        const parts = callPath.split('.');
        const targetObj = context.window[parts[0]] || context[parts[0]];
        const method = parts[1];
        if (!targetObj || typeof targetObj[method] !== 'function') {
          console.log(`[MISSING METHOD] In ${htmlFile}: ${callPath}() does not exist!`);
        }
      }
    }
  }
});
