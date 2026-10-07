const fs = require('fs');
let jsdomAvailable = false;

// Let's create a realistic DOM from HTML string
function parseHTMLAndBuildDOM(htmlString) {
  const elementsById = {};
  const allElements = [];

  // Match elements and ids
  const tagRegex = /<([a-zA-Z0-9\-]+)([^>]*)>/g;
  let match;
  while ((match = tagRegex.exec(htmlString)) !== null) {
    const tagName = match[1].toUpperCase();
    const attrs = match[2];
    const idMatch = attrs.match(/\bid=["']([^"']+)["']/i);
    const classMatch = attrs.match(/\bclass=["']([^"']+)["']/i);
    
    const classes = new Set(classMatch ? classMatch[1].split(/\s+/).filter(Boolean) : []);
    
    const el = {
      tagName,
      id: idMatch ? idMatch[1] : '',
      className: classMatch ? classMatch[1] : '',
      classList: {
        _classes: classes,
        add(...cls) { cls.forEach(c => this._classes.add(c)); },
        remove(...cls) { cls.forEach(c => this._classes.delete(c)); },
        toggle(c) { if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c); },
        contains(c) { return this._classes.has(c); }
      },
      style: {},
      dataset: {},
      innerHTML: '',
      innerText: '',
      textContent: '',
      value: '',
      children: [],
      childNodes: [],
      parentNode: null,
      setAttribute(k, v) { this[k] = v; },
      getAttribute(k) { return this[k] || null; },
      removeAttribute(k) { delete this[k]; },
      appendChild(child) {
        if (child) {
          child.parentNode = this;
          this.children.push(child);
          this.childNodes.push(child);
        }
        return child;
      },
      removeChild(child) {
        this.children = this.children.filter(c => c !== child);
        this.childNodes = this.childNodes.filter(c => c !== child);
        if (child) child.parentNode = null;
        return child;
      },
      remove() {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      },
      addEventListener(evt, fn) {
        if (!this._listeners) this._listeners = {};
        if (!this._listeners[evt]) this._listeners[evt] = [];
        this._listeners[evt].push(fn);
      },
      removeEventListener(evt, fn) {
        if (!this._listeners || !this._listeners[evt]) return;
        this._listeners[evt] = this._listeners[evt].filter(f => f !== fn);
      },
      dispatchEvent(evt) {
        if (this._listeners && this._listeners[evt]) {
          this._listeners[evt].forEach(fn => fn({ target: this, type: evt }));
        }
      },
      focus() {},
      blur() {},
      click() {
        if (this.onclick) this.onclick();
        this.dispatchEvent('click');
      },
      scrollIntoView() {}
    };

    if (el.id) {
      elementsById[el.id] = el;
    }
    allElements.push(el);
  }

  const listeners = {};
  const mockDoc = {
    readyState: 'complete',
    body: elementsById['body'] || {
      tagName: 'BODY',
      style: {},
      classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
      appendChild(c) { return c; }
    },
    documentElement: {
      tagName: 'HTML',
      style: {},
      classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } }
    },
    getElementById: (id) => elementsById[id] || null,
    querySelector: (sel) => {
      if (sel.startsWith('#')) return elementsById[sel.slice(1)] || null;
      if (sel.startsWith('.')) {
        const cls = sel.slice(1);
        return allElements.find(e => e.classList.contains(cls)) || null;
      }
      return allElements.find(e => e.tagName === sel.toUpperCase()) || null;
    },
    querySelectorAll: (sel) => {
      if (sel.startsWith('#')) {
        const el = elementsById[sel.slice(1)];
        return el ? [el] : [];
      }
      if (sel.startsWith('.')) {
        const cls = sel.slice(1);
        return allElements.filter(e => e.classList.contains(cls));
      }
      return allElements.filter(e => e.tagName === sel.toUpperCase());
    },
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
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
      textContent: '',
      dataset: {},
      children: [],
      childNodes: [],
      parentNode: null,
      setAttribute() {},
      getAttribute() { return null; },
      removeAttribute() {},
      appendChild(c) { return c; },
      removeChild(c) { return c; },
      remove() {},
      addEventListener() {}
    }),
    addEventListener: (evt, fn) => {
      if (!listeners[evt]) listeners[evt] = [];
      listeners[evt].push(fn);
    },
    removeEventListener: (evt, fn) => {
      if (!listeners[evt]) return;
      listeners[evt] = listeners[evt].filter(f => f !== fn);
    },
    _trigger: (evt, payload) => {
      if (listeners[evt]) {
        listeners[evt].forEach(fn => fn(payload));
      }
    }
  };

  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  class MockURLSearchParams {
    constructor(init) { this.params = new Map(); }
    get(k) { return null; }
    set(k, v) { this.params.set(k, v); }
    has(k) { return false; }
  }

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
    addEventListener: (evt, fn) => {
      if (!winListeners[evt]) winListeners[evt] = [];
      winListeners[evt].push(fn);
    },
    removeEventListener: (evt, fn) => {
      if (!winListeners[evt]) return;
      winListeners[evt] = winListeners[evt].filter(f => f !== fn);
    },
    _trigger: (evt, payload) => {
      if (winListeners[evt]) {
        winListeners[evt].forEach(fn => fn(payload));
      }
    },
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
    katex: { renderToString: (str) => str },
    scrollTo: () => {},
    IntersectionObserver: MockIntersectionObserver,
    URLSearchParams: MockURLSearchParams,
    tailwind: { config: {} }
  };

  mockWindow.window = mockWindow;
  mockDoc.defaultView = mockWindow;

  return { mockWindow, mockDoc, MockIntersectionObserver, MockURLSearchParams };
}

