const fs = require('fs');
const path = require('path');
const vm = require('vm');

const repoDir = path.resolve(__dirname, '..');

console.log('=== COMPREHENSIVE REPO HEALTH & BUG AUDIT ===');

// 1. Check all HTML files for inline script syntax errors & missing functions
const htmlFiles = fs.readdirSync(repoDir).filter(f => f.endsWith('.html'));

const issues = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(repoDir, file), 'utf-8');
  
  // Extract all inline script blocks
  const scriptBlocks = [];
  const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    scriptBlocks.push(match[1]);
  }

  // Check syntax of inline scripts
  scriptBlocks.forEach((code, idx) => {
    try {
      new vm.Script(code, { filename: `${file}#inline-${idx+1}` });
    } catch (e) {
      issues.push({ type: 'SyntaxError in HTML Script', file, detail: e.message });
    }
  });
});

console.log('HTML inline script syntax checks complete.');

// 2. Load and verify all JS files with mock browser environment
const jsFiles = [
  'smartlearn_data.js',
  'course_lectures_data.js',
  'skills_w3_data.js',
  'supabase_client.js',
  'insforge_client.js',
  'api_service.js',
  'ai_engine.js',
  'smartlearn.js',
  'smartlearn_3d.js',
  'app.js'
];

const mockStorage = {};
const mockLocalStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

// Create mock DOM environment
function createMockWindow() {
  const elements = {};
  
  function createElement(tag) {
    const el = {
      tagName: tag.toUpperCase(),
      id: '',
      className: '',
      classList: {
        _classes: new Set(),
        add(...c) { c.forEach(x => this._classes.add(x)); },
        remove(...c) { c.forEach(x => this._classes.delete(x)); },
        contains(c) { return this._classes.has(c); },
        toggle(c) { if (this.contains(c)) this.remove(c); else this.add(c); }
      },
      style: {},
      children: [],
      childNodes: [],
      appendChild(child) {
        this.children.push(child);
        this.childNodes.push(child);
        child.parentNode = this;
        return child;
      },
      removeChild(child) {
        const idx = this.children.indexOf(child);
        if (idx !== -1) this.children.splice(idx, 1);
        const nIdx = this.childNodes.indexOf(child);
        if (nIdx !== -1) this.childNodes.splice(nIdx, 1);
        child.parentNode = null;
        return child;
      },
      remove() {
        if (this.parentNode) this.parentNode.removeChild(this);
      },
      querySelector: (sel) => null,
      querySelectorAll: (sel) => [],
      addEventListener: (evt, cb) => {},
      removeEventListener: (evt, cb) => {},
      setAttribute: (k, v) => { el[k] = v; },
      getAttribute: (k) => el[k] || null,
      removeAttribute: (k) => { delete el[k]; },
      innerHTML: '',
      textContent: '',
      value: '',
      focus: () => {},
      scrollIntoView: () => {}
    };
    return el;
  }

  const doc = {
    createElement,
    getElementById: (id) => {
      if (!elements[id]) {
        const el = createElement('div');
        el.id = id;
        elements[id] = el;
      }
      return elements[id];
    },
    querySelector: (sel) => createElement('div'),
    querySelectorAll: (sel) => [createElement('div')],
    body: createElement('body'),
    documentElement: createElement('html'),
    addEventListener: (evt, cb) => {},
    removeEventListener: (evt, cb) => {},
    head: createElement('head'),
    location: {
      href: 'http://localhost:3000/index.html',
      pathname: '/index.html',
      search: '',
      hash: '',
      reload: () => {}
    }
  };

  const win = {
    window: null,
    document: doc,
    localStorage: mockLocalStorage,
    sessionStorage: mockLocalStorage,
    location: doc.location,
    navigator: { userAgent: 'NodeMockBrowser', clipboard: { writeText: async () => {} } },
    console: console,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval,
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
    fetch: async () => ({ ok: true, json: async () => ({}), text: async () => '' }),
    CustomEvent: function(name, opts) { this.name = name; this.detail = opts ? opts.detail : null; },
    Event: function(name) { this.name = name; },
    addEventListener: (evt, cb) => {},
    removeEventListener: (evt, cb) => {},
    alert: (msg) => console.log('Mock Alert:', msg),
    confirm: (msg) => true,
    prompt: (msg) => '',
    innerWidth: 1200,
    innerHeight: 800
  };
  win.window = win;
  return win;
}

const sandbox = createMockWindow();
const vmContext = vm.createContext(sandbox);

