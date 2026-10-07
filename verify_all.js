const fs = require('fs');
const vm = require('vm');

function createBrowserEnv(htmlContent = '') {
  const elements = {};
  
  // Extract all IDs from HTML
  const idRegex = /\bid=["']([^"']+)["']/gi;
  let match;
  while ((match = idRegex.exec(htmlContent)) !== null) {
    elements[match[1]] = {
      id: match[1],
      style: {},
      classList: {
        _classes: new Set(),
        add(...cls) { cls.forEach(c => this._classes.add(c)); },
        remove(...cls) { cls.forEach(c => this._classes.delete(c)); },
        toggle(c) { if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c); },
        contains(c) { return this._classes.has(c); }
      },
      innerHTML: '',
      innerText: '',
      value: '',
      dataset: {},
      setAttribute() {},
      getAttribute() { return null; },
      removeAttribute() {},
      appendChild() {},
      removeChild() {},
      addEventListener() {},
      removeEventListener() {},
      focus() {},
      blur() {},
      click() {},
      scrollIntoView() {}
    };
  }

  const mockDoc = {
    readyState: 'complete',
    addEventListener: () => {},
    removeEventListener: () => {},
    getElementById: (id) => elements[id] || null,
    querySelector: (sel) => {
      if (sel.startsWith('#')) {
        const id = sel.slice(1);
        return elements[id] || null;
      }
      return {
        style: {},
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
        innerHTML: '',
        innerText: '',
        setAttribute() {},
        getAttribute() { return null; },
        appendChild() {},
        addEventListener() {},
        querySelectorAll: () => []
      };
    },
    querySelectorAll: () => [],
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      style: {},
      classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
      innerHTML: '',
      innerText: '',
      setAttribute() {},
      getAttribute() { return null; },
      appendChild() {},
      addEventListener() {},
      dataset: {}
    }),
    body: {
      style: {},
      classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
      appendChild() {}
    },
    documentElement: {
      style: {},
      classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } }
    }
  };

  const mockWindow = {
    location: { href: 'http://localhost:3000/', pathname: '/', search: '', hash: '' },
    localStorage: {
      store: {},
      getItem(k) { return this.store[k] || null; },
      setItem(k, v) { this.store[k] = String(v); },
      removeItem(k) { delete this.store[k]; },
      clear() { this.store = {}; }
    },
    sessionStorage: {
      store: {},
      getItem(k) { return this.store[k] || null; },
      setItem(k, v) { this.store[k] = String(v); },
      removeItem(k) { delete this.store[k]; },
      clear() { this.store = {}; }
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    document: mockDoc,
    navigator: { userAgent: 'node', clipboard: { writeText: async () => {} } },
    supabase: {
      createClient: () => ({
        auth: {
          getSession: async () => ({ data: { session: null } }),
          getUser: async () => ({ data: { user: null } }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          signInWithPassword: async () => ({ data: {}, error: null }),
          signUp: async () => ({ data: {}, error: null }),
          signOut: async () => ({ error: null })
        },
        from: () => ({
          select: () => ({ data: [], error: null, order: () => ({ data: [] }) }),
          insert: () => ({ data: [], error: null }),
          update: () => ({ data: [], error: null }),
          delete: () => ({ data: [], error: null })
        })
      })
    },
    renderMathInElement: () => {},
    katex: { renderToString: (str) => str }
  };

  mockWindow.window = mockWindow;
  mockDoc.defaultView = mockWindow;

  return {
    window: mockWindow,
    document: mockDoc,
    localStorage: mockWindow.localStorage,
    sessionStorage: mockWindow.sessionStorage,
    location: mockWindow.location,
    navigator: mockWindow.navigator,
    console: console,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval,
    fetch: () => Promise.resolve({ ok: true, json: async () => ({}) })
  };
}

// 1. Run each HTML file against its scripts and check for errors
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log('=== Verifying All HTML Files with their Scripts ===');

htmlFiles.forEach(htmlFile => {
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  const env = createBrowserEnv(htmlContent);
  const context = vm.createContext(env);

  // Extract script src attributes
  const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let match;
  const localScripts = [];
  while ((match = scriptRegex.exec(htmlContent)) !== null) {
    const src = match[1];
    if (!src.startsWith('http')) {
      localScripts.push(src);
    }
  }

  console.log(`\nTesting page: ${htmlFile}`);
  localScripts.forEach(script => {
    try {
      const code = fs.readFileSync(script, 'utf8');
      vm.runInContext(code, context);
      console.log(`  [OK] loaded ${script}`);
    } catch (err) {
      console.error(`  [ERROR loading ${script} in ${htmlFile}]:`, err.message);
    }
  });

  // Check inline event handlers
  const inlineRegex = /on[a-z]+\s*=\s*["']([^"']+)["']/gi;
  let m;
  const checked = new Set();
  while ((m = inlineRegex.exec(htmlContent)) !== null) {
    const expr = m[1].trim();
    if (checked.has(expr)) continue;
    checked.add(expr);

    // Skip simple statements like 'window.scrollTo(0,0)' or 'document.getElementById(...)'
    const callMatch = expr.match(/^([a-zA-Z0-9_$.]+)\s*\(/);
    if (callMatch) {
      const callPath = callMatch[1];
      try {
        const res = vm.runInContext(`typeof ${callPath}`, context);
        if (res !== 'function') {
          console.warn(`  [MISSING FUNCTION in ${htmlFile}]: ${callPath} is ${res} (Expression: "${expr.slice(0, 50)}")`);
        }
      } catch (err) {
        console.warn(`  [UNRESOLVED HANDLER in ${htmlFile}]: ${callPath} failed eval: ${err.message}`);
      }
    }
  }
});