const vm = require('vm');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('=== Simulating Page Load & DOMContentLoaded for All HTML Files ===');

htmlFiles.forEach(file => {
  const htmlContent = fs.readFileSync(file, 'utf8');
  const { mockWindow, mockDoc } = parseHTMLAndBuildDOM(htmlContent);

  const contextObj = {
    window: mockWindow,
    document: mockDoc,
    localStorage: mockWindow.localStorage,
    sessionStorage: mockWindow.sessionStorage,
    location: mockWindow.location,
    navigator: mockWindow.navigator,
    console: console,
    IntersectionObserver: MockIntersectionObserver,
    URLSearchParams: MockURLSearchParams,
    tailwind: mockWindow.tailwind,
    setTimeout: (fn, ms) => setTimeout(() => {
      try { fn(); } catch (e) { console.error(`[ASYNC TIMEOUT ERROR in ${file}]:`, e.message); }
    }, ms),
    clearTimeout: clearTimeout,
    setInterval: (fn, ms) => setInterval(() => {
      try { fn(); } catch (e) { console.error(`[ASYNC INTERVAL ERROR in ${file}]:`, e.message); }
    }, ms),
    clearInterval: clearInterval,
    fetch: () => Promise.resolve({ ok: true, json: async () => ({}) })
  };

  const context = vm.createContext(contextObj);

  // Extract all script tags in order (both src and inline)
  const scriptTagRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  console.log(`\n---------------------------------------------\n>>> RUNNING PAGE: ${file}`);
  while ((match = scriptTagRegex.exec(htmlContent)) !== null) {
    const attrs = match[1];
    const body = match[2].trim();
    const srcMatch = attrs.match(/\bsrc=["']([^"']+)["']/i);
    
    if (srcMatch) {
      const src = srcMatch[1];
      if (!src.startsWith('http') && fs.existsSync(src)) {
        try {
          const code = fs.readFileSync(src, 'utf8');
          vm.runInContext(code, context);
          // console.log(`  Loaded ${src}`);
        } catch (e) {
          console.error(`  [ERROR running ${src} in ${file}]:`, e.message);
        }
      }
    } else if (body) {
      try {
        vm.runInContext(body, context);
        // console.log(`  Executed inline script (${body.length} bytes)`);
      } catch (e) {
        console.error(`  [ERROR running inline script in ${file}]:`, e.message);
      }
    }
  }

  // Trigger DOMContentLoaded on window and document
  try {
    mockDoc._trigger('DOMContentLoaded');
    mockWindow._trigger('DOMContentLoaded');
    console.log(`  [OK] DOMContentLoaded event completed cleanly on ${file}`);
  } catch (e) {
    console.error(`  [ERROR on DOMContentLoaded in ${file}]:`, e.message);
  }
});
