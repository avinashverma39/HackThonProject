/**
 * SmartLearn — W3Schools-Style Technical Concepts & Notes Architecture
 * Project: SmartLearn | SIH 2026 | Theme: Smart Education
 *
 * Provides a structured, interactive documentation library across:
 * - HTML & Web Standards
 * - CSS & Responsive Architecture
 * - JavaScript & Modern ES6+
 * - Data Structures & Algorithms (C++/Java)
 * - Python & Backend Concepts
 * - SQL & Relational Databases
 */

window.SmartLearnSkillsDocs = {
  // Current active selections
  currentTech: 'html',
  currentConceptId: 'html-intro',
  completedConcepts: JSON.parse(localStorage.getItem('smartlearn_completed_concepts') || '[]'),

  technologies: [
    { id: 'html', name: 'HTML', icon: 'html', color: '#f97316', label: 'Web Markup' },
    { id: 'css', name: 'CSS', icon: 'css', color: '#38bdf8', label: 'Styling & Grid' },
    { id: 'javascript', name: 'JAVASCRIPT', icon: 'javascript', color: '#facc15', label: 'Core Engine & DOM' },
    { id: 'dsa', name: 'DSA & ALGO', icon: 'account_tree', color: '#10b981', label: 'Data Structures' },
    { id: 'python', name: 'PYTHON', icon: 'code', color: '#6366f1', label: 'Backend & OOP' },
    { id: 'sql', name: 'SQL & DB', icon: 'database', color: '#ec4899', label: 'Relational Queries' }
  ],

  // Concepts Library
  docs: {
    html: [
      {
        id: 'html-study-plan',
        category: 'STUDY PLAN & PREP',
        title: 'HTML 14-Day Study Plan',
        readTime: '4 min read',
        xp: 40,
        summary: 'A structured, progressive roadmap to master modern semantic HTML5 and accessibility.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Welcome to the <strong class="text-white font-semibold">HTML5 Mastery Study Plan</strong>. Modern web architecture requires semantic structure, fast loading times, and full WCAG accessibility compliance.</p>
            
            <h4 class="text-[17px] font-bold text-white mt-4 border-b border-white/10 pb-2">Phase 1: Foundations (Days 1–4)</h4>
            <ul class="list-disc list-inside space-y-1.5 ml-2">
              <li>Document boilerplate (<code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html lang="en"&gt;</code>, viewport meta)</li>
              <li>Text elements: Headings (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>), Paragraphs (<code>&lt;p&gt;</code>), and Text Semantics (<code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>)</li>
              <li>Hyperlinks (<code>&lt;a href="..." target="_blank" rel="noopener noreferrer"&gt;</code>)</li>
              <li>Visuals & Media: Responsive images (<code>&lt;img srcset="..." loading="lazy"&gt;</code>)</li>
            </ul>

            <h4 class="text-[17px] font-bold text-white mt-4 border-b border-white/10 pb-2">Phase 2: Semantic Layouts & Data (Days 5–8)</h4>
            <ul class="list-disc list-inside space-y-1.5 ml-2">
              <li>Semantic Landmarks: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code></li>
              <li>Data Tables: Accessible tables with <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;th scope="col"&gt;</code></li>
              <li>Organized Lists: <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, and Definition Lists (<code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>)</li>
            </ul>

            <h4 class="text-[17px] font-bold text-white mt-4 border-b border-white/10 pb-2">Phase 3: Interactive Forms & Advanced APIs (Days 9–14)</h4>
            <ul class="list-disc list-inside space-y-1.5 ml-2">
              <li>Modern Forms: Input types (<code>email</code>, <code>tel</code>, <code>date</code>, <code>number</code>), client validation, regex patterns</li>
              <li>Graphics & Multi-media: <code>&lt;canvas&gt;</code>, <code>&lt;svg&gt;</code>, native <code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code> with subtitles (<code>&lt;track&gt;</code>)</li>
              <li>Web Accessibility (ARIA attributes, keyboard focus states, screen reader auditing)</li>
            </ul>
          </div>
        `,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmartLearn Study Plan Demo</title>
</head>
<body>
  <header>
    <h1>SmartLearn HTML5 Study Plan</h1>
    <nav aria-label="Breadcrumb">
      <p>Home &gt; HTML &gt; Study Plan</p>
    </nav>
  </header>
  <main>
    <section>
      <h2>Today's Milestone</h2>
      <p>Mastering modern document semantics &amp; accessibility.</p>
    </section>
  </main>
</body>
</html>`,
        interviewTip: 'Interviewers often ask why <code>target="_blank"</code> requires <code>rel="noopener noreferrer"</code>. Answer: To prevent reverse tabnabbing security attacks where the newly opened window accesses <code>window.opener</code>.',
        miniQuiz: {
          q: 'Which HTML5 element represents the primary, unique content of the document body?',
          options: ['<section>', '<article>', '<main>', '<content>'],
          answer: 2,
          explanation: '<main> must contain content that is unique to the document and should not include repeated elements like sidebars, navigation links, or copyright footers.'
        }
      },
      {
        id: 'html-interview-prep',
        category: 'STUDY PLAN & PREP',
        title: 'HTML Technical Interview Prep',
        readTime: '6 min read',
        xp: 60,
        summary: 'Top 15 frequently asked HTML5 architectural and conceptual interview questions with exact answers.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Master these high-yield interview questions asked by top tech firms (Google, Amazon, Microsoft, Infosys, TCS).</p>

            <div class="p-4 rounded-xl bg-surface-container border border-white/5 space-y-2">
              <h4 class="text-white font-bold text-[15px]">Q1: What does the <code>&lt;!DOCTYPE html&gt;</code> declaration do?</h4>
              <p class="text-slate-300">It is an instruction to the web browser about what version of HTML the page is written in. In HTML5, it triggers <strong>Standard Mode</strong> in modern rendering engines, preventing the browser from falling back into legacy <em>Quirks Mode</em>.</p>
            </div>

            <div class="p-4 rounded-xl bg-surface-container border border-white/5 space-y-2">
              <h4 class="text-white font-bold text-[15px]">Q2: Explain the difference between <code>script async</code> and <code>script defer</code>.</h4>
              <p class="text-slate-300">Both download the JavaScript file asynchronously in parallel with HTML parsing. However:</p>
              <ul class="list-disc list-inside space-y-1 ml-2 text-slate-300">
                <li><code class="text-amber-400">async</code>: Executes immediately the moment the script finishes downloading, pausing HTML parsing if parsing is still underway. Execution order is unpredictable.</li>
                <li><code class="text-emerald-400">defer</code>: Waits until the HTML parser has completely finished, then executes scripts in the exact order they appeared in the DOM, right before <code>DOMContentLoaded</code>.</li>
              </ul>
            </div>

            <div class="p-4 rounded-xl bg-surface-container border border-white/5 space-y-2">
              <h4 class="text-white font-bold text-[15px]">Q3: What are Custom Data Attributes (<code>data-*</code>)?</h4>
              <p class="text-slate-300">They allow storing private, custom data directly on standard HTML elements without polluting standard attributes. In JavaScript, they are accessed cleanly via the <code>element.dataset</code> property.</p>
            </div>
          </div>
        `,
        codeExample: `<!-- Demonstrating async vs defer loading -->
<!-- async: Best for independent analytics / ads -->
<script async src="https://example.com/analytics.js"></script>

<!-- defer: Best for scripts that depend on DOM or order -->
<script defer src="main-app.js"></script>

<!-- Custom data-* attribute usage -->
<button id="cart-btn" data-product-id="482" data-category="electronics">
  Add to Cart
</button>

<script>
  const btn = document.getElementById('cart-btn');
  console.log(btn.dataset.productId); // Outputs: "482"
</script>`,
        interviewTip: 'Always choose <code>defer</code> for scripts that manipulate the DOM or depend on other scripts, as it guarantees preservation of execution order.',
        miniQuiz: {
          q: 'Which script attribute guarantees execution order while still loading in parallel with parsing?',
          options: ['async', 'defer', 'preload', 'module'],
          answer: 1,
          explanation: 'The defer attribute loads scripts asynchronously in parallel without blocking HTML parsing, and executes them in sequence after DOM parsing completes.'
        }
      },
      {
        id: 'html-tag-list',
        category: 'HTML REFERENCES',
        title: 'HTML Tag Reference Directory',
        readTime: '5 min read',
        xp: 50,
        summary: 'Alphabetical and categorical reference of core HTML5 tags with browser compliance.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Comprehensive technical directory of essential HTML5 tags categorized by architectural intent.</p>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse border border-white/10 text-[13px]">
                <thead>
                  <tr class="bg-surface-container-high text-white">
                    <th class="p-2.5 border border-white/10 font-mono">Tag</th>
                    <th class="p-2.5 border border-white/10">Type</th>
                    <th class="p-2.5 border border-white/10">Semantic Purpose</th>
                    <th class="p-2.5 border border-white/10 font-mono">Spec</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr class="hover:bg-surface-container/50">
                    <td class="p-2.5 border border-white/10 font-mono text-primary font-bold">&lt;article&gt;</td>
                    <td class="p-2.5 border border-white/10">Block</td>
                    <td class="p-2.5 border border-white/10">Self-contained, independently distributable composition</td>
                    <td class="p-2.5 border border-white/10 font-mono text-emerald-400">HTML5</td>
                  </tr>
                  <tr class="hover:bg-surface-container/50">
                    <td class="p-2.5 border border-white/10 font-mono text-primary font-bold">&lt;aside&gt;</td>
                    <td class="p-2.5 border border-white/10">Block</td>
                    <td class="p-2.5 border border-white/10">Tangentially related sidebar, glossary, or callout</td>
                    <td class="p-2.5 border border-white/10 font-mono text-emerald-400">HTML5</td>
                  </tr>
                  <tr class="hover:bg-surface-container/50">
                    <td class="p-2.5 border border-white/10 font-mono text-primary font-bold">&lt;figure&gt;</td>
                    <td class="p-2.5 border border-white/10">Block</td>
                    <td class="p-2.5 border border-white/10">Encapsulates diagrams, photos, or code with &lt;figcaption&gt;</td>
                    <td class="p-2.5 border border-white/10 font-mono text-emerald-400">HTML5</td>
                  </tr>
                  <tr class="hover:bg-surface-container/50">
                    <td class="p-2.5 border border-white/10 font-mono text-primary font-bold">&lt;picture&gt;</td>
                    <td class="p-2.5 border border-white/10">Inline</td>
                    <td class="p-2.5 border border-white/10">Art direction wrapper holding multiple &lt;source&gt; image variants</td>
                    <td class="p-2.5 border border-white/10 font-mono text-emerald-400">HTML5</td>
                  </tr>
                  <tr class="hover:bg-surface-container/50">
                    <td class="p-2.5 border border-white/10 font-mono text-primary font-bold">&lt;dialog&gt;</td>
                    <td class="p-2.5 border border-white/10">Block</td>
                    <td class="p-2.5 border border-white/10">Native modal or interactive dialog box with showModal() API</td>
                    <td class="p-2.5 border border-white/10 font-mono text-emerald-400">HTML5.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `,
        codeExample: `<figure>
  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80" 
       alt="Student coding algorithms on laptop" 
       loading="lazy" 
       width="400" height="250">
  <figcaption>Figure 1.1: Hands-on algorithm workbench in SmartLearn.</figcaption>
</figure>`,
        interviewTip: 'When wrapping an image with a caption, always pair <code>&lt;figure&gt;</code> with <code>&lt;figcaption&gt;</code> instead of an arbitrary <code>&lt;p&gt;</code> for assistive screen readers.',
        miniQuiz: {
          q: 'Which element represents a native modal dialog box that can be opened with JavaScript via .showModal()?',
          options: ['<modal>', '<dialog>', '<popup>', '<window>'],
          answer: 1,
          explanation: 'The <dialog> element provides built-in browser-managed backdrop styling and focus trapping when opened via el.showModal().'
        }
      },
      {
        id: 'html-attributes',
        category: 'HTML REFERENCES',
        title: 'HTML Attributes & Global Attributes',
        readTime: '6 min read',
        xp: 50,
        summary: 'Deep breakdown of core attributes, boolean properties, and global accessibility attributes.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>HTML attributes provide additional information about HTML elements. They always appear in the opening tag as <code>name="value"</code> pairs.</p>

            <h4 class="text-[17px] font-bold text-white mt-3">Essential Global Attributes</h4>
            <p>Global attributes can be applied to <em>any</em> valid HTML element:</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3 rounded-xl bg-surface-container border border-white/5">
                <code class="text-secondary font-bold">id</code>
                <p class="text-[12px] text-slate-300 mt-1">Unique identifier within the document. Crucial for DOM selection, anchor jumping, and ARIA relationships.</p>
              </div>
              <div class="p-3 rounded-xl bg-surface-container border border-white/5">
                <code class="text-secondary font-bold">class</code>
                <p class="text-[12px] text-slate-300 mt-1">Space-separated list of styling or behavioral classes, re-usable across many elements.</p>
              </div>
              <div class="p-3 rounded-xl bg-surface-container border border-white/5">
                <code class="text-secondary font-bold">tabindex</code>
                <p class="text-[12px] text-slate-300 mt-1">Controls keyboard focus order. <code>0</code> inserts into natural tab order; <code>-1</code> allows programmatic focus only.</p>
              </div>
              <div class="p-3 rounded-xl bg-surface-container border border-white/5">
                <code class="text-secondary font-bold">contenteditable</code>
                <p class="text-[12px] text-slate-300 mt-1">Enables direct user text editing inside standard elements (useful for rich-text editors).</p>
              </div>
            </div>
          </div>
        `,
        codeExample: `<div id="editor-container" 
     class="code-box p-4 rounded-xl border" 
     tabindex="0" 
     contenteditable="true" 
     spellcheck="false" 
     aria-label="Interactive Code Editor">
  // You can click and type directly inside this editable div!
  function solve(arr) {
    return arr.map(x => x * 2);
  }
</div>`,
        interviewTip: 'Avoid using positive numbers for <code>tabindex</code> (e.g. <code>tabindex="3"</code>), as it disrupts the natural accessibility flow of screen readers and keyboard users.',
        miniQuiz: {
          q: 'What does setting tabindex="-1" on an element do?',
          options: [
            'Removes the element from the DOM',
            'Makes it keyboard focusable via TAB key only',
            'Makes it focusable programmatically via .focus() but excludes from TAB key order',
            'Hides the element from sighted users'
          ],
          answer: 2,
          explanation: 'tabindex="-1" allows elements to receive focus via JavaScript element.focus() while omitting them from the default sequential keyboard Tab navigation.'
        }
      },
      {
        id: 'html-http-methods',
        category: 'HTML REFERENCES',
        title: 'HTTP Methods & Messages Reference',
        readTime: '5 min read',
        xp: 45,
        summary: 'RESTful HTTP methods (GET, POST, PUT, PATCH, DELETE) and status code architectures.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>HTML forms communicate with backends via HTTP transactions. Understanding status codes and idempotency is mandatory for full-stack engineering.</p>

            <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">HTTP Methods Comparison</h4>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse border border-white/10 text-[13px]">
                <tr class="bg-surface-container-high text-white">
                  <th class="p-2 border border-white/10">Method</th>
                  <th class="p-2 border border-white/10">Safe?</th>
                  <th class="p-2 border border-white/10">Idempotent?</th>
                  <th class="p-2 border border-white/10">Use Case</th>
                </tr>
                <tr>
                  <td class="p-2 border border-white/10 font-mono text-emerald-400 font-bold">GET</td>
                  <td class="p-2 border border-white/10">Yes</td>
                  <td class="p-2 border border-white/10">Yes</td>
                  <td class="p-2 border border-white/10">Retrieve data without modifying server state</td>
                </tr>
                <tr>
                  <td class="p-2 border border-white/10 font-mono text-primary font-bold">POST</td>
                  <td class="p-2 border border-white/10">No</td>
                  <td class="p-2 border border-white/10">No</td>
                  <td class="p-2 border border-white/10">Create new resource or trigger side-effects</td>
                </tr>
                <tr>
                  <td class="p-2 border border-white/10 font-mono text-secondary font-bold">PUT</td>
                  <td class="p-2 border border-white/10">No</td>
                  <td class="p-2 border border-white/10">Yes</td>
                  <td class="p-2 border border-white/10">Completely replace an existing resource</td>
                </tr>
                <tr>
                  <td class="p-2 border border-white/10 font-mono text-amber-400 font-bold">PATCH</td>
                  <td class="p-2 border border-white/10">No</td>
                  <td class="p-2 border border-white/10">No</td>
                  <td class="p-2 border border-white/10">Partially update specific fields of a resource</td>
                </tr>
              </table>
            </div>

            <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1 mt-4">HTTP Status Codes Cheat Sheet</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="p-2.5 rounded-lg bg-surface-container border border-emerald-500/20 text-[12px]">
                <strong class="text-emerald-400">200 OK / 201 Created:</strong> Request succeeded cleanly.
              </div>
              <div class="p-2.5 rounded-lg bg-surface-container border border-secondary/20 text-[12px]">
                <strong class="text-secondary">301 / 304 Not Modified:</strong> Redirections & cached responses.
              </div>
              <div class="p-2.5 rounded-lg bg-surface-container border border-amber-500/20 text-[12px]">
                <strong class="text-amber-400">400 Bad Request / 401 Unauthorized / 404 Not Found:</strong> Client errors.
              </div>
              <div class="p-2.5 rounded-lg bg-surface-container border border-rose-500/20 text-[12px]">
                <strong class="text-rose-400">500 Internal Error / 502 Bad Gateway:</strong> Server infrastructure errors.
              </div>
            </div>
          </div>
        `,
        codeExample: `<!-- Standard HTML form submission (GET vs POST) -->
<form action="/api/search" method="GET">
  <label for="query">Search Curriculum:</label>
  <input type="search" id="query" name="q" placeholder="e.g. Binary Search Trees">
  <button type="submit">Search</button>
</form>

<!-- Asynchronous Fetch API for REST operations -->
<script>
  async function updateProfileName(newName) {
    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: newName })
    });
    return await res.json();
  }
</script>`,
        interviewTip: 'Define idempotency clearly: An HTTP method is idempotent if executing it once has the exact same side-effect on server state as executing it 100 times (e.g. GET, PUT, DELETE).',
        miniQuiz: {
          q: 'Which HTTP method is designed for partial modification of an existing resource?',
          options: ['POST', 'PUT', 'PATCH', 'UPDATE'],
          answer: 2,
          explanation: 'PATCH applies partial modifications to a resource, while PUT replaces the target resource representation entirely.'
        }
      },
      {
        id: 'html-summary',
        category: 'STUDY PLAN & PREP',
        title: 'HTML Summary & Best Practices',
        readTime: '4 min read',
        xp: 40,
        summary: 'Executive summary of HTML5 core standards, clean nesting rules, and validation guidelines.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>HTML (HyperText Markup Language) is the backbone of all web applications. Here is the concise summary of architectural guidelines:</p>
            <div class="space-y-2">
              <div class="p-3 rounded-xl bg-surface-container border border-white/5">
                <strong class="text-white font-semibold">1. Always declare DOCTYPE:</strong> Ensures modern rendering engines trigger standard mode instead of quirks mode.
              </div>
              <div class="p-3 rounded-xl bg-surface-container border border-white/5">
                <strong class="text-white font-semibold">2. Always declare language:</strong> Use <code>&lt;html lang="en"&gt;</code> to guide text-to-speech tools and translation engines.
              </div>
              <div class="p-3 rounded-xl bg-surface-container border border-white/5">
                <strong class="text-white font-semibold">3. Use lowercase tag names:</strong> While HTML is case-insensitive, W3C standards prescribe lowercase element and attribute names.
              </div>
              <div class="p-3 rounded-xl bg-surface-container border border-white/5">
                <strong class="text-white font-semibold">4. Always provide <code>alt</code> on images:</strong> Screen readers and fallback renderers depend on meaningful alternative text.
              </div>
            </div>
          </div>
        `,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmartLearn Clean Summary</title>
</head>
<body>
  <h1>Clean Semantic Architecture</h1>
  <p>Follow W3C standards for optimal SEO and accessibility.</p>
</body>
</html>`,
        interviewTip: 'Interviewers often ask how to validate an HTML document. Mention the official W3C Markup Validation Service (validator.w3.org).',
        miniQuiz: {
          q: 'Why should every HTML page declare the lang attribute on the <html> tag?',
          options: ['To change font family', 'To aid screen readers, translation engines, and search indexing', 'To enforce server-side locale', 'To speed up CSS parsing'],
          answer: 1,
          explanation: 'Declaring lang="en" allows assistive screen readers to pronounce words with the correct dialect and assists translation engines.'
        }
      },
      {
        id: 'html-accessibility',
        category: 'STUDY PLAN & PREP',
        title: 'HTML Accessibility (a11y) & ARIA',
        readTime: '6 min read',
        xp: 50,
        summary: 'WCAG compliance guidelines, ARIA roles, live regions, and semantic landmark elements.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Web accessibility ensures that websites, tools, and technologies are designed and developed so that people with disabilities can use them.</p>
            <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">First Rule of ARIA</h4>
            <blockquote class="p-3 rounded-xl bg-surface-container-high border-l-4 border-amber-400 text-slate-200 text-[13px]">
              "If you can use a native HTML element or attribute with the semantics and behavior already built in, then do so instead of re-purposing an element and adding ARIA."
            </blockquote>
            <p>Use native <code>&lt;button&gt;</code> instead of <code>&lt;div onclick="..." role="button"&gt;</code>.</p>
          </div>
        `,
        codeExample: `<!-- Accessible Modal Dialog with proper ARIA attributes -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <h2 id="dialog-title">Confirm Enrollment</h2>
  <p id="dialog-desc">Are you sure you want to enroll in the Data Structures track?</p>
  <button type="button" aria-label="Close dialog">Cancel</button>
  <button type="button">Confirm</button>
</div>`,
        interviewTip: 'Remember the POUR principles of WCAG: Perceivable, Operable, Understandable, Robust.',
        miniQuiz: {
          q: 'What is the First Rule of ARIA in web accessibility?',
          options: ['Always add role="button" to div elements', 'Use native semantic HTML elements whenever possible instead of ARIA', 'Never use alt text on images', 'ARIA is only required for mobile devices'],
          answer: 1,
          explanation: 'Native HTML elements have built-in keyboard navigation and screen-reader behaviors that ARIA requires custom JavaScript to emulate.'
        }
      },
      {
        id: 'html-global-attributes',
        category: 'HTML REFERENCES',
        title: 'HTML Global Attributes',
        readTime: '5 min read',
        xp: 45,
        summary: 'Detailed guide to hidden, title, draggable, spellcheck, translate, and dir global attributes.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Global attributes are attributes common to all HTML elements; they can be used on all elements, though they may have no effect on some.</p>
            <ul class="list-disc list-inside space-y-1.5 ml-2">
              <li><code>hidden</code>: Boolean attribute indicating that the element is not yet, or is no longer, directly relevant.</li>
              <li><code>draggable</code>: Enumerated attribute (<code>true</code> or <code>false</code>) indicating whether the element can be dragged.</li>
              <li><code>spellcheck</code>: Enumerated attribute (<code>true</code> or <code>false</code>) indicating if element is to have its spelling/grammar checked.</li>
              <li><code>dir</code>: Text direction (<code>ltr</code>, <code>rtl</code>, <code>auto</code>).</li>
            </ul>
          </div>
        `,
        codeExample: `<div draggable="true" ondragstart="console.log('Dragging started')" class="draggable-card">
  <p spellcheck="true" contenteditable="true">Drag this card or edit text!</p>
</div>`,
        interviewTip: 'Notice the difference between the <code>hidden</code> HTML attribute and CSS <code>display: none</code>: CSS overrides the hidden attribute unless styled with [hidden] { display: none !important; }.',
        miniQuiz: {
          q: 'Which global attribute specifies whether an element can be dragged using native Drag and Drop APIs?',
          options: ['movable', 'draggable', 'drag', 'can-drag'],
          answer: 1,
          explanation: 'The draggable attribute is an enumerated attribute (true/false) used to define drag behavior.'
        }
      },
      {
        id: 'html-browser-support',
        category: 'HTML REFERENCES',
        title: 'HTML Browser Support & CanIUse',
        readTime: '4 min read',
        xp: 35,
        summary: 'Cross-browser compatibility testing, polyfills, progressive enhancement, and feature detection.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Browser support matrix testing across Chromium, Gecko (Firefox), and WebKit (Safari). Always verify bleeding-edge HTML5 APIs using Modernizr or feature queries.</p>
          </div>
        `,
        codeExample: `<script>
  if ('IntersectionObserver' in window) {
    console.log('Modern viewport lazy loading supported!');
  } else {
    console.log('Fallback to immediate content loading.');
  }
</script>`,
        interviewTip: 'Explain Progressive Enhancement: Start with baseline core HTML content accessible to all browsers, then enhance with CSS and JavaScript for modern environments.',
        miniQuiz: {
          q: 'Which strategy builds a baseline functional version first, then adds advanced features for capable browsers?',
          options: ['Graceful Degradation', 'Progressive Enhancement', 'Server-Side Rendering', 'Responsive Retrofitting'],
          answer: 1,
          explanation: 'Progressive Enhancement ensures essential content is reachable everywhere while modern browsers get an enhanced experience.'
        }
      },
      {
        id: 'html-events',
        category: 'HTML REFERENCES',
        title: 'HTML Events Reference',
        readTime: '6 min read',
        xp: 50,
        summary: 'Window events, form events, keyboard events, mouse events, and clipboard events.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>HTML elements trigger DOM events when users interact with the page or when the browser environment changes state.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
              <div class="p-2.5 rounded-lg bg-surface-container border border-white/5"><strong class="text-white">Mouse:</strong> onclick, ondblclick, onmouseenter, onmouseleave</div>
              <div class="p-2.5 rounded-lg bg-surface-container border border-white/5"><strong class="text-white">Keyboard:</strong> onkeydown, onkeyup</div>
              <div class="p-2.5 rounded-lg bg-surface-container border border-white/5"><strong class="text-white">Form:</strong> onsubmit, onchange, oninput, onfocus, onblur</div>
              <div class="p-2.5 rounded-lg bg-surface-container border border-white/5"><strong class="text-white">Window:</strong> onload, onresize, onscroll</div>
            </div>
          </div>
        `,
        codeExample: `<input type="text" id="username" placeholder="Type here..." oninput="handleInput(event)">
<p id="output"></p>

<script>
  function handleInput(e) {
    document.getElementById('output').textContent = 'You typed: ' + e.target.value;
  }
</script>`,
        interviewTip: 'Understand the three phases of DOM event propagation: 1. Capturing Phase, 2. Target Phase, 3. Bubbling Phase.',
        miniQuiz: {
          q: 'Which event fires immediately whenever the value of an <input> element changes via keystrokes?',
          options: ['onchange', 'oninput', 'onselect', 'onblur'],
          answer: 1,
          explanation: 'oninput fires synchronously every time the value changes, whereas onchange only fires when the input loses focus.'
        }
      },
      {
        id: 'html-colors',
        category: 'HTML REFERENCES',
        title: 'HTML Colors: HEX, RGB, HSL',
        readTime: '5 min read',
        xp: 40,
        summary: 'Color systems in web standards: named colors, hexadecimal notation, RGB(A), and modern HSL(A) palettes.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Colors in HTML and CSS can be specified using color names, HEX codes, RGB, and HSL values.</p>
            <ul class="list-disc list-inside space-y-1 ml-2">
              <li><strong class="text-white">HEX:</strong> <code>#6366f1</code> (Red: 63, Green: 66, Blue: F1)</li>
              <li><strong class="text-white">RGB(A):</strong> <code>rgba(99, 102, 241, 0.8)</code></li>
              <li><strong class="text-white">HSL(A):</strong> <code>hsl(239, 84%, 67%)</code> (Hue, Saturation, Lightness)</li>
            </ul>
          </div>
        `,
        codeExample: `<div style="display: flex; gap: 10px;">
  <div style="background-color: #6366f1; color: white; padding: 15px; border-radius: 8px;">Indigo (HEX)</div>
  <div style="background-color: rgb(16, 185, 129); color: white; padding: 15px; border-radius: 8px;">Emerald (RGB)</div>
  <div style="background-color: hsl(199, 89%, 48%); color: white; padding: 15px; border-radius: 8px;">Sky (HSL)</div>
</div>`,
        interviewTip: 'HSL is preferred for dynamic theming because adjusting lightness (L) lets you easily generate hover and focus tints without changing the hue or saturation.',
        miniQuiz: {
          q: 'What does the "A" stand for in RGBA and HSLA color notations?',
          options: ['Accuracy', 'Alpha (Opacity / Transparency)', 'Angle', 'Array'],
          answer: 1,
          explanation: 'Alpha specifies opacity from 0.0 (fully transparent) to 1.0 (fully opaque).'
        }
      },
      {
        id: 'html-canvas',
        category: 'HTML REFERENCES',
        title: 'HTML5 Canvas 2D Graphics API',
        readTime: '6 min read',
        xp: 60,
        summary: 'Direct pixel manipulation, rendering paths, rectangles, circles, and animation loops.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>The HTML <code>&lt;canvas&gt;</code> element is used to draw graphics on the fly via JavaScript. It is resolution-dependent and bitmap-based.</p>
          </div>
        `,
        codeExample: `<canvas id="demoCanvas" width="300" height="150" style="background:#0f172a; border-radius:8px;"></canvas>
<script>
  const canvas = document.getElementById('demoCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#6366f1';
  ctx.fillRect(20, 20, 100, 60);
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(200, 50, 30, 0, Math.PI * 2);
  ctx.fill();
</script>`,
        interviewTip: 'Contrast Canvas with SVG: Canvas is pixel/bitmap based and optimal for high-frequency game rendering; SVG is vector/DOM-based and optimal for scalable icons and charts.',
        miniQuiz: {
          q: 'Which method obtains the 2D rendering context for drawing on a <canvas>?',
          options: ['canvas.getContext("2d")', 'canvas.get2DContext()', 'canvas.createContext()', 'canvas.render2D()'],
          answer: 0,
          explanation: 'canvas.getContext("2d") returns the CanvasRenderingContext2D object used for vector drawing.'
        }
      },
      {
        id: 'html-audio-video',
        category: 'HTML REFERENCES',
        title: 'HTML5 Audio & Video Media APIs',
        readTime: '5 min read',
        xp: 45,
        summary: 'Native multimedia players, codec compatibility (MP4/H.264, WebM), and programmatic controls.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>HTML5 eliminated the need for third-party media plugins (like Flash) by introducing native <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> tags.</p>
          </div>
        `,
        codeExample: `<video width="320" height="180" controls poster="https://via.placeholder.com/320x180">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  Your browser does not support the video tag.
</video>`,
        interviewTip: 'Why provide multiple &lt;source&gt; tags? Different web browsers support different video codecs (e.g. H.264 vs AV1 vs VP9); the browser plays the first compatible format.',
        miniQuiz: {
          q: 'Which attribute displays an image while the video is downloading or until the user hits the play button?',
          options: ['preview', 'thumbnail', 'poster', 'cover'],
          answer: 2,
          explanation: 'The poster attribute specifies an image URL displayed until the user plays the video.'
        }
      },
      {
        id: 'html-doctypes',
        category: 'HTML REFERENCES',
        title: 'HTML Doctypes & Rendering Modes',
        readTime: '4 min read',
        xp: 35,
        summary: 'History of DOCTYPE declarations from HTML 4.01 Strict, XHTML 1.0 to HTML5, and Quirks Mode implications.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>The DOCTYPE declaration must always be the very first line of any HTML file before the <code>&lt;html&gt;</code> tag.</p>
            <p>In HTML5, the DOCTYPE is simply: <code>&lt;!DOCTYPE html&gt;</code>.</p>
          </div>
        `,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Standard Mode Document</title>
</head>
<body>
  <p>Rendered in Full Standards Mode.</p>
</body>
</html>`,
        interviewTip: 'If DOCTYPE is omitted, modern browsers render in Quirks Mode, which emulates Netscape 4 and Internet Explorer 5 layout bugs.',
        miniQuiz: {
          q: 'What mode will a browser render a web page in if the DOCTYPE declaration is missing?',
          options: ['Strict Mode', 'Quirks Mode', 'Standard Mode', 'Sandbox Mode'],
          answer: 1,
          explanation: 'Omitting DOCTYPE triggers Quirks Mode to support backward compatibility with outdated 1990s web code.'
        }
      },
      {
        id: 'html-character-sets',
        category: 'HTML REFERENCES',
        title: 'HTML Character Sets & UTF-8',
        readTime: '4 min read',
        xp: 35,
        summary: 'Character encoding standards: ASCII, ANSI, ISO-8859-1, and universal UTF-8 representation.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>To display an HTML page correctly, the browser must know the character set used. Modern web standards mandate UTF-8.</p>
            <p>UTF-8 covers almost all characters and symbols in the world, including all human languages and emoji.</p>
          </div>
        `,
        codeExample: `<meta charset="UTF-8">`,
        interviewTip: 'Always place <code>&lt;meta charset="UTF-8"&gt;</code> as the first child of <code>&lt;head&gt;</code> so the browser recognizes the encoding before encountering text.',
        miniQuiz: {
          q: 'What is the recommended universal character encoding for all modern HTML5 pages?',
          options: ['ISO-8859-1', 'ASCII', 'UTF-8', 'Windows-1252'],
          answer: 2,
          explanation: 'UTF-8 is the default universal standard encoding capable of representing all Unicode characters.'
        }
      },
      {
        id: 'html-url-encode',
        category: 'HTML REFERENCES',
        title: 'HTML URL Encoding & Percent Encoding',
        readTime: '4 min read',
        xp: 40,
        summary: 'How non-ASCII and reserved characters are converted into %XX hex triplets for URI safety.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>URLs can only be sent over the Internet using the ASCII character set. Unsafe characters are replaced with a <code>%</code> followed by two hexadecimal digits.</p>
            <ul class="list-disc list-inside space-y-1 ml-2">
              <li>Space: <code>%20</code> or <code>+</code></li>
              <li>Exclamation (!): <code>%21</code></li>
              <li>Question mark (?): <code>%3F</code></li>
              <li>Ampersand (&amp;): <code>%26</code></li>
            </ul>
          </div>
        `,
        codeExample: `<script>
  const query = "SmartLearn & SIH 2026";
  const encoded = encodeURIComponent(query);
  console.log(encoded); // "SmartLearn%20%26%20SIH%202026"
</script>`,
        interviewTip: 'Contrast <code>encodeURI()</code> with <code>encodeURIComponent()</code>: <code>encodeURIComponent()</code> encodes reserved characters like &, ?, and / making it ideal for query string parameters.',
        miniQuiz: {
          q: 'What is the URL percent-encoded representation for a space character?',
          options: ['%00', '%20', '%50', '%99'],
          answer: 1,
          explanation: 'ASCII code 32 (decimal) is 0x20 in hex, which encodes as %20.'
        }
      },
      {
        id: 'html-lang-codes',
        category: 'HTML REFERENCES',
        title: 'HTML Language Codes (ISO 639-1)',
        readTime: '4 min read',
        xp: 35,
        summary: 'ISO two-letter language codes and region sub-tags (en-US, hi-IN, fr-FR) for global accessibility.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Language codes in the <code>lang</code> attribute inform browsers and screen readers of the linguistic context.</p>
            <ul class="list-disc list-inside space-y-1 ml-2">
              <li><code>en</code>: English</li>
              <li><code>hi</code>: Hindi (India)</li>
              <li><code>es</code>: Spanish</li>
              <li><code>zh</code>: Chinese</li>
              <li><code>fr</code>: French</li>
            </ul>
          </div>
        `,
        codeExample: `<html lang="hi-IN">
<head>
  <meta charset="UTF-8">
  <title>स्मार्टलर्न - स्मार्ट शिक्षा</title>
</head>
<body>
  <h1>स्मार्टलर्न में आपका स्वागत है</h1>
</body>
</html>`,
        interviewTip: 'Adding region tags (e.g. <code>en-US</code> vs <code>en-GB</code>) ensures speech synthesis uses correct accent and phonetic dictionary.',
        miniQuiz: {
          q: 'Which ISO standard defines the two-letter language codes used in HTML?',
          options: ['ISO 9001', 'ISO 639-1', 'ISO 27001', 'ISO 3166'],
          answer: 1,
          explanation: 'ISO 639-1 provides two-letter language identifier codes.'
        }
      },
      {
        id: 'http-messages',
        category: 'HTML REFERENCES',
        title: 'HTTP Messages & Header Structures',
        readTime: '5 min read',
        xp: 45,
        summary: 'Anatomy of HTTP Request and Response packets: Headers, Body, Status Lines, and Cookies.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Every web communication consists of an HTTP Request from client to server and an HTTP Response back.</p>
            <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">Key Headers</h4>
            <ul class="list-disc list-inside space-y-1 ml-2">
              <li><code>Content-Type: application/json</code></li>
              <li><code>Authorization: Bearer &lt;token&gt;</code></li>
              <li><code>Cache-Control: max-age=3600</code></li>
              <li><code>CORS: Access-Control-Allow-Origin: *</code></li>
            </ul>
          </div>
        `,
        codeExample: `// Inspecting HTTP response headers via fetch
fetch('/api/status')
  .then(response => {
    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers.get('Content-Type'));
  });`,
        interviewTip: 'Be prepared to explain CORS (Cross-Origin Resource Sharing) and preflight <code>OPTIONS</code> requests triggered by custom headers.',
        miniQuiz: {
          q: 'Which HTTP method does a browser send as a CORS preflight request to verify allowed origins?',
          options: ['HEAD', 'OPTIONS', 'CONNECT', 'TRACE'],
          answer: 1,
          explanation: 'Browsers automatically issue an HTTP OPTIONS preflight request before sending certain cross-origin requests.'
        }
      },
      {
        id: 'px-to-em',
        category: 'HTML REFERENCES',
        title: 'PX to EM / REM Responsive Converter',
        readTime: '4 min read',
        xp: 40,
        summary: 'Mathematical formulas and differences between absolute pixels, parent-relative em, and root-relative rem.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Formulas for responsive web typography:</p>
            <div class="p-3 rounded-xl bg-surface-container border border-white/5 font-mono text-[13px] text-emerald-400">
              rem = Target_Pixels / Root_Font_Size (typically 16px)
            </div>
            <p>If base font size is 16px: <strong>24px = 1.5rem</strong>, <strong>32px = 2rem</strong>, <strong>12px = 0.75rem</strong>.</p>
          </div>
        `,
        codeExample: `/* Using REM for accessible scalable sizing */
html {
  font-size: 16px; /* Browser default root size */
}

h1 {
  font-size: 2rem; /* 32px */
  margin-bottom: 1rem; /* 16px */
}`,
        interviewTip: 'Why is REM better than PX for typography? Users who change browser default font size for visual impairment will have REM text resize properly, while PX text remains stubbornly fixed.',
        miniQuiz: {
          q: 'What is the rem equivalent of 24px when root html font-size is 16px?',
          options: ['1.25rem', '1.5rem', '1.75rem', '2rem'],
          answer: 1,
          explanation: '24 / 16 = 1.5rem.'
        }
      },
      {
        id: 'keyboard-shortcuts',
        category: 'HTML REFERENCES',
        title: 'Web Dev & DevTools Keyboard Shortcuts',
        readTime: '4 min read',
        xp: 35,
        summary: 'Essential keyboard accelerators for Chrome DevTools, VS Code, and terminal workflows.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Productivity shortcuts for frontend engineers:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
              <div class="p-2.5 rounded-lg bg-surface-container border border-white/5"><strong class="text-white">Inspect Element:</strong> Ctrl + Shift + C (Win) / Cmd + Shift + C (Mac)</div>
              <div class="p-2.5 rounded-lg bg-surface-container border border-white/5"><strong class="text-white">Console Drawer:</strong> ESC in DevTools</div>
              <div class="p-2.5 rounded-lg bg-surface-container border border-white/5"><strong class="text-white">Hard Refresh:</strong> Ctrl + F5 or Ctrl + Shift + R</div>
              <div class="p-2.5 rounded-lg bg-surface-container border border-white/5"><strong class="text-white">Format Code:</strong> Shift + Alt + F (VS Code)</div>
            </div>
          </div>
        `,
        codeExample: `<!-- Built-in accesskey shortcut attribute in HTML -->
<button accesskey="s" onclick="alert('Saved!')">
  <u>S</u>ave (Alt + Shift + S)
</button>`,
        interviewTip: 'The <code>accesskey</code> attribute specifies a shortcut key to activate or focus an element directly via keyboard.',
        miniQuiz: {
          q: 'Which DevTools shortcut toggles the Element Inspector cursor to inspect any DOM node?',
          options: ['Ctrl + Shift + C', 'Ctrl + Shift + P', 'F12 only', 'Alt + Tab'],
          answer: 0,
          explanation: 'Ctrl + Shift + C (or Cmd + Option + C on macOS) immediately activates the inspect element tool.'
        }
      }
    ],

    css: [
      {
        id: 'css-box-model',
        category: 'CSS FUNDAMENTALS',
        title: 'CSS Box Model & Box-Sizing',
        readTime: '5 min read',
        xp: 45,
        summary: 'Detailed explanation of Content, Padding, Border, Margin and border-box calculations.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Every HTML element rendered in a browser engine is represented as a rectangular box. Understanding the box model is the foundational bedrock of all modern CSS layout engineering.</p>

            <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">The 4 Concentric Layers</h4>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[12px]">
              <div class="p-3 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300">
                <strong>Content</strong><br/>Actual text, image, or child elements
              </div>
              <div class="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                <strong>Padding</strong><br/>Clears area around content; inherits background
              </div>
              <div class="p-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
                <strong>Border</strong><br/>Wraps padding and content
              </div>
              <div class="p-3 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300">
                <strong>Margin</strong><br/>Transparent space separating from siblings
              </div>
            </div>

            <h4 class="text-[16px] font-bold text-white mt-4 border-b border-white/10 pb-1">content-box vs border-box</h4>
            <p>By default, CSS elements use <code>box-sizing: content-box</code>, meaning if you set <code>width: 300px; padding: 20px; border: 2px solid;</code>, the actual rendered element width becomes <strong>344px</strong>!</p>
            <p>With <code>box-sizing: border-box</code>, the padding and border are absorbed <em>inside</em> the 300px declared width.</p>
          </div>
        `,
        codeExample: `/* Universal box-sizing reset - standard in all modern production code */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.card {
  width: 300px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
  background-color: #1e293b;
  border-radius: 12px;
}`,
        interviewTip: 'Why does margin collapse occur? Top and bottom margins of adjoining in-flow block boxes combine into a single margin whose size is the maximum of the individual margins.',
        miniQuiz: {
          q: 'If an element has width: 200px, padding: 20px, and box-sizing: border-box, what is the total rendered width?',
          options: ['240px', '200px', '220px', '180px'],
          answer: 1,
          explanation: 'Under box-sizing: border-box, padding is included inside the declared width, so the rendered width remains exactly 200px.'
        }
      },
      {
        id: 'css-flexbox',
        category: 'CSS LAYOUT ARCHITECTURE',
        title: 'Flexbox Architecture & Alignment',
        readTime: '6 min read',
        xp: 55,
        summary: 'One-dimensional layout model: main-axis, cross-axis, justify-content, align-items, and flex-grow.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>The Flexible Box Module provides a high-efficiency mechanism for laying out, aligning, and distributing space among items in a container even when their sizes are dynamic.</p>
            
            <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">Container Properties</h4>
            <ul class="list-disc list-inside space-y-1 ml-2">
              <li><code>flex-direction: row | column | row-reverse | column-reverse</code></li>
              <li><code>justify-content: flex-start | center | flex-end | space-between | space-around</code> (Controls main-axis)</li>
              <li><code>align-items: stretch | center | flex-start | flex-end | baseline</code> (Controls cross-axis)</li>
              <li><code>flex-wrap: nowrap | wrap | wrap-reverse</code></li>
              <li><code>gap: 1rem</code> (Native spacing without margin hacks)</li>
            </ul>
          </div>
        `,
        codeExample: `.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
}

.search-input-wrapper {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  max-width: 500px;
}`,
        interviewTip: 'To center an element horizontally and vertically in one line with flexbox: <code>display: flex; justify-content: center; align-items: center;</code> or <code>display: flex; margin: auto;</code> on the child.',
        miniQuiz: {
          q: 'Which Flexbox property aligns flex items along the cross-axis?',
          options: ['justify-content', 'align-items', 'align-content', 'flex-direction'],
          answer: 1,
          explanation: 'align-items controls alignment along the cross axis (perpendicular to the main axis defined by flex-direction).'
        }
      },
      {
        id: 'css-grid',
        category: 'CSS LAYOUT ARCHITECTURE',
        title: 'CSS Grid System & Responsive Auto-Fit',
        readTime: '6 min read',
        xp: 60,
        summary: 'Two-dimensional grid layouts, grid-template-columns, minmax(), and repeat(auto-fit).',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>CSS Grid is the only native 2-dimensional CSS layout engine, enabling precise simultaneous control over rows and columns.</p>
            <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">The Magic Auto-Responsive Formula</h4>
            <p>Create completely responsive card layouts without writing a single media query:</p>
            <pre class="bg-surface-container-high p-3 rounded-lg text-emerald-300 font-mono text-[13px]">grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));</pre>
          </div>
        `,
        codeExample: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`,
        interviewTip: 'What is the difference between <code>auto-fill</code> and <code>auto-fit</code>? <code>auto-fill</code> reserves empty column tracks if space allows, while <code>auto-fit</code> collapses empty tracks so existing items stretch to fill the entire container.',
        miniQuiz: {
          q: 'Which function in CSS Grid allows defining both a minimum and maximum size for track sizing?',
          options: ['clamp()', 'minmax()', 'fit-content()', 'repeat()'],
          answer: 1,
          explanation: 'minmax(min, max) defines a size range greater than or equal to min and less than or equal to max.'
        }
      }
    ],

    javascript: [
      {
        id: 'js-event-loop',
        category: 'JAVASCRIPT CORE & ENGINE',
        title: 'The JavaScript Event Loop & Concurrency',
        readTime: '7 min read',
        xp: 75,
        summary: 'Call Stack, Web APIs, Microtask Queue (Promises), and Macrotask Queue (setTimeout).',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>JavaScript is a <strong class="text-white">single-threaded, non-blocking asynchronous concurrent runtime</strong>. The event loop continuously monitors the Call Stack and task queues.</p>

            <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">Queue Priority Execution Order</h4>
            <ol class="list-decimal list-inside space-y-1.5 ml-2">
              <li><strong class="text-emerald-400">Call Stack:</strong> Synchronous code executes immediately until stack is completely empty.</li>
              <li><strong class="text-secondary">Microtask Queue:</strong> <code>Promise.then()</code>, <code>catch()</code>, <code>finally()</code>, <code>queueMicrotask()</code>, <code>MutationObserver</code>. Executed completely before any macrotask!</li>
              <li><strong class="text-amber-400">Macrotask Queue (Task Queue):</strong> <code>setTimeout()</code>, <code>setInterval()</code>, <code>I/O</code>, UI rendering callbacks.</li>
            </ol>
          </div>
        `,
        codeExample: `console.log('1: Synchronous Start');

setTimeout(() => {
  console.log('4: Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Microtask (Promise)');
});

console.log('2: Synchronous End');

// Expected Output Order:
// 1: Synchronous Start
// 2: Synchronous End
// 3: Microtask (Promise)
// 4: Macrotask (setTimeout)`,
        interviewTip: 'Always remember: Microtasks are drained completely to exhaustion after every single task before the event loop picks up the next macrotask.',
        miniQuiz: {
          q: 'Between setTimeout(..., 0) and Promise.resolve().then(...), which callback executes first?',
          options: ['setTimeout', 'Promise.then', 'Both simultaneously', 'Whichever was registered first'],
          answer: 1,
          explanation: 'Promises enter the Microtask queue, which has higher execution priority and is drained before macrotasks like setTimeout.'
        }
      },
      {
        id: 'js-closures',
        category: 'JAVASCRIPT CORE & ENGINE',
        title: 'Closures & Lexical Scope',
        readTime: '6 min read',
        xp: 60,
        summary: 'How inner functions retain access to their outer lexical environment even after the outer function returns.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>A <strong class="text-white">closure</strong> is the combination of a function bundled together with references to its surrounding lexical state (the lexical environment).</p>
            <p>Common practical uses: Data privacy (private variables), function factories, and memoization caches.</p>
          </div>
        `,
        codeExample: `function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable enclosed in scope

  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    getValue() { return count; }
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.count);       // undefined (protected encapsulation!)`,
        interviewTip: 'Closures can cause memory leaks if retained references in event listeners or global caches prevent the JavaScript garbage collector from releasing unused memory.',
        miniQuiz: {
          q: 'What enables a JavaScript function to access variables from its parent function even after the parent has finished executing?',
          options: ['Hoisting', 'Closures & Lexical Scope', 'Prototypal Inheritance', 'Event Bubbling'],
          answer: 1,
          explanation: 'A closure retains a live reference to the outer lexical environment where the function was declared.'
        }
      }
    ],

    dsa: [
      {
        id: 'dsa-big-o',
        category: 'ALGORITHMIC FOUNDATIONS',
        title: 'Big-O Notation & Asymptotic Bounds',
        readTime: '6 min read',
        xp: 60,
        summary: 'Time and space complexity bounds: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ).',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Big-O notation describes the performance or complexity of an algorithm as the input size <code>n</code> scales towards infinity.</p>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse border border-white/10 text-[13px]">
                <tr class="bg-surface-container-high text-white">
                  <th class="p-2 border border-white/10">Notation</th>
                  <th class="p-2 border border-white/10">Name</th>
                  <th class="p-2 border border-white/10">Example Algorithm</th>
                </tr>
                <tr>
                  <td class="p-2 border border-white/10 font-mono text-emerald-400 font-bold">O(1)</td>
                  <td class="p-2 border border-white/10">Constant</td>
                  <td class="p-2 border border-white/10">Hash map lookup, Array index access</td>
                </tr>
                <tr>
                  <td class="p-2 border border-white/10 font-mono text-secondary font-bold">O(log n)</td>
                  <td class="p-2 border border-white/10">Logarithmic</td>
                  <td class="p-2 border border-white/10">Binary Search, Balanced BST lookup</td>
                </tr>
                <tr>
                  <td class="p-2 border border-white/10 font-mono text-primary font-bold">O(n)</td>
                  <td class="p-2 border border-white/10">Linear</td>
                  <td class="p-2 border border-white/10">Linear scan, Traversing linked list</td>
                </tr>
                <tr>
                  <td class="p-2 border border-white/10 font-mono text-amber-400 font-bold">O(n log n)</td>
                  <td class="p-2 border border-white/10">Linearithmic</td>
                  <td class="p-2 border border-white/10">Merge Sort, Quick Sort (average), Heap Sort</td>
                </tr>
                <tr>
                  <td class="p-2 border border-white/10 font-mono text-rose-400 font-bold">O(n²)</td>
                  <td class="p-2 border border-white/10">Quadratic</td>
                  <td class="p-2 border border-white/10">Bubble Sort, Nested brute-force loops</td>
                </tr>
              </table>
            </div>
          </div>
        `,
        codeExample: `// Binary Search: O(log n) Time Complexity, O(1) Auxiliary Space
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2); // Avoid integer overflow

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return -1; // Target not found
}`,
        interviewTip: 'When asked why we compute <code>mid = low + (high - low) / 2</code> instead of <code>(low + high) / 2</code>: In languages with 32-bit signed integers (C++, Java), <code>low + high</code> can overflow 2,147,483,647 into a negative integer.',
        miniQuiz: {
          q: 'What is the worst-case time complexity of QuickSort?',
          options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
          answer: 2,
          explanation: 'QuickSort degrades to O(n²) in the worst case when the pivot chosen is always the smallest or largest element (e.g. on already sorted arrays without random pivots).'
        }
      },
      {
        id: 'dsa-linked-lists',
        category: 'DATA STRUCTURES',
        title: 'Linked Lists & Pointer Reversals',
        readTime: '6 min read',
        xp: 65,
        summary: 'Node structures, fast/slow pointer cycle detection (Floyd\'s algorithm), and in-place reversal.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>A Linked List is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next using a pointer/reference.</p>
          </div>
        `,
        codeExample: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// In-place iterative reversal: O(n) Time, O(1) Space
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  return prev; // New head of reversed list
}`,
        interviewTip: 'For finding cycles in a linked list, use Floyd\'s Tortoise and Hare algorithm (fast pointer moves 2 steps, slow moves 1 step; if they meet, a cycle exists).',
        miniQuiz: {
          q: 'What is the auxiliary space complexity of iteratively reversing a singly linked list in-place?',
          options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
          answer: 1,
          explanation: 'Iterative reversal only requires three pointer variables (prev, curr, nextTemp), taking O(1) constant auxiliary memory.'
        }
      }
    ],

    python: [
      {
        id: 'py-memory-model',
        category: 'PYTHON INTERNALS',
        title: 'Python Memory Model & Mutable vs Immutable',
        readTime: '6 min read',
        xp: 55,
        summary: 'Variables as references, id(), pass-by-object-reference, and memory management.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>In Python, <strong class="text-white">everything is an object</strong>. Variables do not store values directly; they are named bindings/references to objects in heap memory.</p>
            <ul class="list-disc list-inside space-y-1 ml-2">
              <li><strong class="text-emerald-400">Immutable:</strong> <code>int</code>, <code>float</code>, <code>str</code>, <code>tuple</code>, <code>frozenset</code>. Modifying creates a brand new object.</li>
              <li><strong class="text-rose-400">Mutable:</strong> <code>list</code>, <code>dict</code>, <code>set</code>, custom classes. Modified in-place.</li>
            </ul>
          </div>
        `,
        codeExample: `# Demonstrating default mutable argument trap
def append_item(item, target_list=[]): # AVOID mutable defaults!
    target_list.append(item)
    return target_list

print(append_item(1)) # [1]
print(append_item(2)) # [1, 2] -- The list was shared across invocations!

# Correct Pythonic Pattern:
def append_item_clean(item, target_list=None):
    if target_list is None:
        target_list = []
    target_list.append(item)
    return target_list`,
        interviewTip: 'Never use mutable objects (like lists or dictionaries) as default arguments in Python function signatures, because the default value is evaluated once when the function is defined, not each time it is called.',
        miniQuiz: {
          q: 'Which of the following data types in Python is immutable?',
          options: ['list', 'dict', 'set', 'tuple'],
          answer: 3,
          explanation: 'Tuples are immutable sequences in Python; their elements cannot be added, removed, or re-assigned once constructed.'
        }
      }
    ],

    sql: [
      {
        id: 'sql-joins-indexing',
        category: 'SQL & RELATIONAL ENGINES',
        title: 'SQL Joins, Indexing & Query Execution Plans',
        readTime: '6 min read',
        xp: 65,
        summary: 'Inner vs Outer Joins, B-Tree vs Hash Indexing, and EXPLAIN ANALYZE performance tuning.',
        contentHtml: `
          <div class="space-y-4 text-slate-300 text-[14px] leading-relaxed">
            <p>Relational databases rely on relational algebra to combine datasets across normalized tables.</p>
            
            <h4 class="text-[16px] font-bold text-white border-b border-white/10 pb-1">B-Tree Indexes</h4>
            <p>Indexes transform sequential table scans (O(n)) into balanced tree traversals (O(log n)). Always index columns frequently used in <code>WHERE</code> clauses and foreign key joins.</p>
          </div>
        `,
        codeExample: `-- High-performance multi-table join with aggregation
SELECT 
    s.id AS student_id,
    s.full_name,
    COUNT(e.course_id) AS total_enrolled,
    ROUND(AVG(q.score_percentage), 1) AS avg_quiz_score
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
LEFT JOIN quiz_attempts q ON s.id = q.student_id
WHERE s.is_active = TRUE
GROUP BY s.id, s.full_name
HAVING COUNT(e.course_id) >= 1
ORDER BY avg_quiz_score DESC
LIMIT 10;`,
        interviewTip: 'When asked why too many indexes can degrade database performance: While indexes speed up SELECT reads (O(log n)), every INSERT, UPDATE, and DELETE requires updating all corresponding B-Trees, increasing write latency.',
        miniQuiz: {
          q: 'Which SQL clause is used to filter aggregated group records (created by GROUP BY)?',
          options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'],
          answer: 1,
          explanation: 'HAVING filters aggregated groups after the GROUP BY operation, while WHERE filters individual rows before grouping occurs.'
        }
      }
    ]
  }
};
