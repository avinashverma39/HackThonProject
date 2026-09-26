const fs = require("fs");
const path = require("path");

const indexRaw = fs.readFileSync("index.html", "utf8");
const lines = indexRaw.split(/\r?\n/);

// Helper to get slice between 1-based line numbers inclusive
function getLines(start, end) {
  return lines.slice(start - 1, end).join("\n");
}

// 1. Common Head Elements
const commonHead = `  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />

  <!-- Fonts & Material Symbols -->
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
    rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet" />

  <!-- KaTeX for academic math formulas & proofs -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
    onload="if (window.renderMathInElement) renderMathInElement(document.body);"></script>

  <!-- Tailwind CSS CDN & Token Configuration -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "surface-dim": "#0c1017",
            "on-surface": "#e2e8f0",
            "secondary-container": "#00a6e0",
            "secondary": "#38bdf8",
            "surface-container-high": "#1e2330",
            "primary": "#818cf8",
            "primary-indigo": "#6366f1",
            "surface-container-highest": "#282e3f",
            "surface-container-low": "#111520",
            "background": "#0b0f17",
            "error": "#f87171",
            "on-surface-variant": "#94a3b8",
            "surface-variant": "#262b3a",
            "surface-container": "#151924",
            "surface-container-lowest": "#080c14",
            "tertiary": "#10b981",
            "surface": "#0b0f17"
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace']
          }
        }
      }
    };
  </script>

  <link href="styles.css" rel="stylesheet" />`;

// Common Scripts & Footer Tools
const commonFooter = `  <!-- AI STUDY ASSISTANT COPILOT DRAWER -->
${getLines(3300, 3372)}

  <!-- FLOATING AI CHATBOT BUTTON -->
${getLines(3374, 3381)}

  <!-- TOAST CONTAINER -->
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none" id="toast-container"></div>

  <!-- SCRIPT INTEGRATION (IN ORDER) -->
  <script src="course_lectures_data.js"></script>
  <script src="smartlearn_data.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="supabase_client.js"></script>
  <script src="api_service.js"></script>
  <script src="ai_engine.js"></script>
  <script src="app.js"></script>
  <script src="smartlearn.js"></script>
  <script src="smartlearn_3d.js"></script>`;

const preloader = getLines(68, 93);

// -------------------------------------------------------------
// 1. BUILD STUDENT.HTML
// -------------------------------------------------------------
console.log("Extracting student section...");
let studentLayout = getLines(1394, 2345);
// Remove 'hidden' from student-app-layout class
studentLayout = studentLayout.replace('id="student-app-layout" class="hidden min-h-screen flex bg-surface"', 'id="student-app-layout" class="min-h-screen flex bg-surface"');

// Update student sidebar footer links to point to teacher.html and index.html
studentLayout = studentLayout.replace(
  `onclick="SmartLearnApp.showMainView('teacher-dashboard')"`,
  `onclick="window.location.href='teacher.html'"`
);
studentLayout = studentLayout.replace(
  `onclick="SmartLearnApp.showMainView('landing')"`,
  `onclick="window.location.href='index.html'"`
);

// Student Modals
const studentModals = `  <!-- STUDENT RELEVANT MODALS -->
${getLines(2653, 2743)}
${getLines(2749, 2856)}
${getLines(3019, 3087)}
${getLines(3089, 3132)}
${getLines(3134, 3158)}
${getLines(3160, 3189)}
${getLines(3191, 3225)}`;

