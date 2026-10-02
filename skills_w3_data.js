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
