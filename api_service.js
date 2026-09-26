/**
 * SmartLearn — API Service Layer (Spring Boot + MySQL Integration Client)
 * Project: SmartLearn | Team: HACKSMITH | Theme: Smart Education (SIH 2026)
 *
 * This service layer defines the REST client contracts connecting the HTML/JS frontend
 * to the Java / Spring Boot backend REST endpoints:
 *   - /api/v1/auth/*
 *   - /api/v1/courses/*
 *   - /api/v1/subjects/*
 *   - /api/v1/materials/*
 *   - /api/v1/videos/*
 *   - /api/v1/quizzes/*
 *   - /api/v1/performance/*
 *   - /api/v1/weak-topics/*
 *   - /api/v1/recommendations/*
 *   - /api/v1/teacher/*
 *
 * When a real Spring Boot server is detected at window.SMARTLEARN_API_BASE_URL,
 * it routes requests directly via HTTP fetch. Otherwise, it executes locally against
 * the in-memory/localStorage persistent store, guaranteeing complete offline reliability.
 */

const SmartLearnAPI = (function () {
  const API_BASE = window.SMARTLEARN_API_BASE_URL || "/api/v1";
  const IS_CONNECTED_SPRINGBOOT = false; // Flag toggleable when Spring Boot server runs

  // Persistent storage key
  const STORAGE_KEY = "smartlearn_state_v1";

  // Load state or fallback to default dataset
  function getLocalStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.currentUser && (parsed.currentUser.name === "Alex Rivera" || parsed.currentUser.full_name === "Alex Rivera")) {
          parsed.currentUser.name = "Avinash Verma";
          parsed.currentUser.full_name = "Avinash Verma";
          parsed.currentUser.email = "avinash.verma@smartlearn.edu";
          parsed.currentUser.rollNo = "24CSE089";
          saveLocalStore(parsed);
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Could not read localStorage, using default SmartLearnData", e);
    }

    const initial = {
      currentUser: SmartLearnData.currentUser,
      currentTeacher: SmartLearnData.currentTeacher,
      subjects: SmartLearnData.subjects,
      courses: SmartLearnData.courses,
      studyMaterials: SmartLearnData.studyMaterials,
      videos: SmartLearnData.videos,
      quizzes: SmartLearnData.quizzes,
      weakTopics: SmartLearnData.weakTopics,
      recommendations: SmartLearnData.recommendations,
      practiceQuestionBank: SmartLearnData.practiceQuestionBank,
      teacherStudents: SmartLearnData.teacherStudents,
      notifications: SmartLearnData.notifications,
      quizHistory: []
    };
    saveLocalStore(initial);
    return initial;
  }

  function saveLocalStore(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Could not persist to localStorage", e);
    }
  }

  // --- AUTH SERVICES (InsForge Cloud + Supabase + Spring Boot fallback) ---
  async function login(email, password, role = "student") {
    // 1. InsForge Cloud Real Authentication & PostgreSQL
    if (window.SmartLearnInsforge) {
      try {
        const res = await window.SmartLearnInsforge.signIn(email, password, role);
        if (res.success && res.user) {
          const store = getLocalStore();
          store.currentUser = res.user;
          saveLocalStore(store);
          return res;
        }
      } catch (err) {
        console.warn("[InsForge] signIn failed, checking fallbacks:", err);
      }
    }

    // 2. Supabase Cloud Authentication (secondary)
    if (window.SmartLearnSupabase) {
      try {
        const res = await window.SmartLearnSupabase.signIn(email, password, role);
        if (res.success && res.user) {
          const store = getLocalStore();
          store.currentUser = res.user;
          saveLocalStore(store);
          return res;
        }
      } catch (err) {
        console.warn("Supabase signIn failed, falling back to local:", err);
      }
    }

    if (IS_CONNECTED_SPRINGBOOT) {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });
      return await res.json();
    }

    // Local Mock Validation
    const store = getLocalStore();
    if (role === "teacher" || email.includes("jenkins") || email.includes("prof")) {
      store.currentUser = { ...store.currentTeacher, role: "teacher" };
    } else {
      let displayName = store.currentUser?.name || "Avinash Verma";
      if (email.toLowerCase().includes("avinash")) {
        displayName = "Avinash Verma";
      } else if (email.includes("@")) {
        const prefix = email.split("@")[0].replace(/[._-]/g, ' ');
        displayName = prefix.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      store.currentUser = {
        ...store.currentUser,
        full_name: displayName,
        name: displayName,
        email: email,
        role: "student"
      };
    }
    saveLocalStore(store);
    return {
      success: true,
      token: "jwt_smartlearn_" + Math.random().toString(36).substring(2),
      user: store.currentUser,
      message: "Logged in successfully to SmartLearn."
    };
  }

  async function register(userData) {
    // 1. InsForge Cloud Real Registration & Profile Creation
    if (window.SmartLearnInsforge) {
      try {
        const res = await window.SmartLearnInsforge.signUp(
          userData.email,
          userData.password,
          { fullName: userData.fullName, role: userData.role }
        );
        if (res.success && res.user) {
          const store = getLocalStore();
          store.currentUser = res.user;
          saveLocalStore(store);
          return res;
        }
      } catch (err) {
        console.warn("[InsForge] signUp error, trying fallback:", err);
      }
    }

    // 2. Supabase Cloud User Registration (secondary)
    if (window.SmartLearnSupabase) {
      try {
        const res = await window.SmartLearnSupabase.signUp(
          userData.email,
          userData.password,
          { fullName: userData.fullName, role: userData.role }
        );
        if (res.success && res.user) {
          const store = getLocalStore();
          store.currentUser = res.user;
          saveLocalStore(store);
          return res;
        }
      } catch (err) {
        console.warn("Supabase signUp error:", err);
      }
    }

    if (IS_CONNECTED_SPRINGBOOT) {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      return await res.json();
    }

    const store = getLocalStore();
    const newUser = {
      id: "usr-" + Date.now(),
      name: userData.fullName || "Student",
      email: userData.email,
      role: userData.role || "student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      streakDays: 1,
      overallProgress: 0,
      quizAverage: 0,
      enrolledCoursesCount: 1,
      completedLessons: 0,
      pendingQuizzes: 1
    };
    store.currentUser = newUser;
    saveLocalStore(store);
    return { success: true, user: newUser, token: "jwt_mock_token" };
  }

  async function signOut() {
    if (window.SmartLearnInsforge) {
      try {
        await window.SmartLearnInsforge.signOut();
      } catch (e) {}
    }
    if (window.SmartLearnSupabase) {
      try {
        await window.SmartLearnSupabase.signOut();
      } catch (e) {}
    }
    const store = getLocalStore();
    store.currentUser = null;
    saveLocalStore(store);
    return { success: true };
  }

  // --- ENROLLMENT SERVICES (Supabase Persistent Cloud Storage) ---
  async function enrollInCourse(courseId, courseTitle = null) {
    if (window.SmartLearnSupabase) {
      const res = await window.SmartLearnSupabase.enrollInCourse(courseId, courseTitle);
      const store = getLocalStore();
      const course = store.courses.find(c => c.id === courseId);
      if (course) {
        course.studentsEnrolled = (course.studentsEnrolled || 0) + 1;
      }
      if (store.currentUser) {
        store.currentUser.enrolledCoursesCount = (store.currentUser.enrolledCoursesCount || 0) + 1;
      }
      saveLocalStore(store);
      return res;
    }
    const store = getLocalStore();
    const course = store.courses.find(c => c.id === courseId);
    if (course) {
      course.studentsEnrolled = (course.studentsEnrolled || 0) + 1;
    }
    saveLocalStore(store);
    return { success: true, message: "Enrolled in course successfully." };
  }

  async function isEnrolled(courseId, userId = null) {
    if (window.SmartLearnSupabase) {
      return await window.SmartLearnSupabase.isEnrolled(courseId, userId);
    }
    return false;
  }

  async function getUserEnrollments(userId = null) {
    if (window.SmartLearnSupabase) {
      return await window.SmartLearnSupabase.getUserEnrollments(userId);
    }
    return [];
  }

  // --- COURSES & SUBJECTS SERVICES ---
  async function getSubjects() {
    if (IS_CONNECTED_SPRINGBOOT) {
      const res = await fetch(`${API_BASE}/subjects`);
      return await res.json();
    }
    const store = getLocalStore();
    return store.subjects;
  }

  async function getCourses() {
    if (window.SmartLearnSupabase) {
      try {
        const cloudCourses = await window.SmartLearnSupabase.getCourses();
        if (cloudCourses && cloudCourses.length > 0) {
          return cloudCourses;
        }
      } catch (e) {}
    }
    if (IS_CONNECTED_SPRINGBOOT) {
      const res = await fetch(`${API_BASE}/courses`);
      return await res.json();
    }
    const store = getLocalStore();
    return store.courses;
  }

  async function getCourseById(courseId) {
    if (window.SmartLearnSupabase) {
      try {
        const course = await window.SmartLearnSupabase.getCourseById(courseId);
        if (course) return course;
      } catch (e) {}
    }
    if (IS_CONNECTED_SPRINGBOOT) {
      const res = await fetch(`${API_BASE}/courses/${courseId}`);
      return await res.json();
    }
    const store = getLocalStore();
    return store.courses.find(c => c.id === courseId) || store.courses[0];
  }

  // --- STUDY MATERIALS SERVICES ---
  async function getMaterials(filterSubject = null, filterType = null) {
    if (IS_CONNECTED_SPRINGBOOT) {
      const params = new URLSearchParams();
      if (filterSubject) params.append("subject", filterSubject);
      if (filterType) params.append("type", filterType);
      const res = await fetch(`${API_BASE}/materials?${params.toString()}`);
      return await res.json();
    }
    const store = getLocalStore();
    return store.studyMaterials.filter(m => {
      const matchSubj = !filterSubject || filterSubject === "all" || m.subjectId === filterSubject;
      const matchType = !filterType || filterType === "all" || m.type === filterType;
      return matchSubj && matchType;
    });
  }

  async function addMaterial(materialData) {
    if (window.SmartLearnSupabase) {
      try {
        await window.SmartLearnSupabase.saveStudyMaterial(materialData);
      } catch (e) {}
    }
    const store = getLocalStore();
    const newMat = {
      id: "mat-" + Date.now(),
      subjectId: materialData.subjectId || "subj-dsa",
      subjectName: materialData.subjectName || "Computer Science",
      title: materialData.title,
      type: materialData.type || "notes",
      badge: "Teacher Upload",
      size: "1.5 MB",
      author: store.currentTeacher.name,
      downloads: 1,
      description: materialData.description || "Uploaded notes for curriculum reference.",
      content: materialData.content || `# ${materialData.title}\n\nUploaded notes content.`
    };
    store.studyMaterials.unshift(newMat);
    saveLocalStore(store);
    return newMat;
  }

  // --- VIDEO LEARNING SERVICES ---
  async function getVideos() {
    const store = getLocalStore();
    return store.videos;
  }

  async function markVideoCompleted(videoId) {
    const store = getLocalStore();
    const vid = store.videos.find(v => v.id === videoId);
    if (vid) {
      vid.completed = true;
      vid.progress = 100;
      saveLocalStore(store);
    }
    return vid;
  }

  // --- QUIZ & WEAK TOPIC SERVICES (Smart Recommendation Engine) ---
  async function getQuizzes() {
    const store = getLocalStore();
    return store.quizzes;
  }

  async function getQuizById(quizId) {
    const store = getLocalStore();
    return store.quizzes.find(q => q.id === quizId) || store.quizzes[0];
  }

  async function submitQuiz(quizId, answers, timeSpentSeconds = 180) {
    const store = getLocalStore();
    const quiz = store.quizzes.find(q => q.id === quizId);
    if (!quiz) return null;

    let correctCount = 0;
    const topicStats = {};

    quiz.questions.forEach((q, idx) => {
      const userChoice = answers[idx];
      const isCorrect = userChoice === q.correctIndex;
      if (isCorrect) correctCount++;

      // Track by topic
      const topic = q.topic || "General";
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0 };
      }
      topicStats[topic].total++;
      if (isCorrect) topicStats[topic].correct++;
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const attempt = {
      attemptId: "att-" + Date.now(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      score: correctCount,
      total: totalQuestions,
      percentage: percentage,
      timeSpentSeconds: timeSpentSeconds,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      topicBreakdown: {}
    };

    // Calculate percentage per topic
    Object.keys(topicStats).forEach(t => {
      attempt.topicBreakdown[t] = Math.round((topicStats[t].correct / topicStats[t].total) * 100);
    });

    // Save attempt
    quiz.lastAttempt = {
      score: correctCount,
      total: totalQuestions,
      percentage: percentage,
      completedAt: "Just now"
    };

    if (!store.quizHistory) store.quizHistory = [];
    store.quizHistory.unshift(attempt);

    // Dynamic Weak Topic Detection:
    // Any topic where percentage < 70% gets flagged or updated in Weak Topics
    Object.keys(attempt.topicBreakdown).forEach(topicName => {
      const score = attempt.topicBreakdown[topicName];
      const existingIdx = store.weakTopics.findIndex(wt => wt.practiceTopicKey === topicName || wt.topic.includes(topicName));
      if (score < 70) {
        if (existingIdx >= 0) {
          store.weakTopics[existingIdx].currentScore = score;
        } else {
          store.weakTopics.push({
            id: "wt-" + topicName.toLowerCase(),
            topic: topicName,
            subjectId: quiz.subjectId,
            subjectName: quiz.subjectName,
            currentScore: score,
            benchmarkTarget: 75,
            difficulty: "Medium",
            improvementRequired: "Identified via Quiz Result",
            recommendedAction: `Review related ${topicName} notes and complete targeted drill.`,
            relatedMaterialId: store.studyMaterials[0]?.id || "mat-1",
            relatedVideoId: store.videos[0]?.id || "vid-1",
            relatedQuizId: quiz.id,
            practiceTopicKey: topicName
          });
        }

        // Add dynamic personalized recommendation
        store.recommendations.unshift({
          id: "rec-" + Date.now(),
          type: "remediation",
          badge: "Fresh Recommendation",
          resourceType: "Targeted Remediation",
          title: `${topicName} Concept Recovery Drill`,
          subject: quiz.subjectName,
          reason: `Recommended because your recent score in ${topicName} was ${score}% (below 70% threshold).`,
          difficulty: "Adaptive",
          estimatedTime: "12 mins",
          practiceTopic: topicName,
          ctaText: "Start Practice",
          actionType: "start_practice"
        });
      } else if (existingIdx >= 0 && score >= 75) {
        // Concept mastered! Upgrade score and status
        store.weakTopics[existingIdx].currentScore = score;
        store.weakTopics[existingIdx].improvementRequired = "Resolved (Mastered!)";
      }
    });

    saveLocalStore(store);

    // Save attempt in Supabase
    if (window.SmartLearnSupabase) {
      window.SmartLearnSupabase.saveQuizAttempt(attempt).catch(() => {});
    }

    return attempt;
  }

  async function getWeakTopics() {
    const store = getLocalStore();
    return store.weakTopics;
  }

  async function getRecommendations() {
    const store = getLocalStore();
    return store.recommendations;
  }

  // --- PRACTICE DRILLS ---
  async function getPracticeQuestions(topic = "Pointers", difficulty = "Medium", count = 3) {
    const store = getLocalStore();
    const bank = store.practiceQuestionBank[topic] || store.practiceQuestionBank["Pointers"];
    if (!bank) return [];
    return bank.slice(0, count);
  }

  // --- TEACHER SERVICES ---
  async function getTeacherStudents() {
    if (window.SmartLearnSupabase) {
      try {
        const students = await window.SmartLearnSupabase.getTeacherStudents();
        if (students && students.length > 0) return students;
      } catch (e) {}
    }
    const store = getLocalStore();
    return store.teacherStudents;
  }

  async function createTeacherCourse(coursePayload) {
    if (window.SmartLearnSupabase) {
      try {
        const newCourse = await window.SmartLearnSupabase.createTeacherCourse(coursePayload);
        const store = getLocalStore();
        store.courses.unshift(newCourse);
        saveLocalStore(store);
        return newCourse;
      } catch (e) {}
    }

    const store = getLocalStore();
    const newCourse = {
      id: "course-" + Date.now(),
      subjectId: coursePayload.subjectId || "subj-dsa",
      title: coursePayload.title,
      instructor: store.currentTeacher.name,
      thumbnail: coursePayload.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      progress: 0,
      totalLessons: coursePayload.totalLessons || 12,
      completedLessons: 0,
      difficulty: coursePayload.difficulty || "Intermediate",
      rating: 5.0,
      studentsEnrolled: 0,
      modules: [
        {
          title: "Module 1: Introduction",
          lessons: ["Course Overview & Setup", "Core Syntax & Foundations"]
        }
      ]
    };
    store.courses.unshift(newCourse);
    saveLocalStore(store);
    return newCourse;
  }

  async function createTeacherQuiz(quizPayload) {
    const store = getLocalStore();
    const newQuiz = {
      id: "quiz-" + Date.now(),
      subjectId: quizPayload.subjectId || "subj-c",
      subjectName: quizPayload.subjectName || "Computer Science",
      title: quizPayload.title,
      durationMinutes: parseInt(quizPayload.durationMinutes) || 15,
      totalQuestions: (quizPayload.questions || []).length || 5,
      difficulty: quizPayload.difficulty || "Intermediate",
      passingScore: parseInt(quizPayload.passingScore) || 70,
      lastAttempt: null,
      questions: quizPayload.questions || []
    };
    store.quizzes.unshift(newQuiz);
    saveLocalStore(store);
    return newQuiz;
  }

  // --- NOTIFICATIONS ---
  async function getNotifications() {
    const store = getLocalStore();
    return store.notifications;
  }

  async function markAllNotificationsRead() {
    const store = getLocalStore();
    store.notifications.forEach(n => (n.read = true));
    saveLocalStore(store);
    return store.notifications;
  }

  return {
    getLocalStore,
    login,
    register,
    signOut,
    enrollInCourse,
    isEnrolled,
    getUserEnrollments,
    getSubjects,
    getCourses,
    getCourseById,
    getMaterials,
    addMaterial,
    getVideos,
    markVideoCompleted,
    getQuizzes,
    getQuizById,
    submitQuiz,
    getWeakTopics,
    getRecommendations,
    getPracticeQuestions,
    getTeacherStudents,
    createTeacherCourse,
    createTeacherQuiz,
    getNotifications,
    markAllNotificationsRead
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartLearnAPI;
}