const studentHTML = `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <title>SmartLearn — Student Learning Portal &amp; Adaptive AI Hub | SIH 2026</title>
${commonHead}
  <link href="student.css" rel="stylesheet" />
</head>
<body class="bg-surface font-sans text-on-surface antialiased overflow-x-hidden selection:bg-primary-indigo selection:text-white">

${preloader}

  <!-- Quick Cross-Portal Header Bar -->
  <div class="bg-surface-container-lowest/90 border-b border-white/5 py-1.5 px-4 text-[12px] flex items-center justify-between text-slate-400 z-50 relative">
    <div class="flex items-center gap-3">
      <a href="index.html" class="flex items-center gap-1.5 hover:text-white transition-colors">
        <span class="material-symbols-outlined text-[15px]">arrow_back</span>
        <span>Back to Home</span>
      </a>
      <span class="text-white/20">•</span>
      <span class="text-primary-indigo font-semibold flex items-center gap-1">
        <span class="w-2 h-2 rounded-full bg-primary-indigo animate-pulse"></span>
        Student Portal Active
      </span>
    </div>
    <div class="flex items-center gap-4">
      <a href="courses.html" class="hover:text-white transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-[15px]">menu_book</span>
        <span class="hidden sm:inline">Courses Catalog</span>
      </a>
      <a href="quizzes.html" class="hover:text-white transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-[15px]">quiz</span>
        <span class="hidden sm:inline">Quiz Lab</span>
      </a>
      <a href="teacher.html" class="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium">
        <span class="material-symbols-outlined text-[15px]">school</span>
        <span>Teacher Portal →</span>
      </a>
    </div>
  </div>

${studentLayout}

${studentModals}

${commonFooter}

</body>
</html>`;

fs.writeFileSync("student.html", studentHTML, "utf8");
console.log("Created student.html successfully!");

// -------------------------------------------------------------
// 2. BUILD TEACHER.HTML
// -------------------------------------------------------------
console.log("Extracting teacher section...");
let teacherLayout = getLines(2352, 2642);
teacherLayout = teacherLayout.replace('id="teacher-app-layout" class="hidden min-h-screen flex bg-surface"', 'id="teacher-app-layout" class="min-h-screen flex bg-surface"');

teacherLayout = teacherLayout.replace(
  `onclick="SmartLearnApp.showMainView('student-dashboard')"`,
  `onclick="window.location.href='student.html'"`
);
teacherLayout = teacherLayout.replace(
  `onclick="SmartLearnApp.showMainView('landing')"`,
  `onclick="window.location.href='index.html'"`
);

const teacherModals = `  <!-- TEACHER RELEVANT MODALS -->
${getLines(3191, 3225)}
${getLines(3227, 3297)}`;

const teacherHTML = `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <title>SmartLearn — Faculty &amp; Teacher Portal | SIH 2026</title>
${commonHead}
  <link href="teacher.css" rel="stylesheet" />
</head>
<body class="bg-surface font-sans text-on-surface antialiased overflow-x-hidden selection:bg-emerald-600 selection:text-white">

${preloader}

  <!-- Quick Cross-Portal Header Bar -->
  <div class="bg-surface-container-lowest/90 border-b border-white/5 py-1.5 px-4 text-[12px] flex items-center justify-between text-slate-400 z-50 relative">
    <div class="flex items-center gap-3">
      <a href="index.html" class="flex items-center gap-1.5 hover:text-white transition-colors">
        <span class="material-symbols-outlined text-[15px]">arrow_back</span>
        <span>Back to Home</span>
      </a>
      <span class="text-white/20">•</span>
      <span class="text-emerald-400 font-semibold flex items-center gap-1">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Faculty &amp; Teacher Portal
      </span>
    </div>
    <div class="flex items-center gap-4">
      <a href="courses.html" class="hover:text-white transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-[15px]">menu_book</span>
        <span class="hidden sm:inline">Courses Catalog</span>
      </a>
      <a href="quizzes.html" class="hover:text-white transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-[15px]">quiz</span>
        <span class="hidden sm:inline">Quiz Lab</span>
      </a>
      <a href="student.html" class="text-primary-indigo hover:text-indigo-400 transition-colors flex items-center gap-1 font-medium">
        <span class="material-symbols-outlined text-[15px]">person</span>
        <span>Switch to Student View →</span>
      </a>
    </div>
  </div>

${teacherLayout}

${teacherModals}

${commonFooter}

</body>
</html>`;

fs.writeFileSync("teacher.html", teacherHTML, "utf8");
console.log("Created teacher.html successfully!");