jsFiles.forEach(file => {
  const filePath = path.join(repoDir, file);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf-8');
    try {
      vm.runInContext(code, vmContext, { filename: file });
      console.log(`Successfully executed ${file} in sandbox.`);
    } catch (err) {
      issues.push({ type: 'JS Execution Error', file, detail: err.stack });
    }
  }
});

// 3. Audit all methods in SmartLearnApp
console.log('\n--- VERIFYING SmartLearnApp METHODS ---');
if (sandbox.SmartLearnApp) {
  const expectedMethods = [
    'init', 'switchView', 'filterCourses', 'filterCoursesByKeyword', 'showTeacherTab',
    'openAIChatbot', 'openAIChatAssistant', 'previewMaterial', 'downloadMaterial',
    'openCourseDetail', 'enrollInCourse', 'signOut', 'updateUserUI',
    'renderAllViews', 'renderLandingStats', 'renderLandingFeatures', 'renderCourses',
    'renderSubjects', 'renderMaterials', 'renderVideos', 'renderQuizzes',
    'renderWeakTopics', 'renderRecommendations', 'renderTeacherCourses',
    'renderTeacherStudents', 'renderNotifications', 'renderProgressDashboard',
    'renderSkillsW3TechSwitcher', 'renderSkillsW3Nav', 'renderSkillsW3Reader',
    'openCreateCourseModal', 'handleCreateCourseSubmit', 'launchLessonVideo',
    'openNotesViewer', 'openFlashcardDeck', 'startQuiz'
  ];

  expectedMethods.forEach(m => {
    if (typeof sandbox.SmartLearnApp[m] !== 'function') {
      issues.push({ type: 'Missing SmartLearnApp Method', method: m, detail: `SmartLearnApp.${m} is ${typeof sandbox.SmartLearnApp[m]}` });
    }
  });
} else {
  issues.push({ type: 'SmartLearnApp Missing', detail: 'window.SmartLearnApp was not created' });
}

// 4. Audit all methods in SmartLearn3D
console.log('\n--- VERIFYING SmartLearn3D METHODS ---');
if (sandbox.SmartLearn3D) {
  const expected3DMethods = [
    'init', 'initTiltSystem', 'openStudentOnboarding', 'handleOnboardingSubmit',
    'toggleMobileNav', 'closeMobileNav'
  ];

  expected3DMethods.forEach(m => {
    if (typeof sandbox.SmartLearn3D[m] !== 'function') {
      issues.push({ type: 'Missing SmartLearn3D Method', method: m, detail: `SmartLearn3D.${m} is ${typeof sandbox.SmartLearn3D[m]}` });
    }
  });
} else {
  issues.push({ type: 'SmartLearn3D Missing', detail: 'window.SmartLearn3D was not created' });
}

// 5. Test calling SmartLearnApp and window global functions in sandbox
console.log('\n--- TESTING EXECUTION OF CORE APP FUNCTIONS ---');
const testCalls = [
  () => sandbox.SmartLearnApp?.init(),
  () => sandbox.SmartLearnApp?.renderAllViews?.(),
  () => sandbox.SmartLearnApp?.renderCourses?.(),
  () => sandbox.SmartLearnApp?.renderSubjects?.(),
  () => sandbox.SmartLearnApp?.renderMaterials?.(),
  () => sandbox.SmartLearnApp?.renderVideos?.(),
  () => sandbox.SmartLearnApp?.renderQuizzes?.(),
  () => sandbox.SmartLearnApp?.renderLandingStats?.(),
  () => sandbox.SmartLearnApp?.renderLandingFeatures?.(),
  () => sandbox.SmartLearnApp?.renderNotifications?.(),
  () => sandbox.SmartLearnApp?.renderTeacherCourses?.(),
  () => sandbox.SmartLearnApp?.renderTeacherStudents?.(),
  () => sandbox.SmartLearnApp?.renderProgressDashboard?.(),
  () => sandbox.SmartLearnApp?.renderSkillsW3TechSwitcher?.(),
  () => sandbox.SmartLearn3D?.init?.(),
  () => sandbox.showToast?.('Test', 'Message', 'info'),
  () => sandbox.openModal?.('test-modal'),
  () => sandbox.closeModal?.('test-modal'),
  () => sandbox.closeAllModals?.()
];

testCalls.forEach((fn, i) => {
  try {
    fn();
  } catch (err) {
    issues.push({ type: `Test Call #${i+1} Failed`, detail: err.stack });
  }
});

console.log('\n================ AUDIT SUMMARY ================');
console.log(`Found ${issues.length} issues:`);
issues.forEach((iss, i) => {
  console.log(`[${i+1}] ${iss.type}: ${iss.method || iss.file || ''}`);
  console.log(`    ${iss.detail}`);
});

