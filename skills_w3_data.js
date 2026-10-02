/**
 * SmartLearn — W3Schools-Style Technical Concepts & Notes Architecture
 * Project: SmartLearn | SIH 2026 | Theme: Smart Education
 *
 * Full 20-Skill Technical Documentation Library:
 * HTML, CSS, JAVASCRIPT, SQL, PYTHON, JAVA, PHP, C, C++, C#,
 * AWS, W3.CSS, HOW TO, BOOTSTRAP, REACT, MYSQL, JQUERY, EXCEL, XML, DJANGO
 */

window.SmartLearnSkillsDocs = {
  "currentTech": "html",
  "currentConceptId": "html-study-plan",
  "completedConcepts": [],
  "technologies": [
    {
      "id": "html",
      "name": "HTML",
      "color": "#f97316",
      "label": "Web Markup"
    },
    {
      "id": "css",
      "name": "CSS",
      "color": "#38bdf8",
      "label": "Styling & Grid"
    },
    {
      "id": "javascript",
      "name": "JAVASCRIPT",
      "color": "#facc15",
      "label": "Core Engine"
    },
    {
      "id": "sql",
      "name": "SQL",
      "color": "#ec4899",
      "label": "Relational Queries"
    },
    {
      "id": "python",
      "name": "PYTHON",
      "color": "#3b82f6",
      "label": "Backend & Data"
    },
    {
      "id": "java",
      "name": "JAVA",
      "color": "#ef4444",
      "label": "JVM & OOP"
    },
    {
      "id": "php",
      "name": "PHP",
      "color": "#8b5cf6",
      "label": "Server-Side Web"
    },
    {
      "id": "c",
      "name": "C",
      "color": "#06b6d4",
      "label": "Systems & Memory"
    },
    {
      "id": "cpp",
      "name": "C++",
      "color": "#0ea5e9",
      "label": "High Performance"
    },
    {
      "id": "csharp",
      "name": "C#",
      "color": "#10b981",
      "label": ".NET Enterprise"
    },
    {
      "id": "aws",
      "name": "AWS",
      "color": "#f59e0b",
      "label": "Cloud Infrastructure"
    },
    {
      "id": "w3css",
      "name": "W3.CSS",
      "color": "#14b8a6",
      "label": "CSS Framework"
    },
    {
      "id": "howto",
      "name": "HOW TO",
      "color": "#a855f7",
      "label": "Code Snippets"
    },
    {
      "id": "bootstrap",
      "name": "BOOTSTRAP",
      "color": "#7c3aed",
      "label": "Responsive UI"
    },
    {
      "id": "react",
      "name": "REACT",
      "color": "#00d8ff",
      "label": "Frontend Components"
    },
    {
      "id": "mysql",
      "name": "MYSQL",
      "color": "#0284c7",
      "label": "RDBMS Engine"
    },
    {
      "id": "jquery",
      "name": "JQUERY",
      "color": "#0769ad",
      "label": "DOM Library"
    },
    {
      "id": "excel",
      "name": "EXCEL",
      "color": "#16a34a",
      "label": "Spreadsheets & Data"
    },
    {
      "id": "xml",
      "name": "XML",
      "color": "#f43f5e",
      "label": "Data Exchange"
    },
    {
      "id": "django",
      "name": "DJANGO",
      "color": "#059669",
      "label": "Python Web Framework"
    }
  ],
  "docs": {
    "html": [
      {
        "id": "html-study-plan",
        "category": "STUDY PLAN & PREP",
        "title": "HTML 14-Day Study Plan",
        "readTime": "4 min read",
        "xp": 40,
        "summary": "A structured, progressive roadmap to master modern semantic HTML5 and accessibility.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Welcome to the <strong class=\"text-white font-semibold\">HTML5 Mastery Study Plan</strong>. Modern web architecture requires semantic structure, fast loading times, and full WCAG accessibility compliance.</p>\n            \n            <h4 class=\"text-[17px] font-bold text-white mt-4 border-b border-white/10 pb-2\">Phase 1: Foundations (Days 1–4)</h4>\n            <ul class=\"list-disc list-inside space-y-1.5 ml-2\">\n              <li>Document boilerplate (<code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html lang=\"en\"&gt;</code>, viewport meta)</li>\n              <li>Text elements: Headings (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>), Paragraphs (<code>&lt;p&gt;</code>), and Text Semantics (<code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>)</li>\n              <li>Hyperlinks (<code>&lt;a href=\"...\" target=\"_blank\" rel=\"noopener noreferrer\"&gt;</code>)</li>\n              <li>Visuals & Media: Responsive images (<code>&lt;img srcset=\"...\" loading=\"lazy\"&gt;</code>)</li>\n            </ul>\n\n            <h4 class=\"text-[17px] font-bold text-white mt-4 border-b border-white/10 pb-2\">Phase 2: Semantic Layouts & Data (Days 5–8)</h4>\n            <ul class=\"list-disc list-inside space-y-1.5 ml-2\">\n              <li>Semantic Landmarks: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code></li>\n              <li>Data Tables: Accessible tables with <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;th scope=\"col\"&gt;</code></li>\n              <li>Organized Lists: <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, and Definition Lists (<code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>)</li>\n            </ul>\n\n            <h4 class=\"text-[17px] font-bold text-white mt-4 border-b border-white/10 pb-2\">Phase 3: Interactive Forms & Advanced APIs (Days 9–14)</h4>\n            <ul class=\"list-disc list-inside space-y-1.5 ml-2\">\n              <li>Modern Forms: Input types (<code>email</code>, <code>tel</code>, <code>date</code>, <code>number</code>), client validation, regex patterns</li>\n              <li>Graphics & Multi-media: <code>&lt;canvas&gt;</code>, <code>&lt;svg&gt;</code>, native <code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code> with subtitles (<code>&lt;track&gt;</code>)</li>\n              <li>Web Accessibility (ARIA attributes, keyboard focus states, screen reader auditing)</li>\n            </ul>\n          </div>\n        ",
        "codeExample": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>SmartLearn Study Plan Demo</title>\n</head>\n<body>\n  <header>\n    <h1>SmartLearn HTML5 Study Plan</h1>\n    <nav aria-label=\"Breadcrumb\">\n      <p>Home &gt; HTML &gt; Study Plan</p>\n    </nav>\n  </header>\n  <main>\n    <section>\n      <h2>Today's Milestone</h2>\n      <p>Mastering modern document semantics &amp; accessibility.</p>\n    </section>\n  </main>\n</body>\n</html>",
        "interviewTip": "Interviewers often ask why <code>target=\"_blank\"</code> requires <code>rel=\"noopener noreferrer\"</code>. Answer: To prevent reverse tabnabbing security attacks where the newly opened window accesses <code>window.opener</code>.",
        "miniQuiz": {
          "q": "Which HTML5 element represents the primary, unique content of the document body?",
          "options": [
            "<section>",
            "<article>",
            "<main>",
            "<content>"
          ],
          "answer": 2,
          "explanation": "<main> must contain content that is unique to the document and should not include repeated elements like sidebars, navigation links, or copyright footers."
        }
      },
      {
        "id": "html-interview-prep",
        "category": "STUDY PLAN & PREP",
        "title": "HTML Technical Interview Prep",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Top 15 frequently asked HTML5 architectural and conceptual interview questions with exact answers.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Master these high-yield interview questions asked by top tech firms (Google, Amazon, Microsoft, Infosys, TCS).</p>\n\n            <div class=\"p-4 rounded-xl bg-surface-container border border-white/5 space-y-2\">\n              <h4 class=\"text-white font-bold text-[15px]\">Q1: What does the <code>&lt;!DOCTYPE html&gt;</code> declaration do?</h4>\n              <p class=\"text-slate-300\">It is an instruction to the web browser about what version of HTML the page is written in. In HTML5, it triggers <strong>Standard Mode</strong> in modern rendering engines, preventing the browser from falling back into legacy <em>Quirks Mode</em>.</p>\n            </div>\n\n            <div class=\"p-4 rounded-xl bg-surface-container border border-white/5 space-y-2\">\n              <h4 class=\"text-white font-bold text-[15px]\">Q2: Explain the difference between <code>script async</code> and <code>script defer</code>.</h4>\n              <p class=\"text-slate-300\">Both download the JavaScript file asynchronously in parallel with HTML parsing. However:</p>\n              <ul class=\"list-disc list-inside space-y-1 ml-2 text-slate-300\">\n                <li><code class=\"text-amber-400\">async</code>: Executes immediately the moment the script finishes downloading, pausing HTML parsing if parsing is still underway. Execution order is unpredictable.</li>\n                <li><code class=\"text-emerald-400\">defer</code>: Waits until the HTML parser has completely finished, then executes scripts in the exact order they appeared in the DOM, right before <code>DOMContentLoaded</code>.</li>\n              </ul>\n            </div>\n\n            <div class=\"p-4 rounded-xl bg-surface-container border border-white/5 space-y-2\">\n              <h4 class=\"text-white font-bold text-[15px]\">Q3: What are Custom Data Attributes (<code>data-*</code>)?</h4>\n              <p class=\"text-slate-300\">They allow storing private, custom data directly on standard HTML elements without polluting standard attributes. In JavaScript, they are accessed cleanly via the <code>element.dataset</code> property.</p>\n            </div>\n          </div>\n        ",
        "codeExample": "<!-- Demonstrating async vs defer loading -->\n<!-- async: Best for independent analytics / ads -->\n<script async src=\"https://example.com/analytics.js\"></script>\n\n<!-- defer: Best for scripts that depend on DOM or order -->\n<script defer src=\"main-app.js\"></script>\n\n<!-- Custom data-* attribute usage -->\n<button id=\"cart-btn\" data-product-id=\"482\" data-category=\"electronics\">\n  Add to Cart\n</button>\n\n<script>\n  const btn = document.getElementById('cart-btn');\n  console.log(btn.dataset.productId); // Outputs: \"482\"\n</script>",
        "interviewTip": "Always choose <code>defer</code> for scripts that manipulate the DOM or depend on other scripts, as it guarantees preservation of execution order.",
        "miniQuiz": {
          "q": "Which script attribute guarantees execution order while still loading in parallel with parsing?",
          "options": [
            "async",
            "defer",
            "preload",
            "module"
          ],
          "answer": 1,
          "explanation": "The defer attribute loads scripts asynchronously in parallel without blocking HTML parsing, and executes them in sequence after DOM parsing completes."
        }
      },
      {
        "id": "html-tag-list",
        "category": "HTML REFERENCES",
        "title": "HTML Tag Reference Directory",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "Alphabetical and categorical reference of core HTML5 tags with browser compliance.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Comprehensive technical directory of essential HTML5 tags categorized by architectural intent.</p>\n\n            <div class=\"overflow-x-auto\">\n              <table class=\"w-full text-left border-collapse border border-white/10 text-[13px]\">\n                <thead>\n                  <tr class=\"bg-surface-container-high text-white\">\n                    <th class=\"p-2.5 border border-white/10 font-mono\">Tag</th>\n                    <th class=\"p-2.5 border border-white/10\">Type</th>\n                    <th class=\"p-2.5 border border-white/10\">Semantic Purpose</th>\n                    <th class=\"p-2.5 border border-white/10 font-mono\">Spec</th>\n                  </tr>\n                </thead>\n                <tbody class=\"divide-y divide-white/5\">\n                  <tr class=\"hover:bg-surface-container/50\">\n                    <td class=\"p-2.5 border border-white/10 font-mono text-primary font-bold\">&lt;article&gt;</td>\n                    <td class=\"p-2.5 border border-white/10\">Block</td>\n                    <td class=\"p-2.5 border border-white/10\">Self-contained, independently distributable composition</td>\n                    <td class=\"p-2.5 border border-white/10 font-mono text-emerald-400\">HTML5</td>\n                  </tr>\n                  <tr class=\"hover:bg-surface-container/50\">\n                    <td class=\"p-2.5 border border-white/10 font-mono text-primary font-bold\">&lt;aside&gt;</td>\n                    <td class=\"p-2.5 border border-white/10\">Block</td>\n                    <td class=\"p-2.5 border border-white/10\">Tangentially related sidebar, glossary, or callout</td>\n                    <td class=\"p-2.5 border border-white/10 font-mono text-emerald-400\">HTML5</td>\n                  </tr>\n                  <tr class=\"hover:bg-surface-container/50\">\n                    <td class=\"p-2.5 border border-white/10 font-mono text-primary font-bold\">&lt;figure&gt;</td>\n                    <td class=\"p-2.5 border border-white/10\">Block</td>\n                    <td class=\"p-2.5 border border-white/10\">Encapsulates diagrams, photos, or code with &lt;figcaption&gt;</td>\n                    <td class=\"p-2.5 border border-white/10 font-mono text-emerald-400\">HTML5</td>\n                  </tr>\n                  <tr class=\"hover:bg-surface-container/50\">\n                    <td class=\"p-2.5 border border-white/10 font-mono text-primary font-bold\">&lt;picture&gt;</td>\n                    <td class=\"p-2.5 border border-white/10\">Inline</td>\n                    <td class=\"p-2.5 border border-white/10\">Art direction wrapper holding multiple &lt;source&gt; image variants</td>\n                    <td class=\"p-2.5 border border-white/10 font-mono text-emerald-400\">HTML5</td>\n                  </tr>\n                  <tr class=\"hover:bg-surface-container/50\">\n                    <td class=\"p-2.5 border border-white/10 font-mono text-primary font-bold\">&lt;dialog&gt;</td>\n                    <td class=\"p-2.5 border border-white/10\">Block</td>\n                    <td class=\"p-2.5 border border-white/10\">Native modal or interactive dialog box with showModal() API</td>\n                    <td class=\"p-2.5 border border-white/10 font-mono text-emerald-400\">HTML5.2</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        ",
        "codeExample": "<figure>\n  <img src=\"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80\" \n       alt=\"Student coding algorithms on laptop\" \n       loading=\"lazy\" \n       width=\"400\" height=\"250\">\n  <figcaption>Figure 1.1: Hands-on algorithm workbench in SmartLearn.</figcaption>\n</figure>",
        "interviewTip": "When wrapping an image with a caption, always pair <code>&lt;figure&gt;</code> with <code>&lt;figcaption&gt;</code> instead of an arbitrary <code>&lt;p&gt;</code> for assistive screen readers.",
        "miniQuiz": {
          "q": "Which element represents a native modal dialog box that can be opened with JavaScript via .showModal()?",
          "options": [
            "<modal>",
            "<dialog>",
            "<popup>",
            "<window>"
          ],
          "answer": 1,
          "explanation": "The <dialog> element provides built-in browser-managed backdrop styling and focus trapping when opened via el.showModal()."
        }
      },
      {
        "id": "html-attributes",
        "category": "HTML REFERENCES",
        "title": "HTML Attributes & Global Attributes",
        "readTime": "6 min read",
        "xp": 50,
        "summary": "Deep breakdown of core attributes, boolean properties, and global accessibility attributes.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>HTML attributes provide additional information about HTML elements. They always appear in the opening tag as <code>name=\"value\"</code> pairs.</p>\n\n            <h4 class=\"text-[17px] font-bold text-white mt-3\">Essential Global Attributes</h4>\n            <p>Global attributes can be applied to <em>any</em> valid HTML element:</p>\n            \n            <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1\">\n              <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\">\n                <code class=\"text-secondary font-bold\">id</code>\n                <p class=\"text-[12px] text-slate-300 mt-1\">Unique identifier within the document. Crucial for DOM selection, anchor jumping, and ARIA relationships.</p>\n              </div>\n              <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\">\n                <code class=\"text-secondary font-bold\">class</code>\n                <p class=\"text-[12px] text-slate-300 mt-1\">Space-separated list of styling or behavioral classes, re-usable across many elements.</p>\n              </div>\n              <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\">\n                <code class=\"text-secondary font-bold\">tabindex</code>\n                <p class=\"text-[12px] text-slate-300 mt-1\">Controls keyboard focus order. <code>0</code> inserts into natural tab order; <code>-1</code> allows programmatic focus only.</p>\n              </div>\n              <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\">\n                <code class=\"text-secondary font-bold\">contenteditable</code>\n                <p class=\"text-[12px] text-slate-300 mt-1\">Enables direct user text editing inside standard elements (useful for rich-text editors).</p>\n              </div>\n            </div>\n          </div>\n        ",
        "codeExample": "<div id=\"editor-container\" \n     class=\"code-box p-4 rounded-xl border\" \n     tabindex=\"0\" \n     contenteditable=\"true\" \n     spellcheck=\"false\" \n     aria-label=\"Interactive Code Editor\">\n  // You can click and type directly inside this editable div!\n  function solve(arr) {\n    return arr.map(x => x * 2);\n  }\n</div>",
        "interviewTip": "Avoid using positive numbers for <code>tabindex</code> (e.g. <code>tabindex=\"3\"</code>), as it disrupts the natural accessibility flow of screen readers and keyboard users.",
        "miniQuiz": {
          "q": "What does setting tabindex=\"-1\" on an element do?",
          "options": [
            "Removes the element from the DOM",
            "Makes it keyboard focusable via TAB key only",
            "Makes it focusable programmatically via .focus() but excludes from TAB key order",
            "Hides the element from sighted users"
          ],
          "answer": 2,
          "explanation": "tabindex=\"-1\" allows elements to receive focus via JavaScript element.focus() while omitting them from the default sequential keyboard Tab navigation."
        }
      },
      {
        "id": "html-http-methods",
        "category": "HTML REFERENCES",
        "title": "HTTP Methods & Messages Reference",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "RESTful HTTP methods (GET, POST, PUT, PATCH, DELETE) and status code architectures.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>HTML forms communicate with backends via HTTP transactions. Understanding status codes and idempotency is mandatory for full-stack engineering.</p>\n\n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">HTTP Methods Comparison</h4>\n            <div class=\"overflow-x-auto\">\n              <table class=\"w-full text-left border-collapse border border-white/10 text-[13px]\">\n                <tr class=\"bg-surface-container-high text-white\">\n                  <th class=\"p-2 border border-white/10\">Method</th>\n                  <th class=\"p-2 border border-white/10\">Safe?</th>\n                  <th class=\"p-2 border border-white/10\">Idempotent?</th>\n                  <th class=\"p-2 border border-white/10\">Use Case</th>\n                </tr>\n                <tr>\n                  <td class=\"p-2 border border-white/10 font-mono text-emerald-400 font-bold\">GET</td>\n                  <td class=\"p-2 border border-white/10\">Yes</td>\n                  <td class=\"p-2 border border-white/10\">Yes</td>\n                  <td class=\"p-2 border border-white/10\">Retrieve data without modifying server state</td>\n                </tr>\n                <tr>\n                  <td class=\"p-2 border border-white/10 font-mono text-primary font-bold\">POST</td>\n                  <td class=\"p-2 border border-white/10\">No</td>\n                  <td class=\"p-2 border border-white/10\">No</td>\n                  <td class=\"p-2 border border-white/10\">Create new resource or trigger side-effects</td>\n                </tr>\n                <tr>\n                  <td class=\"p-2 border border-white/10 font-mono text-secondary font-bold\">PUT</td>\n                  <td class=\"p-2 border border-white/10\">No</td>\n                  <td class=\"p-2 border border-white/10\">Yes</td>\n                  <td class=\"p-2 border border-white/10\">Completely replace an existing resource</td>\n                </tr>\n                <tr>\n                  <td class=\"p-2 border border-white/10 font-mono text-amber-400 font-bold\">PATCH</td>\n                  <td class=\"p-2 border border-white/10\">No</td>\n                  <td class=\"p-2 border border-white/10\">No</td>\n                  <td class=\"p-2 border border-white/10\">Partially update specific fields of a resource</td>\n                </tr>\n              </table>\n            </div>\n\n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1 mt-4\">HTTP Status Codes Cheat Sheet</h4>\n            <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2.5\">\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-emerald-500/20 text-[12px]\">\n                <strong class=\"text-emerald-400\">200 OK / 201 Created:</strong> Request succeeded cleanly.\n              </div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-secondary/20 text-[12px]\">\n                <strong class=\"text-secondary\">301 / 304 Not Modified:</strong> Redirections & cached responses.\n              </div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-amber-500/20 text-[12px]\">\n                <strong class=\"text-amber-400\">400 Bad Request / 401 Unauthorized / 404 Not Found:</strong> Client errors.\n              </div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-rose-500/20 text-[12px]\">\n                <strong class=\"text-rose-400\">500 Internal Error / 502 Bad Gateway:</strong> Server infrastructure errors.\n              </div>\n            </div>\n          </div>\n        ",
        "codeExample": "<!-- Standard HTML form submission (GET vs POST) -->\n<form action=\"/api/search\" method=\"GET\">\n  <label for=\"query\">Search Curriculum:</label>\n  <input type=\"search\" id=\"query\" name=\"q\" placeholder=\"e.g. Binary Search Trees\">\n  <button type=\"submit\">Search</button>\n</form>\n\n<!-- Asynchronous Fetch API for REST operations -->\n<script>\n  async function updateProfileName(newName) {\n    const res = await fetch('/api/user/profile', {\n      method: 'PATCH',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ full_name: newName })\n    });\n    return await res.json();\n  }\n</script>",
        "interviewTip": "Define idempotency clearly: An HTTP method is idempotent if executing it once has the exact same side-effect on server state as executing it 100 times (e.g. GET, PUT, DELETE).",
        "miniQuiz": {
          "q": "Which HTTP method is designed for partial modification of an existing resource?",
          "options": [
            "POST",
            "PUT",
            "PATCH",
            "UPDATE"
          ],
          "answer": 2,
          "explanation": "PATCH applies partial modifications to a resource, while PUT replaces the target resource representation entirely."
        }
      },
      {
        "id": "html-summary",
        "category": "STUDY PLAN & PREP",
        "title": "HTML Summary & Best Practices",
        "readTime": "4 min read",
        "xp": 40,
        "summary": "Executive summary of HTML5 core standards, clean nesting rules, and validation guidelines.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>HTML (HyperText Markup Language) is the backbone of all web applications. Here is the concise summary of architectural guidelines:</p>\n            <div class=\"space-y-2\">\n              <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\">\n                <strong class=\"text-white font-semibold\">1. Always declare DOCTYPE:</strong> Ensures modern rendering engines trigger standard mode instead of quirks mode.\n              </div>\n              <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\">\n                <strong class=\"text-white font-semibold\">2. Always declare language:</strong> Use <code>&lt;html lang=\"en\"&gt;</code> to guide text-to-speech tools and translation engines.\n              </div>\n              <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\">\n                <strong class=\"text-white font-semibold\">3. Use lowercase tag names:</strong> While HTML is case-insensitive, W3C standards prescribe lowercase element and attribute names.\n              </div>\n              <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\">\n                <strong class=\"text-white font-semibold\">4. Always provide <code>alt</code> on images:</strong> Screen readers and fallback renderers depend on meaningful alternative text.\n              </div>\n            </div>\n          </div>\n        ",
        "codeExample": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>SmartLearn Clean Summary</title>\n</head>\n<body>\n  <h1>Clean Semantic Architecture</h1>\n  <p>Follow W3C standards for optimal SEO and accessibility.</p>\n</body>\n</html>",
        "interviewTip": "Interviewers often ask how to validate an HTML document. Mention the official W3C Markup Validation Service (validator.w3.org).",
        "miniQuiz": {
          "q": "Why should every HTML page declare the lang attribute on the <html> tag?",
          "options": [
            "To change font family",
            "To aid screen readers, translation engines, and search indexing",
            "To enforce server-side locale",
            "To speed up CSS parsing"
          ],
          "answer": 1,
          "explanation": "Declaring lang=\"en\" allows assistive screen readers to pronounce words with the correct dialect and assists translation engines."
        }
      },
      {
        "id": "html-accessibility",
        "category": "STUDY PLAN & PREP",
        "title": "HTML Accessibility (a11y) & ARIA",
        "readTime": "6 min read",
        "xp": 50,
        "summary": "WCAG compliance guidelines, ARIA roles, live regions, and semantic landmark elements.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Web accessibility ensures that websites, tools, and technologies are designed and developed so that people with disabilities can use them.</p>\n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">First Rule of ARIA</h4>\n            <blockquote class=\"p-3 rounded-xl bg-surface-container-high border-l-4 border-amber-400 text-slate-200 text-[13px]\">\n              \"If you can use a native HTML element or attribute with the semantics and behavior already built in, then do so instead of re-purposing an element and adding ARIA.\"\n            </blockquote>\n            <p>Use native <code>&lt;button&gt;</code> instead of <code>&lt;div onclick=\"...\" role=\"button\"&gt;</code>.</p>\n          </div>\n        ",
        "codeExample": "<!-- Accessible Modal Dialog with proper ARIA attributes -->\n<div role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"dialog-title\" aria-describedby=\"dialog-desc\">\n  <h2 id=\"dialog-title\">Confirm Enrollment</h2>\n  <p id=\"dialog-desc\">Are you sure you want to enroll in the Data Structures track?</p>\n  <button type=\"button\" aria-label=\"Close dialog\">Cancel</button>\n  <button type=\"button\">Confirm</button>\n</div>",
        "interviewTip": "Remember the POUR principles of WCAG: Perceivable, Operable, Understandable, Robust.",
        "miniQuiz": {
          "q": "What is the First Rule of ARIA in web accessibility?",
          "options": [
            "Always add role=\"button\" to div elements",
            "Use native semantic HTML elements whenever possible instead of ARIA",
            "Never use alt text on images",
            "ARIA is only required for mobile devices"
          ],
          "answer": 1,
          "explanation": "Native HTML elements have built-in keyboard navigation and screen-reader behaviors that ARIA requires custom JavaScript to emulate."
        }
      },
      {
        "id": "html-global-attributes",
        "category": "HTML REFERENCES",
        "title": "HTML Global Attributes",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "Detailed guide to hidden, title, draggable, spellcheck, translate, and dir global attributes.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Global attributes are attributes common to all HTML elements; they can be used on all elements, though they may have no effect on some.</p>\n            <ul class=\"list-disc list-inside space-y-1.5 ml-2\">\n              <li><code>hidden</code>: Boolean attribute indicating that the element is not yet, or is no longer, directly relevant.</li>\n              <li><code>draggable</code>: Enumerated attribute (<code>true</code> or <code>false</code>) indicating whether the element can be dragged.</li>\n              <li><code>spellcheck</code>: Enumerated attribute (<code>true</code> or <code>false</code>) indicating if element is to have its spelling/grammar checked.</li>\n              <li><code>dir</code>: Text direction (<code>ltr</code>, <code>rtl</code>, <code>auto</code>).</li>\n            </ul>\n          </div>\n        ",
        "codeExample": "<div draggable=\"true\" ondragstart=\"console.log('Dragging started')\" class=\"draggable-card\">\n  <p spellcheck=\"true\" contenteditable=\"true\">Drag this card or edit text!</p>\n</div>",
        "interviewTip": "Notice the difference between the <code>hidden</code> HTML attribute and CSS <code>display: none</code>: CSS overrides the hidden attribute unless styled with [hidden] { display: none !important; }.",
        "miniQuiz": {
          "q": "Which global attribute specifies whether an element can be dragged using native Drag and Drop APIs?",
          "options": [
            "movable",
            "draggable",
            "drag",
            "can-drag"
          ],
          "answer": 1,
          "explanation": "The draggable attribute is an enumerated attribute (true/false) used to define drag behavior."
        }
      },
      {
        "id": "html-browser-support",
        "category": "HTML REFERENCES",
        "title": "HTML Browser Support & CanIUse",
        "readTime": "4 min read",
        "xp": 35,
        "summary": "Cross-browser compatibility testing, polyfills, progressive enhancement, and feature detection.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Browser support matrix testing across Chromium, Gecko (Firefox), and WebKit (Safari). Always verify bleeding-edge HTML5 APIs using Modernizr or feature queries.</p>\n          </div>\n        ",
        "codeExample": "<script>\n  if ('IntersectionObserver' in window) {\n    console.log('Modern viewport lazy loading supported!');\n  } else {\n    console.log('Fallback to immediate content loading.');\n  }\n</script>",
        "interviewTip": "Explain Progressive Enhancement: Start with baseline core HTML content accessible to all browsers, then enhance with CSS and JavaScript for modern environments.",
        "miniQuiz": {
          "q": "Which strategy builds a baseline functional version first, then adds advanced features for capable browsers?",
          "options": [
            "Graceful Degradation",
            "Progressive Enhancement",
            "Server-Side Rendering",
            "Responsive Retrofitting"
          ],
          "answer": 1,
          "explanation": "Progressive Enhancement ensures essential content is reachable everywhere while modern browsers get an enhanced experience."
        }
      },
      {
        "id": "html-events",
        "category": "HTML REFERENCES",
        "title": "HTML Events Reference",
        "readTime": "6 min read",
        "xp": 50,
        "summary": "Window events, form events, keyboard events, mouse events, and clipboard events.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>HTML elements trigger DOM events when users interact with the page or when the browser environment changes state.</p>\n            <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]\">\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-white/5\"><strong class=\"text-white\">Mouse:</strong> onclick, ondblclick, onmouseenter, onmouseleave</div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-white/5\"><strong class=\"text-white\">Keyboard:</strong> onkeydown, onkeyup</div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-white/5\"><strong class=\"text-white\">Form:</strong> onsubmit, onchange, oninput, onfocus, onblur</div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-white/5\"><strong class=\"text-white\">Window:</strong> onload, onresize, onscroll</div>\n            </div>\n          </div>\n        ",
        "codeExample": "<input type=\"text\" id=\"username\" placeholder=\"Type here...\" oninput=\"handleInput(event)\">\n<p id=\"output\"></p>\n\n<script>\n  function handleInput(e) {\n    document.getElementById('output').textContent = 'You typed: ' + e.target.value;\n  }\n</script>",
        "interviewTip": "Understand the three phases of DOM event propagation: 1. Capturing Phase, 2. Target Phase, 3. Bubbling Phase.",
        "miniQuiz": {
          "q": "Which event fires immediately whenever the value of an <input> element changes via keystrokes?",
          "options": [
            "onchange",
            "oninput",
            "onselect",
            "onblur"
          ],
          "answer": 1,
          "explanation": "oninput fires synchronously every time the value changes, whereas onchange only fires when the input loses focus."
        }
      },
      {
        "id": "html-colors",
        "category": "HTML REFERENCES",
        "title": "HTML Colors: HEX, RGB, HSL",
        "readTime": "5 min read",
        "xp": 40,
        "summary": "Color systems in web standards: named colors, hexadecimal notation, RGB(A), and modern HSL(A) palettes.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Colors in HTML and CSS can be specified using color names, HEX codes, RGB, and HSL values.</p>\n            <ul class=\"list-disc list-inside space-y-1 ml-2\">\n              <li><strong class=\"text-white\">HEX:</strong> <code>#6366f1</code> (Red: 63, Green: 66, Blue: F1)</li>\n              <li><strong class=\"text-white\">RGB(A):</strong> <code>rgba(99, 102, 241, 0.8)</code></li>\n              <li><strong class=\"text-white\">HSL(A):</strong> <code>hsl(239, 84%, 67%)</code> (Hue, Saturation, Lightness)</li>\n            </ul>\n          </div>\n        ",
        "codeExample": "<div style=\"display: flex; gap: 10px;\">\n  <div style=\"background-color: #6366f1; color: white; padding: 15px; border-radius: 8px;\">Indigo (HEX)</div>\n  <div style=\"background-color: rgb(16, 185, 129); color: white; padding: 15px; border-radius: 8px;\">Emerald (RGB)</div>\n  <div style=\"background-color: hsl(199, 89%, 48%); color: white; padding: 15px; border-radius: 8px;\">Sky (HSL)</div>\n</div>",
        "interviewTip": "HSL is preferred for dynamic theming because adjusting lightness (L) lets you easily generate hover and focus tints without changing the hue or saturation.",
        "miniQuiz": {
          "q": "What does the \"A\" stand for in RGBA and HSLA color notations?",
          "options": [
            "Accuracy",
            "Alpha (Opacity / Transparency)",
            "Angle",
            "Array"
          ],
          "answer": 1,
          "explanation": "Alpha specifies opacity from 0.0 (fully transparent) to 1.0 (fully opaque)."
        }
      },
      {
        "id": "html-canvas",
        "category": "HTML REFERENCES",
        "title": "HTML5 Canvas 2D Graphics API",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Direct pixel manipulation, rendering paths, rectangles, circles, and animation loops.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>The HTML <code>&lt;canvas&gt;</code> element is used to draw graphics on the fly via JavaScript. It is resolution-dependent and bitmap-based.</p>\n          </div>\n        ",
        "codeExample": "<canvas id=\"demoCanvas\" width=\"300\" height=\"150\" style=\"background:#0f172a; border-radius:8px;\"></canvas>\n<script>\n  const canvas = document.getElementById('demoCanvas');\n  const ctx = canvas.getContext('2d');\n  ctx.fillStyle = '#6366f1';\n  ctx.fillRect(20, 20, 100, 60);\n  ctx.fillStyle = '#10b981';\n  ctx.beginPath();\n  ctx.arc(200, 50, 30, 0, Math.PI * 2);\n  ctx.fill();\n</script>",
        "interviewTip": "Contrast Canvas with SVG: Canvas is pixel/bitmap based and optimal for high-frequency game rendering; SVG is vector/DOM-based and optimal for scalable icons and charts.",
        "miniQuiz": {
          "q": "Which method obtains the 2D rendering context for drawing on a <canvas>?",
          "options": [
            "canvas.getContext(\"2d\")",
            "canvas.get2DContext()",
            "canvas.createContext()",
            "canvas.render2D()"
          ],
          "answer": 0,
          "explanation": "canvas.getContext(\"2d\") returns the CanvasRenderingContext2D object used for vector drawing."
        }
      },
      {
        "id": "html-audio-video",
        "category": "HTML REFERENCES",
        "title": "HTML5 Audio & Video Media APIs",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "Native multimedia players, codec compatibility (MP4/H.264, WebM), and programmatic controls.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>HTML5 eliminated the need for third-party media plugins (like Flash) by introducing native <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> tags.</p>\n          </div>\n        ",
        "codeExample": "<video width=\"320\" height=\"180\" controls poster=\"https://via.placeholder.com/320x180\">\n  <source src=\"movie.mp4\" type=\"video/mp4\">\n  <source src=\"movie.webm\" type=\"video/webm\">\n  Your browser does not support the video tag.\n</video>",
        "interviewTip": "Why provide multiple &lt;source&gt; tags? Different web browsers support different video codecs (e.g. H.264 vs AV1 vs VP9); the browser plays the first compatible format.",
        "miniQuiz": {
          "q": "Which attribute displays an image while the video is downloading or until the user hits the play button?",
          "options": [
            "preview",
            "thumbnail",
            "poster",
            "cover"
          ],
          "answer": 2,
          "explanation": "The poster attribute specifies an image URL displayed until the user plays the video."
        }
      },
      {
        "id": "html-doctypes",
        "category": "HTML REFERENCES",
        "title": "HTML Doctypes & Rendering Modes",
        "readTime": "4 min read",
        "xp": 35,
        "summary": "History of DOCTYPE declarations from HTML 4.01 Strict, XHTML 1.0 to HTML5, and Quirks Mode implications.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>The DOCTYPE declaration must always be the very first line of any HTML file before the <code>&lt;html&gt;</code> tag.</p>\n            <p>In HTML5, the DOCTYPE is simply: <code>&lt;!DOCTYPE html&gt;</code>.</p>\n          </div>\n        ",
        "codeExample": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Standard Mode Document</title>\n</head>\n<body>\n  <p>Rendered in Full Standards Mode.</p>\n</body>\n</html>",
        "interviewTip": "If DOCTYPE is omitted, modern browsers render in Quirks Mode, which emulates Netscape 4 and Internet Explorer 5 layout bugs.",
        "miniQuiz": {
          "q": "What mode will a browser render a web page in if the DOCTYPE declaration is missing?",
          "options": [
            "Strict Mode",
            "Quirks Mode",
            "Standard Mode",
            "Sandbox Mode"
          ],
          "answer": 1,
          "explanation": "Omitting DOCTYPE triggers Quirks Mode to support backward compatibility with outdated 1990s web code."
        }
      },
      {
        "id": "html-character-sets",
        "category": "HTML REFERENCES",
        "title": "HTML Character Sets & UTF-8",
        "readTime": "4 min read",
        "xp": 35,
        "summary": "Character encoding standards: ASCII, ANSI, ISO-8859-1, and universal UTF-8 representation.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>To display an HTML page correctly, the browser must know the character set used. Modern web standards mandate UTF-8.</p>\n            <p>UTF-8 covers almost all characters and symbols in the world, including all human languages and emoji.</p>\n          </div>\n        ",
        "codeExample": "<meta charset=\"UTF-8\">",
        "interviewTip": "Always place <code>&lt;meta charset=\"UTF-8\"&gt;</code> as the first child of <code>&lt;head&gt;</code> so the browser recognizes the encoding before encountering text.",
        "miniQuiz": {
          "q": "What is the recommended universal character encoding for all modern HTML5 pages?",
          "options": [
            "ISO-8859-1",
            "ASCII",
            "UTF-8",
            "Windows-1252"
          ],
          "answer": 2,
          "explanation": "UTF-8 is the default universal standard encoding capable of representing all Unicode characters."
        }
      },
      {
        "id": "html-url-encode",
        "category": "HTML REFERENCES",
        "title": "HTML URL Encoding & Percent Encoding",
        "readTime": "4 min read",
        "xp": 40,
        "summary": "How non-ASCII and reserved characters are converted into %XX hex triplets for URI safety.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>URLs can only be sent over the Internet using the ASCII character set. Unsafe characters are replaced with a <code>%</code> followed by two hexadecimal digits.</p>\n            <ul class=\"list-disc list-inside space-y-1 ml-2\">\n              <li>Space: <code>%20</code> or <code>+</code></li>\n              <li>Exclamation (!): <code>%21</code></li>\n              <li>Question mark (?): <code>%3F</code></li>\n              <li>Ampersand (&amp;): <code>%26</code></li>\n            </ul>\n          </div>\n        ",
        "codeExample": "<script>\n  const query = \"SmartLearn & SIH 2026\";\n  const encoded = encodeURIComponent(query);\n  console.log(encoded); // \"SmartLearn%20%26%20SIH%202026\"\n</script>",
        "interviewTip": "Contrast <code>encodeURI()</code> with <code>encodeURIComponent()</code>: <code>encodeURIComponent()</code> encodes reserved characters like &, ?, and / making it ideal for query string parameters.",
        "miniQuiz": {
          "q": "What is the URL percent-encoded representation for a space character?",
          "options": [
            "%00",
            "%20",
            "%50",
            "%99"
          ],
          "answer": 1,
          "explanation": "ASCII code 32 (decimal) is 0x20 in hex, which encodes as %20."
        }
      },
      {
        "id": "html-lang-codes",
        "category": "HTML REFERENCES",
        "title": "HTML Language Codes (ISO 639-1)",
        "readTime": "4 min read",
        "xp": 35,
        "summary": "ISO two-letter language codes and region sub-tags (en-US, hi-IN, fr-FR) for global accessibility.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Language codes in the <code>lang</code> attribute inform browsers and screen readers of the linguistic context.</p>\n            <ul class=\"list-disc list-inside space-y-1 ml-2\">\n              <li><code>en</code>: English</li>\n              <li><code>hi</code>: Hindi (India)</li>\n              <li><code>es</code>: Spanish</li>\n              <li><code>zh</code>: Chinese</li>\n              <li><code>fr</code>: French</li>\n            </ul>\n          </div>\n        ",
        "codeExample": "<html lang=\"hi-IN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>स्मार्टलर्न - स्मार्ट शिक्षा</title>\n</head>\n<body>\n  <h1>स्मार्टलर्न में आपका स्वागत है</h1>\n</body>\n</html>",
        "interviewTip": "Adding region tags (e.g. <code>en-US</code> vs <code>en-GB</code>) ensures speech synthesis uses correct accent and phonetic dictionary.",
        "miniQuiz": {
          "q": "Which ISO standard defines the two-letter language codes used in HTML?",
          "options": [
            "ISO 9001",
            "ISO 639-1",
            "ISO 27001",
            "ISO 3166"
          ],
          "answer": 1,
          "explanation": "ISO 639-1 provides two-letter language identifier codes."
        }
      },
      {
        "id": "http-messages",
        "category": "HTML REFERENCES",
        "title": "HTTP Messages & Header Structures",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "Anatomy of HTTP Request and Response packets: Headers, Body, Status Lines, and Cookies.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Every web communication consists of an HTTP Request from client to server and an HTTP Response back.</p>\n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">Key Headers</h4>\n            <ul class=\"list-disc list-inside space-y-1 ml-2\">\n              <li><code>Content-Type: application/json</code></li>\n              <li><code>Authorization: Bearer &lt;token&gt;</code></li>\n              <li><code>Cache-Control: max-age=3600</code></li>\n              <li><code>CORS: Access-Control-Allow-Origin: *</code></li>\n            </ul>\n          </div>\n        ",
        "codeExample": "// Inspecting HTTP response headers via fetch\nfetch('/api/status')\n  .then(response => {\n    console.log('Status:', response.status);\n    console.log('Content-Type:', response.headers.get('Content-Type'));\n  });",
        "interviewTip": "Be prepared to explain CORS (Cross-Origin Resource Sharing) and preflight <code>OPTIONS</code> requests triggered by custom headers.",
        "miniQuiz": {
          "q": "Which HTTP method does a browser send as a CORS preflight request to verify allowed origins?",
          "options": [
            "HEAD",
            "OPTIONS",
            "CONNECT",
            "TRACE"
          ],
          "answer": 1,
          "explanation": "Browsers automatically issue an HTTP OPTIONS preflight request before sending certain cross-origin requests."
        }
      },
      {
        "id": "px-to-em",
        "category": "HTML REFERENCES",
        "title": "PX to EM / REM Responsive Converter",
        "readTime": "4 min read",
        "xp": 40,
        "summary": "Mathematical formulas and differences between absolute pixels, parent-relative em, and root-relative rem.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Formulas for responsive web typography:</p>\n            <div class=\"p-3 rounded-xl bg-surface-container border border-white/5 font-mono text-[13px] text-emerald-400\">\n              rem = Target_Pixels / Root_Font_Size (typically 16px)\n            </div>\n            <p>If base font size is 16px: <strong>24px = 1.5rem</strong>, <strong>32px = 2rem</strong>, <strong>12px = 0.75rem</strong>.</p>\n          </div>\n        ",
        "codeExample": "/* Using REM for accessible scalable sizing */\nhtml {\n  font-size: 16px; /* Browser default root size */\n}\n\nh1 {\n  font-size: 2rem; /* 32px */\n  margin-bottom: 1rem; /* 16px */\n}",
        "interviewTip": "Why is REM better than PX for typography? Users who change browser default font size for visual impairment will have REM text resize properly, while PX text remains stubbornly fixed.",
        "miniQuiz": {
          "q": "What is the rem equivalent of 24px when root html font-size is 16px?",
          "options": [
            "1.25rem",
            "1.5rem",
            "1.75rem",
            "2rem"
          ],
          "answer": 1,
          "explanation": "24 / 16 = 1.5rem."
        }
      },
      {
        "id": "keyboard-shortcuts",
        "category": "HTML REFERENCES",
        "title": "Web Dev & DevTools Keyboard Shortcuts",
        "readTime": "4 min read",
        "xp": 35,
        "summary": "Essential keyboard accelerators for Chrome DevTools, VS Code, and terminal workflows.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Productivity shortcuts for frontend engineers:</p>\n            <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]\">\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-white/5\"><strong class=\"text-white\">Inspect Element:</strong> Ctrl + Shift + C (Win) / Cmd + Shift + C (Mac)</div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-white/5\"><strong class=\"text-white\">Console Drawer:</strong> ESC in DevTools</div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-white/5\"><strong class=\"text-white\">Hard Refresh:</strong> Ctrl + F5 or Ctrl + Shift + R</div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-white/5\"><strong class=\"text-white\">Format Code:</strong> Shift + Alt + F (VS Code)</div>\n            </div>\n          </div>\n        ",
        "codeExample": "<!-- Built-in accesskey shortcut attribute in HTML -->\n<button accesskey=\"s\" onclick=\"alert('Saved!')\">\n  <u>S</u>ave (Alt + Shift + S)\n</button>",
        "interviewTip": "The <code>accesskey</code> attribute specifies a shortcut key to activate or focus an element directly via keyboard.",
        "miniQuiz": {
          "q": "Which DevTools shortcut toggles the Element Inspector cursor to inspect any DOM node?",
          "options": [
            "Ctrl + Shift + C",
            "Ctrl + Shift + P",
            "F12 only",
            "Alt + Tab"
          ],
          "answer": 0,
          "explanation": "Ctrl + Shift + C (or Cmd + Option + C on macOS) immediately activates the inspect element tool."
        }
      }
    ],
    "css": [
      {
        "id": "css-box-model",
        "category": "CSS FUNDAMENTALS",
        "title": "CSS Box Model & Box-Sizing",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "Detailed explanation of Content, Padding, Border, Margin and border-box calculations.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Every HTML element rendered in a browser engine is represented as a rectangular box. Understanding the box model is the foundational bedrock of all modern CSS layout engineering.</p>\n\n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">The 4 Concentric Layers</h4>\n            <div class=\"grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[12px]\">\n              <div class=\"p-3 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300\">\n                <strong>Content</strong><br/>Actual text, image, or child elements\n              </div>\n              <div class=\"p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300\">\n                <strong>Padding</strong><br/>Clears area around content; inherits background\n              </div>\n              <div class=\"p-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300\">\n                <strong>Border</strong><br/>Wraps padding and content\n              </div>\n              <div class=\"p-3 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300\">\n                <strong>Margin</strong><br/>Transparent space separating from siblings\n              </div>\n            </div>\n\n            <h4 class=\"text-[16px] font-bold text-white mt-4 border-b border-white/10 pb-1\">content-box vs border-box</h4>\n            <p>By default, CSS elements use <code>box-sizing: content-box</code>, meaning if you set <code>width: 300px; padding: 20px; border: 2px solid;</code>, the actual rendered element width becomes <strong>344px</strong>!</p>\n            <p>With <code>box-sizing: border-box</code>, the padding and border are absorbed <em>inside</em> the 300px declared width.</p>\n          </div>\n        ",
        "codeExample": "/* Universal box-sizing reset - standard in all modern production code */\n*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.card {\n  width: 300px;\n  padding: 24px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  margin-bottom: 16px;\n  background-color: #1e293b;\n  border-radius: 12px;\n}",
        "interviewTip": "Why does margin collapse occur? Top and bottom margins of adjoining in-flow block boxes combine into a single margin whose size is the maximum of the individual margins.",
        "miniQuiz": {
          "q": "If an element has width: 200px, padding: 20px, and box-sizing: border-box, what is the total rendered width?",
          "options": [
            "240px",
            "200px",
            "220px",
            "180px"
          ],
          "answer": 1,
          "explanation": "Under box-sizing: border-box, padding is included inside the declared width, so the rendered width remains exactly 200px."
        }
      },
      {
        "id": "css-flexbox",
        "category": "CSS LAYOUT ARCHITECTURE",
        "title": "Flexbox Architecture & Alignment",
        "readTime": "6 min read",
        "xp": 55,
        "summary": "One-dimensional layout model: main-axis, cross-axis, justify-content, align-items, and flex-grow.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>The Flexible Box Module provides a high-efficiency mechanism for laying out, aligning, and distributing space among items in a container even when their sizes are dynamic.</p>\n            \n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">Container Properties</h4>\n            <ul class=\"list-disc list-inside space-y-1 ml-2\">\n              <li><code>flex-direction: row | column | row-reverse | column-reverse</code></li>\n              <li><code>justify-content: flex-start | center | flex-end | space-between | space-around</code> (Controls main-axis)</li>\n              <li><code>align-items: stretch | center | flex-start | flex-end | baseline</code> (Controls cross-axis)</li>\n              <li><code>flex-wrap: nowrap | wrap | wrap-reverse</code></li>\n              <li><code>gap: 1rem</code> (Native spacing without margin hacks)</li>\n            </ul>\n          </div>\n        ",
        "codeExample": ".navbar-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n  padding: 1rem 2rem;\n}\n\n.search-input-wrapper {\n  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */\n  max-width: 500px;\n}",
        "interviewTip": "To center an element horizontally and vertically in one line with flexbox: <code>display: flex; justify-content: center; align-items: center;</code> or <code>display: flex; margin: auto;</code> on the child.",
        "miniQuiz": {
          "q": "Which Flexbox property aligns flex items along the cross-axis?",
          "options": [
            "justify-content",
            "align-items",
            "align-content",
            "flex-direction"
          ],
          "answer": 1,
          "explanation": "align-items controls alignment along the cross axis (perpendicular to the main axis defined by flex-direction)."
        }
      },
      {
        "id": "css-grid",
        "category": "CSS LAYOUT ARCHITECTURE",
        "title": "CSS Grid System & Responsive Auto-Fit",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Two-dimensional grid layouts, grid-template-columns, minmax(), and repeat(auto-fit).",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>CSS Grid is the only native 2-dimensional CSS layout engine, enabling precise simultaneous control over rows and columns.</p>\n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">The Magic Auto-Responsive Formula</h4>\n            <p>Create completely responsive card layouts without writing a single media query:</p>\n            <pre class=\"bg-surface-container-high p-3 rounded-lg text-emerald-300 font-mono text-[13px]\">grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));</pre>\n          </div>\n        ",
        "codeExample": ".card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}",
        "interviewTip": "What is the difference between <code>auto-fill</code> and <code>auto-fit</code>? <code>auto-fill</code> reserves empty column tracks if space allows, while <code>auto-fit</code> collapses empty tracks so existing items stretch to fill the entire container.",
        "miniQuiz": {
          "q": "Which function in CSS Grid allows defining both a minimum and maximum size for track sizing?",
          "options": [
            "clamp()",
            "minmax()",
            "fit-content()",
            "repeat()"
          ],
          "answer": 1,
          "explanation": "minmax(min, max) defines a size range greater than or equal to min and less than or equal to max."
        }
      },
      {
        "id": "css-selectors",
        "category": "CSS SELECTORS & SPECIFICITY",
        "title": "CSS Selectors & Specificity Matrix",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "Class, ID, Attribute, Pseudo-classes, and specificity calculations (Inline > ID > Class > Element).",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>CSS Specificity determines which style rules take precedence when multiple conflicting declarations match an element.</p>\n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">The Specificity Hierarchy</h4>\n            <div class=\"grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[12px]\">\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-rose-500/30 text-rose-400 font-mono\">\n                <strong>(1,0,0,0)</strong><br/>Inline styles\n              </div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-amber-500/30 text-amber-400 font-mono\">\n                <strong>(0,1,0,0)</strong><br/>ID selectors (#id)\n              </div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-secondary/30 text-secondary font-mono\">\n                <strong>(0,0,1,0)</strong><br/>Classes (.cls), [attr], :pseudo\n              </div>\n              <div class=\"p-2.5 rounded-lg bg-surface-container border border-emerald-500/30 text-emerald-400 font-mono\">\n                <strong>(0,0,0,1)</strong><br/>Elements (div, p, ::before)\n              </div>\n            </div>\n          </div>\n        ",
        "codeExample": "/* Specificity: (0, 0, 1, 1) - One class + one element */\nul.nav-list li {\n  color: #94a3b8;\n}\n\n/* Specificity: (0, 1, 0, 0) - One ID (Higher precedence!) */\n#primary-nav {\n  color: #6366f1;\n}",
        "interviewTip": "What happens with <code>!important</code>? It overrides normal specificity entirely. If two conflicting rules both have <code>!important</code>, normal specificity breaks the tie.",
        "miniQuiz": {
          "q": "Which selector has higher CSS specificity?",
          "options": [
            "div.container .card p",
            "#sidebar p",
            "html body div p",
            ".nav-item:hover"
          ],
          "answer": 1,
          "explanation": "#sidebar p contains an ID selector (0,1,0,1), which beats any combination of classes without IDs."
        }
      },
      {
        "id": "css-transitions",
        "category": "CSS ANIMATIONS",
        "title": "CSS Transitions & Keyframe Animations",
        "readTime": "6 min read",
        "xp": 55,
        "summary": "GPU-accelerated transforms (translate, scale, rotate), transition-timing-function, and keyframes.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Always animate <strong>transform</strong> and <strong>opacity</strong> to achieve 60/120 FPS hardware acceleration that avoids triggering browser reflows and repaints.</p>\n          </div>\n        ",
        "codeExample": "@keyframes pulseGlow {\n  0%, 100% {\n    transform: scale(1);\n    box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);\n  }\n  50% {\n    transform: scale(1.04);\n    box-shadow: 0 0 25px rgba(99, 102, 241, 0.8);\n  }\n}\n\n.uiverse-button {\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.uiverse-button:hover {\n  animation: pulseGlow 1.5s infinite;\n}",
        "interviewTip": "Why avoid animating <code>width</code>, <code>height</code>, or <code>top</code>/<code>left</code>? They trigger full Layout/Reflow recalculations on the CPU, causing frame drops.",
        "miniQuiz": {
          "q": "Which CSS properties are composite-only and can be animated smoothly on the GPU without triggering layout reflows?",
          "options": [
            "width and height",
            "transform and opacity",
            "margin and padding",
            "top and left"
          ],
          "answer": 1,
          "explanation": "transform and opacity can be handled directly by the GPU compositor thread without forcing CPU style reflows."
        }
      }
    ],
    "javascript": [
      {
        "id": "js-event-loop",
        "category": "JAVASCRIPT CORE & ENGINE",
        "title": "The JavaScript Event Loop & Concurrency",
        "readTime": "7 min read",
        "xp": 75,
        "summary": "Call Stack, Web APIs, Microtask Queue (Promises), and Macrotask Queue (setTimeout).",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>JavaScript is a <strong class=\"text-white\">single-threaded, non-blocking asynchronous concurrent runtime</strong>. The event loop continuously monitors the Call Stack and task queues.</p>\n\n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">Queue Priority Execution Order</h4>\n            <ol class=\"list-decimal list-inside space-y-1.5 ml-2\">\n              <li><strong class=\"text-emerald-400\">Call Stack:</strong> Synchronous code executes immediately until stack is completely empty.</li>\n              <li><strong class=\"text-secondary\">Microtask Queue:</strong> <code>Promise.then()</code>, <code>catch()</code>, <code>finally()</code>, <code>queueMicrotask()</code>, <code>MutationObserver</code>. Executed completely before any macrotask!</li>\n              <li><strong class=\"text-amber-400\">Macrotask Queue (Task Queue):</strong> <code>setTimeout()</code>, <code>setInterval()</code>, <code>I/O</code>, UI rendering callbacks.</li>\n            </ol>\n          </div>\n        ",
        "codeExample": "console.log('1: Synchronous Start');\n\nsetTimeout(() => {\n  console.log('4: Macrotask (setTimeout)');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('3: Microtask (Promise)');\n});\n\nconsole.log('2: Synchronous End');\n\n// Expected Output Order:\n// 1: Synchronous Start\n// 2: Synchronous End\n// 3: Microtask (Promise)\n// 4: Macrotask (setTimeout)",
        "interviewTip": "Always remember: Microtasks are drained completely to exhaustion after every single task before the event loop picks up the next macrotask.",
        "miniQuiz": {
          "q": "Between setTimeout(..., 0) and Promise.resolve().then(...), which callback executes first?",
          "options": [
            "setTimeout",
            "Promise.then",
            "Both simultaneously",
            "Whichever was registered first"
          ],
          "answer": 1,
          "explanation": "Promises enter the Microtask queue, which has higher execution priority and is drained before macrotasks like setTimeout."
        }
      },
      {
        "id": "js-closures",
        "category": "JAVASCRIPT CORE & ENGINE",
        "title": "Closures & Lexical Scope",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "How inner functions retain access to their outer lexical environment even after the outer function returns.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>A <strong class=\"text-white\">closure</strong> is the combination of a function bundled together with references to its surrounding lexical state (the lexical environment).</p>\n            <p>Common practical uses: Data privacy (private variables), function factories, and memoization caches.</p>\n          </div>\n        ",
        "codeExample": "function createCounter(initialValue = 0) {\n  let count = initialValue; // Private variable enclosed in scope\n\n  return {\n    increment() { count++; return count; },\n    decrement() { count--; return count; },\n    getValue() { return count; }\n  };\n}\n\nconst counter = createCounter(10);\nconsole.log(counter.increment()); // 11\nconsole.log(counter.increment()); // 12\nconsole.log(counter.count);       // undefined (protected encapsulation!)",
        "interviewTip": "Closures can cause memory leaks if retained references in event listeners or global caches prevent the JavaScript garbage collector from releasing unused memory.",
        "miniQuiz": {
          "q": "What enables a JavaScript function to access variables from its parent function even after the parent has finished executing?",
          "options": [
            "Hoisting",
            "Closures & Lexical Scope",
            "Prototypal Inheritance",
            "Event Bubbling"
          ],
          "answer": 1,
          "explanation": "A closure retains a live reference to the outer lexical environment where the function was declared."
        }
      },
      {
        "id": "js-array-methods",
        "category": "JAVASCRIPT DATA & OBJECTS",
        "title": "Array Functional Methods: map, filter, reduce",
        "readTime": "6 min read",
        "xp": 55,
        "summary": "Immutable array transformations, chaining paradigms, and accumulator reduction patterns.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>Modern JavaScript prioritizes functional programming paradigms that transform arrays immutably without mutating original memory references.</p>\n          </div>\n        ",
        "codeExample": "const scores = [85, 92, 45, 78, 96, 62];\n\n// Filter passed scores, normalize by 10%, and calculate average\nconst passedAverage = scores\n  .filter(s => s >= 50)\n  .map(s => Math.min(100, s * 1.05))\n  .reduce((acc, curr, idx, arr) => acc + curr / arr.length, 0);\n\nconsole.log('Passed Curved Average:', Math.round(passedAverage));",
        "interviewTip": "What is the return value of <code>forEach()</code> vs <code>map()</code>? <code>forEach()</code> always returns <code>undefined</code> and is used for side-effects; <code>map()</code> allocates and returns a brand-new array.",
        "miniQuiz": {
          "q": "Which Array method reduces an entire array to a single cumulative value (like sum or object hash)?",
          "options": [
            "map()",
            "filter()",
            "reduce()",
            "find()"
          ],
          "answer": 2,
          "explanation": "reduce() runs a reducer callback on each element, passing the accumulated result to subsequent iterations."
        }
      },
      {
        "id": "js-promises",
        "category": "JAVASCRIPT ASYNC & APIS",
        "title": "Promises, Async/Await & Promise Combinators",
        "readTime": "7 min read",
        "xp": 65,
        "summary": "Promise states (Pending, Fulfilled, Rejected), try/catch async blocks, and Promise.all vs allSettled.",
        "contentHtml": "\n          <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n            <p>A <strong>Promise</strong> is a proxy for a value not necessarily known when the promise is created. <code>async/await</code> provides synchronous-looking syntax over Promise chains.</p>\n            <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">Promise Combinators</h4>\n            <ul class=\"list-disc list-inside space-y-1 ml-2 text-[13px]\">\n              <li><code>Promise.all([p1, p2])</code>: Rejects immediately if ANY promise rejects (fail-fast).</li>\n              <li><code>Promise.allSettled([p1, p2])</code>: Waits for ALL promises to complete, returning status and results for all.</li>\n              <li><code>Promise.race([p1, p2])</code>: Resolves or rejects as soon as the first promise settles.</li>\n            </ul>\n          </div>\n        ",
        "codeExample": "async function fetchStudentAnalytics(studentId) {\n  try {\n    const [profileRes, scoresRes] = await Promise.all([\n      fetch('/api/student/' + studentId),\n      fetch('/api/scores/' + studentId)\n    ]);\n    const profile = await profileRes.json();\n    const scores = await scoresRes.json();\n    return { profile, scores };\n  } catch (err) {\n    console.error('Fetch error:', err.message);\n    throw err;\n  }\n}",
        "interviewTip": "When should you use <code>Promise.allSettled</code> instead of <code>Promise.all</code>? When you want all independent operations to finish regardless of whether some succeed and some fail (e.g. multi-service status checks).",
        "miniQuiz": {
          "q": "What happens in Promise.all() if one of the promises rejects?",
          "options": [
            "It waits for the others and ignores the error",
            "It immediately rejects with the first encountered rejection error",
            "It returns null",
            "It retries the failed promise 3 times"
          ],
          "answer": 1,
          "explanation": "Promise.all is fail-fast: if any promise in the iterable rejects, the whole returned promise immediately rejects."
        }
      }
    ],
    "sql": [
      {
        "id": "sql-intro",
        "category": "SQL FUNDAMENTALS",
        "title": "SQL Syntax, SELECT & Filtering",
        "readTime": "4 min read",
        "xp": 40,
        "summary": "Basic SELECT queries, column aliases, WHERE clause operators, and ORDER BY sorting.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>SQL (Structured Query Language) is the standard language for storing, manipulating and retrieving data in relational databases.</p>\n          <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">Essential Clauses &amp; Execution Order</h4>\n          <ol class=\"list-decimal list-inside space-y-1.5 ml-2 text-[13px]\">\n            <li><code>FROM &amp; JOIN</code>: Identifies tables and combines rows.</li>\n            <li><code>WHERE</code>: Filters rows prior to aggregation.</li>\n            <li><code>GROUP BY</code>: Groups rows sharing properties.</li>\n            <li><code>HAVING</code>: Filters grouped rows.</li>\n            <li><code>SELECT</code>: Emits expressions and columns.</li>\n            <li><code>ORDER BY</code>: Sorts output ascending (ASC) or descending (DESC).</li>\n            <li><code>LIMIT / OFFSET</code>: Paginates results.</li>\n          </ol>\n        </div>\n      ",
        "codeExample": "-- Selecting active students ordered by GPA\nSELECT \n    student_id,\n    full_name,\n    cgpa,\n    enrollment_date\nFROM students\nWHERE is_active = TRUE AND cgpa >= 8.5\nORDER BY cgpa DESC\nLIMIT 5;",
        "interviewTip": "Remember the logical query processing order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT. This is why you cannot use column aliases created in SELECT inside WHERE clauses.",
        "miniQuiz": {
          "q": "Which clause in SQL filters rows before any aggregation takes place?",
          "options": [
            "HAVING",
            "WHERE",
            "ORDER BY",
            "GROUP BY"
          ],
          "answer": 1,
          "explanation": "WHERE filters individual base table records before GROUP BY, while HAVING filters aggregated summaries."
        }
      },
      {
        "id": "sql-joins-indexing",
        "category": "SQL & RELATIONAL ENGINES",
        "title": "SQL Joins, Indexing & Query Execution Plans",
        "readTime": "6 min read",
        "xp": 65,
        "summary": "Inner vs Outer Joins, B-Tree vs Hash Indexing, and EXPLAIN ANALYZE performance tuning.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Relational databases rely on relational algebra to combine datasets across normalized tables.</p>\n          <h4 class=\"text-[16px] font-bold text-white border-b border-white/10 pb-1\">B-Tree Indexes</h4>\n          <p>Indexes transform sequential table scans (O(n)) into balanced tree traversals (O(log n)). Always index columns frequently used in <code>WHERE</code> clauses and foreign key joins.</p>\n        </div>\n      ",
        "codeExample": "-- High-performance multi-table join with aggregation\nSELECT \n    s.id AS student_id,\n    s.full_name,\n    COUNT(e.course_id) AS total_enrolled,\n    ROUND(AVG(q.score_percentage), 1) AS avg_quiz_score\nFROM students s\nLEFT JOIN enrollments e ON s.id = e.student_id\nLEFT JOIN quiz_attempts q ON s.id = q.student_id\nWHERE s.is_active = TRUE\nGROUP BY s.id, s.full_name\nHAVING COUNT(e.course_id) >= 1\nORDER BY avg_quiz_score DESC\nLIMIT 10;",
        "interviewTip": "When asked why too many indexes can degrade database performance: While indexes speed up SELECT reads (O(log n)), every INSERT, UPDATE, and DELETE requires updating all corresponding B-Trees, increasing write latency.",
        "miniQuiz": {
          "q": "Which SQL clause is used to filter aggregated group records (created by GROUP BY)?",
          "options": [
            "WHERE",
            "HAVING",
            "FILTER",
            "LIMIT"
          ],
          "answer": 1,
          "explanation": "HAVING filters aggregated groups after the GROUP BY operation, while WHERE filters individual rows before grouping occurs."
        }
      },
      {
        "id": "sql-aggregates",
        "category": "SQL AGGREGATIONS & WINDOW FUNCTIONS",
        "title": "Aggregate Functions & Window Functions (OVER, PARTITION BY)",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "COUNT, SUM, AVG, and advanced window analytical functions (ROW_NUMBER, RANK, DENSE_RANK).",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Window functions perform a calculation across a set of table rows that are somehow related to the current row, without collapsing rows into a single summary row.</p>\n        </div>\n      ",
        "codeExample": "-- Rank students within each academic department\nSELECT \n    department,\n    full_name,\n    cgpa,\n    DENSE_RANK() OVER(PARTITION BY department ORDER BY cgpa DESC) as dept_rank\nFROM students;",
        "interviewTip": "Difference between RANK() and DENSE_RANK(): RANK() leaves gaps in sequence upon ties (1, 2, 2, 4), while DENSE_RANK() does not leave gaps (1, 2, 2, 3).",
        "miniQuiz": {
          "q": "Which analytical clause partitions window calculations into separate groups without collapsing rows?",
          "options": [
            "GROUP BY",
            "PARTITION BY",
            "DIVIDE BY",
            "SPLIT BY"
          ],
          "answer": 1,
          "explanation": "PARTITION BY inside the OVER() clause divides the result set into partitions to which the window function is applied."
        }
      }
    ],
    "python": [
      {
        "id": "py-memory-model",
        "category": "PYTHON INTERNALS",
        "title": "Python Memory Model & Mutable vs Immutable",
        "readTime": "6 min read",
        "xp": 55,
        "summary": "Variables as references, id(), pass-by-object-reference, and memory management.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>In Python, <strong class=\"text-white\">everything is an object</strong>. Variables do not store values directly; they are named bindings/references to objects in heap memory.</p>\n          <ul class=\"list-disc list-inside space-y-1 ml-2\">\n            <li><strong class=\"text-emerald-400\">Immutable:</strong> <code>int</code>, <code>float</code>, <code>str</code>, <code>tuple</code>, <code>frozenset</code>. Modifying creates a brand new object.</li>\n            <li><strong class=\"text-rose-400\">Mutable:</strong> <code>list</code>, <code>dict</code>, <code>set</code>, custom classes. Modified in-place.</li>\n          </ul>\n        </div>\n      ",
        "codeExample": "# Demonstrating default mutable argument trap\ndef append_item(item, target_list=[]): # AVOID mutable defaults!\n    target_list.append(item)\n    return target_list\n\nprint(append_item(1)) # [1]\nprint(append_item(2)) # [1, 2] -- The list was shared across invocations!\n\n# Correct Pythonic Pattern:\ndef append_item_clean(item, target_list=None):\n    if target_list is None:\n        target_list = []\n    target_list.append(item)\n    return target_list",
        "interviewTip": "Never use mutable objects (like lists or dictionaries) as default arguments in Python function signatures, because the default value is evaluated once when the function is defined, not each time it is called.",
        "miniQuiz": {
          "q": "Which of the following data types in Python is immutable?",
          "options": [
            "list",
            "dict",
            "set",
            "tuple"
          ],
          "answer": 3,
          "explanation": "Tuples are immutable sequences in Python; their elements cannot be added, removed, or re-assigned once constructed."
        }
      },
      {
        "id": "py-list-comprehensions",
        "category": "PYTHONIC IDIOMS",
        "title": "List Comprehensions & Generator Expressions",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "Concise syntax for constructing lists, dict comprehensions, memory-efficient generators (yield).",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>List comprehensions provide a concise way to create lists from existing iterables while avoiding explicit loop boilerplate and memory bloat.</p>\n        </div>\n      ",
        "codeExample": "# Filter and square even numbers\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\neven_squares = [x**2 for x in numbers if x % 2 == 0]\nprint(even_squares) # [4, 16, 36, 64, 100]\n\n# Memory-efficient generator expression\ngen = (x**2 for x in range(1_000_000))\nprint(next(gen)) # 0\nprint(next(gen)) # 1",
        "interviewTip": "Generators yield one item at a time lazily on demand using the iterator protocol, consuming O(1) memory regardless of how many millions of items are yielded.",
        "miniQuiz": {
          "q": "What keyword turns a standard Python function into a generator that produces items lazily?",
          "options": [
            "return",
            "yield",
            "produce",
            "emit"
          ],
          "answer": 1,
          "explanation": "The yield keyword pauses function execution, returning a value to the caller, and resumes on subsequent next() calls."
        }
      },
      {
        "id": "py-oop-dunder",
        "category": "OBJECT ORIENTED PYTHON",
        "title": "Python OOP, Dunder Methods & Dataclasses",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "__init__, __repr__, __eq__, magic operators, and @dataclass decorator.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Dunder (double underscore) methods allow user-defined classes to hook into Python syntax such as print representation, equality, and arithmetic operators.</p>\n        </div>\n      ",
        "codeExample": "from dataclasses import dataclass\n\n@dataclass\nclass Student:\n    name: str\n    roll: str\n    cgpa: float\n\n    def is_honor_roll(self) -> bool:\n        return self.cgpa >= 8.5\n\ns1 = Student(\"Avinash Verma\", \"24CSE089\", 8.84)\nprint(s1) # Student(name='Avinash Verma', roll='24CSE089', cgpa=8.84)\nprint(s1.is_honor_roll()) # True",
        "interviewTip": "Explain __str__ vs __repr__: __str__ is designed for end-user readability, while __repr__ is unambiguous and designed for developers and debugging.",
        "miniQuiz": {
          "q": "Which standard decorator introduced in Python 3.7 auto-generates __init__, __repr__, and __eq__ boilerplate?",
          "options": [
            "@property",
            "@dataclass",
            "@classmethod",
            "@staticmethod"
          ],
          "answer": 1,
          "explanation": "@dataclass automatically generates special methods such as __init__() and __repr__() based on class attribute type annotations."
        }
      }
    ],
    "java": [
      {
        "id": "java-intro-jvm",
        "category": "JAVA FUNDAMENTALS & JVM",
        "title": "JVM Architecture: JDK vs JRE vs JVM & Garbage Collection",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Classloader subsystem, JVM Memory (Heap, Stack, Metaspace), and Generational Garbage Collection.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Java achieves \"Write Once, Run Anywhere\" (WORA) via the Java Virtual Machine (JVM). Java source code (.java) compiles into bytecode (.class), which the JVM executes.</p>\n          <div class=\"grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px]\">\n            <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\"><strong class=\"text-white\">JDK:</strong> Developer tools (javac, jar, debugger) + JRE</div>\n            <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\"><strong class=\"text-white\">JRE:</strong> JVM runtime engine + standard class libraries</div>\n            <div class=\"p-3 rounded-xl bg-surface-container border border-white/5\"><strong class=\"text-white\">JVM:</strong> Bytecode interpreter + JIT Compiler + GC</div>\n          </div>\n        </div>\n      ",
        "codeExample": "public class SmartLearnHello {\n    public static void main(String[] args) {\n        System.out.println(\"Welcome to Java Programming on SmartLearn!\");\n        \n        int a = 15;\n        int b = 25;\n        System.out.println(\"Sum = \" + (a + b));\n    }\n}",
        "interviewTip": "Explain why Java is not 100% pure Object-Oriented: Because Java supports primitive data types (int, float, char, boolean, etc.) that do not inherit from java.lang.Object.",
        "miniQuiz": {
          "q": "Which component of Java is responsible for compiling .java source code into bytecode .class files?",
          "options": [
            "JVM",
            "JIT Compiler",
            "javac",
            "ClassLoader"
          ],
          "answer": 2,
          "explanation": "javac is the primary Java compiler included in the JDK that translates human-readable source code into portable JVM bytecode."
        }
      },
      {
        "id": "java-collections",
        "category": "JAVA DATA STRUCTURES",
        "title": "Java Collections Framework: List, Set, Map & Complexity",
        "readTime": "7 min read",
        "xp": 65,
        "summary": "ArrayList vs LinkedList, HashSet vs TreeSet, HashMap hashing collision resolution and load factor.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>The Java Collections Framework provides an architecture to store and manipulate groups of objects.</p>\n        </div>\n      ",
        "codeExample": "import java.util.*;\n\npublic class CollectionDemo {\n    public static void main(String[] args) {\n        Map<String, Double> grades = new HashMap<>();\n        grades.put(\"DSA\", 9.2);\n        grades.put(\"DBMS\", 8.8);\n        grades.put(\"Networks\", 8.5);\n\n        for (Map.Entry<String, Double> entry : grades.entrySet()) {\n            System.out.println(entry.getKey() + \": \" + entry.getValue());\n        }\n    }\n}",
        "interviewTip": "How does HashMap handle bucket collisions in Java 8+? If the number of items in a bucket exceeds 8 (TREEIFY_THRESHOLD) and table capacity >= 64, the linked list converts into a balanced Red-Black Tree, improving lookup from O(n) to O(log n).",
        "miniQuiz": {
          "q": "What is the default initial capacity and load factor of a standard Java HashMap?",
          "options": [
            "16 and 0.75",
            "32 and 0.50",
            "10 and 1.00",
            "8 and 0.75"
          ],
          "answer": 0,
          "explanation": "Java HashMap defaults to an initial bucket array size of 16 and a load factor of 0.75 before resizing (rehashing)."
        }
      },
      {
        "id": "java-streams",
        "category": "MODERN JAVA (8+)",
        "title": "Streams API, Functional Interfaces & Lambdas",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Stream pipeline (source, intermediate filter/map, terminal collect), method references, and Optional.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Streams facilitate declarative data processing pipelines over collection structures with lazy evaluation.</p>\n        </div>\n      ",
        "codeExample": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class StreamsDemo {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Avinash\", \"Sarah\", \"Alex\", \"David\", \"Aman\");\n        \n        List<String> aNames = names.stream()\n            .filter(name -> name.startsWith(\"A\"))\n            .map(String::toUpperCase)\n            .sorted()\n            .collect(Collectors.toList());\n\n        System.out.println(aNames); // [AMAN, ALEX, AVINASH]\n    }\n}",
        "interviewTip": "Explain why Streams are lazy: Intermediate operations (filter, map) do not execute until a terminal operation (collect, count, forEach) is triggered on the stream.",
        "miniQuiz": {
          "q": "Which of the following is a terminal operation in the Java Streams API?",
          "options": [
            "filter()",
            "map()",
            "sorted()",
            "collect()"
          ],
          "answer": 3,
          "explanation": "collect() is a terminal operation that initiates stream processing and packs items into a container like List or Set."
        }
      }
    ],
    "php": [
      {
        "id": "php-intro-syntax",
        "category": "PHP FUNDAMENTALS",
        "title": "PHP Syntax, Superglobals & Server Architecture",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "PHP tags, variable syntax ($var), type juggling, and core superglobals ($_GET, $_POST, $_SERVER).",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>PHP (Hypertext Preprocessor) is an open-source, server-side scripting language designed specifically for dynamic web development.</p>\n        </div>\n      ",
        "codeExample": "<?php\n// PHP 8+ typed function\nfunction calculateScore(float $base, float $bonus): float {\n    return $base + $bonus;\n}\n\n$student = \"Avinash\";\n$finalScore = calculateScore(85.5, 7.5);\n\necho \"Student {$student} scored: {$finalScore} / 100\";\n?>",
        "interviewTip": "Explain the difference between include, require, include_once, and require_once: require throws a fatal E_COMPILE_ERROR and halts execution if the file is missing, while include only emits an E_WARNING.",
        "miniQuiz": {
          "q": "Which PHP superglobal array contains HTTP POST form submission data?",
          "options": [
            "$_GET",
            "$_POST",
            "$_REQUEST",
            "$_SERVER"
          ],
          "answer": 1,
          "explanation": "$_POST is an associative array of variables passed to the current script via the HTTP POST method."
        }
      },
      {
        "id": "php-pdo-security",
        "category": "PHP DATABASE & SECURITY",
        "title": "PHP Data Objects (PDO) & SQL Injection Prevention",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "PDO connection setup, prepared statements, parameter binding, and CSRF/XSS protection.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Never concatenate user input directly into SQL strings. Always use PDO prepared statements with bound parameters.</p>\n        </div>\n      ",
        "codeExample": "<?php\ntry {\n    $pdo = new PDO(\"mysql:host=localhost;dbname=smartlearn;charset=utf8mb4\", \"db_user\", \"db_pass\", [\n        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC\n    ]);\n\n    $stmt = $pdo->prepare(\"SELECT id, full_name, cgpa FROM students WHERE is_active = :status\");\n    $stmt->execute(['status' => 1]);\n    $students = $stmt->fetchAll();\n\n    echo json_encode($students);\n} catch (PDOException $e) {\n    echo \"Database error: \" . $e->getMessage();\n}\n?>",
        "interviewTip": "Why are prepared statements immune to SQL injection? Because the database compiles the SQL query structure first, and then treats the bound parameters strictly as literal values, never as executable SQL commands.",
        "miniQuiz": {
          "q": "Which database abstraction layer in PHP supports multiple relational databases with prepared statements?",
          "options": [
            "mysqli",
            "PDO (PHP Data Objects)",
            "mysql_connect",
            "pg_query"
          ],
          "answer": 1,
          "explanation": "PDO provides a consistent interface across 12 different database drivers with built-in prepared statements."
        }
      },
      {
        "id": "php-sessions-cookies",
        "category": "PHP STATE MANAGEMENT",
        "title": "PHP Sessions, Cookies & Authentication Tokens",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "session_start(), $_SESSION, setcookie(), HttpOnly security flags, and session fixation defense.",
        "contentHtml": "<div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\"><p>HTTP is stateless. PHP sessions store user data on the server across multiple page visits identified by a PHPSESSID cookie.</p></div>",
        "codeExample": "<?php\nsession_start([\n    'cookie_httponly' => true,\n    'cookie_secure' => true,\n    'cookie_samesite' => 'Strict'\n]);\n\n$_SESSION['student_id'] = 24089;\n$_SESSION['role'] = 'Student';\n?>",
        "interviewTip": "Always call session_regenerate_id(true) immediately after successful login to prevent Session Fixation attacks.",
        "miniQuiz": {
          "q": "Which function must be executed before outputting any HTML to start or resume a PHP session?",
          "options": [
            "session_begin()",
            "session_start()",
            "session_init()",
            "session_open()"
          ],
          "answer": 1,
          "explanation": "session_start() initializes session state and must be called before headers are sent."
        }
      }
    ],
    "c": [
      {
        "id": "c-pointers-memory",
        "category": "C MEMORY & POINTERS",
        "title": "C Pointers, Memory Addresses & Dereferencing",
        "readTime": "6 min read",
        "xp": 65,
        "summary": "Address-of operator (&), dereference operator (*), pointer arithmetic, and void pointers.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>A pointer in C is a variable that stores the memory address of another variable. Direct memory manipulation gives C unmatched raw execution speed.</p>\n        </div>\n      ",
        "codeExample": "#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 10, b = 20;\n    printf(\"Before swap: a = %d, b = %d\\n\", a, b);\n    swap(&a, &b);\n    printf(\"After swap:  a = %d, b = %d\\n\", a, b);\n    return 0;\n}",
        "interviewTip": "What is a Dangling Pointer? A pointer that points to memory that has already been deallocated (freed) or a local variable that has gone out of scope.",
        "miniQuiz": {
          "q": "Which operator is used to retrieve the memory address of a variable in C?",
          "options": [
            "*",
            "&",
            "->",
            "%"
          ],
          "answer": 1,
          "explanation": "The ampersand (&) is the address-of operator; it evaluates to the physical memory location of its operand."
        }
      },
      {
        "id": "c-dynamic-allocation",
        "category": "C MEMORY ALLOCATION",
        "title": "Dynamic Memory Allocation: malloc, calloc, realloc & free",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Heap memory allocation, memory leaks, NULL pointer checking, and sizeof() operator.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Static memory lives on the Stack with fixed lifetimes; dynamic memory lives on the Heap and must be explicitly allocated and freed by the programmer.</p>\n        </div>\n      ",
        "codeExample": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr = (int *)malloc(n * sizeof(int));\n    if (arr == NULL) {\n        printf(\"Memory allocation failed!\\n\");\n        return 1;\n    }\n\n    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n\n    free(arr); // Always free heap allocations!\n    arr = NULL; // Prevent dangling pointer\n    return 0;\n}",
        "interviewTip": "What is the key difference between malloc() and calloc()? malloc() allocates uninitialized memory containing garbage values; calloc() allocates memory and clears every single byte to zero.",
        "miniQuiz": {
          "q": "What happens if you allocate heap memory in C with malloc() but never call free() before terminating?",
          "options": [
            "Segmentation fault immediately",
            "Memory Leak",
            "Compiler warning at build time",
            "Memory is transferred to stack"
          ],
          "answer": 1,
          "explanation": "Failing to free allocated heap memory results in a Memory Leak where RAM remains allocated and unavailable."
        }
      },
      {
        "id": "c-structures-typedef",
        "category": "C DATA STRUCTURES",
        "title": "C Structs, Typedef, Memory Alignment & Padding",
        "readTime": "6 min read",
        "xp": 55,
        "summary": "Defining composite types, pointer-to-struct (->) operator, and CPU cache-line alignment padding.",
        "contentHtml": "<div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\"><p>Structs group variables of different data types into a contiguous memory block.</p></div>",
        "codeExample": "#include <stdio.h>\n\ntypedef struct {\n    char name[50];\n    int roll;\n    float cgpa;\n} Student;\n\nint main() {\n    Student s = {\"Avinash Verma\", 24089, 8.84f};\n    Student *ptr = &s;\n    printf(\"Student: %s | CGPA: %.2f\\n\", ptr->name, ptr->cgpa);\n    return 0;\n}",
        "interviewTip": "Why does sizeof(struct) often exceed the sum of its members? Because compilers insert padding bytes so variables align with 4-byte or 8-byte CPU word boundaries for faster memory bus transfer.",
        "miniQuiz": {
          "q": "Which operator is used to access members of a structure through a pointer?",
          "options": [
            ".",
            "->",
            "::",
            "*."
          ],
          "answer": 1,
          "explanation": "The arrow operator (->) dereferences the pointer and accesses the specified member."
        }
      }
    ],
    "cpp": [
      {
        "id": "cpp-oop-classes",
        "category": "C++ OBJECT ORIENTED",
        "title": "C++ Classes, Constructors, Destructors & RAII",
        "readTime": "6 min read",
        "xp": 65,
        "summary": "Encapsulation, initialization lists, copy/move constructors, and Resource Acquisition Is Initialization (RAII).",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>C++ bridges low-level systems programming with zero-overhead object-oriented abstractions. RAII guarantees resources are safely released when objects exit scope.</p>\n        </div>\n      ",
        "codeExample": "#include <iostream>\n#include <string>\n\nclass Student {\nprivate:\n    std::string name;\n    double gpa;\n\npublic:\n    // Member initialization list\n    Student(std::string n, double g) : name(n), gpa(g) {}\n\n    void display() const {\n        std::cout << \"Student: \" << name << \" | GPA: \" << gpa << std::endl;\n    }\n};\n\nint main() {\n    Student s(\"Avinash Verma\", 8.84);\n    s.display();\n    return 0;\n}",
        "interviewTip": "Explain virtual destructors in C++: If a class has any virtual functions, its destructor must be declared virtual to ensure proper polymorphic deletion through a base-class pointer.",
        "miniQuiz": {
          "q": "What C++ paradigm links resource lifetime directly to object scope lifetime?",
          "options": [
            "OOP",
            "RAII (Resource Acquisition Is Initialization)",
            "STL",
            "RTTI"
          ],
          "answer": 1,
          "explanation": "RAII binds resource allocation to object construction and resource deallocation to object destruction (destructor)."
        }
      },
      {
        "id": "cpp-stl-containers",
        "category": "C++ STANDARD TEMPLATE LIBRARY (STL)",
        "title": "STL Containers: std::vector, std::map, std::unordered_map",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Dynamic contiguous arrays (vector), Red-Black Tree maps (O(log n)), and Hash tables (O(1) average).",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>The Standard Template Library (STL) provides battle-tested algorithms, containers, and iterators engineered for optimal performance.</p>\n        </div>\n      ",
        "codeExample": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> scores = {92, 75, 88, 64, 99};\n    scores.push_back(84);\n\n    std::sort(scores.begin(), scores.end());\n\n    std::cout << \"Sorted scores: \";\n    for (int score : scores) {\n        std::cout << score << \" \";\n    }\n    std::cout << std::endl;\n    return 0;\n}",
        "interviewTip": "When to choose std::map vs std::unordered_map? Choose std::map when you need keys sorted in order (O(log n) Red-Black Tree). Choose std::unordered_map for fastest O(1) hash lookups when ordering does not matter.",
        "miniQuiz": {
          "q": "What is the average time complexity of element insertion in std::unordered_map?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
          ],
          "answer": 0,
          "explanation": "std::unordered_map is implemented using a hash table, providing O(1) constant time on average."
        }
      },
      {
        "id": "cpp-smart-pointers",
        "category": "MODERN C++ (11/14/17)",
        "title": "Smart Pointers: std::unique_ptr & std::shared_ptr",
        "readTime": "6 min read",
        "xp": 65,
        "summary": "Zero-overhead memory safety, std::make_unique, reference counting (shared_ptr), and avoiding memory leaks.",
        "contentHtml": "<div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\"><p>Smart pointers eliminate manual delete calls by automatically deallocating heap memory when the pointer goes out of scope.</p></div>",
        "codeExample": "#include <iostream>\n#include <memory>\n\nclass Resource {\npublic:\n    Resource() { std::cout << \"Allocated\\n\"; }\n    ~Resource() { std::cout << \"Freed automatically!\\n\"; }\n};\n\nint main() {\n    // Automatically freed at end of block\n    std::unique_ptr<Resource> res = std::make_unique<Resource>();\n    return 0;\n}",
        "interviewTip": "Prefer std::unique_ptr by default because it has zero runtime overhead compared to raw pointers; only use std::shared_ptr when multiple owners legitimately share a resource lifetime.",
        "miniQuiz": {
          "q": "Which smart pointer represents exclusive ownership of a dynamic resource?",
          "options": [
            "std::shared_ptr",
            "std::unique_ptr",
            "std::weak_ptr",
            "std::auto_ptr"
          ],
          "answer": 1,
          "explanation": "std::unique_ptr cannot be copied, only moved, guaranteeing single ownership of heap memory."
        }
      }
    ],
    "csharp": [
      {
        "id": "cs-intro-dotnet",
        "category": "C# & .NET FUNDAMENTALS",
        "title": "C# Syntax, Common Language Runtime (CLR) & Auto-Properties",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "C# type system, managed memory, garbage collection, and modern property syntax.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>C# is a modern, type-safe, object-oriented language developed by Microsoft running on the open-source cross-platform .NET runtime.</p>\n        </div>\n      ",
        "codeExample": "using System;\n\npublic class Student {\n    public string Name { get; set; }\n    public double CGPA { get; set; }\n\n    public Student(string name, double cgpa) {\n        Name = name;\n        CGPA = cgpa;\n    }\n}\n\nclass Program {\n    static void Main() {\n        var s = new Student(\"Avinash Verma\", 8.84);\n        Console.WriteLine($\"Student: {s.Name} with GPA {s.CGPA}\");\n    }\n}",
        "interviewTip": "Explain Value Types vs Reference Types in C#: Value types (struct, int, bool) are stored directly on the stack or in-place, while Reference types (class, string, delegate) allocate memory on the managed heap.",
        "miniQuiz": {
          "q": "What execution engine manages the execution of C# .NET programs, handling JIT compilation and memory management?",
          "options": [
            "JVM",
            "CLR (Common Language Runtime)",
            "JDK",
            "V8 Engine"
          ],
          "answer": 1,
          "explanation": "The CLR is the runtime engine for .NET that converts Intermediate Language (IL) code into machine instructions."
        }
      },
      {
        "id": "cs-linq-queries",
        "category": "C# MODERN CAPABILITIES",
        "title": "LINQ (Language Integrated Query) & Lambda Expressions",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Query syntax vs Method syntax, Where, Select, OrderBy, GroupBy, and deferred execution.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>LINQ introduces first-class declarative querying capabilities directly into C# syntax over collections, databases (EF Core), and XML.</p>\n        </div>\n      ",
        "codeExample": "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass LinqDemo {\n    static void Main() {\n        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };\n\n        var evenSquares = numbers\n            .Where(n => n % 2 == 0)\n            .Select(n => n * n)\n            .OrderByDescending(n => n);\n\n        Console.WriteLine(string.Join(\", \", evenSquares)); // 100, 64, 36, 16, 4\n    }\n}",
        "interviewTip": "What is Deferred Execution in LINQ? A LINQ query is not actually executed when it is defined; it executes only when iterated over with foreach or converted via ToList() / ToArray().",
        "miniQuiz": {
          "q": "Which LINQ method projects each element of a sequence into a new form (similar to map)?",
          "options": [
            "Where()",
            "Select()",
            "Filter()",
            "Aggregate()"
          ],
          "answer": 1,
          "explanation": "Select() transforms/projects elements of a collection into a new sequence of values."
        }
      },
      {
        "id": "cs-async-await",
        "category": "C# ASYNCHRONOUS PROGRAMMING",
        "title": "Asynchronous C#: Task, async/await & Exception Handling",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Task-based Asynchronous Pattern (TAP), non-blocking UI threads, ConfigureAwait(false), and Task.WhenAll.",
        "contentHtml": "<div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\"><p>async and await enable writing asynchronous non-blocking code that reads sequentially like synchronous statements.</p></div>",
        "codeExample": "using System;\nusing System.Net.Http;\nusing System.Threading.Tasks;\n\nclass AsyncDemo {\n    static async Task Main() {\n        using var client = new HttpClient();\n        string data = await client.GetStringAsync(\"https://api.github.com\");\n        Console.WriteLine($\"Downloaded {data.Length} characters without freezing!\");\n    }\n}",
        "interviewTip": "Never use .Result or .Wait() on a Task in UI or ASP.NET contexts because it can cause catastrophic synchronization context deadlocks.",
        "miniQuiz": {
          "q": "What return type should an async method have if it does not return any value (alternative to void)?",
          "options": [
            "void",
            "Task",
            "Action",
            "Thread"
          ],
          "answer": 1,
          "explanation": "Returning Task allows caller methods to await completion and catch unhandled exceptions."
        }
      }
    ],
    "aws": [
      {
        "id": "aws-cloud-foundations",
        "category": "AWS CLOUD ARCHITECTURE",
        "title": "Cloud Foundations: Regions, Availability Zones & Core Services",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "AWS global infrastructure, Shared Responsibility Model, EC2, S3, and VPC fundamentals.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Amazon Web Services (AWS) is the world's leading cloud computing platform offering over 200 fully featured services globally.</p>\n        </div>\n      ",
        "codeExample": "// AWS CLI command to list Amazon S3 buckets securely\naws s3 ls\n\n// Syncing production web assets to an S3 static bucket\naws s3 sync ./dist s3://smartlearn-cdn-assets --acl public-read",
        "interviewTip": "Memorize the AWS Shared Responsibility Model: AWS is responsible for Security \"OF\" the Cloud (hardware, data centers, host OS). The Customer is responsible for Security \"IN\" the Cloud (data encryption, IAM credentials, firewall rules).",
        "miniQuiz": {
          "q": "Which AWS service provides resizable, secure compute capacity (virtual servers) in the cloud?",
          "options": [
            "Amazon S3",
            "Amazon EC2",
            "AWS Lambda",
            "Amazon DynamoDB"
          ],
          "answer": 1,
          "explanation": "Amazon Elastic Compute Cloud (EC2) provides virtual compute instances on demand."
        }
      },
      {
        "id": "aws-serverless-lambda",
        "category": "AWS SERVERLESS",
        "title": "AWS Lambda, API Gateway & Event-Driven Architecture",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Serverless compute, cold starts, concurrency limits, and DynamoDB triggers.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Serverless computing runs code without provisioning or managing servers. You pay strictly for compute time consumed down to the millisecond.</p>\n        </div>\n      ",
        "codeExample": "// AWS Lambda handler in Node.js\nexports.handler = async (event) => {\n    const studentName = event.queryStringParameters?.name || \"Learner\";\n    \n    return {\n        statusCode: 200,\n        headers: { \"Content-Type\": \"application/json\" },\n        body: JSON.stringify({\n            message: `Hello ${studentName}, your SmartLearn Lambda function fired successfully!`,\n            timestamp: new Date().toISOString()\n        })\n    };\n};",
        "interviewTip": "What causes AWS Lambda \"cold starts\"? When a Lambda function has not been invoked recently, AWS must initialize a new container, download code, and start the runtime, adding latency to the first request.",
        "miniQuiz": {
          "q": "What is the maximum execution timeout duration for a single AWS Lambda function invocation?",
          "options": [
            "5 minutes",
            "15 minutes",
            "1 hour",
            "Unlimited"
          ],
          "answer": 1,
          "explanation": "AWS Lambda functions have a maximum hard execution timeout limit of 15 minutes (900 seconds)."
        }
      },
      {
        "id": "aws-iam-security",
        "category": "AWS SECURITY & ACCESS",
        "title": "AWS Identity and Access Management (IAM): Users, Roles & Least Privilege",
        "readTime": "5 min read",
        "xp": 55,
        "summary": "IAM policies (JSON), principle of least privilege, IAM Roles for EC2/Lambda, and MFA enforcement.",
        "contentHtml": "<div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\"><p>IAM securely controls access to AWS resources. Never embed root credentials in application code; always assign IAM Roles.</p></div>",
        "codeExample": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],\n      \"Resource\": \"arn:aws:s3:::smartlearn-storage/*\"\n    }\n  ]\n}",
        "interviewTip": "Explain IAM Role vs IAM User: An IAM User has permanent long-term credentials (password, access key). An IAM Role is assumed by trusted entities (like an EC2 instance or Lambda) and grants temporary short-term security credentials.",
        "miniQuiz": {
          "q": "Which security principle mandates granting only the minimal permissions required to perform a task?",
          "options": [
            "Defense in Depth",
            "Principle of Least Privilege",
            "Zero Trust Architecture",
            "Separation of Duties"
          ],
          "answer": 1,
          "explanation": "The Principle of Least Privilege ensures entities only have access strictly necessary for their function."
        }
      }
    ],
    "w3css": [
      {
        "id": "w3css-intro-grids",
        "category": "W3.CSS FRAMEWORK",
        "title": "W3.CSS Grid System, Containers & Responsive Classes",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "w3-container, w3-row, w3-col, w3-card, responsive prefixes (s, m, l), and zero-dependency CSS.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>W3.CSS is a modern, responsive, mobile-first CSS framework created by W3Schools with zero JavaScript dependencies.</p>\n        </div>\n      ",
        "codeExample": "<!DOCTYPE html>\n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">\n</head>\n<body>\n  <div class=\"w3-container w3-indigo\">\n    <h2>SmartLearn W3.CSS Demo</h2>\n  </div>\n  <div class=\"w3-row-padding w3-margin-top\">\n    <div class=\"w3-col s12 m6 l4\">\n      <div class=\"w3-card w3-padding w3-white\">\n        <h4>Modular Learning</h4>\n        <p>Speedy responsive layouts with pure CSS classes.</p>\n      </div>\n    </div>\n  </div>\n</body>\n</html>",
        "interviewTip": "Why choose W3.CSS over larger frameworks like Bootstrap? W3.CSS is ultra-lightweight (one small CSS file, approx 23KB), faster to load, and requires zero JavaScript or jQuery dependencies.",
        "miniQuiz": {
          "q": "In W3.CSS, how many columns does the default grid row (w3-row) divide into?",
          "options": [
            "10 columns",
            "12 columns",
            "16 columns",
            "8 columns"
          ],
          "answer": 1,
          "explanation": "The W3.CSS grid system is based on a standard 12-column layout (w3-col s1 through s12)."
        }
      },
      {
        "id": "w3css-cards-panels",
        "category": "W3.CSS COMPONENTS",
        "title": "W3.CSS Cards, Panels, Badges & Alert Callouts",
        "readTime": "4 min read",
        "xp": 40,
        "summary": "w3-panel, w3-card-4, w3-badge, w3-tag, and colored alert boxes.",
        "contentHtml": "<div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\"><p>W3.CSS components provide fast, ready-to-use visual containers for alerts, profile badges, and shadow elevation cards.</p></div>",
        "codeExample": "<div class=\"w3-panel w3-pale-green w3-leftbar w3-border-green w3-padding\">\n  <h4>Success Milestone!</h4>\n  <p>Student passed the module with <span class=\"w3-badge w3-green\">95%</span> score.</p>\n</div>",
        "interviewTip": "The w3-card-4 class applies a 4px shadow elevation effect, mirroring Google Material Design elevation levels.",
        "miniQuiz": {
          "q": "Which W3.CSS class adds a colored vertical stripe along the left edge of a panel?",
          "options": [
            "w3-leftborder",
            "w3-leftbar",
            "w3-stripe-left",
            "w3-border-start"
          ],
          "answer": 1,
          "explanation": "w3-leftbar creates a prominent left accent border line commonly used for callout boxes."
        }
      },
      {
        "id": "w3css-navbars",
        "category": "W3.CSS NAVIGATION",
        "title": "W3.CSS Navigation Bars, Dropdowns & Sidebars",
        "readTime": "4 min read",
        "xp": 45,
        "summary": "w3-bar, w3-bar-item, w3-dropdown-hover, and responsive mobile drawers.",
        "contentHtml": "<div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\"><p>Create horizontal and vertical menus easily with the w3-bar component.</p></div>",
        "codeExample": "<div class=\"w3-bar w3-dark-grey\">\n  <a href=\"#\" class=\"w3-bar-item w3-button w3-indigo\">Home</a>\n  <a href=\"#\" class=\"w3-bar-item w3-button\">Curriculum</a>\n  <a href=\"#\" class=\"w3-bar-item w3-button\">Labs</a>\n</div>",
        "interviewTip": "w3-bar elements are inline-block by default and automatically wrap on mobile screens.",
        "miniQuiz": {
          "q": "Which class defines a top-level horizontal navigation bar in W3.CSS?",
          "options": [
            "w3-nav",
            "w3-bar",
            "w3-navbar",
            "w3-menu"
          ],
          "answer": 1,
          "explanation": "w3-bar is the core navigation container class in W3.CSS."
        }
      }
    ],
    "howto": [
      {
        "id": "howto-responsive-navbar",
        "category": "HOW TO SNIPPETS",
        "title": "How To: Build a Modern Responsive Navbar with Mobile Drawer",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "Step-by-step tutorial: HTML landmark structure, flexbox alignment, hamburger button toggle, and clean transitions.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Create a production-ready responsive navigation bar that switches gracefully between a horizontal desktop dock and a mobile accordion.</p>\n        </div>\n      ",
        "codeExample": "<nav class=\"navbar\" style=\"display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:12px 20px; border-radius:10px;\">\n  <span style=\"color:#38bdf8; font-weight:bold; font-size:18px;\">SmartLearn</span>\n  <div style=\"display:flex; gap:16px;\">\n    <a href=\"#\" style=\"color:#e2e8f0; text-decoration:none;\">Dashboard</a>\n    <a href=\"#\" style=\"color:#e2e8f0; text-decoration:none;\">Courses</a>\n    <a href=\"#\" style=\"color:#e2e8f0; text-decoration:none;\">Skills</a>\n  </div>\n</nav>",
        "interviewTip": "Always attach keyboard event listeners (like ESC key) to close navigation drawers and modal overlays for full accessibility (a11y) compliance.",
        "miniQuiz": {
          "q": "Which HTML5 semantic element should wrap top-level navigation links?",
          "options": [
            "<header>",
            "<nav>",
            "<section>",
            "<aside>"
          ],
          "answer": 1,
          "explanation": "The <nav> semantic landmark communicates to screen readers and bots that enclosed links represent site navigation."
        }
      },
      {
        "id": "howto-accordion-collapse",
        "category": "HOW TO SNIPPETS",
        "title": "How To: Create Collapsible Accordions & FAQ Drawers",
        "readTime": "4 min read",
        "xp": 45,
        "summary": "Using native HTML5 <details> and <summary> or lightweight JavaScript toggle handlers.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Modern HTML provides the native <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> tags to build completely functional accordions without writing a single line of JavaScript!</p>\n        </div>\n      ",
        "codeExample": "<details style=\"background:#0f172a; padding:12px; border-radius:8px; border:1px solid #334155; margin-bottom:8px;\">\n  <summary style=\"color:#38bdf8; font-weight:bold; cursor:pointer;\">What is SmartLearn SIH 2026?</summary>\n  <p style=\"color:#94a3b8; margin-top:8px; font-size:13px;\">SmartLearn is an adaptive AI-driven smart education platform designed to detect conceptual weak spots and guide engineering students toward mastery.</p>\n</details>",
        "interviewTip": "Native <code>&lt;details&gt;</code> elements are keyboard accessible out of the box (Space and Enter toggle expansion), saving dozens of lines of custom JS.",
        "miniQuiz": {
          "q": "Which child element specifies the visible clickable heading of a native HTML <details> tag?",
          "options": [
            "<title>",
            "<header>",
            "<summary>",
            "<label>"
          ],
          "answer": 2,
          "explanation": "<summary> defines the visible heading for the disclosure box of a <details> element."
        }
      }
    ],
    "bootstrap": [
      {
        "id": "bs-grid-breakpoints",
        "category": "BOOTSTRAP 5 ARCHITECTURE",
        "title": "Bootstrap 5 Grid System, Breakpoints & Flex Utilities",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "12-column grid, container vs container-fluid, responsive infix (sm, md, lg, xl, xxl), and row-cols.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Bootstrap 5 provides a powerful mobile-first flexbox grid system to build layouts of all shapes and sizes.</p>\n        </div>\n      ",
        "codeExample": "<div class=\"container-fluid py-4\">\n  <div class=\"row g-3\">\n    <div class=\"col-12 col-md-6 col-lg-4\">\n      <div class=\"card p-3 shadow-sm bg-dark text-white\">\n        <h5 class=\"card-title text-info\">Card Column 1</h5>\n        <p class=\"card-text text-muted\">Adapts across all responsive viewport widths.</p>\n      </div>\n    </div>\n  </div>\n</div>",
        "interviewTip": "What major change happened to JavaScript dependencies in Bootstrap 5? jQuery was completely dropped in favor of pure, modern vanilla JavaScript.",
        "miniQuiz": {
          "q": "Which Bootstrap breakpoint infix corresponds to viewport widths >= 768px (tablets)?",
          "options": [
            "sm",
            "md",
            "lg",
            "xl"
          ],
          "answer": 1,
          "explanation": "md targets viewports at or above 768px in the Bootstrap 5 responsive hierarchy."
        }
      },
      {
        "id": "bs-components",
        "category": "BOOTSTRAP 5 COMPONENTS",
        "title": "Bootstrap 5 Components: Navbars, Modals & Toast Alerts",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "Data-bs-toggle, data-bs-target, modal backdrop behavior, and floating form labels.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Bootstrap components utilize HTML5 data attributes (<code>data-bs-toggle</code>) to manage JavaScript interactions declaratively.</p>\n        </div>\n      ",
        "codeExample": "<!-- Button trigger modal in Bootstrap 5 -->\n<button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#enrollModal\">\n  Enroll in Course\n</button>",
        "interviewTip": "In Bootstrap 5, all data attributes are namespaced with <code>data-bs-*</code> to prevent conflicts with custom data attributes or other libraries.",
        "miniQuiz": {
          "q": "What prefix namespace do Bootstrap 5 data attributes use?",
          "options": [
            "data-toggle",
            "data-bs-*",
            "data-boot",
            "data-tw"
          ],
          "answer": 1,
          "explanation": "Bootstrap 5 uses data-bs-* (e.g. data-bs-toggle, data-bs-dismiss)."
        }
      }
    ],
    "react": [
      {
        "id": "react-components-state",
        "category": "REACT FUNDAMENTALS",
        "title": "React Components, JSX & useState Hook",
        "readTime": "6 min read",
        "xp": 65,
        "summary": "Functional components, unidirectional data flow, immutable state updates, and re-rendering lifecycles.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>React is a declarative, efficient, and flexible JavaScript library for building component-driven user interfaces.</p>\n        </div>\n      ",
        "codeExample": "import React, { useState } from 'react';\n\nexport function StudyStreakTracker() {\n  const [streak, setStreak] = useState(12);\n\n  return (\n    <div style={{ padding: '16px', background: '#1e1b4b', borderRadius: '12px' }}>\n      <h3 style={{ color: '#818cf8' }}>Active Streak: {streak} Days 🔥</h3>\n      <button \n        style={{ padding: '8px 16px', background: '#6366f1', color: '#fff', borderRadius: '8px', border: 'none' }}\n        onClick={() => setStreak(prev => prev + 1)}>\n        Log Today's Study Hour\n      </button>\n    </div>\n  );\n}",
        "interviewTip": "Why should you never mutate React state directly (e.g. <code>state.count = 5</code>)? React relies on object reference equality comparisons (Object.is) to determine when components need to re-render; mutating in-place prevents re-rendering.",
        "miniQuiz": {
          "q": "Which React hook is used to declare state variables in functional components?",
          "options": [
            "useEffect",
            "useState",
            "useContext",
            "useReducer"
          ],
          "answer": 1,
          "explanation": "useState() declares state variables and provides an updater function that triggers re-rendering when state changes."
        }
      },
      {
        "id": "react-useeffect-lifecycle",
        "category": "REACT HOOKS & LIFECYCLES",
        "title": "useEffect Hook: Side-Effects, Dependencies & Cleanup",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Data fetching, subscription lifecycles, dependency array traps, and cleanup functions.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>The <code>useEffect</code> hook allows performing side effects (like data fetching, timers, or direct DOM manipulation) in functional components.</p>\n        </div>\n      ",
        "codeExample": "import React, { useState, useEffect } from 'react';\n\nexport function RealTimeTimer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n\n    // Cleanup function: runs on unmount or before effect re-runs\n    return () => clearInterval(timer);\n  }, []); // Empty deps: runs once on mount\n\n  return <div>Elapsed Time: {seconds}s</div>;\n}",
        "interviewTip": "What happens if you omit the dependency array in useEffect? The effect callback runs after EVERY single render of the component, which frequently causes infinite re-render loops when updating state inside the effect.",
        "miniQuiz": {
          "q": "What does returning a function from a useEffect callback do?",
          "options": [
            "Throws an error",
            "Defines a cleanup function executed on unmount",
            "Causes an infinite loop",
            "Renders a child component"
          ],
          "answer": 1,
          "explanation": "The returned function is the effect cleanup mechanism, executed before the component unmounts or before the effect re-runs."
        }
      }
    ],
    "mysql": [
      {
        "id": "mysql-architecture-storage",
        "category": "MYSQL DATABASE ENGINE",
        "title": "MySQL Architecture, InnoDB Engine & ACID Transactions",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "InnoDB vs MyISAM, Row-level locking, Foreign Key constraints, and Write-Ahead Logging (WAL).",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>MySQL is the world's most popular open-source relational database management system. InnoDB is its default ACID-compliant storage engine.</p>\n        </div>\n      ",
        "codeExample": "-- Atomic transaction example in MySQL\nSTART TRANSACTION;\n\nUPDATE accounts SET balance = balance - 500 WHERE id = 101;\nUPDATE accounts SET balance = balance + 500 WHERE id = 202;\n\n-- If checks pass, commit changes atomically:\nCOMMIT;\n-- If any query fails:\n-- ROLLBACK;",
        "interviewTip": "Define the ACID properties: Atomicity (all or nothing), Consistency (preserves schema rules), Isolation (concurrent transactions do not interfere), Durability (committed data survives server crashes).",
        "miniQuiz": {
          "q": "Which default MySQL storage engine supports transactions and foreign keys?",
          "options": [
            "MyISAM",
            "InnoDB",
            "Memory",
            "CSV"
          ],
          "answer": 1,
          "explanation": "InnoDB is the default transaction-safe (ACID compliant) storage engine for MySQL."
        }
      },
      {
        "id": "mysql-indexing-explain",
        "category": "MYSQL PERFORMANCE TUNING",
        "title": "MySQL EXPLAIN, Indexes & Query Optimization",
        "readTime": "6 min read",
        "xp": 65,
        "summary": "EXPLAIN output columns (type, possible_keys, key, rows), composite indexes, and avoiding full table scans.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>EXPLAIN reveals how the MySQL query optimizer executes a statement, whether it utilizes an index or resorts to an expensive ALL (full table scan).</p>\n        </div>\n      ",
        "codeExample": "-- Inspect query plan\nEXPLAIN SELECT * FROM students WHERE department = 'CSE' AND cgpa > 8.0;\n\n-- Create composite index to optimize search\nCREATE INDEX idx_dept_cgpa ON students (department, cgpa);",
        "interviewTip": "What is the \"Leftmost Prefix\" rule in MySQL composite indexes? A composite index on (A, B, C) can satisfy searches on (A), (A, B), or (A, B, C), but CANNOT satisfy searches on (B) or (C) alone.",
        "miniQuiz": {
          "q": "In MySQL EXPLAIN output, which \"type\" value represents the worst performance (full table scan)?",
          "options": [
            "ref",
            "range",
            "index",
            "ALL"
          ],
          "answer": 3,
          "explanation": "type: ALL means MySQL must read every single row in the table from disk."
        }
      }
    ],
    "jquery": [
      {
        "id": "jquery-selectors-events",
        "category": "JQUERY LIBRARY",
        "title": "jQuery DOM Manipulation, Event Listeners & AJAX",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "$(document).ready(), CSS-style selectors, chaining methods, and $.ajax() wrappers.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>jQuery simplified HTML DOM tree traversal and manipulation, event handling, and Ajax across legacy browsers.</p>\n        </div>\n      ",
        "codeExample": "// Modern jQuery syntax\n$(document).ready(function() {\n  $('#submit-btn').on('click', function() {\n    $(this).addClass('active').fadeOut(300).fadeIn(300);\n    \n    $.getJSON('/api/stats', function(data) {\n      $('#stats-count').text(data.totalStudents);\n    });\n  });\n});",
        "interviewTip": "Modern vanilla JavaScript provides <code>document.querySelector()</code>, <code>fetch()</code>, and <code>classList</code>, which match jQuery functionality natively without downloading a 30KB library.",
        "miniQuiz": {
          "q": "What is the primary shorthand function identifier used in jQuery?",
          "options": [
            "@",
            "#",
            "$",
            "&"
          ],
          "answer": 2,
          "explanation": "The dollar sign ($) is the shorthand alias for the jQuery object."
        }
      },
      {
        "id": "jquery-effects-ajax",
        "category": "JQUERY EFFECTS & AJAX",
        "title": "jQuery Animations (slideDown, animate) & AJAX Pipelines",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "Slide and fade effects, custom animate() queues, $.get, $.post, and error handlers.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Built-in animations and Ajax wrappers enable rapid dynamic interactions with minimal code.</p>\n        </div>\n      ",
        "codeExample": "$('#accordion-header').click(function() {\n  $('#accordion-body').slideToggle(250);\n});",
        "interviewTip": "What is event delegation in jQuery? Attaching a listener to a parent element: <code>$(parent).on(\"click\", \".child\", fn)</code> to handle current AND future dynamic children.",
        "miniQuiz": {
          "q": "Which jQuery method toggles visibility with a smooth sliding motion?",
          "options": [
            "fadeToggle()",
            "slideToggle()",
            "animateToggle()",
            "toggleSlide()"
          ],
          "answer": 1,
          "explanation": "slideToggle() alternates between slideUp() and slideDown()."
        }
      }
    ],
    "excel": [
      {
        "id": "excel-formulas-lookup",
        "category": "EXCEL & DATA ANALYTICS",
        "title": "Excel Essential Formulas: VLOOKUP, XLOOKUP & INDEX/MATCH",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "Absolute ($A$1) vs relative cell references, XLOOKUP modern replacement, and dynamic arrays.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Mastering modern spreadsheet formulas is crucial for business intelligence, academic research, and engineering analytics.</p>\n        </div>\n      ",
        "codeExample": "=XLOOKUP(D2, Students!A:A, Students!C:C, \"Not Found\", 0)\n\n=INDEX(Employees!B:B, MATCH(A2, Employees!A:A, 0))",
        "interviewTip": "Why is XLOOKUP superior to legacy VLOOKUP? XLOOKUP looks both left and right (VLOOKUP only looks right), defaults to exact matches, and doesn't break when new columns are inserted.",
        "miniQuiz": {
          "q": "Which modern Excel formula replaces both VLOOKUP and HLOOKUP with bidirectional search?",
          "options": [
            "MATCH",
            "XLOOKUP",
            "SEARCH",
            "FIND"
          ],
          "answer": 1,
          "explanation": "XLOOKUP performs lookups in both vertical and horizontal directions with safer defaults."
        }
      },
      {
        "id": "excel-pivot-tables",
        "category": "EXCEL DATA SUMMARIZATION",
        "title": "Pivot Tables, Slicers & Conditional Formatting",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "Multi-dimensional data aggregation, calculated fields, slicer filtering, and heatmaps.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Pivot Tables transform thousands of raw student score rows into concise summaries grouped by semester, topic, and passing rate.</p>\n        </div>\n      ",
        "codeExample": "/* Pivot Field Layout:\n   Rows: Department, Semester\n   Columns: Exam Status\n   Values: Average of CGPA, Count of Students\n*/",
        "interviewTip": "What is a Slicer in Excel? A visual filtering component that provides one-click interactive filtering buttons over Pivot Tables and Excel Tables.",
        "miniQuiz": {
          "q": "Which Excel feature automatically changes a cell's background color based on its numeric value?",
          "options": [
            "Data Validation",
            "Conditional Formatting",
            "Cell Styles",
            "Pivot Summary"
          ],
          "answer": 1,
          "explanation": "Conditional Formatting dynamically formats cells based on rules (e.g. green for scores >= 75%)."
        }
      }
    ],
    "xml": [
      {
        "id": "xml-syntax-schemas",
        "category": "XML & STRUCTURED DATA",
        "title": "XML Syntax, Tree Structure, Namespaces & XPath",
        "readTime": "5 min read",
        "xp": 45,
        "summary": "Well-formed vs valid documents, XML declarations, attributes vs child elements, and XPath queries.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Extensible Markup Language (XML) is a software- and hardware-independent tool for storing and transporting structured data.</p>\n        </div>\n      ",
        "codeExample": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<curriculum institution=\"SmartLearn University\">\n  <course id=\"CS301\">\n    <title>Data Structures and Algorithms</title>\n    <credits>4</credits>\n    <mentor>Prof. Sarah Jenkins</mentor>\n  </course>\n</curriculum>",
        "interviewTip": "Difference between XML and HTML: HTML is designed to display data with focus on presentation; XML is designed to describe and carry data with focus on structured semantics.",
        "miniQuiz": {
          "q": "What is an XML document called when it obeys all fundamental XML syntax rules?",
          "options": [
            "Valid",
            "Well-formed",
            "Certified",
            "Compiled"
          ],
          "answer": 1,
          "explanation": "An XML document with correct syntax is called \"Well-formed\". If it also conforms to a DTD or Schema, it is called \"Valid\"."
        }
      },
      {
        "id": "xml-parsing-dom-sax",
        "category": "XML PARSING & APIS",
        "title": "XML Parsing Models: DOM vs SAX Parsers & XPath Queries",
        "readTime": "5 min read",
        "xp": 50,
        "summary": "Tree-based DOM parser (memory-heavy) vs event-driven SAX parser (streaming), and XPath expressions.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>DOM parsers load the entire XML document into memory as a navigable object tree, while SAX parsers stream through tags sequentially.</p>\n        </div>\n      ",
        "codeExample": "// Browser DOMParser for XML in JavaScript\nconst parser = new DOMParser();\nconst xmlDoc = parser.parseFromString(xmlString, \"application/xml\");\nconst title = xmlDoc.getElementsByTagName(\"title\")[0].textContent;\nconsole.log(\"Parsed Course Title:\", title);",
        "interviewTip": "When to choose SAX over DOM? Choose SAX when parsing huge multi-gigabyte XML files to avoid OutOfMemory errors, because SAX does not hold the tree in memory.",
        "miniQuiz": {
          "q": "Which XML parser model loads the complete document into RAM as an in-memory object tree?",
          "options": [
            "SAX Parser",
            "DOM (Document Object Model) Parser",
            "StAX Parser",
            "Push Parser"
          ],
          "answer": 1,
          "explanation": "The DOM parser constructs the full in-memory tree representation of the XML document."
        }
      }
    ],
    "django": [
      {
        "id": "django-mvt-architecture",
        "category": "DJANGO WEB FRAMEWORK",
        "title": "Django MVT Architecture, ORM Models & Views",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "Model-View-Template pattern, Django ORM migrations, URL dispatcher, and Django Admin portal.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design with \"batteries included\".</p>\n        </div>\n      ",
        "codeExample": "# models.py\nfrom django.db import models\n\nclass Student(models.Model):\n    full_name = models.CharField(max_length=100)\n    roll_number = models.CharField(max_length=20, unique=True)\n    cgpa = models.DecimalField(max_digits=4, decimal_places=2)\n    is_active = models.BooleanField(default=True)\n\n    def __str__(self):\n        return f\"{self.full_name} ({self.roll_number})\"",
        "interviewTip": "Explain the difference between MVC and Django's MVT: In Django, the framework itself handles the Controller duties; the View functions as the logic processor, and the Template handles the presentation.",
        "miniQuiz": {
          "q": "In Django's MVT architecture, what does the \"T\" stand for?",
          "options": [
            "Table",
            "Template",
            "Transaction",
            "Target"
          ],
          "answer": 1,
          "explanation": "MVT stands for Model, View, Template."
        }
      },
      {
        "id": "django-orm-migrations",
        "category": "DJANGO ORM & DATABASE",
        "title": "Django ORM Migrations, QuerySets & Admin Interface",
        "readTime": "6 min read",
        "xp": 60,
        "summary": "makemigrations, migrate, select_related vs prefetch_related, and admin.site.register.",
        "contentHtml": "\n        <div class=\"space-y-4 text-slate-300 text-[14px] leading-relaxed\">\n          <p>Django's Object-Relational Mapper (ORM) maps Python model classes to relational database tables with automatic schema version control via migrations.</p>\n        </div>\n      ",
        "codeExample": "# Filter honor students and prevent N+1 query problem\nhonor_students = Student.objects.filter(\n    is_active=True, \n    cgpa__gte=8.5\n).select_related('department').order_by('-cgpa')[:10]",
        "interviewTip": "How to avoid the N+1 queries problem in Django ORM? Use <code>select_related()</code> for ForeignKey / OneToOne relationships (SQL JOIN), and <code>prefetch_related()</code> for ManyToMany / Reverse ForeignKey relationships.",
        "miniQuiz": {
          "q": "Which CLI command applies pending database schema migrations in Django?",
          "options": [
            "python manage.py makemigrations",
            "python manage.py migrate",
            "python manage.py runmigrations",
            "python manage.py sqlmigrate"
          ],
          "answer": 1,
          "explanation": "python manage.py migrate applies existing migration files directly to the database."
        }
      }
    ]
  }
};