// -------------------------------------------------------------
// 3. BUILD COURSES.HTML
// -------------------------------------------------------------
console.log("Building courses.html...");
const coursesHTML = `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <title>SmartLearn — Comprehensive Course Catalog &amp; Video Lectures | SIH 2026</title>
${commonHead}
  <link href="courses.css" rel="stylesheet" />
</head>
<body class="bg-surface font-sans text-on-surface antialiased overflow-x-hidden selection:bg-primary-indigo selection:text-white">

${preloader}

  <!-- Header Navigation -->
  <header class="sticky top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-xl border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a href="index.html" class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-indigo via-secondary to-tertiary flex items-center justify-center text-white shadow-md">
            <span class="material-symbols-outlined text-[20px]">school</span>
          </div>
          <span class="text-[18px] font-extrabold text-white tracking-tight">SmartLearn</span>
        </a>
        <span class="px-2 py-0.5 rounded-full bg-primary-indigo/20 text-primary-indigo text-[10px] font-bold border border-primary-indigo/30">Courses Catalog</span>
      </div>

      <!-- Center Nav Links -->
      <nav class="hidden md:flex items-center gap-1 p-1 rounded-xl bg-surface-container border border-white/5 text-[13px]">
        <a href="index.html" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">Home</a>
        <a href="student.html" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">Student Portal</a>
        <a href="teacher.html" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">Teacher Hub</a>
        <a href="courses.html" class="px-3 py-1.5 rounded-lg bg-primary-indigo text-white font-medium">Courses</a>
        <a href="quizzes.html" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">Quizzes</a>
      </nav>

      <div class="flex items-center gap-3">
        <a href="student.html" class="px-4 py-2 rounded-xl bg-primary-indigo hover:bg-indigo-500 text-white font-medium text-[13px] flex items-center gap-1.5 shadow-md shadow-indigo-900/30 transition-all">
          <span class="material-symbols-outlined text-[16px]">play_circle</span>
          <span>My Learning Hub</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Courses Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">

    <!-- Courses Hero Banner -->
    <div class="courses-hero-banner flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex flex-col gap-3 max-w-2xl">
        <span class="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-[11px] font-semibold border border-secondary/30 w-fit flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">auto_awesome</span>
          AI-Curated Syllabus &amp; Video Lectures
        </span>
        <h1 class="text-[32px] sm:text-[40px] font-extrabold text-white leading-tight">
          Explore Comprehensive Curriculum &amp; Core Engineering Tracks
        </h1>
        <p class="text-[14px] text-slate-300">
          Master Data Structures, C Systems, Operating Systems, DBMS, and Modern Web Architecture with personalized learning paths, interactive modules, and hands-on coding practice.
        </p>
      </div>
      <div class="flex flex-col gap-3 w-full md:w-80">
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3.5 top-3 text-[18px] text-slate-400">search</span>
          <input type="text" id="courses-search-bar"
            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-white text-[13px] focus:outline-none focus:ring-1 focus:ring-primary-indigo"
            placeholder="Search subjects, topics, or faculty..."
            oninput="SmartLearnApp.filterCoursesByKeyword ? SmartLearnApp.filterCoursesByKeyword(this.value) : null">
        </div>
        <div class="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
          <span>6 Active Tracks</span>
          <span class="text-emerald-400">Supabase Cloud Sync</span>
        </div>
      </div>
    </div>

    <!-- Category Filter Bar -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5">
      <button class="course-filter-chip active" onclick="SmartLearnApp.setCourseSubjectFilter('all', this)">
        <span class="material-symbols-outlined text-[16px]">apps</span>
        <span>All Tracks</span>
      </button>
      <button class="course-filter-chip" onclick="SmartLearnApp.setCourseSubjectFilter('Data Structures', this)">
        <span class="material-symbols-outlined text-[16px]">account_tree</span>
        <span>Data Structures</span>
      </button>
      <button class="course-filter-chip" onclick="SmartLearnApp.setCourseSubjectFilter('C Programming', this)">
        <span class="material-symbols-outlined text-[16px]">terminal</span>
        <span>C Systems</span>
      </button>
      <button class="course-filter-chip" onclick="SmartLearnApp.setCourseSubjectFilter('Database', this)">
        <span class="material-symbols-outlined text-[16px]">database</span>
        <span>DBMS</span>
      </button>
      <button class="course-filter-chip" onclick="SmartLearnApp.setCourseSubjectFilter('Operating Systems', this)">
        <span class="material-symbols-outlined text-[16px]">memory</span>
        <span>OS</span>
      </button>
      <button class="course-filter-chip" onclick="SmartLearnApp.setCourseSubjectFilter('Spring Boot', this)">
        <span class="material-symbols-outlined text-[16px]">bolt</span>
        <span>Spring Boot</span>
      </button>
      <button class="course-filter-chip" onclick="SmartLearnApp.setCourseSubjectFilter('Web Development', this)">
        <span class="material-symbols-outlined text-[16px]">code</span>
        <span>Modern Web</span>
      </button>
    </div>

    <!-- Courses Grid Section -->
    <section class="flex flex-col gap-5">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-[22px] font-bold text-white">Full Curriculum Courses</h2>
          <p class="text-[13px] text-slate-400">Click any course to preview lessons, syllabus, and video lectures.</p>
        </div>
        <a href="student.html#courses" class="text-primary-indigo hover:underline text-[12px] font-semibold flex items-center gap-1">
          <span>Manage Enrolled Courses in Student Portal</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="courses-grid">
        <!-- Rendered by SmartLearnApp.renderCourses() -->
      </div>
    </section>

    <!-- Subjects Grid Section -->
    <section class="flex flex-col gap-5 pt-8 border-t border-white/5">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-[22px] font-bold text-white">Subject Domains</h2>
          <p class="text-[13px] text-slate-400">Categorized by university syllabus topics and semester requirements.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="subjects-grid">
        <!-- Rendered by SmartLearnApp.renderSubjects() -->
      </div>
    </section>

    <!-- Study Materials & PDF Cheatsheets Section -->
    <section class="flex flex-col gap-5 pt-8 border-t border-white/5">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-[22px] font-bold text-white">Study Materials &amp; Lecture Handouts</h2>
          <p class="text-[13px] text-slate-400">Download high-yield revision summaries, algorithm proofs, and formula sheets.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="materials-grid">
        <!-- Rendered by SmartLearnApp.renderMaterials() -->
      </div>
    </section>

    <!-- Video Lectures Section -->
    <section class="flex flex-col gap-5 pt-8 border-t border-white/5">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-[22px] font-bold text-white">Curated Video Masterclasses</h2>
          <p class="text-[13px] text-slate-400">Stream animated chapter breakdowns with synchronized syllabus navigation.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="videos-grid">
        <!-- Rendered by SmartLearnApp.renderVideos() -->
      </div>
    </section>

  </main>

  <!-- Modals for Courses Page -->
  ${getLines(3134, 3158)}
  ${getLines(3160, 3189)}
  ${getLines(3191, 3225)}

${commonFooter}

</body>
</html>`;

