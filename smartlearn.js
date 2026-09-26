/**
 * SmartLearn — Main Application Controller & Interactive Logic
 * Project: SmartLearn | Team: HACKSMITH | Theme: Smart Education (SIH 2026)
 * Personalized Digital Learning Platform
 */

const SmartLearnApp = (function () {
  // Application State
  const state = {
    currentRole: "student", // 'student' | 'teacher' | 'guest'
    currentMainView: "landing", // 'landing' | 'student-dashboard' | 'teacher-dashboard'
    currentStudentTab: "dashboard", // 'dashboard', 'courses', 'subjects', 'materials', 'videos', 'quizzes', 'practice', 'performance', 'weak-topics', 'recommendations', 'progress', 'profile', 'settings'
    currentTeacherTab: "teacher-dashboard", // 'teacher-dashboard', 'teacher-courses', 'teacher-materials', 'teacher-quizzes', 'teacher-students', 'teacher-settings'
    activeCourse: null,
    activeSubjectFilter: "all",
    activeTypeFilter: "all",
    // Interactive Quiz Session State
    activeQuiz: null,
    activeQuizIndex: 0,
    activeQuizAnswers: {},
    activeQuizTimer: null,
    activeQuizSecondsRemaining: 600,
    // Active Practice State
    activePracticeTopic: "Pointers",
    activePracticeIndex: 0,
    activePracticeQuestions: [],
    activePracticeAnswers: {}
  };

  // Toast notification helper
  function notify(title, message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-xl pointer-events-auto transition-all duration-300 transform translate-y-4 opacity-0 z-50 ${
      type === "success"
        ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-100"
        : type === "error"
        ? "bg-rose-950/90 border-rose-500/30 text-rose-100"
        : "bg-surface-container/95 border-white/10 text-white"
    }`;

    const icon = type === "success" ? "check_circle" : type === "error" ? "error" : "info";

    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px] text-${type === 'success' ? 'emerald-400' : type === 'error' ? 'rose-400' : 'secondary'}">${icon}</span>
      <div class="flex flex-col">
        <span class="text-[13px] font-semibold">${title}</span>
        <span class="text-[12px] opacity-80">${message}</span>
      </div>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-4", "opacity-0");
    });

    setTimeout(() => {
      toast.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- INITIALIZATION (SUPABASE CLOUD RESTORATION) ---
  async function init() {
    console.log("Initializing SmartLearn Hub — Team HACKSMITH (SIH 2026)");
    setupGlobalEventListeners();
    setupTheme();

    // 1. Restore active Supabase session
    if (window.SmartLearnSupabase) {
      try {
        const user = await window.SmartLearnSupabase.restoreSession();
        if (user) {
          state.currentUser = user;
          state.currentRole = user.role;
          updateUserUI(user);
        }
      } catch (err) {
        console.warn("Could not restore Supabase session:", err);
      }
    }

    await renderAllViews();

    // Automatically detect which page or section is active
    const path = (window.location.pathname || "").toLowerCase();
    const isStudentPage = path.includes("student.html") || (document.getElementById("student-app-layout") && !document.getElementById("public-landing-view"));
    const isTeacherPage = path.includes("teacher.html") || (document.getElementById("teacher-app-layout") && !document.getElementById("public-landing-view"));

    if (isStudentPage) {
      showMainView("student-dashboard");
      const hash = window.location.hash.replace("#", "");
      if (hash && document.getElementById(`subview-${hash}`)) {
        showStudentTab(hash);
      }
    } else if (isTeacherPage) {
      showMainView("teacher-dashboard");
      const hash = window.location.hash.replace("#", "");
      if (hash && document.getElementById(`teacher-subview-${hash}`)) {
        showTeacherTab(hash);
      }
    } else {
      showMainView("landing");
    }
  }

  // Dynamic User UI Sync across Header, Navbar, and Dashboards
  function updateUserUI(user) {
    const navContainer = document.getElementById("nav-auth-container");
    if (!user) {
      if (navContainer) {
        navContainer.innerHTML = `
          <button class="uiverse-btn-tactile text-slate-300 hover:text-white !px-3.5 !py-1.5 text-[13px]" onclick="SmartLearnApp.openLoginModal('student')">
            <span class="material-symbols-outlined text-[15px]">login</span>
            <span class="hidden sm:inline">Sign In</span>
          </button>
          <button class="uiverse-btn-3d text-[13px] !py-2 !px-4 navbar-cta-shimmer" onclick="SmartLearnApp.openRegisterModal()">
            <span class="relative z-10 font-bold">Sign Up Free</span>
            <span class="material-symbols-outlined text-[16px] relative z-10">arrow_forward</span>
          </button>
        `;
      }
      return;
    }

    const userName = user.full_name || user.name || "Avinash Verma";
    const userRole = user.role || "student";
    const isTeacher = userRole === "teacher";
    const avatar = user.avatar_url || user.avatar || (isTeacher
      ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
      : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80");

    const firstName = userName.trim().split(" ")[0] || "Student";
    const streakDays = user.streak_days || user.streakDays || 12;
    const rollNo = user.roll_no || user.rollNo || "24CSE089";
    const dept = user.department || "Computer Science & Engineering";
    const semester = user.semester || "Semester 5 (3rd Year B.Tech)";
    const college = user.college || "Institute of Engineering & Technology";

    // 1. Update Navigation Bar Pill
    if (navContainer) {
      navContainer.innerHTML = `
        <div class="flex items-center gap-2">
          <button class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 text-[12px] text-white transition-all shadow-sm" onclick="SmartLearnApp.showMainView('${isTeacher ? 'teacher-dashboard' : 'student-dashboard'}')">
            <img src="${avatar}" class="w-6 h-6 rounded-full object-cover ring-1 ring-white/20">
            <span class="font-medium">${firstName}</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${isTeacher ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary-indigo/20 text-primary-indigo'} uppercase">${userRole}</span>
          </button>
          <button class="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors" onclick="SmartLearnApp.signOut()" title="Sign Out">
            <span class="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      `;
    }

    // 2. Update Student Header Profile & Streak
    const stuName = document.getElementById("student-header-name");
    const stuRole = document.getElementById("student-header-role");
    const stuAvatar = document.getElementById("student-header-avatar");
    const stuStreak = document.getElementById("student-header-streak");
    if (stuName) stuName.textContent = userName;
    if (stuRole) stuRole.textContent = `Student • ${dept.includes('Computer') ? 'CS' : dept}`;
    if (stuAvatar) stuAvatar.src = avatar;
    if (stuStreak) stuStreak.textContent = `${streakDays}-day streak`;

    // 3. Update Student Dashboard Welcome Banner (Real student name & details)
    const heroGreeting = document.getElementById("dashboard-student-greeting");
    const heroSubtitle = document.getElementById("dashboard-student-subtitle");
    const heroDept = document.getElementById("dashboard-student-dept");
    const heroSemester = document.getElementById("dashboard-semester-badge");

    if (heroGreeting) heroGreeting.textContent = `Welcome back, ${firstName}!`;
    if (heroSubtitle) {
      heroSubtitle.textContent = `You've maintained your ${streakDays}-day study streak. You have 1 prioritized weak topic ready for remediation and 3 pending quizzes.`;
    }
    if (heroDept) heroDept.textContent = `${dept} • Roll: ${rollNo}`;
    if (heroSemester) heroSemester.textContent = `Active ${semester.split(' ')[0] + ' ' + (semester.split(' ')[1] || '')} • Week 6`;

    // 4. Update Top Analytics Metric Cards
    const overallProg = document.getElementById("dashboard-overall-progress");
    const quizAvg = document.getElementById("dashboard-quiz-average");
    const enrolledCourses = document.getElementById("dashboard-enrolled-courses");
    const studyStreak = document.getElementById("dashboard-study-streak");
    const progressStreak = document.getElementById("progress-streak-count");

    if (overallProg) overallProg.textContent = `${user.overall_progress || user.overallProgress || 72}%`;
    if (quizAvg) quizAvg.textContent = `${user.quiz_average || user.quizAverage || 78}%`;
    if (enrolledCourses) enrolledCourses.textContent = `${user.enrolled_courses_count || user.enrolledCoursesCount || 5}`;
    if (studyStreak) studyStreak.textContent = `${streakDays} Days`;
    if (progressStreak) progressStreak.textContent = `${streakDays} Days`;

    // 5. Update Cohort Comparison in Analytics Tab
    const cohortHeading = document.getElementById("student-cohort-heading");
    if (cohortHeading) cohortHeading.textContent = `${firstName}'s Score vs Cohort Average`;

    // 6. Update Profile Subview Elements
    const profName = document.getElementById("profile-student-name");
    const profEmail = document.getElementById("profile-student-email");
    const profAvatar = document.getElementById("profile-student-avatar");
    const profRoll = document.getElementById("profile-student-roll");
    const profDept = document.getElementById("profile-student-dept");
    const profSemester = document.getElementById("profile-student-semester");
    const profCollege = document.getElementById("profile-student-college");
    const profBio = document.getElementById("profile-student-bio");
    const profMastery = document.getElementById("profile-student-mastery");
    const profStreak = document.getElementById("profile-student-streak");

    if (profName) profName.textContent = userName;
    if (profEmail) profEmail.textContent = user.email || `${userName.toLowerCase().replace(/\s+/g, '.')}@smartlearn.edu`;
    if (profAvatar) profAvatar.src = avatar;
    if (profRoll) profRoll.textContent = rollNo;
    if (profDept) profDept.textContent = dept;
    if (profSemester) profSemester.textContent = semester;
    if (profCollege) profCollege.textContent = college;
    if (profBio && user.bio) profBio.textContent = user.bio;
    if (profMastery) profMastery.textContent = `${user.overall_progress || user.overallProgress || 72}%`;
    if (profStreak) profStreak.textContent = `${streakDays} Days`;

    // 7. Update Copilot Initial Welcome Message
    const copilotMsg = document.getElementById("copilot-welcome-message");
    if (copilotMsg) {
      copilotMsg.innerHTML = `Hi ${firstName}! I'm your <strong>SmartLearn AI Tutor</strong> (powered by GPT-4o &amp; Gemini 1.5 reasoning). Ask me anything about Data Structures, Pointers in C, SQL Normalization, Spring Boot, or exam preparation!`;
    }

    // 8. Update Teacher Header Profile
    const teachName = document.getElementById("teacher-header-name");
    const teachRole = document.getElementById("teacher-header-role");
    const teachAvatar = document.getElementById("teacher-header-avatar");
    if (teachName) teachName.textContent = userName;
    if (teachRole) teachRole.textContent = `Faculty • ${dept}`;
    if (teachAvatar) teachAvatar.src = avatar;
  }

  async function signOut() {
    await SmartLearnAPI.signOut();
    state.currentUser = null;
    updateUserUI(null);
    notify("Signed Out", "You have been logged out securely.", "info");
    const isLanding = document.getElementById("public-landing-view");
    if (!isLanding) {
      window.location.href = "index.html";
    } else {
      showMainView("landing");
    }
  }

  // --- VIEW SWITCHING ---
  function showMainView(viewName) {
    state.currentMainView = viewName;
    const landing = document.getElementById("public-landing-view");
    const studentApp = document.getElementById("student-app-layout");
    const teacherApp = document.getElementById("teacher-app-layout");

    // Seamless multi-page cross-navigation
    const path = (window.location.pathname || "").toLowerCase();
    if (viewName === "student-dashboard" && !studentApp && !path.includes("student.html")) {
      window.location.href = "student.html";
      return;
    }
    if (viewName === "teacher-dashboard" && !teacherApp && !path.includes("teacher.html")) {
      window.location.href = "teacher.html";
      return;
    }
    if (viewName === "landing" && !landing && !path.endsWith("index.html") && path !== "/") {
      window.location.href = "index.html";
      return;
    }

    if (landing) landing.classList.toggle("hidden", viewName !== "landing");
    if (studentApp) studentApp.classList.toggle("hidden", viewName !== "student-dashboard");
    if (teacherApp) teacherApp.classList.toggle("hidden", viewName !== "teacher-dashboard");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (viewName === "student-dashboard") {
      showStudentTab(state.currentStudentTab || "dashboard");
    } else if (viewName === "teacher-dashboard") {
      showTeacherTab(state.currentTeacherTab || "teacher-dashboard");
    }
  }

  function showStudentTab(tabName) {
    state.currentStudentTab = tabName;
    document.querySelectorAll(".student-subview").forEach(el => el.classList.add("hidden"));
    const target = document.getElementById(`subview-${tabName}`);
    if (target) {
      target.classList.remove("hidden");
    }

    // Update active state in student sidebar
    document.querySelectorAll(".student-nav-item").forEach(btn => {
      const isTarget = btn.getAttribute("data-tab") === tabName;
      if (isTarget) {
        btn.classList.add("bg-primary-indigo", "text-white", "font-semibold");
        btn.classList.remove("text-slate-400", "hover:bg-surface-container");
      } else {
        btn.classList.remove("bg-primary-indigo", "text-white", "font-semibold");
        btn.classList.add("text-slate-400", "hover:bg-surface-container");
      }
    });

    // Update breadcrumb
    const crumb = document.getElementById("student-header-crumb");
    if (crumb) {
      const titles = {
        dashboard: "Student Dashboard Overview",
        courses: "My Enrolled Courses",
        subjects: "Subject Modules & Curriculum",
        materials: "Study Materials & Notes Archive",
        videos: "Video Learning Library",
        quizzes: "Interactive Quizzes & Assessments",
        practice: "Adaptive Practice Drills",
        performance: "Performance Analytics & Mastery Curves",
        "weak-topics": "Weak Topics Identification & Action Plan",
        recommendations: "Personalized Study Recommendations",
        progress: "Learning Progress Tracking",
        profile: "Student Profile",
        settings: "Platform Settings"
      };
      crumb.textContent = titles[tabName] || "Student Dashboard";
    }

    // Refresh dynamic content for tab
    if (tabName === "courses") renderCourses();
    if (tabName === "subjects") renderSubjects();
    if (tabName === "materials") renderMaterials();
    if (tabName === "videos") renderVideos();
    if (tabName === "quizzes") renderQuizzes();
    if (tabName === "weak-topics") renderWeakTopics();
    if (tabName === "recommendations") renderRecommendations();
    if (tabName === "practice") startPracticeSession(state.activePracticeTopic || "Pointers");
    if (tabName === "progress") renderProgressDashboard();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showTeacherTab(tabName) {
    state.currentTeacherTab = tabName;
    document.querySelectorAll(".teacher-subview").forEach(el => el.classList.add("hidden"));
    const target = document.getElementById(`teacher-subview-${tabName}`);
    if (target) {
      target.classList.remove("hidden");
    }

    // Update teacher nav active state
    document.querySelectorAll(".teacher-nav-item").forEach(btn => {
      const isTarget = btn.getAttribute("data-tab") === tabName;
      if (isTarget) {
        btn.classList.add("bg-emerald-600", "text-white", "font-semibold");
        btn.classList.remove("text-slate-400", "hover:bg-surface-container");
      } else {
        btn.classList.remove("bg-emerald-600", "text-white", "font-semibold");
        btn.classList.add("text-slate-400", "hover:bg-surface-container");
      }
    });

    if (tabName === "teacher-courses") renderTeacherCourses();
    if (tabName === "teacher-quizzes") renderTeacherQuizzes();
    if (tabName === "teacher-students") renderTeacherStudents();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- RENDER ALL VIEWS ---
  async function renderAllViews() {
    renderLandingStats();
    renderLandingFeatures();
    renderCourses();
    renderSubjects();
    renderMaterials();
    renderVideos();
    renderQuizzes();
    renderWeakTopics();
    renderRecommendations();
    renderTeacherCourses();
    renderTeacherStudents();
    renderNotifications();
  }

  // 1. Landing Page Interactive Elements
  function renderLandingStats() {
    // Dynamic animated counters on landing
    const statsContainer = document.getElementById("landing-live-stats");
    if (!statsContainer) return;
    statsContainer.innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface-container/60 border border-white/10 backdrop-blur-xl">
        <div class="flex flex-col items-center justify-center p-3 text-center border-r border-white/5">
          <span class="text-[28px] lg:text-[34px] font-bold text-white font-mono">24,800+</span>
          <span class="text-[12px] text-slate-400 mt-1">Active Students</span>
        </div>
        <div class="flex flex-col items-center justify-center p-3 text-center border-r border-white/5">
          <span class="text-[28px] lg:text-[34px] font-bold text-secondary font-mono">94.8%</span>
          <span class="text-[12px] text-slate-400 mt-1">Concept Mastery</span>
        </div>
        <div class="flex flex-col items-center justify-center p-3 text-center border-r border-white/5">
          <span class="text-[28px] lg:text-[34px] font-bold text-emerald-400 font-mono">3.2x</span>
          <span class="text-[12px] text-slate-400 mt-1">Faster Weak-Topic Fix</span>
        </div>
        <div class="flex flex-col items-center justify-center p-3 text-center">
          <span class="text-[28px] lg:text-[34px] font-bold text-indigo-400 font-mono">500+</span>
          <span class="text-[12px] text-slate-400 mt-1">Curated Modules</span>
        </div>
      </div>
    `;
  }

  function renderLandingFeatures() {
    const list = [
      { icon: "menu_book", title: "Subject-wise Notes", desc: "Structured, professor-verified notes with downloadable PDF and Markdown cheatsheets for rapid revision." },
      { icon: "smart_display", title: "Video Learning", desc: "Interactive video player with timestamped chapters, synchronized transcripts, and concept drill buttons." },
      { icon: "quiz", title: "Interactive Quizzes", desc: "Timed concept evaluations with granular topic tagging to benchmark understanding in real-time." },
      { icon: "monitoring", title: "Performance Analysis", desc: "Instant decomposition of quiz attempts into topic percentages, time efficiency, and accuracy." },
      { icon: "crisis_alert", title: "Weak Topic Detection", desc: "Automatic identification of topics scoring below 70%, with clear error pattern diagnosis." },
      { icon: "psychology", title: "Personalized Recommendations", desc: "Transparent recommendation engine explaining exactly why a resource is suggested for you." },
      { icon: "fitness_center", title: "Practice Questions", desc: "Topic and difficulty-filtered practice drills with instant feedback and comprehensive rationales." },
      { icon: "trending_up", title: "Learning Progress", desc: "Visual retention curves, weekly study hour tracking, study streaks, and degree milestone maps." },
      { icon: "folder_managed", title: "Teacher Course Management", desc: "Full curriculum builder for educators to upload notes, manage modules, and add video lectures." },
      { icon: "ballot", title: "Quiz Management", desc: "Intuitive quiz authoring interface for teachers to create multi-choice assessments with answer keys." }
    ];

    const target = document.getElementById("landing-features-grid");
    if (!target) return;
    target.innerHTML = list
      .map(
        (f, idx) => `
        <div class="p-6 rounded-2xl uiverse-card-3d border border-white/5 hover:border-primary-indigo/40 transition-all duration-300 flex flex-col gap-3 group preserve-3d" data-tilt data-tilt-max="8">
          <div class="card-spotlight"></div>
          <div class="w-12 h-12 rounded-xl bg-primary-indigo/10 group-hover:bg-primary-indigo/20 flex items-center justify-center text-primary-indigo transition-transform duration-300 group-hover:scale-110" style="transform: translateZ(25px);">
            <span class="material-symbols-outlined text-[26px]">${f.icon}</span>
          </div>
          <h4 class="text-[16px] font-bold text-white group-hover:text-primary transition-colors" style="transform: translateZ(20px);">${idx + 1}. ${f.title}</h4>
          <p class="text-[13px] text-slate-400 leading-relaxed" style="transform: translateZ(15px);">${f.desc}</p>
        </div>
      `
      )
      .join("");
    if (window.SmartLearn3D && window.SmartLearn3D.initTiltSystem) {
      window.SmartLearn3D.initTiltSystem();
    }
  }

  // 2. Courses Rendering (Integrated with Supabase Cloud Enrollment)
  async function renderCourses() {
    const courses = await SmartLearnAPI.getCourses();
    const container = document.getElementById("courses-grid");
    if (!container) return;

    // Check enrollment status for each course asynchronously
    const enrollmentStatuses = await Promise.all(
      courses.map(async c => {
        const enrolled = await SmartLearnAPI.isEnrolled(c.id);
        return { id: c.id, enrolled };
      })
    );
    const enrolledMap = {};
    enrollmentStatuses.forEach(s => { enrolledMap[s.id] = s.enrolled; });

    container.innerHTML = courses
      .map(
        c => {
          const isEnrolled = !!enrolledMap[c.id];
          const totalL = c.total_lessons || c.totalLessons || 12;
          const compL = c.completed_lessons || c.completedLessons || 0;
          const enrolledCount = c.students_enrolled || c.studentsEnrolled || 0;
          const progressVal = c.progress || 0;

          return `
      <div class="rounded-2xl bg-surface-container border ${isEnrolled ? 'border-primary-indigo/40 ring-1 ring-primary-indigo/20' : 'border-white/5'} overflow-hidden flex flex-col hover:border-primary-indigo/50 transition-all duration-300 hover:shadow-xl group">
        <div class="relative h-44 overflow-hidden">
          <img src="${c.thumbnail}" alt="${c.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent"></div>
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md text-[11px] font-semibold text-secondary border border-white/10">
            ${c.difficulty || 'Intermediate'}
          </span>
          ${
            isEnrolled
              ? `<span class="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-md">
                  <span class="material-symbols-outlined text-[13px]">check_circle</span> Enrolled ✓
                </span>`
              : `<span class="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-indigo-950/80 backdrop-blur-md text-[11px] font-semibold text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">school</span> Available
                </span>`
          }
          <span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-slate-300">
            ${compL}/${totalL} Lessons
          </span>
        </div>
        <div class="p-5 flex flex-col flex-1 justify-between gap-4">
          <div class="flex flex-col gap-1.5">
            <h4 class="text-[16px] font-bold text-white leading-snug line-clamp-2">${c.title}</h4>
            <div class="flex items-center justify-between text-[12px] text-slate-400">
              <span class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[14px]">person</span> ${c.instructor}
              </span>
              <span class="font-mono text-emerald-400 text-[11px] flex items-center gap-1">
                <span class="material-symbols-outlined text-[12px]">group</span> ${enrolledCount} enrolled
              </span>
            </div>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between text-[12px]">
              <span class="text-slate-400">Course Progress</span>
              <span class="font-mono text-primary-indigo font-bold">${progressVal}%</span>
            </div>
            <div class="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div class="h-full bg-gradient-to-r from-primary-indigo to-secondary rounded-full" style="width: ${progressVal}%"></div>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2 border-t border-white/5">
            ${
              isEnrolled
                ? `
              <button class="flex-1 py-2 px-3 rounded-xl bg-primary-indigo hover:bg-indigo-500 text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm" onclick="SmartLearnApp.openCourseDetail('${c.id}')">
                <span>Continue Learning</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            `
                : `
              <button class="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95" onclick="SmartLearnApp.enrollInCourse('${c.id}', '${encodeURIComponent(c.title)}')">
                <span class="material-symbols-outlined text-[16px]">school</span>
                <span>Enroll Now</span>
              </button>
              <button class="p-2 rounded-xl bg-surface-container-high hover:bg-surface-variant text-slate-300 hover:text-white transition-colors" onclick="SmartLearnApp.openCourseDetail('${c.id}')" title="Course Curriculum">
                <span class="material-symbols-outlined text-[16px]">info</span>
              </button>
            `
            }
          </div>
        </div>
      </div>
    `;
        }
      )
      .join("");
  }

  // 3. Subjects Rendering
  async function renderSubjects() {
    const subjects = await SmartLearnAPI.getSubjects();
    const container = document.getElementById("subjects-grid");
    if (!container) return;

    container.innerHTML = subjects
      .map(
        s => `
      <div class="p-6 rounded-2xl bg-surface-container border border-white/5 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:shadow-lg group">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-lg">
              <span class="material-symbols-outlined text-[24px]">${s.icon}</span>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-surface-container-high text-[11px] font-mono text-slate-300 border border-white/5">
              ${s.code}
            </span>
          </div>
          <div>
            <h4 class="text-[17px] font-bold text-white group-hover:text-primary transition-colors">${s.name}</h4>
            <span class="text-[12px] text-slate-400">${s.category} • ${s.level}</span>
          </div>
          <p class="text-[13px] text-slate-300 leading-relaxed">${s.description}</p>
        </div>

        <div class="flex flex-col gap-3 mt-4 pt-4 border-t border-white/5">
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="p-2 rounded-lg bg-surface-container-low">
              <span class="text-[14px] font-bold text-white font-mono">${s.lessonsCount}</span>
              <span class="block text-[10px] text-slate-400 uppercase tracking-wider">Lessons</span>
            </div>
            <div class="p-2 rounded-lg bg-surface-container-low">
              <span class="text-[14px] font-bold text-secondary font-mono">${s.quizzesCount}</span>
              <span class="block text-[10px] text-slate-400 uppercase tracking-wider">Quizzes</span>
            </div>
            <div class="p-2 rounded-lg bg-surface-container-low">
              <span class="text-[14px] font-bold text-emerald-400 font-mono">${s.practiceCount}</span>
              <span class="block text-[10px] text-slate-400 uppercase tracking-wider">Drills</span>
            </div>
          </div>

          <div class="flex items-center justify-between gap-2">
            <span class="text-[12px] text-slate-400">Mastery: <b class="text-white">${s.progress}%</b></span>
            <button class="px-3.5 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-variant text-slate-200 hover:text-white text-[12px] font-medium transition-colors border border-white/5" onclick="SmartLearnApp.filterMaterialsBySubject('${s.id}')">
              View Syllabus
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 4. Study Materials Rendering
  async function renderMaterials() {
    const materials = await SmartLearnAPI.getMaterials(state.activeSubjectFilter, state.activeTypeFilter);
    const container = document.getElementById("materials-grid");
    if (!container) return;

    if (materials.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-12 rounded-2xl bg-surface-container text-center flex flex-col items-center justify-center gap-3 border border-white/5">
          <span class="material-symbols-outlined text-[48px] text-slate-500">folder_open</span>
          <h4 class="text-[16px] font-bold text-white">No materials found</h4>
          <p class="text-[13px] text-slate-400">Try adjusting your subject or material type filters.</p>
          <button class="mt-2 px-4 py-2 rounded-xl bg-primary-indigo text-white text-[13px] font-medium" onclick="SmartLearnApp.resetMaterialFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = materials
      .map(
        m => `
      <div class="p-5 rounded-2xl bg-surface-container border border-white/5 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:shadow-lg group">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
              m.type === 'pdf'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : m.type === 'notes'
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }">
              ${m.badge}
            </span>
            <span class="text-[11px] font-mono text-slate-400">${m.size}</span>
          </div>

          <div>
            <h4 class="text-[16px] font-bold text-white group-hover:text-primary transition-colors line-clamp-2">${m.title}</h4>
            <span class="text-[12px] text-slate-400 flex items-center gap-1.5 mt-1">
              <span class="material-symbols-outlined text-[14px]">edit_note</span> By ${m.author}
            </span>
          </div>

          <p class="text-[13px] text-slate-300 line-clamp-3 leading-relaxed">${m.description}</p>
        </div>

        <div class="flex items-center gap-2 pt-4 mt-4 border-t border-white/5">
          <button class="flex-1 py-2 px-3 rounded-xl bg-primary-indigo hover:bg-indigo-500 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all" onclick="SmartLearnApp.previewMaterial('${m.id}')">
            <span class="material-symbols-outlined text-[16px]">visibility</span>
            <span>Read Notes</span>
          </button>
          <button class="p-2 rounded-xl bg-surface-container-high hover:bg-surface-variant text-slate-300 hover:text-white transition-colors" onclick="SmartLearnApp.downloadMaterial('${m.id}')" title="Download Material">
            <span class="material-symbols-outlined text-[18px]">download</span>
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 5. Video Learning Library Rendering
  async function renderVideos() {
    const videos = await SmartLearnAPI.getVideos();
    const container = document.getElementById("videos-grid");
    if (!container) return;

    container.innerHTML = videos
      .map(
        v => `
      <div class="rounded-2xl bg-surface-container border border-white/5 overflow-hidden flex flex-col hover:border-white/20 transition-all duration-300 group">
        <div class="relative h-44 cursor-pointer overflow-hidden" onclick="SmartLearnApp.openVideoPlayer('${v.id}')">
          <img src="${v.thumbnail}" alt="${v.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
            <div class="w-12 h-12 rounded-full bg-primary-indigo/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[28px] ml-0.5">play_arrow</span>
            </div>
          </div>
          <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-white">
            ${v.duration}
          </span>
          ${v.completed ? `<span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-500/90 text-[11px] font-semibold text-white flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">check</span> Watched</span>` : ''}
        </div>
        <div class="p-5 flex flex-col justify-between flex-1 gap-3">
          <div class="flex flex-col gap-1.5">
            <h4 class="text-[15px] font-bold text-white line-clamp-2">${v.title}</h4>
            <span class="text-[12px] text-slate-400 flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">school</span> ${v.instructor}
            </span>
          </div>
          <p class="text-[12px] text-slate-300 line-clamp-2">${v.description}</p>
          <div class="flex items-center justify-between pt-2 border-t border-white/5">
            <span class="text-[11px] text-slate-400 font-mono">${v.chapters.length} Chapters</span>
            <button class="text-[12px] font-semibold text-secondary hover:underline flex items-center gap-1" onclick="SmartLearnApp.openVideoPlayer('${v.id}')">
              <span>Watch Lecture</span>
              <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 6. Interactive Quizzes List
  async function renderQuizzes() {
    const quizzes = await SmartLearnAPI.getQuizzes();
    const container = document.getElementById("quizzes-list-container");
    if (!container) return;

    container.innerHTML = quizzes
      .map(
        q => `
      <div class="p-6 rounded-2xl bg-surface-container border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-primary-indigo/30 transition-all duration-300">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-primary-indigo/10 text-primary-indigo flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-[26px]">quiz</span>
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-surface-container-high text-[11px] font-mono text-secondary">${q.subjectName}</span>
              <span class="px-2 py-0.5 rounded bg-surface-container-high text-[11px] text-slate-300 font-medium">${q.difficulty}</span>
            </div>
            <h4 class="text-[17px] font-bold text-white">${q.title}</h4>
            <div class="flex items-center gap-4 text-[12px] text-slate-400">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">schedule</span> ${q.durationMinutes} mins</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">help</span> ${q.totalQuestions} Questions</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">verified</span> Pass: ${q.passingScore}%</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
          ${
            q.lastAttempt
              ? `<div class="text-right">
                  <span class="block text-[11px] text-slate-400">Last Score:</span>
                  <span class="text-[14px] font-bold font-mono ${q.lastAttempt.percentage >= q.passingScore ? 'text-emerald-400' : 'text-amber-400'}">
                    ${q.lastAttempt.score}/${q.lastAttempt.total} (${q.lastAttempt.percentage}%)
                  </span>
                </div>`
              : `<span class="text-[12px] text-slate-500 font-medium">Not attempted</span>`
          }
          <button class="px-5 py-2.5 rounded-xl bg-primary-indigo hover:bg-indigo-500 text-white text-[13px] font-semibold transition-all shadow-sm" onclick="SmartLearnApp.startQuizSession('${q.id}')">
            ${q.lastAttempt ? "Retake Quiz" : "Start Quiz"}
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 7. WEAK TOPICS SYSTEM (Core Smart Education Feature)
  async function renderWeakTopics() {
    const topics = await SmartLearnAPI.getWeakTopics();
    const container = document.getElementById("weak-topics-container");
    if (!container) return;

    if (topics.length === 0) {
      container.innerHTML = `
        <div class="p-8 rounded-2xl bg-surface-container text-center flex flex-col items-center justify-center gap-2 border border-white/5">
          <span class="material-symbols-outlined text-[44px] text-emerald-400">verified_user</span>
          <h4 class="text-[16px] font-bold text-white">All Topics Above Mastery Threshold!</h4>
          <p class="text-[13px] text-slate-400">You currently have no detected weak topics below 70%. Keep up the strong work!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = topics
      .map(
        t => `
      <div class="p-6 rounded-2xl bg-surface-container border border-rose-500/20 hover:border-rose-500/40 transition-all duration-300 flex flex-col gap-4 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
              <span class="material-symbols-outlined text-[22px]">crisis_alert</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-[16px] font-bold text-white">${t.topic}</h4>
                <span class="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] font-semibold border border-rose-500/20">
                  Score: ${t.currentScore}%
                </span>
              </div>
              <span class="text-[12px] text-slate-400">${t.subjectName} • Target: ${t.benchmarkTarget}%</span>
            </div>
          </div>
          <span class="text-[12px] font-mono text-amber-400 font-medium">
            ${t.improvementRequired}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px]">
          <div class="p-3.5 rounded-xl bg-surface-container-low border border-white/5">
            <span class="text-[11px] font-semibold uppercase text-slate-400 tracking-wider block mb-1">Identified Error Pattern</span>
            <p class="text-slate-300 leading-relaxed">${t.errorPattern}</p>
          </div>
          <div class="p-3.5 rounded-xl bg-surface-container-low border border-white/5">
            <span class="text-[11px] font-semibold uppercase text-slate-400 tracking-wider block mb-1">Recommended Remediation Action</span>
            <p class="text-slate-300 leading-relaxed">${t.recommendedAction}</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 pt-2">
          <button class="px-3.5 py-1.5 rounded-xl bg-primary-indigo hover:bg-indigo-500 text-white text-[12px] font-semibold flex items-center gap-1.5 transition-all" onclick="SmartLearnApp.previewMaterial('${t.relatedMaterialId}')">
            <span class="material-symbols-outlined text-[15px]">menu_book</span>
            <span>Review Notes</span>
          </button>
          <button class="px-3.5 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-variant text-slate-200 hover:text-white text-[12px] font-medium flex items-center gap-1.5 transition-colors border border-white/5" onclick="SmartLearnApp.openVideoPlayer('${t.relatedVideoId}')">
            <span class="material-symbols-outlined text-[15px]">smart_display</span>
            <span>Watch Video</span>
          </button>
          <button class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[12px] font-semibold flex items-center gap-1.5 transition-all" onclick="SmartLearnApp.startPracticeSession('${t.practiceTopicKey}')">
            <span class="material-symbols-outlined text-[15px]">fitness_center</span>
            <span>Attempt Practice Drill</span>
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 8. PERSONALIZED RECOMMENDATIONS ENGINE (Core Smart Education Feature)
  async function renderRecommendations() {
    const recs = await SmartLearnAPI.getRecommendations();
    const container = document.getElementById("recommendations-container");
    if (!container) return;

    container.innerHTML = recs
      .map(
        r => `
      <div class="p-6 rounded-2xl bg-surface-container border border-white/5 hover:border-primary-indigo/30 transition-all duration-300 flex flex-col justify-between gap-4">
        <div class="flex flex-col gap-2.5">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-1 rounded-lg bg-primary-indigo/15 text-primary text-[11px] font-semibold border border-primary-indigo/20">
              ${r.badge}
            </span>
            <span class="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">timer</span> ${r.estimatedTime}
            </span>
          </div>

          <div>
            <h4 class="text-[16px] font-bold text-white">${r.title}</h4>
            <span class="text-[12px] text-slate-400">${r.subject} • ${r.resourceType}</span>
          </div>

          <div class="p-3 rounded-xl bg-surface-container-low border border-white/5 text-[12px] text-indigo-200/90 leading-relaxed">
            <span class="font-semibold text-secondary">Why Recommended:</span> ${r.reason}
          </div>
        </div>

        <button class="w-full py-2.5 px-4 rounded-xl bg-primary-indigo hover:bg-indigo-500 text-white text-[13px] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm" onclick="SmartLearnApp.triggerRecommendationAction('${r.actionType}', '${r.materialId || r.videoId || r.quizId || r.practiceTopic}')">
          <span>${r.ctaText}</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    `
      )
      .join("");
  }

  // 9. INTERACTIVE QUIZ ENGINE
  async function startQuizSession(quizId) {
    const quiz = await SmartLearnAPI.getQuizById(quizId);
    if (!quiz) return;

    state.activeQuiz = quiz;
    state.activeQuizIndex = 0;
    state.activeQuizAnswers = {};
    state.activeQuizSecondsRemaining = (quiz.durationMinutes || 10) * 60;

    // Show quiz modal / full screen runner
    const modal = document.getElementById("modal-quiz-runner");
    if (!modal) return;
    modal.classList.remove("hidden");

    // Start timer
    if (state.activeQuizTimer) clearInterval(state.activeQuizTimer);
    state.activeQuizTimer = setInterval(() => {
      state.activeQuizSecondsRemaining--;
      updateQuizTimerDisplay();
      if (state.activeQuizSecondsRemaining <= 0) {
        clearInterval(state.activeQuizTimer);
        submitActiveQuiz();
      }
    }, 1000);

    renderCurrentQuizQuestion();
  }

  function updateQuizTimerDisplay() {
    const el = document.getElementById("quiz-runner-timer");
    if (!el) return;
    const mins = Math.floor(state.activeQuizSecondsRemaining / 60);
    const secs = state.activeQuizSecondsRemaining % 60;
    el.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function renderCurrentQuizQuestion() {
    if (!state.activeQuiz) return;
    const q = state.activeQuiz.questions[state.activeQuizIndex];
    if (!q) return;

    // Header info
    const titleEl = document.getElementById("quiz-runner-title");
    const countEl = document.getElementById("quiz-runner-question-count");
    const progressFill = document.getElementById("quiz-runner-progress-fill");
    if (titleEl) titleEl.textContent = state.activeQuiz.title;
    if (countEl) countEl.textContent = `Question ${state.activeQuizIndex + 1} of ${state.activeQuiz.questions.length}`;
    if (progressFill) {
      const pct = Math.round(((state.activeQuizIndex + 1) / state.activeQuiz.questions.length) * 100);
      progressFill.style.width = `${pct}%`;
    }

    // Question content
    const textEl = document.getElementById("quiz-runner-question-text");
    const topicTag = document.getElementById("quiz-runner-topic-badge");
    if (textEl) textEl.textContent = q.question;
    if (topicTag) topicTag.textContent = `Topic: ${q.topic}`;

    // Options
    const optContainer = document.getElementById("quiz-runner-options-container");
    if (!optContainer) return;
    const selected = state.activeQuizAnswers[state.activeQuizIndex];

    optContainer.innerHTML = q.options
      .map((opt, idx) => {
        const isSelected = selected === idx;
        const letter = String.fromCharCode(65 + idx);
        return `
        <button class="w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3.5 ${
          isSelected
            ? 'bg-primary-indigo/20 border-primary-indigo text-white font-medium ring-1 ring-primary-indigo'
            : 'bg-surface-container border-white/5 hover:border-white/20 text-slate-300 hover:text-white'
        }" onclick="SmartLearnApp.selectQuizOption(${idx})">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-[13px] ${
            isSelected ? 'bg-primary-indigo text-white' : 'bg-surface-container-high text-slate-400'
          }">
            ${letter}
          </span>
          <span class="text-[14px] leading-relaxed flex-1">${opt}</span>
        </button>
      `;
      })
      .join("");

    // Navigation buttons
    const prevBtn = document.getElementById("quiz-runner-prev-btn");
    const nextBtn = document.getElementById("quiz-runner-next-btn");
    const submitBtn = document.getElementById("quiz-runner-submit-btn");

    if (prevBtn) prevBtn.disabled = state.activeQuizIndex === 0;
    if (nextBtn) {
      nextBtn.classList.toggle("hidden", state.activeQuizIndex === state.activeQuiz.questions.length - 1);
    }
    if (submitBtn) {
      submitBtn.classList.toggle("hidden", state.activeQuizIndex !== state.activeQuiz.questions.length - 1);
    }
  }

  function selectQuizOption(optionIndex) {
    state.activeQuizAnswers[state.activeQuizIndex] = optionIndex;
    renderCurrentQuizQuestion();
  }

  function nextQuizQuestion() {
    if (state.activeQuizIndex < state.activeQuiz.questions.length - 1) {
      state.activeQuizIndex++;
      renderCurrentQuizQuestion();
    }
  }

  function prevQuizQuestion() {
    if (state.activeQuizIndex > 0) {
      state.activeQuizIndex--;
      renderCurrentQuizQuestion();
    }
  }

  async function submitActiveQuiz() {
    if (state.activeQuizTimer) clearInterval(state.activeQuizTimer);

    const quiz = state.activeQuiz;
    const timeSpent = (quiz.durationMinutes * 60) - state.activeQuizSecondsRemaining;
    const result = await SmartLearnAPI.submitQuiz(quiz.id, state.activeQuizAnswers, Math.max(15, timeSpent));

    // Close runner modal
    const runner = document.getElementById("modal-quiz-runner");
    if (runner) runner.classList.add("hidden");

    // Open result modal & render performance analysis
    openQuizResultModal(result, quiz);

    // Refresh dashboard components
    renderQuizzes();
    renderWeakTopics();
    renderRecommendations();
  }

  function openQuizResultModal(result, quiz) {
    const modal = document.getElementById("modal-quiz-result");
    if (!modal) return;
    modal.classList.remove("hidden");

    document.getElementById("quiz-result-title").textContent = quiz.title;
    document.getElementById("quiz-result-score").textContent = `${result.score} / ${result.total}`;
    document.getElementById("quiz-result-pct").textContent = `${result.percentage}%`;

    const statusBadge = document.getElementById("quiz-result-status-badge");
    const isPassed = result.percentage >= (quiz.passingScore || 70);
    if (statusBadge) {
      statusBadge.className = `px-3 py-1 rounded-full text-[12px] font-bold ${
        isPassed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
      }`;
      statusBadge.textContent = isPassed ? "Assessment Passed" : "Needs Revision";
    }

    // Render topic breakdown
    const topicContainer = document.getElementById("quiz-result-topic-breakdown");
    if (topicContainer) {
      topicContainer.innerHTML = Object.keys(result.topicBreakdown)
        .map(topic => {
          const score = result.topicBreakdown[topic];
          const isWeak = score < 70;
          return `
          <div class="flex flex-col gap-1.5 p-3 rounded-xl bg-surface-container border border-white/5">
            <div class="flex items-center justify-between text-[13px]">
              <span class="font-medium text-white">${topic}</span>
              <span class="font-mono font-bold ${isWeak ? 'text-rose-400' : 'text-emerald-400'}">
                ${score}% ${isWeak ? '(Weak Topic)' : '(Mastered)'}
              </span>
            </div>
            <div class="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div class="h-full rounded-full ${isWeak ? 'bg-rose-500' : 'bg-emerald-500'}" style="width: ${score}%"></div>
            </div>
          </div>
        `;
        })
        .join("");
    }

    notify("Quiz Submitted", `Completed with score ${result.percentage}%. Performance analyzed.`, isPassed ? "success" : "error");
  }

  // 10. ADAPTIVE PRACTICE DRILLS
  async function startPracticeSession(topic = "Pointers") {
    state.activePracticeTopic = topic;
    state.activePracticeIndex = 0;
    state.activePracticeAnswers = {};

    const questions = await SmartLearnAPI.getPracticeQuestions(topic, "Medium", 5);
    state.activePracticeQuestions = questions;

    renderPracticeUI();
  }

  function renderPracticeUI() {
    const topicHeader = document.getElementById("practice-active-topic-title");
    if (topicHeader) topicHeader.textContent = `Practice: ${state.activePracticeTopic}`;

    const container = document.getElementById("practice-questions-target");
    if (!container) return;

    if (state.activePracticeQuestions.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-slate-400">No practice questions available for this topic.</div>`;
      return;
    }

    const q = state.activePracticeQuestions[state.activePracticeIndex];
    const userChoice = state.activePracticeAnswers[state.activePracticeIndex];
    const isAnswered = userChoice !== undefined;

    container.innerHTML = `
      <div class="p-6 rounded-2xl bg-surface-container border border-white/5 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <span class="text-[12px] font-mono text-secondary">Question ${state.activePracticeIndex + 1} of ${state.activePracticeQuestions.length}</span>
          <span class="px-2 py-0.5 rounded bg-surface-container-high text-[11px] font-mono text-slate-300">${q.difficulty}</span>
        </div>

        <h4 class="text-[16px] font-semibold text-white leading-relaxed">${q.question}</h4>

        <div class="flex flex-col gap-2.5 mt-2">
          ${q.options
            .map((opt, idx) => {
              let btnClass = "bg-surface-container-low border-white/5 text-slate-300 hover:border-white/20";
              if (isAnswered) {
                if (idx === q.correctIndex) {
                  btnClass = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold";
                } else if (idx === userChoice) {
                  btnClass = "bg-rose-950/80 border-rose-500 text-rose-200";
                }
              }

              return `
              <button class="w-full text-left p-3.5 rounded-xl border transition-all text-[13px] flex items-center justify-between ${btnClass}" ${
                isAnswered ? "disabled" : ""
              } onclick="SmartLearnApp.submitPracticeAnswer(${idx})">
                <span>${opt}</span>
                ${
                  isAnswered && idx === q.correctIndex
                    ? '<span class="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>'
                    : isAnswered && idx === userChoice
                    ? '<span class="material-symbols-outlined text-rose-400 text-[18px]">cancel</span>'
                    : ""
                }
              </button>
            `;
            })
            .join("")}
        </div>

        ${
          isAnswered
            ? `
          <div class="p-4 rounded-xl bg-surface-container-lowest border border-white/10 text-[12px] leading-relaxed mt-2">
            <span class="font-bold text-white block mb-1">Explanation:</span>
            <p class="text-slate-300">${q.explanation}</p>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            ${
              state.activePracticeIndex < state.activePracticeQuestions.length - 1
                ? `<button class="px-4 py-2 rounded-xl bg-primary-indigo text-white text-[12px] font-semibold" onclick="SmartLearnApp.nextPracticeQuestion()">Next Question →</button>`
                : `<button class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-[12px] font-semibold" onclick="SmartLearnApp.finishPracticeSession()">Complete Drill ✓</button>`
            }
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  function submitPracticeAnswer(idx) {
    state.activePracticeAnswers[state.activePracticeIndex] = idx;
    renderPracticeUI();
  }

  function nextPracticeQuestion() {
    if (state.activePracticeIndex < state.activePracticeQuestions.length - 1) {
      state.activePracticeIndex++;
      renderPracticeUI();
    }
  }

  function finishPracticeSession() {
    notify("Practice Drill Finished", `Great practice on ${state.activePracticeTopic}! Your concept retention has been updated.`, "success");
    showStudentTab("weak-topics");
  }

  // 11. PROGRESS DASHBOARD
  function renderProgressDashboard() {
    // Dynamic refresh of charts and progress data
    const streakEl = document.getElementById("progress-streak-count");
    if (streakEl) streakEl.textContent = `${SmartLearnData.currentUser.streakDays} Days`;
  }

  // 12. TEACHER MANAGEMENT
  async function renderTeacherCourses() {
    const courses = await SmartLearnAPI.getCourses();
    const container = document.getElementById("teacher-courses-table-body");
    if (!container) return;

    container.innerHTML = courses
      .map(
        c => `
      <tr class="border-b border-white/5 hover:bg-white/2 transition-colors">
        <td class="py-3 px-4">
          <div class="flex items-center gap-3">
            <img src="${c.thumbnail}" class="w-10 h-10 rounded-lg object-cover">
            <div>
              <span class="text-[13px] font-semibold text-white block">${c.title}</span>
              <span class="text-[11px] text-slate-400">${c.difficulty} • ${c.totalLessons} Lessons</span>
            </div>
          </div>
        </td>
        <td class="py-3 px-4 font-mono text-[13px] text-slate-300">${c.studentsEnrolled || 120}</td>
        <td class="py-3 px-4 font-mono text-[13px] text-primary-indigo font-bold">${c.progress}%</td>
        <td class="py-3 px-4 text-right">
          <button class="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-slate-300 hover:text-white" onclick="SmartLearnApp.editCourse('${c.id}')">
            <span class="material-symbols-outlined text-[16px]">edit</span>
          </button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  async function renderTeacherStudents() {
    const students = await SmartLearnAPI.getTeacherStudents();
    const container = document.getElementById("teacher-students-table-body");
    if (!container) return;

    container.innerHTML = students
      .map(
        s => `
      <tr class="border-b border-white/5 hover:bg-white/2 transition-colors">
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-primary-indigo/20 text-primary-indigo flex items-center justify-center font-bold text-[12px]">
              ${s.name.charAt(0)}
            </div>
            <div>
              <span class="text-[13px] font-semibold text-white block">${s.name}</span>
              <span class="text-[11px] text-slate-400">${s.email}</span>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-4 text-[13px] text-slate-300">${s.course}</td>
        <td class="py-3.5 px-4 font-mono text-[13px] text-emerald-400 font-bold">${s.progress}%</td>
        <td class="py-3.5 px-4 font-mono text-[13px] text-slate-200">${s.quizAverage}%</td>
        <td class="py-3.5 px-4">
          <div class="flex flex-wrap gap-1">
            ${s.weakTopics.map(wt => `<span class="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] font-semibold border border-rose-500/20">${wt}</span>`).join('')}
          </div>
        </td>
        <td class="py-3.5 px-4">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold ${
            s.riskLevel === 'Excelling'
              ? 'bg-emerald-500/15 text-emerald-400'
              : s.riskLevel === 'On Track'
              ? 'bg-blue-500/15 text-blue-400'
              : 'bg-rose-500/15 text-rose-400'
          }">
            ${s.riskLevel}
          </span>
        </td>
        <td class="py-3.5 px-4 text-right">
          <button class="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-variant text-[11px] font-medium text-slate-300 hover:text-white" onclick="SmartLearnApp.sendRecommendationToStudent('${s.id}')">
            Send Path
          </button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  async function renderNotifications() {
    const list = await SmartLearnAPI.getNotifications();
    const container = document.getElementById("notifications-list");
    if (!container) return;

    container.innerHTML = list
      .map(
        n => `
      <div class="p-3 rounded-xl ${n.read ? 'bg-surface-container-low' : 'bg-surface-container border border-primary-indigo/30'} flex items-start gap-2.5">
        <span class="material-symbols-outlined text-[18px] text-secondary mt-0.5">${n.icon}</span>
        <div class="flex flex-col flex-1">
          <span class="text-[12px] font-bold text-white">${n.title}</span>
          <span class="text-[11px] text-slate-400 leading-snug mt-0.5">${n.message}</span>
          <span class="text-[10px] text-slate-500 mt-1 font-mono">${n.time}</span>
        </div>
      </div>
    `
      )
      .join("");
  }

  // --- ACTIONS & MODAL CONTROLLERS ---
  async function previewMaterial(materialId) {
    const materials = await SmartLearnAPI.getMaterials();
    const mat = materials.find(m => m.id === materialId) || materials[0];
    if (!mat) return;

    const modal = document.getElementById("modal-material-reader");
    if (!modal) return;
    modal.classList.remove("hidden");

    document.getElementById("reader-material-title").textContent = mat.title;
    document.getElementById("reader-material-badge").textContent = mat.badge;
    document.getElementById("reader-material-author").textContent = mat.author;

    const body = document.getElementById("reader-material-content");
    if (body) {
      if (window.SmartEduAI && window.SmartEduAI.formatMarkdown) {
        body.innerHTML = window.SmartEduAI.formatMarkdown(mat.content);
      } else {
        body.innerHTML = `<pre class="p-4 rounded-xl bg-surface-container text-[13px] text-slate-200 overflow-x-auto">${mat.content}</pre>`;
      }
      if (window.renderMathInElement) {
        window.renderMathInElement(body);
      }
    }
  }

  async function downloadMaterial(materialId) {
    const materials = await SmartLearnAPI.getMaterials();
    const mat = materials.find(m => m.id === materialId) || materials[0];
    if (!mat) return;

    const blob = new Blob([mat.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${mat.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    notify("Downloaded", `"${mat.title}" saved successfully.`, "success");
  }

  async function openCourseDetail(courseId) {
    const course = await SmartLearnAPI.getCourseById(courseId);
    if (!course) return;

    state.activeCourse = course;
    const modal = document.getElementById("modal-course-detail");
    if (!modal) return;
    modal.classList.remove("hidden");

    document.getElementById("course-detail-title").textContent = course.title;
    document.getElementById("course-detail-instructor").textContent = `Instructor: ${course.instructor}`;
    document.getElementById("course-detail-difficulty").textContent = course.difficulty || "Intermediate";
    document.getElementById("course-detail-progress").textContent = `${course.progress || 0}%`;

    const isEnrolled = await SmartLearnAPI.isEnrolled(course.id);
    const actions = document.getElementById("course-detail-actions");
    if (actions) {
      if (isEnrolled) {
        actions.innerHTML = `
          <button class="px-5 py-2.5 rounded-xl bg-primary-indigo hover:bg-indigo-500 text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-md" onclick="SmartLearnApp.launchLessonVideo()">
            <span>Enrolled ✓ Continue Learning</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        `;
      } else {
        actions.innerHTML = `
          <button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[13px] font-bold flex items-center gap-1.5 shadow-md active:scale-95" onclick="SmartLearnApp.enrollInCourse('${course.id}', '${encodeURIComponent(course.title)}')">
            <span class="material-symbols-outlined text-[16px]">school</span>
            <span>Enroll in Course</span>
          </button>
        `;
      }
    }

    const modulesTarget = document.getElementById("course-detail-modules");
    if (modulesTarget) {
      const modules = course.modules || [];
      modulesTarget.innerHTML = modules
        .map(
          (m, idx) => `
        <div class="p-4 rounded-xl bg-surface-container border border-white/5 flex flex-col gap-2">
          <span class="text-[13px] font-bold text-white">${m.title}</span>
          <div class="flex flex-col gap-1.5 pl-2">
            ${(m.lessons || [])
              .map(
                (lesson, lidx) => `
              <div class="flex items-center justify-between text-[12px] text-slate-300 py-1 border-b border-white/5 last:border-0">
                <span class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[14px] text-emerald-400">check_circle</span>
                  <span>Lesson ${idx + 1}.${lidx + 1}: ${lesson}</span>
                </span>
                <button class="text-secondary hover:underline text-[11px] font-medium" onclick="SmartLearnApp.launchLessonVideo()">Watch</button>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  async function enrollInCourse(courseId, rawTitle = null) {
    const courseTitle = rawTitle ? decodeURIComponent(rawTitle) : null;
    notify("Enrolling...", "Saving enrollment to Supabase cloud...", "info");

    const res = await SmartLearnAPI.enrollInCourse(courseId, courseTitle);
    if (res.alreadyEnrolled) {
      notify("Already Enrolled", res.message, "info");
    } else if (res.success) {
      notify("Enrollment Successful! 🎉", res.message, "success");
      await renderCourses();
      const actions = document.getElementById("course-detail-actions");
      if (actions) {
        actions.innerHTML = `
          <button class="px-5 py-2.5 rounded-xl bg-primary-indigo hover:bg-indigo-500 text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-md" onclick="SmartLearnApp.launchLessonVideo()">
            <span>Enrolled ✓ Continue Learning</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        `;
      }
    } else {
      notify("Enrollment Notice", res.message || "Could not complete enrollment.", "error");
    }
  }

  function launchLessonVideo() {
    closeModal("modal-course-detail");
    showStudentTab("videos");
    openVideoPlayer("vid-1");
  }

  async function openVideoPlayer(videoId) {
    const videos = await SmartLearnAPI.getVideos();
    const vid = videos.find(v => v.id === videoId) || videos[0];
    if (!vid) return;

    const modal = document.getElementById("modal-video-player");
    if (!modal) return;
    modal.classList.remove("hidden");

    document.getElementById("video-modal-title").textContent = vid.title;
    document.getElementById("video-modal-instructor").textContent = vid.instructor;

    const videoElement = document.getElementById("video-modal-player-source");
    if (videoElement) {
      videoElement.src = vid.videoUrl;
      const player = document.getElementById("video-modal-html5-player");
      if (player) player.load();
    }

    const chaptersTarget = document.getElementById("video-modal-chapters");
    if (chaptersTarget) {
      chaptersTarget.innerHTML = vid.chapters
        .map(
          ch => `
        <button class="w-full text-left p-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-[12px] text-slate-300 hover:text-white transition-colors flex items-center justify-between" onclick="SmartLearnApp.seekVideoTo(${ch.time})">
          <span>${ch.label}</span>
          <span class="material-symbols-outlined text-[14px]">play_circle</span>
        </button>
      `
        )
        .join("");
    }
  }

  function seekVideoTo(seconds) {
    const player = document.getElementById("video-modal-html5-player");
    if (player) {
      player.currentTime = seconds;
      player.play();
    }
  }

  function triggerRecommendationAction(actionType, targetId) {
    if (actionType === "open_material") {
      previewMaterial(targetId);
    } else if (actionType === "open_video") {
      openVideoPlayer(targetId);
    } else if (actionType === "open_quiz") {
      startQuizSession(targetId);
    } else if (actionType === "start_practice") {
      showStudentTab("practice");
      startPracticeSession(targetId);
    }
  }

  function filterMaterialsBySubject(subjectId) {
    state.activeSubjectFilter = subjectId;
    showStudentTab("materials");
  }

  function resetMaterialFilters() {
    state.activeSubjectFilter = "all";
    state.activeTypeFilter = "all";
    renderMaterials();
  }

  function sendRecommendationToStudent(studentId) {
    notify("Personalized Path Sent", `Remediation drill and study notes dispatched to student.`, "success");
  }

  // --- AUTH FLOWS (SUPABASE REAL CLOUD AUTHENTICATION) ---
  function openLoginModal(prefillRole = "student") {
    const modal = document.getElementById("modal-auth-login");
    if (!modal) return;
    modal.classList.remove("hidden");

    const errBox = document.getElementById("auth-login-error");
    if (errBox) errBox.classList.add("hidden");

    if (prefillRole === "teacher") {
      document.getElementById("auth-login-email").value = "s.jenkins@smartlearn.edu";
      document.getElementById("auth-login-password").value = "Teacher@2026";
      document.getElementById("auth-role-select").value = "teacher";
    } else {
      document.getElementById("auth-login-email").value = "avinash.verma@smartlearn.edu";
      document.getElementById("auth-login-password").value = "Student@2026";
      document.getElementById("auth-role-select").value = "student";
    }
  }

  function openRegisterModal() {
    closeModal("modal-auth-login");
    const modal = document.getElementById("modal-auth-register");
    if (modal) {
      modal.classList.remove("hidden");
      const errBox = document.getElementById("auth-reg-error");
      if (errBox) errBox.classList.add("hidden");
    }
  }

  function openForgotPasswordModal() {
    closeModal("modal-auth-login");
    const modal = document.getElementById("modal-auth-forgot");
    if (modal) modal.classList.remove("hidden");
  }

  async function handleLoginSubmit(event) {
    if (event) event.preventDefault();
    const email = document.getElementById("auth-login-email").value;
    const password = document.getElementById("auth-login-password").value;
    const role = document.getElementById("auth-role-select").value;
    const errBox = document.getElementById("auth-login-error");
    const submitBtn = document.getElementById("auth-login-btn");

    if (errBox) errBox.classList.add("hidden");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Signing in to Supabase...</span>`;
    }

    try {
      const res = await SmartLearnAPI.login(email, password, role);
      if (!res.success) {
        if (errBox) {
          errBox.textContent = res.message || "Failed to sign in. Please verify your credentials.";
          errBox.classList.remove("hidden");
        }
        return;
      }

      closeModal("modal-auth-login");

      state.currentUser = res.user;
      state.currentRole = res.user.role;
      updateUserUI(res.user);

      if (res.user.role === "teacher") {
        notify("Welcome, " + (res.user.full_name || "Professor"), "Faculty dashboard initialized via Supabase.", "success");
        showMainView("teacher-dashboard");
      } else {
        notify("Welcome back, " + (res.user.full_name || "Student") + "!", "Personalized learning hub ready via Supabase.", "success");
        showMainView("student-dashboard");
      }
    } catch (err) {
      console.error(err);
      if (errBox) {
        errBox.textContent = "An unexpected error occurred during sign in.";
        errBox.classList.remove("hidden");
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Sign In to Cloud</span><span class="material-symbols-outlined text-[16px]">arrow_forward</span>`;
      }
    }
  }

  async function handleRegisterSubmit(event) {
    if (event) event.preventDefault();
    const name = document.getElementById("auth-reg-name").value;
    const email = document.getElementById("auth-reg-email").value;
    const role = document.getElementById("auth-reg-role").value;
    const password = document.getElementById("auth-reg-password")?.value || "";
    const errBox = document.getElementById("auth-reg-error");
    const submitBtn = document.getElementById("auth-reg-btn");

    if (errBox) errBox.classList.add("hidden");

    if (!password || password.length < 6) {
      if (errBox) {
        errBox.textContent = "Password must be at least 6 characters long.";
        errBox.classList.remove("hidden");
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Creating Supabase Account...</span>`;
    }

    try {
      const res = await SmartLearnAPI.register({ fullName: name, email, password, role });
      if (!res.success) {
        if (errBox) {
          errBox.textContent = res.message || "Could not complete registration.";
          errBox.classList.remove("hidden");
        }
        return;
      }

      closeModal("modal-auth-register");

      state.currentUser = res.user;
      state.currentRole = role;
      updateUserUI(res.user);

      notify("Account Saved in Supabase! 🎉", `Welcome ${res.user.full_name || name}! Role: ${role.toUpperCase()}.`, "success");
      if (role === "teacher") {
        showMainView("teacher-dashboard");
      } else {
        showMainView("student-dashboard");
      }
    } catch (err) {
      console.error(err);
      if (errBox) {
        errBox.textContent = "Error saving profile to cloud.";
        errBox.classList.remove("hidden");
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">cloud_done</span><span>Create Account & Save Profile</span>`;
      }
    }
  }

  // --- TEACHER COURSE CREATION MODAL HANDLERS ---
  function openCreateCourseModal() {
    const modal = document.getElementById("modal-create-course");
    if (modal) modal.classList.remove("hidden");
  }

  async function handleCreateCourseSubmit(event) {
    if (event) event.preventDefault();
    const title = document.getElementById("create-course-title").value;
    const subjectId = document.getElementById("create-course-subject").value;
    const difficulty = document.getElementById("create-course-difficulty").value;
    const totalLessons = parseInt(document.getElementById("create-course-lessons").value) || 16;
    const thumbnail = document.getElementById("create-course-thumbnail").value;
    const module1 = document.getElementById("create-course-module1").value || "Foundations";

    const submitBtn = document.getElementById("create-course-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Publishing to Supabase...</span>`;
    }

    try {
      const created = await SmartLearnAPI.createTeacherCourse({
        title,
        subjectId,
        difficulty,
        totalLessons,
        thumbnail,
        modules: [
          {
            title: `Module 1: ${module1}`,
            lessons: ["Course Overview & Environment", "Core Architectural Foundations", "Interactive Drill"]
          }
        ]
      });

      closeModal("modal-create-course");
      notify("Course Published! 🚀", `"${title}" has been saved to Supabase cloud and published for all students.`, "success");

      // Refresh both views
      await renderTeacherCourses();
      await renderCourses();
    } catch (e) {
      console.error("Course creation failed:", e);
      notify("Publish Error", "Could not publish course to Supabase cloud.", "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">cloud_upload</span><span>Publish Course to Supabase Cloud</span>`;
      }
    }
  }

  function handleForgotPasswordSubmit(event) {
    if (event) event.preventDefault();
    closeModal("modal-auth-forgot");
    notify("Recovery Link Sent", "Check your email for password reset instructions.", "success");
  }

  // --- REAL-LIFE STUDENT PROFILE MANAGEMENT & TRANSCRIPT DOWNLOAD ---
  function openEditProfileModal() {
    const user = state.currentUser || (window.SmartLearnSupabase ? window.SmartLearnSupabase.getActiveUser() : null) || {};
    const modal = document.getElementById("modal-edit-profile");
    if (!modal) return;

    const nameInput = document.getElementById("edit-student-name");
    const rollInput = document.getElementById("edit-student-roll");
    const deptInput = document.getElementById("edit-student-dept");
    const semInput = document.getElementById("edit-student-semester");
    const collegeInput = document.getElementById("edit-student-college");
    const bioInput = document.getElementById("edit-student-bio");
    const avatarInput = document.getElementById("edit-student-avatar-url");

    if (nameInput) nameInput.value = user.full_name || user.name || "Avinash Verma";
    if (rollInput) rollInput.value = user.roll_no || user.rollNo || "24CSE089";
    if (deptInput) deptInput.value = user.department || "Computer Science & Engineering";
    if (semInput) semInput.value = user.semester || "Semester 5 (3rd Year B.Tech)";
    if (collegeInput) collegeInput.value = user.college || "Institute of Engineering & Technology";
    if (bioInput) bioInput.value = user.bio || "Undergraduate Computer Science engineer specializing in Data Structures, C Memory Architecture, and Intelligent Web Platforms.";
    if (avatarInput) avatarInput.value = user.avatar_url || user.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80";

    modal.classList.remove("hidden");
  }

  async function handleProfileUpdateSubmit(event) {
    if (event) event.preventDefault();
    const name = document.getElementById("edit-student-name")?.value.trim() || "Avinash Verma";
    const roll = document.getElementById("edit-student-roll")?.value.trim() || "24CSE089";
    const dept = document.getElementById("edit-student-dept")?.value.trim() || "Computer Science & Engineering";
    const semester = document.getElementById("edit-student-semester")?.value.trim() || "Semester 5 (3rd Year B.Tech)";
    const college = document.getElementById("edit-student-college")?.value.trim() || "Institute of Engineering & Technology";
    const bio = document.getElementById("edit-student-bio")?.value.trim() || "";
    const avatarUrl = document.getElementById("edit-student-avatar-url")?.value.trim() || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80";

    const updatedData = {
      full_name: name,
      roll_no: roll,
      department: dept,
      semester: semester,
      college: college,
      bio: bio,
      avatar_url: avatarUrl
    };

    if (window.SmartLearnSupabase && window.SmartLearnSupabase.updateProfile) {
      await window.SmartLearnSupabase.updateProfile(updatedData);
    }

    if (state.currentUser) {
      state.currentUser = { ...state.currentUser, ...updatedData };
    } else {
      state.currentUser = updatedData;
    }

    updateUserUI(state.currentUser);
    closeModal("modal-edit-profile");
    notify("Profile Updated", `Your academic credentials for ${name} have been updated across the dashboard.`, "success");
  }

  function downloadAcademicTranscript() {
    const user = state.currentUser || (window.SmartLearnSupabase ? window.SmartLearnSupabase.getActiveUser() : null) || {};
    const name = user.full_name || user.name || "Avinash Verma";
    const roll = user.roll_no || user.rollNo || "24CSE089";
    const college = user.college || "Institute of Engineering & Technology";
    const dept = user.department || "Computer Science & Engineering";
    const sem = user.semester || "Semester 5";

    const printWindow = window.open('', '_blank', 'width=840,height=920');
    if (!printWindow) {
      notify("Print Notice", "Please allow popups to download your official academic transcript.", "info");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Academic Transcript — ${name} (${roll})</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0f172a; line-height: 1.5; background: #fff; }
          .header { border-bottom: 2px solid #0f172a; padding-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
          .badge { background: #10b981; color: white; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 20px 0; background: #f8fafc; padding: 18px; border-radius: 12px; border: 1px solid #e2e8f0; }
          .field { font-size: 13px; }
          .field-label { color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: left; font-size: 12px; }
          th { background: #f1f5f9; font-weight: bold; }
          .footer { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          .signature { border-top: 1px solid #334155; width: 180px; text-align: center; font-size: 11px; padding-top: 6px; }
          @media print {
            body { padding: 15px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; display: flex; gap: 10px;">
          <button onclick="window.print()" style="padding: 9px 18px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
          <button onclick="window.close()" style="padding: 9px 18px; background: #e2e8f0; color: #334155; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Close Window</button>
        </div>
        <div class="header">
          <div>
            <h2 style="margin: 0; font-size: 20px; color: #0f172a;">${college.toUpperCase()}</h2>
            <div style="font-size: 12px; color: #64748b; margin-top: 3px;">SMARTLEARN ADAPTIVE EDUCATION PORTAL • OFFICIAL ACADEMIC AUDIT</div>
          </div>
          <div class="badge">Verified Scholar</div>
        </div>

        <div class="grid">
          <div class="field"><div class="field-label">Student Name</div><strong>${name}</strong></div>
          <div class="field"><div class="field-label">University Roll No</div><strong>${roll}</strong></div>
          <div class="field"><div class="field-label">Department / Branch</div><strong>${dept}</strong></div>
          <div class="field"><div class="field-label">Current Academic Level</div><strong>${sem}</strong></div>
          <div class="field"><div class="field-label">Cumulative GPA (CGPA)</div><strong style="color: #059669;">8.84 / 10.0 (First Class with Distinction)</strong></div>
          <div class="field"><div class="field-label">Biometric Attendance</div><strong style="color: #059669;">92.4% (Eligible for Examinations)</strong></div>
        </div>

        <h3 style="font-size: 14px; margin-top: 25px; margin-bottom: 8px;">Registered Course Curriculum & Continuous Assessment Marks</h3>
        <table>
          <thead>
            <tr>
              <th>Course Code & Title</th>
              <th>Credits</th>
              <th>Attendance</th>
              <th>Evaluation Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>CS301 • Data Structures & Algorithmic Patterns</td><td>4</td><td>95%</td><td>A (86%)</td><td>Cleared</td></tr>
            <tr><td>CS302 • C Systems Programming & Memory Architecture</td><td>4</td><td>91%</td><td>B+ (78%)</td><td>Target Drill Active</td></tr>
            <tr><td>CS303 • Database Management Systems & SQL</td><td>4</td><td>94%</td><td>A+ (92%)</td><td>Cleared</td></tr>
            <tr><td>CS304 • Modern Web Architecture & Interactive 3D</td><td>4</td><td>96%</td><td>A+ (94%)</td><td>Cleared</td></tr>
            <tr><td>CS305 • Computer Networks & Socket Programming</td><td>4</td><td>89%</td><td>A (84%)</td><td>Cleared</td></tr>
          </tbody>
        </table>

        <div class="footer">
          <div style="font-size: 11px; color: #64748b;">
            SmartLearn Platform ID: SL-2026-AKTU-884<br>
            Smart India Hackathon 2026 Academic Pilot • Team HACKSMITH<br>
            Issued: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div>
            <div class="signature">Controller of Examinations / Dean</div>
          </div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  function getCurrentUserName() {
    return state.currentUser?.full_name || state.currentUser?.name || "Avinash";
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("hidden");

    // Pause videos if closing video modal
    if (modalId === "modal-video-player") {
      const player = document.getElementById("video-modal-html5-player");
      if (player) player.pause();
    }
  }

  // --- THEME ---
  function setupTheme() {
    const isDark = localStorage.getItem("smartlearn_theme") !== "light";
    document.documentElement.classList.toggle("dark", isDark);
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("smartlearn_theme", isDark ? "dark" : "light");
    notify("Theme Changed", isDark ? "Obsidian Dark Mode enabled" : "Clean Light Mode enabled", "info");
  }

  // --- GLOBAL SEARCH ---
  async function handleGlobalSearch(query) {
    if (!query || query.trim().length === 0) {
      document.getElementById("global-search-results-dropdown")?.classList.add("hidden");
      return;
    }
    const q = query.toLowerCase().trim();
    const courses = await SmartLearnAPI.getCourses();
    const materials = await SmartLearnAPI.getMaterials();
    const subjects = await SmartLearnAPI.getSubjects();

    const matchedCourses = courses.filter(c => c.title.toLowerCase().includes(q));
    const matchedMaterials = materials.filter(m => m.title.toLowerCase().includes(q) || m.content.toLowerCase().includes(q));
    const matchedSubjects = subjects.filter(s => s.name.toLowerCase().includes(q));

    const dropdown = document.getElementById("global-search-results-dropdown");
    if (!dropdown) return;
    dropdown.classList.remove("hidden");

    let html = '';
    if (matchedCourses.length > 0) {
      html += `<div class="p-2 text-[11px] font-semibold uppercase text-slate-400">Courses</div>`;
      matchedCourses.forEach(c => {
        html += `<div class="p-2 hover:bg-surface-container rounded-lg cursor-pointer text-[13px] text-white flex items-center justify-between" onclick="SmartLearnApp.openCourseDetail('${c.id}')"><span>${c.title}</span><span class="text-[11px] text-secondary">Course</span></div>`;
      });
    }
    if (matchedMaterials.length > 0) {
      html += `<div class="p-2 text-[11px] font-semibold uppercase text-slate-400 mt-1">Study Materials</div>`;
      matchedMaterials.forEach(m => {
        html += `<div class="p-2 hover:bg-surface-container rounded-lg cursor-pointer text-[13px] text-white flex items-center justify-between" onclick="SmartLearnApp.previewMaterial('${m.id}')"><span>${m.title}</span><span class="text-[11px] text-emerald-400">${m.badge}</span></div>`;
      });
    }
    if (matchedSubjects.length > 0) {
      html += `<div class="p-2 text-[11px] font-semibold uppercase text-slate-400 mt-1">Subjects</div>`;
      matchedSubjects.forEach(s => {
        html += `<div class="p-2 hover:bg-surface-container rounded-lg cursor-pointer text-[13px] text-white flex items-center justify-between" onclick="SmartLearnApp.filterMaterialsBySubject('${s.id}')"><span>${s.name}</span><span class="text-[11px] text-slate-400">${s.code}</span></div>`;
      });
    }

    if (!html) {
      html = `<div class="p-4 text-center text-slate-400 text-[13px]">No matches found for "${query}"</div>`;
    }

    dropdown.innerHTML = html;
  }

  function setupGlobalEventListeners() {
    // Escape key closes modals
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        document.querySelectorAll(".app-modal").forEach(m => m.classList.add("hidden"));
      }
    });

    // Close search dropdown on click outside
    document.addEventListener("click", e => {
      const searchBox = document.getElementById("global-search-container");
      const dropdown = document.getElementById("global-search-results-dropdown");
      if (dropdown && searchBox && !searchBox.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  }

  function openAIChatbot(initialPrompt = '') {
    const drawer = document.getElementById('copilot-drawer');
    if (drawer) {
      drawer.classList.remove('translate-x-full');
      const input = document.getElementById('copilot-input');
      if (input) {
        if (initialPrompt) {
          input.value = initialPrompt;
          if (window.sendCopilotMessage) window.sendCopilotMessage(initialPrompt);
        } else {
          input.focus();
        }
      }
    }
  }

  // Also bind global helper
  window.openCopilotWithPrompt = function(promptText) {
    openAIChatbot(promptText);
  };

  function setCourseSubjectFilter(category, btnElement) {
    if (btnElement) {
      document.querySelectorAll(".course-filter-chip").forEach(el => el.classList.remove("active"));
      btnElement.classList.add("active");
    }
    const container = document.getElementById("courses-grid");
    if (!container) return;
    const cards = container.children;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (category === "all") {
        card.style.display = "";
      } else {
        const text = (card.textContent || "").toLowerCase();
        card.style.display = text.includes(category.toLowerCase()) ? "" : "none";
      }
    }
  }

  function filterCoursesByKeyword(keyword) {
    const container = document.getElementById("courses-grid");
    if (!container) return;
    const q = (keyword || "").toLowerCase();
    const cards = container.children;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const text = (card.textContent || "").toLowerCase();
      card.style.display = text.includes(q) ? "" : "none";
    }
  }

  return {
    init,
    showMainView,
    showStudentTab,
    setCourseSubjectFilter,
    filterCoursesByKeyword,
    showTeacherTab,
    openAIChatbot,
    previewMaterial,
    downloadMaterial,
    openCourseDetail,
    enrollInCourse,
    signOut,
    updateUserUI,
    renderCourses,
    renderTeacherCourses,
    renderTeacherStudents,
    renderNotifications,
    openCreateCourseModal,
    handleCreateCourseSubmit,
    launchLessonVideo,
    openVideoPlayer,
    seekVideoTo,
    startQuizSession,
    selectQuizOption,
    nextQuizQuestion,
    prevQuizQuestion,
    submitActiveQuiz,
    startPracticeSession,
    submitPracticeAnswer,
    nextPracticeQuestion,
    finishPracticeSession,
    triggerRecommendationAction,
    filterMaterialsBySubject,
    resetMaterialFilters,
    sendRecommendationToStudent,
    openLoginModal,
    openRegisterModal,
    openForgotPasswordModal,
    openEditProfileModal,
    handleProfileUpdateSubmit,
    downloadAcademicTranscript,
    getCurrentUserName,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleForgotPasswordSubmit,
    closeModal,
    toggleTheme,
    handleGlobalSearch,
    notify
  };
})();

// Auto-run on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  SmartLearnApp.init();
});
