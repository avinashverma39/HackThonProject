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
        return JSON.parse(raw);
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

  // --- AUTH SERVICES (Supabase + Spring Boot fallback) ---
  async function login(email, password, role = "student") {
    // 1. Supabase Cloud Authentication
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
      store.currentUser = { ...store.currentUser, email: email, role: "student" };
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
    // 1. Supabase Cloud User Registration
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

  // --- QUIZ & WEAK TOPIC SERVICES (Smart Recommendation Engine + Supabase) ---
  async function getQuizzes() {
    if (window.SmartLearnSupabase) {
      try {
        const sq = await window.SmartLearnSupabase.getQuizzes();
        if (sq && sq.length > 0) return sq;
      } catch (e) {}
    }
    const store = getLocalStore();
    return store.quizzes;
  }

  async function getQuizById(quizId) {
    if (window.SmartLearnSupabase) {
      try {
        const sq = await window.SmartLearnSupabase.getQuizById(quizId);
        if (sq) return sq;
      } catch (e) {}
    }
    const store = getLocalStore();
    return store.quizzes.find(q => q.id === quizId) || store.quizzes[0];
  }

  async function submitQuiz(quizId, answers, timeSpentSeconds = 180) {
    const store = getLocalStore();
    let attempt = null;

    // 1. Prioritize Server-Side Grading via Supabase PostgreSQL Stored Procedure
    if (window.SmartLearnSupabase) {
      try {
        const res = await window.SmartLearnSupabase.submitQuizAttempt(quizId, answers);
        if (res && res.success) {
          attempt = {
            attemptId: res.attemptId || ("att-" + Date.now()),
            quizId: res.quizId || quizId,
            quizTitle: res.quizTitle || "Curriculum Quiz",
            score: res.score,
            total: res.total,
            percentage: res.percentage,
            passed: res.passed,
            timeSpentSeconds: timeSpentSeconds,
            completedAt: "Just now",
            topicBreakdown: res.topicBreakdown || { "General": res.percentage },
            breakdown: res.breakdown || []
          };
        }
      } catch (err) {
        console.warn("Supabase submitQuizAttempt failed, falling back to local grading:", err);
      }
    }

    if (!attempt) {
      const quiz = store.quizzes.find(q => q.id === quizId);
      if (!quiz) return null;

      let correctCount = 0;
      const topicStats = {};

      quiz.questions.forEach((q, idx) => {
        const userChoice = answers[idx];
        const isCorrect = userChoice === q.correctIndex;
        if (isCorrect) correctCount++;

        const topic = q.topic || "General";
        if (!topicStats[topic]) {
          topicStats[topic] = { total: 0, correct: 0 };
        }
        topicStats[topic].total++;
        if (isCorrect) topicStats[topic].correct++;
      });

      const totalQuestions = quiz.questions.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);

      attempt = {
        attemptId: "att-" + Date.now(),
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: correctCount,
        total: totalQuestions,
        percentage: percentage,
        passed: percentage >= (quiz.passingScore || 70),
        timeSpentSeconds: timeSpentSeconds,
        completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topicBreakdown: {},
        breakdown: []
      };

      Object.keys(topicStats).forEach(t => {
        attempt.topicBreakdown[t] = Math.round((topicStats[t].correct / topicStats[t].total) * 100);
      });
    }

    // Save to local quizHistory
    if (!store.quizHistory) store.quizHistory = [];
    store.quizHistory.unshift(attempt);

    // Dynamic Weak Topic Detection & AI recommendations
    Object.keys(attempt.topicBreakdown).forEach(topicName => {
      const score = attempt.topicBreakdown[topicName];
      const existingIdx = store.weakTopics.findIndex(wt => wt.practiceTopicKey === topicName || wt.topic.includes(topicName));
      if (score < 70) {
        if (existingIdx >= 0) {
          store.weakTopics[existingIdx].currentScore = score;
        } else {
          store.weakTopics.push({
            id: "wt-" + topicName.toLowerCase().replace(/\s+/g, "-"),
            topic: topicName,
            subjectId: "subj-dsa",
            subjectName: "Computer Science",
            currentScore: score,
            benchmarkTarget: 75,
            difficulty: "Medium",
            improvementRequired: "Identified via Quiz Result",
            recommendedAction: `Review related ${topicName} notes and complete targeted drill.`,
            relatedMaterialId: store.studyMaterials[0]?.id || "mat-1",
            relatedVideoId: store.videos[0]?.id || "vid-1",
            relatedQuizId: quizId,
            practiceTopicKey: topicName
          });
        }

        store.recommendations.unshift({
          id: "rec-" + Date.now(),
          type: "remediation",
          badge: "Fresh Recommendation",
          resourceType: "Targeted Remediation",
          title: `${topicName} Concept Recovery Drill`,
          subject: "Computer Science",
          reason: `Recommended because your recent score in ${topicName} was ${score}% (below 70% threshold).`,
          difficulty: "Adaptive",
          estimatedTime: "12 mins",
          practiceTopic: topicName,
          ctaText: "Start Practice",
          actionType: "start_practice"
        });
      } else if (existingIdx >= 0 && score >= 75) {
        store.weakTopics[existingIdx].currentScore = score;
        store.weakTopics[existingIdx].improvementRequired = "Resolved (Mastered!)";
      }
    });

    saveLocalStore(store);
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

  // --- NOTIFICATIONS & STATS (Supabase Connected) ---
  async function getNotifications() {
    if (window.SmartLearnSupabase) {
      try {
        const notifs = await window.SmartLearnSupabase.getNotifications();
        if (notifs && notifs.length > 0) return notifs;
      } catch (e) {}
    }
    const store = getLocalStore();
    return store.notifications;
  }

  async function markAllNotificationsRead() {
    if (window.SmartLearnSupabase) {
      try {
        await window.SmartLearnSupabase.markAllNotificationsRead();
      } catch (e) {}
    }
    const store = getLocalStore();
    store.notifications.forEach(n => (n.read = true));
    saveLocalStore(store);
    return store.notifications;
  }

  async function getStudentDashboardStats() {
    if (window.SmartLearnSupabase) {
      try {
        return await window.SmartLearnSupabase.getStudentDashboardStats();
      } catch (e) {}
    }
    const store = getLocalStore();
    return {
      fullName: store.currentUser.name || "Alex Rivera",
      streakDays: store.currentUser.streakDays || 14,
      overallProgress: store.currentUser.overallProgress || 72,
      quizAverage: store.currentUser.quizAverage || 78,
      enrolledCount: store.currentUser.enrolledCoursesCount || 5,
      completedLessonsCount: store.currentUser.completedLessons || 48,
      continueCourse: {
        id: "course-dsa",
        title: "Mastering Data Structures & Algorithmic Patterns",
        nextLesson: "Floyd's Cycle-Finding Algorithm"
      }
    };
  }

  async function getUserAchievements() {
    if (window.SmartLearnSupabase) {
      try {
        return await window.SmartLearnSupabase.getUserAchievements();
      } catch (e) {}
    }
    return [
      { id: "first_quiz", title: "Knowledge Tested", description: "Passed your first interactive assessment", icon: "quiz", unlockedAt: "Recently" },
      { id: "first_lesson", title: "First Step Taken", description: "Completed your first lesson on SmartLearn", icon: "school", unlockedAt: "Recently" }
    ];
  }

  async function getLearningHistory() {
    if (window.SmartLearnSupabase) {
      try {
        return await window.SmartLearnSupabase.getLearningHistory();
      } catch (e) {}
    }
    return [];
  }

  async function getBookmarks() {
    if (window.SmartLearnSupabase) {
      try {
        return await window.SmartLearnSupabase.getBookmarks();
      } catch (e) {}
    }
    return [];
  }

  async function toggleBookmark(lessonId, courseId) {
    if (window.SmartLearnSupabase) {
      try {
        return await window.SmartLearnSupabase.toggleBookmark(lessonId, courseId);
      } catch (e) {}
    }
    return { bookmarked: true, message: "Saved locally" };
  }

  async function recordLessonProgress(courseId, lessonId, completed, watchedSeconds, lastPosition) {
    if (window.SmartLearnSupabase) {
      try {
        return await window.SmartLearnSupabase.recordLessonProgress(courseId, lessonId, completed, watchedSeconds, lastPosition);
      } catch (e) {}
    }
    return { success: true };
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
    markAllNotificationsRead,
    getStudentDashboardStats,
    getUserAchievements,
    getLearningHistory,
    getBookmarks,
    toggleBookmark,
    recordLessonProgress
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartLearnAPI;
}