fs.writeFileSync("courses.html", coursesHTML, "utf8");
console.log("Created courses.html successfully!");

// -------------------------------------------------------------
// 4. BUILD QUIZZES.HTML
// -------------------------------------------------------------
console.log("Building quizzes.html...");
const quizzesHTML = `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <title>SmartLearn — Quizzes, KaTeX Proofs &amp; Adaptive Practice Lab | SIH 2026</title>
${commonHead}
  <link href="quizzes.css" rel="stylesheet" />
</head>
<body class="bg-surface font-sans text-on-surface antialiased overflow-x-hidden selection:bg-primary-indigo selection:text-white">

${preloader}

  <!-- Header Navigation -->
  <header class="sticky top-0 z-50 w-full bg-surface-container-lowest/80 backdrop-blur-xl border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a href="index.html" class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-indigo via-secondary to-tertiary flex items-center justify-center text-white shadow-md">
            <span class="material-symbols-outlined text-[20px]">quiz</span>
          </div>
          <span class="text-[18px] font-extrabold text-white tracking-tight">SmartLearn</span>
        </a>
        <span class="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold border border-secondary/30">Assessments &amp; Drills</span>
      </div>

      <!-- Center Nav Links -->
      <nav class="hidden md:flex items-center gap-1 p-1 rounded-xl bg-surface-container border border-white/5 text-[13px]">
        <a href="index.html" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">Home</a>
        <a href="student.html" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">Student Portal</a>
        <a href="teacher.html" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">Teacher Hub</a>
        <a href="courses.html" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">Courses</a>
        <a href="quizzes.html" class="px-3 py-1.5 rounded-lg bg-secondary text-surface-container-lowest font-bold">Quizzes</a>
      </nav>

      <div class="flex items-center gap-3">
        <a href="student.html#quizzes" class="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 text-white font-medium text-[13px] flex items-center gap-1.5 transition-all">
          <span class="material-symbols-outlined text-[16px]">history_edu</span>
          <span>My Quiz History</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Quizzes Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">

    <!-- Quizzes Hero Banner -->
    <div class="p-8 rounded-3xl bg-gradient-to-r from-surface-container via-surface-container-low to-surface-container-high border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      <div class="flex flex-col gap-3 max-w-2xl relative z-10">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
            Real-Time Assessment Engine
          </span>
          <span class="px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary text-[11px] font-mono">
            KaTeX LaTeX Proofs
          </span>
        </div>
        <h1 class="text-[32px] sm:text-[38px] font-extrabold text-white leading-tight">
          Adaptive Testing, Timed Challenges &amp; Instant AI Explanations
        </h1>
        <p class="text-[14px] text-slate-300">
          Reinforce conceptual depth with multi-tiered difficulty questions. Every quiz immediately benchmarks your mastery and updates your personal weak-topics tracker.
        </p>
      </div>

      <!-- Quick Launch Practice Drills -->
      <div class="p-5 rounded-2xl bg-surface-container-lowest/80 border border-white/10 backdrop-blur-md flex flex-col gap-3 w-full md:w-80">
        <div class="flex items-center justify-between">
          <span class="text-[13px] font-bold text-white flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-rose-400">fitness_center</span>
            Rapid Topic Drills
          </span>
          <span class="text-[10px] text-slate-400 font-mono">Instant Run</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button class="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-[12px] text-slate-200 text-left font-medium transition-all"
            onclick="SmartLearnApp.startPracticeSession('Pointers')">
            🎯 Pointers
          </button>
          <button class="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-[12px] text-slate-200 text-left font-medium transition-all"
            onclick="SmartLearnApp.startPracticeSession('Arrays')">
            📊 Arrays
          </button>
          <button class="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-[12px] text-slate-200 text-left font-medium transition-all"
            onclick="SmartLearnApp.startPracticeSession('Functions')">
            ⚡ Functions
          </button>
          <button class="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-[12px] text-slate-200 text-left font-medium transition-all"
            onclick="SmartLearnApp.startPracticeSession('Loops')">
            🔄 Loops
          </button>
        </div>
      </div>
    </div>

    <!-- Active Quizzes List -->
    <section class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-[22px] font-bold text-white">Full Subject Assessments</h2>
          <p class="text-[13px] text-slate-400">Select a quiz to launch the full-screen timed assessment runner.</p>
        </div>
      </div>

      <div class="flex flex-col gap-4" id="quizzes-list-container">
        <!-- Rendered by SmartLearnApp.renderQuizzes() -->
      </div>
    </section>

    <!-- Interactive Adaptive Practice Runner Section -->
    <section class="flex flex-col gap-6 pt-8 border-t border-white/5">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-[22px] font-bold text-white" id="practice-active-topic-title">Interactive Adaptive Practice Drills</h2>
          <p class="text-[13px] text-slate-400">Step-by-step problem solving with instant feedback and deep explanations.</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-[12px] font-medium text-slate-200"
            onclick="SmartLearnApp.startPracticeSession('Pointers')">Pointers</button>
          <button class="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-[12px] font-medium text-slate-200"
            onclick="SmartLearnApp.startPracticeSession('Arrays')">Arrays</button>
          <button class="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-[12px] font-medium text-slate-200"
            onclick="SmartLearnApp.startPracticeSession('Functions')">Functions</button>
          <button class="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-[12px] font-medium text-slate-200"
            onclick="SmartLearnApp.startPracticeSession('Loops')">Loops</button>
        </div>
      </div>
      <!-- Interactive Practice Runner Container -->
      <div id="practice-questions-target"></div>
    </section>

  </main>

  <!-- Quiz Modals -->
  ${getLines(3019, 3087)}
  ${getLines(3089, 3132)}

${commonFooter}

</body>
</html>`;

fs.writeFileSync("quizzes.html", quizzesHTML, "utf8");
console.log("Created quizzes.html successfully!");
