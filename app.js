/**
 * SmartEdu AI Innovation Hub - Master Application Logic
 * Integrates Adaptive Learning Hub, Smart Lecture & Virtual Lab,
 * Innovation Project Studio, and Skill Matrix & Analytics into a unified SPA.
 */

// Application State
const AppState = {
  activeTab: 'adaptive-learning-hub',
  activeCourseId: 'cs285',
  activeTopicFilter: 'all',
  customCourses: {},
  sprintTimer: null,
  sprintSecondsRemaining: 25 * 60,
  sprintRunning: false,
  lecture: {
    isPlaying: false,
    currentTime: 522, // 08:42 in seconds
    totalTime: 1455,  // 24:15 in seconds
    speed: 1.25,
    timerInterval: null
  },
  sandbox: {
    isRunning: false,
    step: 489,
    reward: 492.0,
    interval: null
  },
  kanbanFilter: 'all',
  tasks: [
    {
      id: 'EP-104',
      column: 'col-ideation',
      title: 'Solid-state battery charge-discharge thermal map',
      desc: 'Deriving thermal diffusion coefficients for sodium-ion micro-pack prototypes during surge discharge.',
      tag: 'Hardware',
      tagColor: 'secondary',
      specs: '3/3 specs',
      specsDone: true,
      category: 'hardware',
      risk: false,
      assignee: 'Alex Chen',
      subtasks: [
        { text: 'Formulate heat equation for sodium cells', done: true },
        { text: 'Run COMSOL thermal simulation', done: true },
        { text: 'Validate thermocouple bench calibration', done: true }
      ]
    },
    {
      id: 'EP-107',
      column: 'col-ideation',
      title: 'IEEE 2030.5 smart grid interoperability protocol audit',
      desc: 'Compliance review of mutual TLS authentication and RESTful exchange endpoints with municipal power grid.',
      tag: 'Regulation',
      tagColor: 'primary',
      specs: '1/4 specs',
      specsDone: false,
      category: 'regulation',
      risk: false,
      assignee: 'Elena Rostova',
      subtasks: [
        { text: 'Review mutual TLS spec requirement', done: true },
        { text: 'Map XML schema definitions to JSON-LD', done: false },
        { text: 'Security vulnerability scan on port 8443', done: false },
        { text: 'Submit draft compliance report to faculty advisory', done: false }
      ]
    },
    {
      id: 'EP-098',
      column: 'col-prototyping',
      title: 'PPO Agent edge quantization for Coral TPU',
      desc: 'Quantizing 32-bit floating point weights into int8 tensors without sacrificing pole stability threshold.',
      tag: 'ML Inference',
      tagColor: 'secondary',
      specs: '4/5 specs',
      specsDone: false,
      category: 'my',
      risk: true,
      riskText: 'API latency bottleneck (340ms) detected in inference serialization cycle.',
      assignee: 'Alex Chen',
      subtasks: [
        { text: 'Post-training int8 dynamic quantization', done: true },
        { text: 'Benchmark on Coral TPU USB Accelerator', done: true },
        { text: 'Measure latency against 50ms real-time deadline', done: false },
        { text: 'Compile edge TPU model executable (.tflite)', done: true }
      ]
    },
    {
      id: 'EP-101',
      column: 'col-prototyping',
      title: 'Real-time telemetry WebSocket gateway pipeline',
      desc: 'High-throughput async event bus relaying 120Hz solar inverter signals to neural scheduler container.',
      tag: 'Backend',
      tagColor: 'tertiary',
      specs: '2/2 specs',
      specsDone: true,
      category: 'my',
      risk: false,
      assignee: 'Devon R.',
      subtasks: [
        { text: 'Implement Redis PubSub broker channel', done: true },
        { text: 'Buffer backpressure regulation under network jitter', done: true }
      ]
    },
    {
      id: 'EP-089',
      column: 'col-review',
      title: 'Stochastic solar irradiance predictive model v2',
      desc: 'LSTM + attention architecture forecasting cloud shadow transients with 10-minute horizon accuracy.',
      tag: 'Algorithms',
      tagColor: 'primary',
      specs: 'Peer Review',
      specsDone: false,
      category: 'all',
      risk: true,
      riskText: 'Overfitting detected on coastal marine layer weather scenarios (RMSE > 0.18).',
      assignee: 'Maya Lin',
      subtasks: [
        { text: 'Train on 3-year solar irradiance dataset', done: true },
        { text: 'Cross-validate against NOAA satellite feed', done: true },
        { text: 'Address peer code critique feedback on weight decay', done: false }
      ]
    },
    {
      id: 'EP-078',
      column: 'col-verified',
      title: 'Autonomous islanding failover switchboard firmware',
      desc: 'Microsecond disconnect logic safely isolating microgrid sub-circuits during municipal blackout faults.',
      tag: 'Firmware',
      tagColor: 'tertiary',
      specs: 'Verified 100%',
      specsDone: true,
      category: 'all',
      risk: false,
      assignee: 'Alex Chen',
      subtasks: [
        { text: 'Verify IEEE 1547.4 anti-islanding trip limits', done: true },
        { text: 'Hardware-in-the-loop stress testing', done: true },
        { text: 'Formal verification of safety state machine', done: true }
      ]
    }
  ],
  notifications: [
    { id: 1, title: 'Peer Review Requested', desc: 'Maya Lin invited you to critique Autonomous Drone Navigation Lab code.', time: '10m ago', unread: true, path: 'smart-lecture-and-lab' },
    { id: 2, title: 'Memory Decay Warning', desc: 'Convex Optimization recall decay threshold reached. Spaced quiz due today.', time: '45m ago', unread: true, path: 'skill-matrix-and-analytics' },
    { id: 3, title: 'Autograder Verified', desc: 'PolicyNetwork checkpoint epoch 30 passed all test suites (Loss 0.0418).', time: '2h ago', unread: false, path: 'smart-lecture-and-lab' }
  ],
  flashcards: [
    { q: 'What is the primary difference between Paxos and Raft consensus algorithms?', a: 'Raft decomposes consensus into explicit leader election, log replication, and safety to maximize human understandability, whereas Paxos uses interchangeable proposer/acceptor roles.' },
    { q: 'What condition guarantees the Markov Property in MDPs?', a: 'The conditional probability distribution of future states and rewards depends strictly on the current state and action, independent of prior history: P(S_{t+1}|S_t, A_t).' },
    { q: 'Why is gradient clipping critical when training deep policy networks with PPO?', a: 'Clipping prevents destructively large policy updates outside trust regions, mitigating catastrophic forgetting and divergent gradient explosions.' }
  ],
  currentCardIdx: 0
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initSearch();
  initCopilot();
  initNotifications();
  initLecturePlayer();
  initSandboxSimulator();
  initLabNotes();
  initKanban();
  initModals();
  initAnalyticsInteractions();
  initThemeToggles();
  loadSavedNotes();
  initLectureNotesCenter();
});

/* ==========================================================================
   ROUTING & TAB SWITCHING
   ========================================================================== */
function initRouter() {
  const navLinks = document.querySelectorAll('aside nav a[data-path]');
  const views = document.querySelectorAll('.app-view');

  function handleRoute(path) {
    if (!path) path = 'adaptive-learning-hub';
    AppState.activeTab = path;

    // Update active tab in sidebar
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('data-path');
      if (linkPath === path) {
        link.className = "flex items-center gap-3 px-3.5 py-2.5 transition-all bg-primary-indigo text-white font-medium rounded-xl shadow-[0_0_16px_rgba(99,102,241,0.25)] text-[14px]";
        link.setAttribute('aria-current', 'page');
      } else {
        link.className = "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium text-slate-400 hover:bg-surface-container-high hover:text-white transition-all";
        link.removeAttribute('aria-current');
      }
    });

    // Update views visibility
    views.forEach(view => {
      if (view.id === `view-${path}`) {
        view.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        view.classList.add('hidden');
      }
    });

    // Update Top Header Breadcrumbs
    const breadcrumbCurrent = document.getElementById('header-active-crumb');
    if (breadcrumbCurrent) {
      const titles = {
        'adaptive-learning-hub': 'Adaptive Learning Hub',
        'smart-lecture-and-lab': 'Smart Lecture & Computational Sandbox',
        'project-studio': 'Innovation Project Studio',
        'skill-matrix-and-analytics': 'Knowledge Matrix & Skill Analytics',
        'settings': 'Preferences & Settings'
      };
      breadcrumbCurrent.textContent = titles[path] || 'Active Environment';
    }
  }

  // Sidebar link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const path = link.getAttribute('data-path');
      window.location.hash = path;
      handleRoute(path);
    });
  });

  // Settings link in sidebar
  const settingsBtn = document.querySelector('aside a[data-path="settings"]');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modal-settings');
    });
  }

  // Handle direct hash navigation
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) handleRoute(hash);
  });

  const initialHash = window.location.hash.replace('#', '');
  handleRoute(initialHash || 'adaptive-learning-hub');
}

// Global programmatic navigation helper
window.navigateTo = function(path) {
  window.location.hash = path;
};

/* ==========================================================================
   GLOBAL SEARCH SPOTLIGHT (⌘K)
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('global-search-input');
  const searchModal = document.getElementById('search-modal');
  const modalInput = document.getElementById('search-modal-input');
  const searchResults = document.getElementById('search-results-list');

  const searchableIndex = [
    { title: 'Neural Networks: Policy Gradient Optimization', section: 'CS 285 Lecture & Lab', path: 'smart-lecture-and-lab', icon: 'terminal', tag: 'Lab' },
    { title: 'Distributed Consensus Algorithms (Paxos & Raft)', section: 'Spaced Practice Flashcards', path: 'adaptive-learning-hub', icon: 'repeat', tag: 'Flashcards' },
    { title: 'Autonomous Drone Navigation Lab', section: 'Project Studio', path: 'project-studio', icon: 'group', tag: 'Review' },
    { title: 'EcoPulse: Micro-Grid Power Optimizer', section: 'Capstone Projects', path: 'project-studio', icon: 'folder', tag: 'Capstone' },
    { title: 'PPO Agent Edge Quantization for Coral TPU', section: 'Milestone #EP-098', path: 'project-studio', icon: 'memory', tag: 'Task' },
    { title: 'Convex Optimization & Loss Surfaces', section: 'Skills & Diagnostics', path: 'skill-matrix-and-analytics', icon: 'functions', tag: 'Review' },
    { title: 'CartPole Continuous Policy Network', section: 'Python Sandbox', path: 'smart-lecture-and-lab', icon: 'code', tag: 'Python' },
    { title: 'KV Caching & Multi-Query Attention', section: 'Verified Skills', path: 'skill-matrix-and-analytics', icon: 'hub', tag: 'Credential' },
    { title: 'Alex Chen Official Academic Transcript', section: 'Student Records', path: 'skill-matrix-and-analytics', icon: 'school', tag: 'Transcript' }
  ];

  function openSearch() {
    if (searchModal) {
      searchModal.classList.remove('hidden');
      if (modalInput) {
        modalInput.value = '';
        modalInput.focus();
        renderResults('');
      }
    }
  }

  function closeSearch() {
    if (searchModal) searchModal.classList.add('hidden');
  }

  function renderResults(query) {
    if (!searchResults) return;
    const filtered = query.trim() === '' 
      ? searchableIndex.slice(0, 5) 
      : searchableIndex.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.tag.toLowerCase().includes(query.toLowerCase())
        );

    if (filtered.length === 0) {
      searchResults.innerHTML = `<div class="p-6 text-center text-slate-400 text-[13px]">No matching courses, notes, or tasks found for "<span class="text-white">${escapeHtml(query)}</span>"</div>`;
      return;
    }

    searchResults.innerHTML = filtered.map(item => `
      <div class="search-item flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer group border border-white/5" onclick="navigateTo('${item.path}'); document.getElementById('search-modal').classList.add('hidden');">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-surface-container-highest text-primary-indigo group-hover:text-white flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-[18px]">${item.icon}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[14px] font-medium text-white group-hover:text-primary transition-colors">${item.title}</span>
            <span class="text-[12px] text-slate-400">${item.section}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-highest text-slate-300 font-medium">${item.tag}</span>
          <span class="material-symbols-outlined text-[16px] text-slate-500 group-hover:text-white">chevron_right</span>
        </div>
      </div>
    `).join('');
  }

  if (searchInput) searchInput.addEventListener('click', openSearch);
  if (modalInput) {
    modalInput.addEventListener('input', (e) => renderResults(e.target.value));
  }

  // Keyboard shortcut: ⌘K or Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
      closeAllModals();
    }
  });

  const searchBackdrop = document.getElementById('search-modal-backdrop');
  if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);
}

/* ==========================================================================
   AI ASSISTANT SLIDING DRAWER
   ========================================================================== */
function initCopilot() {
  const copilotBtn = document.getElementById('btn-header-copilot');
  const copilotDrawer = document.getElementById('copilot-drawer');
  const closeBtn = document.getElementById('copilot-close-btn');
  const chatInput = document.getElementById('copilot-input');
  const sendBtn = document.getElementById('copilot-send-btn');
  const messagesContainer = document.getElementById('copilot-messages');

  function toggleCopilot() {
    if (!copilotDrawer) return;
    copilotDrawer.classList.toggle('translate-x-full');
  }

  if (copilotBtn) copilotBtn.addEventListener('click', toggleCopilot);
  if (closeBtn) closeBtn.addEventListener('click', toggleCopilot);

  window.openCopilotWithPrompt = function(promptText) {
    if (copilotDrawer) copilotDrawer.classList.remove('translate-x-full');
    if (chatInput) chatInput.value = promptText;
    sendMessage(promptText);
  };

  window.sendCopilotMessage = function(text) {
    sendMessage(text);
  };

  window.clearCopilotChat = function() {
    if (window.SmartEduAI) window.SmartEduAI.clearHistory();
    if (messagesContainer) {
      messagesContainer.innerHTML = `
        <div class="flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-primary-indigo text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <span class="material-symbols-outlined text-[15px]">auto_awesome</span>
          </div>
          <div class="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-container-high text-slate-200 p-3 leading-relaxed shadow-sm border border-white/5">
            Chat cleared! Ask me anything about Data Structures &amp; Algorithms, Deep RL, Neural Networks, Quantum Mechanics, or your Capstone project.
          </div>
        </div>
      `;
    }
    showToast('Chat Reset', 'Conversation history cleared', 'info');
  };

  async function sendMessage(text) {
    const query = text || (chatInput ? chatInput.value.trim() : '');
    if (!query || !messagesContainer) return;

    // User Message
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'flex justify-end';
    userMsgEl.innerHTML = `
      <div class="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary-indigo text-white p-3 text-[13px] leading-relaxed shadow-sm">
        ${escapeHtml(query)}
      </div>
    `;
    messagesContainer.appendChild(userMsgEl);
    if (chatInput) chatInput.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Thinking typing indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'flex items-center gap-2 text-slate-400 text-[12px] p-2';
    typingEl.id = 'copilot-typing-indicator';
    typingEl.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:0.2s]"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:0.4s]"></span>
      <span>Thinking...</span>
    `;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Generate dynamic GPT response
    try {
      let replyHtml = '';
      if (window.SmartEduAI && window.SmartEduAI.generateResponse) {
        replyHtml = await window.SmartEduAI.generateResponse(query);
      } else {
        replyHtml = `<p>I can help you analyze algorithms, review code, and structure your study roadmap. What would you like to explore?</p>`;
      }

      typingEl.remove();

      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'flex items-start gap-2.5';
      botMsgEl.innerHTML = `
        <div class="w-7 h-7 rounded-lg bg-primary-indigo text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <span class="material-symbols-outlined text-[15px]">auto_awesome</span>
        </div>
        <div class="max-w-[90%] rounded-2xl rounded-tl-sm bg-surface-container-high text-slate-200 p-3.5 text-[13px] leading-relaxed shadow-sm border border-white/5 space-y-1.5 select-text">
          ${replyHtml}
        </div>
      `;
      messagesContainer.appendChild(botMsgEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Render math formulas if KaTeX is present
      if (window.renderMathInElement) {
        try {
          window.renderMathInElement(botMsgEl, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        } catch (e) {}
      }
    } catch (err) {
      typingEl.remove();
      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'flex items-start gap-2.5';
      botMsgEl.innerHTML = `
        <div class="w-7 h-7 rounded-lg bg-error text-white flex items-center justify-center shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-[15px]">error</span>
        </div>
        <div class="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-container-high text-slate-200 p-3 text-[13px] leading-relaxed border border-error/30">
          Sorry, I encountered an issue processing that question. Please try rephrasing or ask another question!
        </div>
      `;
      messagesContainer.appendChild(botMsgEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => sendMessage());
  }
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
}

/* ==========================================================================
   NOTIFICATIONS POPOVER
   ========================================================================== */
function initNotifications() {
  const notifBtn = document.getElementById('btn-header-notifications');
  const notifMenu = document.getElementById('notifications-menu');
  const notifBadge = document.getElementById('notifications-badge');
  const notifList = document.getElementById('notifications-list');
  const markAllBtn = document.getElementById('notifications-mark-read');

  if (!notifBtn || !notifMenu) return;

  function renderNotifs() {
    if (!notifList) return;
    const unreadCount = AppState.notifications.filter(n => n.unread).length;
    if (notifBadge) {
      notifBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    notifList.innerHTML = AppState.notifications.map(n => `
      <div class="p-3 rounded-xl transition-all cursor-pointer ${n.unread ? 'bg-surface-container-high/80 border-l-2 border-primary' : 'bg-surface-container/40 hover:bg-surface-container'}" onclick="navigateTo('${n.path}'); document.getElementById('notifications-menu').classList.add('hidden'); markNotifRead(${n.id});">
        <div class="flex items-center justify-between">
          <span class="font-headline-sm text-[13px] ${n.unread ? 'text-primary' : 'text-on-surface'}">${n.title}</span>
          <span class="font-label-code text-[10px] text-outline">${n.time}</span>
        </div>
        <p class="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-snug">${n.desc}</p>
      </div>
    `).join('');
  }

  window.markNotifRead = function(id) {
    const item = AppState.notifications.find(n => n.id === id);
    if (item) item.unread = false;
    renderNotifs();
  };

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifMenu.classList.toggle('hidden');
    renderNotifs();
  });

  if (markAllBtn) {
    markAllBtn.addEventListener('click', () => {
      AppState.notifications.forEach(n => n.unread = false);
      renderNotifs();
      showToast('Notifications Cleared', 'All alerts marked as read', 'info');
    });
  }

  document.addEventListener('click', (e) => {
    if (!notifMenu.contains(e.target) && e.target !== notifBtn) {
      notifMenu.classList.add('hidden');
    }
  });

  renderNotifs();
}

/* ==========================================================================
   SMART LECTURE PLAYER & HTML5 VIDEO SYNCHRONIZATION
   ========================================================================== */
function initLecturePlayer() {
  const playBtn = document.getElementById('lecture-play-btn');
  const centerOverlay = document.getElementById('video-center-overlay');
  const centerIcon = document.getElementById('video-center-icon');
  const videoElem = document.getElementById('lecture-html5-video');
  const timeDisplay = document.getElementById('lecture-time-display');
  const scrubBar = document.getElementById('lecture-scrub-bar');
  const scrubFill = document.getElementById('lecture-scrub-fill');
  const speedBtn = document.getElementById('playback-speed');

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updatePlayerUI() {
    if (timeDisplay) {
      timeDisplay.textContent = `${formatTime(AppState.lecture.currentTime)} / ${formatTime(AppState.lecture.totalTime)}`;
    }
    if (scrubFill) {
      const pct = (AppState.lecture.currentTime / Math.max(1, AppState.lecture.totalTime)) * 100;
      scrubFill.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }
    const icon = playBtn ? playBtn.querySelector('.material-symbols-outlined') : null;
    if (icon) {
      icon.textContent = AppState.lecture.isPlaying ? 'pause' : 'play_arrow';
    }
    if (centerIcon) {
      centerIcon.textContent = AppState.lecture.isPlaying ? 'pause' : 'play_arrow';
    }
  }

  window.togglePlay = function() {
    AppState.lecture.isPlaying = !AppState.lecture.isPlaying;
    const v = document.getElementById('lecture-html5-video');
    
    if (AppState.lecture.isPlaying) {
      if (v) {
        v.play().catch(e => {
          console.log('Video autoplay blocked or format fallback:', e);
        });
      }
      clearInterval(AppState.lecture.timerInterval);
      AppState.lecture.timerInterval = setInterval(() => {
        if (AppState.lecture.currentTime < AppState.lecture.totalTime) {
          AppState.lecture.currentTime += AppState.lecture.speed;
          updatePlayerUI();
        } else {
          window.togglePlay();
        }
      }, 1000);
      showToast('Lecture Playing', 'Simulated smart lecture stream is live', 'info');
    } else {
      if (v) v.pause();
      clearInterval(AppState.lecture.timerInterval);
    }
    updatePlayerUI();
  };

  if (videoElem) {
    videoElem.addEventListener('timeupdate', () => {
      if (!isNaN(videoElem.currentTime) && videoElem.duration > 0) {
        AppState.lecture.currentTime = Math.floor(videoElem.currentTime);
        AppState.lecture.totalTime = Math.floor(videoElem.duration);
        updatePlayerUI();
      }
    });
    videoElem.addEventListener('play', () => {
      AppState.lecture.isPlaying = true;
      updatePlayerUI();
    });
    videoElem.addEventListener('pause', () => {
      AppState.lecture.isPlaying = false;
      updatePlayerUI();
    });
  }

  if (playBtn) playBtn.addEventListener('click', window.togglePlay);

  // Click on scrub bar to seek
  if (scrubBar) {
    scrubBar.addEventListener('click', (e) => {
      const rect = scrubBar.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      AppState.lecture.currentTime = Math.floor(pos * AppState.lecture.totalTime);
      const v = document.getElementById('lecture-html5-video');
      if (v && !isNaN(v.duration)) {
        v.currentTime = AppState.lecture.currentTime;
      }
      updatePlayerUI();
      showToast('Seeked', `Jumped to ${formatTime(AppState.lecture.currentTime)}`, 'info');
    });
  }

  // Playback Speeds
  const speeds = [1.0, 1.25, 1.5, 2.0];
  let speedIdx = 1;
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      speedIdx = (speedIdx + 1) % speeds.length;
      AppState.lecture.speed = speeds[speedIdx];
      speedBtn.textContent = `${AppState.lecture.speed.toFixed(2)}x`;
      const v = document.getElementById('lecture-html5-video');
      if (v) v.playbackRate = AppState.lecture.speed;
      showToast('Playback Speed', `Speed set to ${AppState.lecture.speed}x`, 'info');
    });
  }

  // Navigation helpers
  window.seekVideoRelative = function(seconds) {
    const v = document.getElementById('lecture-html5-video');
    AppState.lecture.currentTime = Math.max(0, Math.min(AppState.lecture.totalTime, AppState.lecture.currentTime + seconds));
    if (v && !isNaN(v.duration)) {
      v.currentTime = AppState.lecture.currentTime;
    }
    updatePlayerUI();
  };

  window.setVideoVolume = function(val) {
    const v = document.getElementById('lecture-html5-video');
    if (v) v.volume = parseFloat(val);
    const icon = document.getElementById('volume-icon');
    if (icon) {
      icon.textContent = val == 0 ? 'volume_off' : (val < 0.5 ? 'volume_down' : 'volume_up');
    }
  };

  window.toggleVideoMute = function() {
    const v = document.getElementById('lecture-html5-video');
    const slider = document.getElementById('volume-slider');
    const icon = document.getElementById('volume-icon');
    if (!v) return;
    v.muted = !v.muted;
    if (v.muted) {
      if (icon) icon.textContent = 'volume_off';
      if (slider) slider.value = 0;
    } else {
      if (icon) icon.textContent = 'volume_up';
      if (slider) slider.value = 0.8;
      v.volume = 0.8;
    }
  };

  window.togglePictureInPicture = async function() {
    const v = document.getElementById('lecture-html5-video');
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        showToast('Picture-in-Picture', 'Exited PiP floating player', 'info');
      } else if (v && document.pictureInPictureEnabled) {
        await v.requestPictureInPicture();
        showToast('Picture-in-Picture', 'Lecture detached to floating window', 'success');
      }
    } catch (err) {
      showToast('PiP Active', 'Floating video window toggled', 'info');
    }
  };

  window.toggleVideoFullscreen = function() {
    const v = document.getElementById('lecture-html5-video');
    if (!v) return;
    if (!document.fullscreenElement) {
      if (v.requestFullscreen) v.requestFullscreen();
      showToast('Fullscreen', 'Expanded lecture video to full screen', 'info');
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  window.scrollToStudyNotes = function() {
    const notesEl = document.getElementById('lecture-notes-section');
    if (notesEl) {
      notesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('Lecture Notes', 'Scrolled to course curriculum and study notes', 'info');
    }
  };

  // Multiple Choice Quiz
  window.selectQuizOption = function(btn, isCorrect) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => {
      opt.classList.remove('bg-error/20', 'bg-tertiary/20', 'bg-surface-container-high');
      const icon = opt.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = 'radio_button_unchecked';
        icon.className = 'material-symbols-outlined text-[18px] text-outline';
      }
    });

    const icon = btn.querySelector('.material-symbols-outlined');
    const feedback = document.getElementById('quiz-feedback');

    if (isCorrect) {
      btn.classList.add('bg-tertiary/20', 'border-tertiary/40');
      if (icon) {
        icon.textContent = 'check_circle';
        icon.className = 'material-symbols-outlined text-[18px] text-tertiary';
      }
      if (feedback) feedback.classList.remove('hidden');
      showToast('Correct Answer!', '+50 XP gained on Markov Property', 'success');
    } else {
      btn.classList.add('bg-error/20', 'border-error/40');
      if (icon) {
        icon.textContent = 'cancel';
        icon.className = 'material-symbols-outlined text-[18px] text-error';
      }
      if (feedback) feedback.classList.add('hidden');
      showToast('Incorrect', 'Recall: the Markov state must encompass all past history relevant to future transitions.', 'error');
    }
  };

  updatePlayerUI();
}

/* ==========================================================================
   ACADEMIC COURSE CURRICULUM, NOTES & DOWNLOAD CENTER
   ========================================================================== */
function initLectureNotesCenter() {
  const currentCourse = AppState.activeCourseId || 'cs285';
  switchLectureCourse(currentCourse, false);
}

// Switch between courses
window.switchLectureCourse = function(courseId, showNotification = true) {
  const data = (window.CourseLecturesData && window.CourseLecturesData[courseId]) || (AppState.customCourses && AppState.customCourses[courseId]);
  if (!data) return;

  AppState.activeCourseId = courseId;
  AppState.lecture.currentTime = 0;
  AppState.lecture.totalTime = data.totalSec || 1455;
  AppState.lecture.isPlaying = false;

  // 1. Update Course Chips Styling
  document.querySelectorAll('#course-selector-chips .course-chip').forEach(btn => {
    const id = btn.getAttribute('data-course-id');
    if (id === courseId) {
      btn.className = "course-chip active flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary-indigo text-white text-[13px] font-medium shadow-sm transition-all whitespace-nowrap";
    } else {
      btn.className = "course-chip flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-slate-300 hover:text-white text-[13px] font-medium transition-all whitespace-nowrap border border-white/5";
    }
  });

  // 2. Update Video Player
  const v = document.getElementById('lecture-html5-video');
  const vSource = document.getElementById('lecture-video-source');
  if (v && vSource) {
    v.pause();
    vSource.src = data.videoUrl;
    v.poster = data.poster || '';
    v.load();
  }

  // 3. Update Video Overlays & Titles
  const vTitle = document.getElementById('lecture-video-title');
  if (vTitle) vTitle.textContent = `${data.code}: ${data.lectureTitle}`;
  const vInstructor = document.getElementById('lecture-instructor-badge');
  if (vInstructor) vInstructor.textContent = data.instructor;
  const vRes = document.getElementById('lecture-res-badge');
  if (vRes) vRes.textContent = data.resolution || '1080p 60fps';

  // 4. Update Chapters List
  const chapContainer = document.getElementById('lecture-chapters-container');
  if (chapContainer && data.chapters) {
    chapContainer.innerHTML = '';
    data.chapters.forEach((ch, idx) => {
      const btn = document.createElement('button');
      btn.className = idx === 0 
        ? "flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-indigo/20 text-left shadow-sm border border-primary-indigo/40 transition-colors"
        : "flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-left transition-colors";
      btn.setAttribute('data-chapter-time', ch.time);
      btn.innerHTML = `
        <span class="font-mono text-[11px] ${idx === 0 ? 'text-primary font-semibold' : 'text-slate-400'}">${formatTimestamp(ch.time)}</span>
        <span class="text-[12px] text-white">${escapeHtml(ch.label.replace(/^\d+:\d+\s*/, ''))}</span>
        ${idx === 0 ? '<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>' : ''}
      `;
      btn.addEventListener('click', () => {
        AppState.lecture.currentTime = ch.time;
        if (v && !isNaN(v.duration)) v.currentTime = ch.time;
        chapContainer.querySelectorAll('button').forEach(b => {
          b.className = "flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-left transition-colors";
        });
        btn.className = "flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-indigo/20 text-left shadow-sm border border-primary-indigo/40 transition-colors";
        const timeDisplay = document.getElementById('lecture-time-display');
        const scrubFill = document.getElementById('lecture-scrub-fill');
        if (timeDisplay) timeDisplay.textContent = `${formatTimestamp(AppState.lecture.currentTime)} / ${formatTimestamp(AppState.lecture.totalTime)}`;
        if (scrubFill) scrubFill.style.width = `${(AppState.lecture.currentTime / AppState.lecture.totalTime) * 100}%`;
        showToast('Chapter Jump', `Jumped to: ${ch.label}`, 'info');
      });
      chapContainer.appendChild(btn);
    });
  }

  // 5. Update Transcript List
  const transContainer = document.getElementById('lecture-transcript-container');
  if (transContainer && data.transcript) {
    transContainer.innerHTML = '';
    data.transcript.forEach((tr, i) => {
      const card = document.createElement('div');
      card.className = i === 1 
        ? "p-3.5 rounded-xl bg-surface-container-high/70 flex flex-col gap-1.5 group border-l-2 border-emerald-400 border-t border-r border-b border-white/5"
        : "p-3.5 rounded-xl bg-surface-container/60 hover:bg-surface-container transition-all flex flex-col gap-1.5 group border border-white/5";
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-mono text-[11px] ${i === 1 ? 'text-emerald-400 font-semibold' : 'text-primary-indigo font-semibold'}">${tr.time} ${i === 1 ? '(Current Point)' : ''}</span>
            ${i === 1 ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>' : ''}
          </div>
          <button class="flex items-center gap-1 text-[11px] text-secondary hover:text-white transition-opacity font-medium" onclick="openCopilotWithPrompt('${escapeHtml(tr.conceptPrompt || tr.text)}')">
            <span class="material-symbols-outlined text-[14px]">lightbulb</span>
            <span>Concept Note</span>
          </button>
        </div>
        <p class="text-[13px] text-slate-200 leading-relaxed">${escapeHtml(tr.text)}</p>
      `;
      transContainer.appendChild(card);
    });
  }

  // 6. Update Notes Section Header
  const nCode = document.getElementById('notes-course-code');
  if (nCode) nCode.textContent = data.code;
  const nInst = document.getElementById('notes-course-instructor');
  if (nInst) nInst.textContent = `${data.instructor} • ${data.institution || ''}`;
  const nTitle = document.getElementById('notes-course-title');
  if (nTitle) nTitle.textContent = `${data.lectureNum}: ${data.lectureTitle}`;

  // 7. Render Lecture Notes & Full-Screen Reader
  renderLectureNotes(courseId, AppState.activeTopicFilter || 'all');
  renderReaderModal(courseId);

  if (showNotification) {
    showToast(`Loaded ${data.code}`, `${data.lectureTitle} study guide and notes ready`, 'success');
  }
};

function formatTimestamp(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Filter Notes by Topic
window.filterNoteTopics = function(topicTarget) {
  AppState.activeTopicFilter = topicTarget;
  document.querySelectorAll('#topic-filter-tabs .topic-tab').forEach(tab => {
    if (tab.getAttribute('data-topic-target') === topicTarget) {
      tab.className = "topic-tab active px-3.5 py-1.5 rounded-xl bg-primary-indigo text-white text-[13px] font-medium shadow-sm transition-all whitespace-nowrap";
    } else {
      tab.className = "topic-tab px-3.5 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-slate-400 hover:text-white text-[13px] font-medium transition-all whitespace-nowrap border border-white/5";
    }
  });
  renderLectureNotes(AppState.activeCourseId, topicTarget);
};

// Render Notes Content Area
function renderLectureNotes(courseId, topicFilter = 'all') {
  const container = document.getElementById('lecture-notes-content-area');
  if (!container) return;

  const course = (window.CourseLecturesData && window.CourseLecturesData[courseId]) || (AppState.customCourses && AppState.customCourses[courseId]);
  if (!course || !course.topics) {
    container.innerHTML = '<p class="text-slate-400 text-[13px]">No notes found for this course.</p>';
    return;
  }

  const t = course.topics;
  let html = '';

  // Topic 1.0: Executive Overview & Intuition
  if (topicFilter === 'all' || topicFilter === 'overview') {
    const ov = t.overview || {};
    html += `
      <section class="bg-surface-container-low rounded-2xl p-space-lg shadow-sm border border-white/5 flex flex-col gap-space-md">
        <div class="flex items-center justify-between border-b border-white/5 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-primary-indigo/20 text-indigo-300 font-bold text-[12px] flex items-center justify-center font-mono">${ov.num || '1.0'}</span>
            <div>
              <h3 class="text-[16px] font-bold text-white">${escapeHtml(ov.title || 'Executive Summary & Physical Intuition')}</h3>
              <span class="text-[11px] text-slate-400">${ov.readTime || '4 min read'} • ${ov.badge || 'Fundamental Principle'}</span>
            </div>
          </div>
          <button class="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-slate-300 hover:text-white text-[11px] font-medium transition-colors" onclick="openCopilotWithPrompt('Explain key intuition of ${escapeHtml(course.code)}: ${escapeHtml(course.lectureTitle)}')">
            Ask Copilot
          </button>
        </div>
        <p class="text-[13.5px] text-slate-200 leading-relaxed">${escapeHtml(ov.summaryText || '')}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
          ${(ov.keyPoints || []).map(pt => `
            <div class="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container/60 border border-white/5">
              <span class="material-symbols-outlined text-emerald-400 text-[17px] mt-0.5 shrink-0">check_circle</span>
              <span class="text-[12.5px] text-slate-300 leading-snug">${escapeHtml(pt)}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Topic 2.0: Mathematical Formulations & Derivations
  if (topicFilter === 'all' || topicFilter === 'math') {
    const mt = t.math || {};
    html += `
      <section class="bg-surface-container-low rounded-2xl p-space-lg shadow-sm border border-white/5 flex flex-col gap-space-md">
        <div class="flex items-center justify-between border-b border-white/5 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-[12px] flex items-center justify-center font-mono">${mt.num || '2.0'}</span>
            <div>
              <h3 class="text-[16px] font-bold text-white">${escapeHtml(mt.title || 'Formal Mathematical Derivations & Theorems')}</h3>
              <span class="text-[11px] text-slate-400">${mt.readTime || '7 min read'} • ${mt.badge || 'Mathematical Proof'}</span>
            </div>
          </div>
          <button class="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-slate-300 hover:text-white text-[11px] font-medium transition-colors" onclick="downloadLectureNotes('${courseId}', 'cheatsheet')">
            Download Formulas
          </button>
        </div>

        <div class="note-math-display shadow-inner">
          <span class="text-[11px] uppercase tracking-wider text-slate-400 block mb-1 font-sans">Core Theorem Equation:</span>
          <div class="text-[15px] font-bold text-sky-400">${escapeHtml(mt.formula || '')}</div>
        </div>

        <div class="note-theorem flex flex-col gap-1.5">
          <span class="text-[12px] font-bold text-indigo-300 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">verified</span>
            ${escapeHtml(mt.proofTitle || 'Analytical Proof')}
          </span>
          <div class="flex flex-col gap-2 mt-1">
            ${(mt.proofSteps || []).map(st => `
              <div class="text-[13px] text-slate-200 leading-relaxed font-mono bg-surface-container-lowest/50 p-2.5 rounded-lg border border-white/5">${escapeHtml(st)}</div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // Topic 3.0: Algorithm & PyTorch Implementation
  if (topicFilter === 'all' || topicFilter === 'code') {
    const cd = t.code || {};
    html += `
      <section class="bg-surface-container-low rounded-2xl p-space-lg shadow-sm border border-white/5 flex flex-col gap-space-md">
        <div class="flex items-center justify-between border-b border-white/5 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-[12px] flex items-center justify-center font-mono">${cd.num || '3.0'}</span>
            <div>
              <h3 class="text-[16px] font-bold text-white">${escapeHtml(cd.title || 'Complete PyTorch Implementation')}</h3>
              <span class="text-[11px] text-slate-400">${cd.readTime || '6 min read'} • ${cd.badge || 'Executable Python'}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-slate-200 text-[12px] font-medium transition-colors flex items-center gap-1.5" onclick="copyCodeToClipboard(this, \`${escapeJsString(cd.codeText || '')}\`)">
              <span class="material-symbols-outlined text-[15px]">content_copy</span>
              <span>Copy Code</span>
            </button>
            <button class="px-3 py-1 rounded-lg bg-primary-indigo hover:bg-indigo-500 text-white text-[12px] font-medium transition-colors flex items-center gap-1.5" onclick="downloadLectureNotes('${courseId}', 'py')">
              <span class="material-symbols-outlined text-[15px]">download</span>
              <span>Download .py</span>
            </button>
          </div>
        </div>

        <div class="rounded-xl bg-surface-container-lowest p-space-md font-mono text-[12.5px] leading-relaxed text-slate-300 overflow-x-auto border border-white/5 select-text shadow-inner">
          <div class="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-white/5 mb-2 font-sans">
            <span>File: ${escapeHtml(cd.filename || 'algorithm.py')}</span>
            <span>Python 3.11 • PyTorch 2.4</span>
          </div>
          <pre><code>${escapeHtml(cd.codeText || '')}</code></pre>
        </div>
      </section>
    `;
  }

  // Topic 4.0: Practical Guidelines & Hyperparameters
  if (topicFilter === 'all' || topicFilter === 'guidelines') {
    const gd = t.guidelines || {};
    html += `
      <section class="bg-surface-container-low rounded-2xl p-space-lg shadow-sm border border-white/5 flex flex-col gap-space-md">
        <div class="flex items-center justify-between border-b border-white/5 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-[12px] flex items-center justify-center font-mono">${gd.num || '4.0'}</span>
            <div>
              <h3 class="text-[16px] font-bold text-white">${escapeHtml(gd.title || 'Practical Guidelines & Hyperparameter Tuning')}</h3>
              <span class="text-[11px] text-slate-400">${gd.readTime || '3 min read'} • ${gd.badge || 'Engineering Practice'}</span>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-[12.5px]">
            <thead>
              <tr class="border-b border-white/10 text-slate-400">
                ${(gd.tableHeaders || []).map(th => `<th class="pb-2.5 pr-4 font-semibold">${escapeHtml(th)}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${(gd.tableRows || []).map(row => `
                <tr class="hover:bg-surface-container/50 transition-colors">
                  <td class="py-2.5 pr-4 font-medium text-white font-mono text-[12px]">${escapeHtml(row[0] || '')}</td>
                  <td class="py-2.5 pr-4 font-mono text-emerald-400">${escapeHtml(row[1] || '')}</td>
                  <td class="py-2.5 pr-4 text-amber-300">${escapeHtml(row[2] || '')}</td>
                  <td class="py-2.5 text-slate-300 leading-snug">${escapeHtml(row[3] || '')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  // Topic 5.0: Common Pitfalls & Practice Problems
  if (topicFilter === 'all' || topicFilter === 'pitfalls') {
    const pf = t.pitfalls || {};
    html += `
      <section class="bg-surface-container-low rounded-2xl p-space-lg shadow-sm border border-white/5 flex flex-col gap-space-md">
        <div class="flex items-center justify-between border-b border-white/5 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-[12px] flex items-center justify-center font-mono">${pf.num || '5.0'}</span>
            <div>
              <h3 class="text-[16px] font-bold text-white">${escapeHtml(pf.title || 'Common Exam Pitfalls & Practice Problems')}</h3>
              <span class="text-[11px] text-slate-400">${pf.readTime || '4 min read'} • ${pf.badge || 'Exam Preparation'}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          ${(pf.pitfallsList || []).map(p => `
            <div class="note-warning flex flex-col gap-1">
              <span class="text-[13px] font-bold text-amber-400 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px]">warning</span>
                ${escapeHtml(p.title)}
              </span>
              <p class="text-[12.5px] text-slate-200 leading-relaxed">${escapeHtml(p.detail)}</p>
            </div>
          `).join('')}
        </div>

        ${pf.practiceQuestion ? `
          <div class="p-space-md rounded-xl bg-surface-container border border-white/5 flex flex-col gap-2.5 mt-2">
            <span class="text-[13px] font-bold text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary-indigo text-[18px]">psychology</span>
              Self-Assessment Question
            </span>
            <p class="text-[13px] text-slate-300 leading-relaxed">${escapeHtml(pf.practiceQuestion.q)}</p>
            <div>
              <button class="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-slate-300 hover:text-white text-[12px] font-medium transition-colors" id="btn-toggle-solution" onclick="toggleSolution('btn-toggle-solution', 'solution-content-block')">
                Reveal Analytical Solution
              </button>
              <div class="hidden mt-2.5 p-3 rounded-lg bg-surface-container-lowest border border-emerald-500/30 text-emerald-300 text-[12.5px] leading-relaxed" id="solution-content-block">
                ${escapeHtml(pf.practiceQuestion.solution)}
              </div>
            </div>
          </div>
        ` : ''}
      </section>
    `;
  }

  container.innerHTML = html;

  // Trigger KaTeX math rendering if available
  if (window.renderMathInElement) {
    try {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.log('KaTeX rendering notice:', e);
    }
  }
}

// Copy Code Helper
window.copyCodeToClipboard = function(btn, codeText) {
  navigator.clipboard.writeText(codeText).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined text-[15px] text-emerald-400">check</span><span class="text-emerald-400">Copied!</span>`;
    showToast('Code Copied', 'Python implementation copied to clipboard', 'success');
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
  }).catch(() => {
    showToast('Copy Failed', 'Please select text manually', 'error');
  });
};

// Toggle Practice Solution
window.toggleSolution = function(btnId, solId) {
  const btn = document.getElementById(btnId);
  const sol = document.getElementById(solId);
  if (!sol) return;
  const isHidden = sol.classList.contains('hidden');
  if (isHidden) {
    sol.classList.remove('hidden');
    if (btn) btn.textContent = 'Hide Analytical Solution';
  } else {
    sol.classList.add('hidden');
    if (btn) btn.textContent = 'Reveal Analytical Solution';
  }
};

// Render Full-Screen Reader Modal
function renderReaderModal(courseId) {
  const modalTitle = document.getElementById('reader-modal-title');
  const modalSub = document.getElementById('reader-modal-subtitle');
  const modalBody = document.getElementById('reader-modal-body');
  if (!modalBody) return;

  const course = (window.CourseLecturesData && window.CourseLecturesData[courseId]) || (AppState.customCourses && AppState.customCourses[courseId]);
  if (!course) return;

  if (modalTitle) modalTitle.textContent = `${course.code}: ${course.lectureTitle}`;
  if (modalSub) modalSub.textContent = `${course.instructor} • ${course.institution || ''} • Academic Syllabus`;

  const t = course.topics || {};
  modalBody.innerHTML = `
    <div class="border-b border-white/10 pb-6 mb-6">
      <div class="flex items-center gap-2 mb-2">
        <span class="badge-clean bg-primary-indigo/20 text-indigo-300 font-mono">${escapeHtml(course.code)}</span>
        <span class="badge-clean bg-emerald-500/15 text-emerald-300">Verified Academic Archive</span>
      </div>
      <h1 class="text-[26px] font-bold text-white">${escapeHtml(course.lectureNum)}: ${escapeHtml(course.lectureTitle)}</h1>
      <p class="text-[14px] text-slate-400 mt-1">${escapeHtml(course.instructor)} • ${escapeHtml(course.institution || '')}</p>
    </div>

    <!-- Section 1 -->
    <div class="space-y-3">
      <h2 class="text-[18px] font-bold text-white border-b border-white/10 pb-2">${escapeHtml(t.overview?.title || '1.0 Executive Overview')}</h2>
      <p class="text-[14px] text-slate-300 leading-relaxed">${escapeHtml(t.overview?.summaryText || '')}</p>
      <ul class="list-disc pl-5 space-y-1.5 text-[13.5px] text-slate-300">
        ${(t.overview?.keyPoints || []).map(k => `<li>${escapeHtml(k)}</li>`).join('')}
      </ul>
    </div>

    <!-- Section 2 -->
    <div class="space-y-3 pt-4">
      <h2 class="text-[18px] font-bold text-white border-b border-white/10 pb-2">${escapeHtml(t.math?.title || '2.0 Mathematical Formulations')}</h2>
      <div class="p-4 rounded-xl bg-surface-container font-mono text-[14px] text-sky-400">
        ${escapeHtml(t.math?.formula || '')}
      </div>
      <div class="space-y-2 mt-2">
        ${(t.math?.proofSteps || []).map(s => `<p class="text-[13.5px] text-slate-300 font-mono bg-surface-container/40 p-2 rounded-lg">${escapeHtml(s)}</p>`).join('')}
      </div>
    </div>

    <!-- Section 3 -->
    <div class="space-y-3 pt-4">
      <h2 class="text-[18px] font-bold text-white border-b border-white/10 pb-2">${escapeHtml(t.code?.title || '3.0 Implementation')}</h2>
      <pre class="p-4 rounded-xl bg-surface-container font-mono text-[12.5px] text-slate-300 overflow-x-auto"><code>${escapeHtml(t.code?.codeText || '')}</code></pre>
    </div>

    <!-- Section 4 -->
    <div class="space-y-3 pt-4">
      <h2 class="text-[18px] font-bold text-white border-b border-white/10 pb-2">${escapeHtml(t.guidelines?.title || '4.0 Practical Guidelines')}</h2>
      <div class="space-y-2">
        ${(t.guidelines?.tableRows || []).map(r => `
          <div class="p-3 rounded-lg bg-surface-container flex flex-col md:flex-row md:items-center justify-between text-[13px] gap-1">
            <span class="font-bold text-white">${escapeHtml(r[0])}</span>
            <span class="font-mono text-emerald-400">${escapeHtml(r[1])}</span>
            <span class="text-slate-300">${escapeHtml(r[3])}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Open Full-Screen Reader Modal
window.openNotesReaderModal = function(courseId) {
  renderReaderModal(courseId || AppState.activeCourseId);
  openModal('modal-lecture-notes-reader');
};

// Print Lecture Notes
window.printLectureNotes = function(courseId) {
  renderReaderModal(courseId || AppState.activeCourseId);
  setTimeout(() => {
    window.print();
  }, 250);
};

// Download Lecture Notes (PDF, Markdown, Python, Slides, Cheatsheet)
window.downloadLectureNotes = function(courseId, format) {
  const course = (window.CourseLecturesData && window.CourseLecturesData[courseId]) || (AppState.customCourses && AppState.customCourses[courseId]) || window.CourseLecturesData['cs285'];
  if (!course) return;

  if (format === 'pdf') {
    printLectureNotes(courseId);
    showToast('PDF Export', 'Print dialog opened. Select "Save as PDF" to save clean formatted document.', 'info');
    return;
  }

  const df = course.downloadFiles || {};
  let filename = '';
  let content = '';
  let mime = 'text/plain;charset=utf-8';

  if (format === 'md') {
    filename = df.md?.filename || `${course.code}_Lecture_Notes.md`;
    content = df.md?.content || generateMarkdownFallback(course);
    mime = 'text/markdown;charset=utf-8';
  } else if (format === 'py') {
    filename = df.py?.filename || `${course.code}_Implementation.py`;
    content = df.py?.content || course.topics?.code?.codeText || '# Python script';
    mime = 'text/x-python;charset=utf-8';
  } else if (format === 'slides') {
    filename = df.slides?.filename || `${course.code}_Slides_Summary.txt`;
    content = df.slides?.content || `Slide Deck Summary for ${course.code}\n${course.lectureTitle}`;
    mime = 'text/plain;charset=utf-8';
  } else if (format === 'cheatsheet') {
    filename = df.cheatsheet?.filename || `${course.code}_Formulas_Cheatsheet.txt`;
    content = df.cheatsheet?.content || `Formulas for ${course.code}\n${course.topics?.math?.formula || ''}`;
    mime = 'text/plain;charset=utf-8';
  }

  downloadFile(filename, content, mime);
};

function generateMarkdownFallback(course) {
  return `# ${course.code}: ${course.lectureTitle}\nInstructor: ${course.instructor}\n\n## 1.0 Overview\n${course.topics?.overview?.summaryText || ''}\n\n## 2.0 Formulas\n${course.topics?.math?.formula || ''}\n`;
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  showToast('Download Complete', `Saved ${filename} to your downloads`, 'success');
}

// User File Upload Handlers
window.handleFileSelected = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  processUploadedFile(file, 'custom', file.name.replace(/\.[^/.]+$/, ''));
};

window.handleModalFileSelected = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const label = document.getElementById('modal-upload-label');
  if (label) label.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
};

window.submitUploadedLectureNotes = function() {
  const courseSelect = document.getElementById('upload-course-select')?.value || 'cs285';
  const title = document.getElementById('upload-title-input')?.value.trim() || 'My Uploaded Lecture Notes';
  const customText = document.getElementById('upload-content-input')?.value.trim();
  const fileInput = document.getElementById('modal-file-picker');
  const file = fileInput?.files?.[0];

  if (!file && !customText) {
    showToast('Input Required', 'Please select a file or enter lecture notes text', 'error');
    return;
  }

  if (file) {
    processUploadedFile(file, courseSelect, title);
  } else {
    // Process text
    const customId = `custom_${Date.now()}`;
    const newCourse = {
      id: customId,
      code: 'MY-NOTE',
      title: title,
      lectureNum: 'Lecture',
      lectureTitle: title,
      instructor: 'Student Note',
      institution: 'My Study Workspace',
      duration: '15:00',
      totalSec: 900,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
      chapters: [
        { time: 0, label: '00:00 Introduction' },
        { time: 300, label: '05:00 Key Concepts' }
      ],
      transcript: [
        { time: '00:00', text: customText.substring(0, 150) + '...', conceptPrompt: 'Explain uploaded note' }
      ],
      topics: {
        overview: {
          num: '1.0',
          title: 'Executive Summary',
          readTime: '3 min',
          badge: 'User Created',
          summaryText: customText,
          keyPoints: ['User uploaded study notes', 'Parsed and ready for immediate export']
        },
        math: {
          num: '2.0',
          title: 'Notes Reference',
          readTime: '2 min',
          badge: 'Reference',
          formula: 'Custom equations documented in note text',
          proofTitle: 'Summary',
          proofSteps: ['Notes successfully indexed in student workspace.']
        },
        code: {
          num: '3.0',
          title: 'Code Reference',
          readTime: '1 min',
          badge: 'Snippet',
          filename: 'notes_code.py',
          codeText: '# Code extracted from uploaded notes\nprint("Notes loaded successfully")'
        },
        guidelines: {
          num: '4.0',
          title: 'Study Guidelines',
          readTime: '1 min',
          badge: 'Review',
          tableHeaders: ['Status', 'Review Frequency', 'Action'],
          tableRows: [['Active', 'Spaced Recall (3 Days)', 'Keep in study deck']]
        },
        pitfalls: {
          num: '5.0',
          title: 'Key Reminders',
          readTime: '1 min',
          badge: 'Review',
          pitfallsList: [{ title: 'Review Target', detail: 'Ensure regular spaced repetition' }]
        }
      },
      downloadFiles: {
        md: { filename: `${title.replace(/\s+/g, '_')}.md`, content: customText },
        py: { filename: `${title.replace(/\s+/g, '_')}.py`, content: `# ${title}\n` },
        slides: { filename: `${title.replace(/\s+/g, '_')}_summary.txt`, content: customText },
        cheatsheet: { filename: `${title.replace(/\s+/g, '_')}_cheatsheet.txt`, content: customText }
      }
    };

    if (!AppState.customCourses) AppState.customCourses = {};
    AppState.customCourses[customId] = newCourse;
    if (window.CourseLecturesData) window.CourseLecturesData[customId] = newCourse;
    addCourseChipToUI(newCourse);
    switchLectureCourse(customId);
    showToast('Notes Created', `Added "${title}" to your study workspace`, 'success');
  }

  closeModal('modal-upload-lecture-notes');
};

function processUploadedFile(file, targetCourse, userTitle) {
  const isVideo = file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.mov') || file.name.endsWith('.webm');
  const customId = `upload_${Date.now()}`;
  const title = userTitle || file.name.replace(/\.[^/.]+$/, '');

  if (isVideo) {
    const videoUrl = URL.createObjectURL(file);
    const newCourse = {
      id: customId,
      code: 'VIDEO',
      title: title,
      lectureNum: 'Custom Video',
      lectureTitle: title,
      instructor: 'Student Recording',
      institution: 'Uploaded Media',
      duration: 'Custom',
      totalSec: 1200,
      videoUrl: videoUrl,
      poster: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
      chapters: [
        { time: 0, label: '00:00 Recording Start' },
        { time: 180, label: '03:00 Topic Discussion' }
      ],
      transcript: [
        { time: '00:00', text: `Lecture media: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB).`, conceptPrompt: 'Summarize video' }
      ],
      topics: {
        overview: {
          num: '1.0',
          title: 'Uploaded Lecture Recording',
          readTime: 'Video',
          badge: 'Media File',
          summaryText: `Recorded lecture file: ${file.name}. Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB.`,
          keyPoints: ['Loaded directly into HTML5 video player', 'Scrubber and timestamp seek controls enabled']
        }
      },
      downloadFiles: {
        md: { filename: `${title}.md`, content: `# ${title}\nLecture Video: ${file.name}` }
      }
    };
    if (!AppState.customCourses) AppState.customCourses = {};
    AppState.customCourses[customId] = newCourse;
    if (window.CourseLecturesData) window.CourseLecturesData[customId] = newCourse;
    addCourseChipToUI(newCourse);
    switchLectureCourse(customId);
    showToast('Video Loaded', `Now playing "${file.name}"`, 'success');
  } else {
    // Text file reading
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileText = e.target.result;
      const newCourse = {
        id: customId,
        code: 'DOC',
        title: title,
        lectureNum: 'Uploaded Doc',
        lectureTitle: title,
        instructor: 'Uploaded Notes',
        institution: 'Personal Vault',
        duration: '10:00',
        totalSec: 600,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
        chapters: [{ time: 0, label: '00:00 Document Start' }],
        transcript: [{ time: '00:00', text: fileText.substring(0, 200) + '...', conceptPrompt: 'Analyze notes' }],
        topics: {
          overview: {
            num: '1.0',
            title: 'Uploaded Notes Overview',
            readTime: '5 min',
            badge: file.name.split('.').pop().toUpperCase(),
            summaryText: fileText.substring(0, 600),
            keyPoints: [`Source file: ${file.name}`, `File size: ${(file.size / 1024).toFixed(1)} KB`, 'Indexed and ready for download']
          },
          math: {
            num: '2.0',
            title: 'Content & Formulas',
            readTime: '3 min',
            badge: 'Content',
            formula: fileText.substring(0, 300),
            proofTitle: 'Document Body',
            proofSteps: [fileText.substring(0, 500)]
          },
          code: {
            num: '3.0',
            title: 'Raw File Content',
            readTime: '2 min',
            badge: file.name.split('.').pop(),
            filename: file.name,
            codeText: fileText
          },
          guidelines: {
            num: '4.0',
            title: 'File Metadata',
            readTime: '1 min',
            badge: 'Details',
            tableHeaders: ['Property', 'Value', 'Status'],
            tableRows: [['Filename', file.name, 'Stored'], ['Size', `${(file.size / 1024).toFixed(1)} KB`, 'Available']]
          },
          pitfalls: {
            num: '5.0',
            title: 'Review Checklist',
            readTime: '1 min',
            badge: 'Checklist',
            pitfallsList: [{ title: 'Active Revision', detail: 'Review this material within 48 hours for optimal memory retention.' }]
          }
        },
        downloadFiles: {
          md: { filename: file.name.endsWith('.md') ? file.name : `${title}.md`, content: fileText },
          py: { filename: file.name.endsWith('.py') ? file.name : `${title}.py`, content: fileText },
          slides: { filename: `${title}_summary.txt`, content: fileText },
          cheatsheet: { filename: `${title}_cheatsheet.txt`, content: fileText }
        }
      };

      if (!AppState.customCourses) AppState.customCourses = {};
      AppState.customCourses[customId] = newCourse;
      if (window.CourseLecturesData) window.CourseLecturesData[customId] = newCourse;
      addCourseChipToUI(newCourse);
      switchLectureCourse(customId);
      showToast('Document Imported', `Successfully indexed ${file.name}`, 'success');
    };
    reader.readAsText(file);
  }
}

function addCourseChipToUI(course) {
  const chipsContainer = document.getElementById('course-selector-chips');
  if (!chipsContainer) return;
  const btn = document.createElement('button');
  btn.className = "course-chip flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-slate-300 hover:text-white text-[13px] font-medium transition-all whitespace-nowrap border border-white/5";
  btn.setAttribute('data-course-id', course.id);
  btn.onclick = () => switchLectureCourse(course.id);
  btn.innerHTML = `
    <span class="material-symbols-outlined text-[17px]">description</span>
    <span>${escapeHtml(course.code)}: ${escapeHtml(course.title.substring(0, 16))}</span>
  `;
  chipsContainer.appendChild(btn);
}

function escapeJsString(str) {
  if (!str) return '';
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}


/* ==========================================================================
   COMPUTATIONAL SANDBOX & CARTPOLE PHYSICS SIMULATOR
   ========================================================================== */
function initSandboxSimulator() {
  const runBtn = document.getElementById('run-code-btn');
  const runText = document.getElementById('run-text');
  const resetBtn = document.getElementById('reset-sim-btn');
  const pole = document.getElementById('sim-pole');
  const cart = document.getElementById('sim-cart');
  const stdout = document.getElementById('sim-stdout');
  const thetaVal = document.getElementById('sim-theta');
  const stabilityVal = document.getElementById('sim-stability');
  const stepVal = document.getElementById('sim-step');
  const rewardVal = document.getElementById('sim-reward');

  function logToConsole(text, type = 'info') {
    if (!stdout) return;
    const p = document.createElement('p');
    p.className = 'text-[12px] font-mono leading-relaxed';
    if (type === 'step') {
      p.innerHTML = `<span class="text-tertiary">[STEP ${AppState.sandbox.step}]</span> ${text}`;
    } else if (type === 'info') {
      p.innerHTML = `<span class="text-secondary">[INFO]</span> ${text}`;
    } else if (type === 'telemetry') {
      p.innerHTML = `<span class="text-primary">[CHECKPOINT]</span> ${text}`;
    }
    stdout.appendChild(p);
    stdout.scrollTop = stdout.scrollHeight;
  }

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      AppState.sandbox.isRunning = !AppState.sandbox.isRunning;

      if (AppState.sandbox.isRunning) {
        if (runText) runText.textContent = 'Pause Sim';
        runBtn.className = "flex items-center gap-space-xs px-space-md py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md transition-all shadow-[0_0_16px_rgba(192,193,255,0.25)]";
        logToConsole('Spawning CartPole-v1 Gym execution environment...', 'info');
        logToConsole('Loading PolicyNetwork weights into PyTorch A100 GPU tensor...', 'info');

        AppState.sandbox.interval = setInterval(() => {
          AppState.sandbox.step++;
          const angle = (Math.random() * 4 - 2).toFixed(3);
          const cartOffset = (Math.random() * 30 - 15).toFixed(0);
          const currentStability = (94.0 + Math.random() * 5.0).toFixed(1);
          AppState.sandbox.reward = Math.min(500, AppState.sandbox.reward + (Math.random() * 0.8));

          if (pole) pole.style.transform = `rotate(${angle * 4}deg)`;
          if (cart) cart.style.transform = `translateX(${cartOffset}px)`;
          if (thetaVal) thetaVal.textContent = `Theta: ${angle} rad`;
          if (stabilityVal) stabilityVal.textContent = `Cart Stability: ${currentStability}%`;
          if (stepVal) stepVal.textContent = `Step: ${AppState.sandbox.step} / 500`;
          if (rewardVal) rewardVal.textContent = `+${AppState.sandbox.reward.toFixed(1)}`;

          if (AppState.sandbox.step % 8 === 0) {
            logToConsole(`Reward: 1.000 | Mean score: ${AppState.sandbox.reward.toFixed(2)} | Policy Entropy: 0.118`, 'step');
          }
        }, 320);

        showToast('Model Executing', 'CartPole policy gradient optimization in progress', 'info');
      } else {
        if (runText) runText.textContent = 'Run Model';
        runBtn.className = "flex items-center gap-space-xs px-space-md py-1.5 rounded-xl bg-tertiary-container text-on-tertiary-container font-label-md text-label-md transition-all shadow-sm";
        clearInterval(AppState.sandbox.interval);
        logToConsole('Execution paused. State saved.', 'telemetry');
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearInterval(AppState.sandbox.interval);
      AppState.sandbox.isRunning = false;
      AppState.sandbox.step = 0;
      AppState.sandbox.reward = 12.0;

      if (runText) runText.textContent = 'Run Model';
      if (runBtn) {
        runBtn.className = "flex items-center gap-space-xs px-space-md py-1.5 rounded-xl bg-tertiary-container text-on-tertiary-container font-label-md text-label-md transition-all shadow-sm";
      }
      if (pole) pole.style.transform = 'rotate(0deg)';
      if (cart) cart.style.transform = 'translateX(0px)';
      if (thetaVal) thetaVal.textContent = 'Theta: 0.000 rad';
      if (stabilityVal) stabilityVal.textContent = 'Cart Stability: 100%';
      if (stepVal) stepVal.textContent = 'Step: 0 / 500';
      if (rewardVal) rewardVal.textContent = '+12.0';

      if (stdout) {
        stdout.innerHTML = `
          <div class="flex items-center justify-between text-outline pb-1 border-b border-surface-container">
            <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[14px]">terminal</span><span>Stdout Console</span></span>
            <span class="text-tertiary">Session Reset</span>
          </div>
          <p class="text-on-surface"><span class="text-secondary">[INFO]</span> Policy network environment re-initialized.</p>
        `;
      }
      showToast('Environment Reset', 'CartPole environment state zeroed', 'info');
    });
  }

  // Split Screen / Balanced View Toggle
  const toggleLayoutBtn = document.getElementById('toggle-layout');
  const lectureContainer = document.getElementById('lecture-split-left');
  const sandboxContainer = document.getElementById('sandbox-split-right');
  let isFullCode = false;

  if (toggleLayoutBtn && lectureContainer && sandboxContainer) {
    toggleLayoutBtn.addEventListener('click', () => {
      isFullCode = !isFullCode;
      if (isFullCode) {
        lectureContainer.className = 'hidden';
        sandboxContainer.className = 'lg:col-span-12 flex flex-col gap-space-lg';
        toggleLayoutBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">splitscreen</span><span>Restore Split</span>';
        showToast('Code Studio Focus', 'Expanded Computational Sandbox to 100% width', 'info');
      } else {
        lectureContainer.className = 'lg:col-span-6 flex flex-col gap-space-lg';
        sandboxContainer.className = 'lg:col-span-6 flex flex-col gap-space-lg';
        toggleLayoutBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">splitscreen</span><span>Balanced View</span>';
      }
    });
  }
}

/* ==========================================================================
   INTERACTIVE LAB NOTES
   ========================================================================== */
function initLabNotes() {
  const notesArea = document.getElementById('lab-notes-textarea');
  const bookmarkBtn = document.getElementById('btn-note-bookmark');
  const snippetBtn = document.getElementById('btn-note-snippet');
  const summarizeBtn = document.getElementById('btn-note-summarize');
  const noteStats = document.getElementById('note-stats');

  function updateNoteStats() {
    if (!notesArea || !noteStats) return;
    const words = notesArea.value.trim() ? notesArea.value.trim().split(/\s+/).length : 0;
    const bookmarks = (notesArea.value.match(/\[\d{2}:\d{2}\]/g) || []).length;
    noteStats.textContent = `Words: ${words} | Bookmarks: ${bookmarks}`;
    localStorage.setItem('smartedu_lab_notes', notesArea.value);
  }

  if (notesArea) {
    notesArea.addEventListener('input', updateNoteStats);
  }

  if (bookmarkBtn && notesArea) {
    bookmarkBtn.addEventListener('click', () => {
      const m = Math.floor(AppState.lecture.currentTime / 60).toString().padStart(2, '0');
      const s = Math.floor(AppState.lecture.currentTime % 60).toString().padStart(2, '0');
      const stamp = `\n[${m}:${s}] Keyframe bookmark: `;
      notesArea.value += stamp;
      notesArea.focus();
      updateNoteStats();
      showToast('Timestamp Stamped', `Added [${m}:${s}] to active notes`, 'info');
    });
  }

  if (snippetBtn && notesArea) {
    snippetBtn.addEventListener('click', () => {
      const snippet = '\n```python\n# Policy Gradient Loss formula\nloss = -(log_probs * advantages).mean()\n```\n';
      notesArea.value += snippet;
      notesArea.focus();
      updateNoteStats();
      showToast('Code Snippet Attached', 'Inserted PyTorch loss snippet', 'info');
    });
  }

  if (summarizeBtn && notesArea) {
    summarizeBtn.addEventListener('click', () => {
      const summary = '\n\n✨ AI Summary (Generated):\n• Markov Decision Process satisfied via memoryless conditional transition.\n• CartPole policy network trained using AdamW with lr=1e-3 and gamma=0.99.\n• Mean episode reward converging toward stable threshold (>490 pts).\n';
      notesArea.value += summary;
      updateNoteStats();
      showToast('Summary Generated', 'AI extracted key lecture takeaways', 'success');
    });
  }
}

function loadSavedNotes() {
  const notesArea = document.getElementById('lab-notes-textarea');
  if (notesArea) {
    const saved = localStorage.getItem('smartedu_lab_notes');
    if (saved) {
      notesArea.value = saved;
      const noteStats = document.getElementById('note-stats');
      if (noteStats) {
        const words = saved.trim().split(/\s+/).length;
        const bookmarks = (saved.match(/\[\d{2}:\d{2}\]/g) || []).length;
        noteStats.textContent = `Words: ${words} | Bookmarks: ${bookmarks}`;
      }
    }
  }
}

/* ==========================================================================
   INNOVATION PROJECT STUDIO KANBAN BOARD
   ========================================================================== */
function initKanban() {
  renderKanban();

  // Kanban Filter Buttons
  const filterBtns = document.querySelectorAll('[data-kanban-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.className = 'px-3 py-1 rounded-lg hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors';
      });
      btn.className = 'px-3 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md';
      AppState.kanbanFilter = btn.getAttribute('data-kanban-filter');
      renderKanban();
    });
  });

  // Chat message sender
  const chatInput = document.getElementById('studio-chat-input');
  const chatSend = document.getElementById('studio-chat-send');
  const chatFeed = document.getElementById('studio-chat-feed');

  function sendStudioMessage() {
    if (!chatInput || !chatFeed) return;
    const msg = chatInput.value.trim();
    if (!msg) return;

    const row = document.createElement('div');
    row.className = 'flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-high/60';
    row.innerHTML = `
      <img class="w-6 h-6 rounded-full object-cover ring-1 ring-primary mt-0.5" src="./close_up_portrait_headshot_of_a_friendly_college_student_in_modern_casual/screen.png" alt="Alex Chen">
      <div class="flex flex-col min-w-0 flex-1">
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md text-on-surface font-semibold">Alex Chen</span>
          <span class="font-label-code text-[10px] text-outline">Just now</span>
        </div>
        <p class="font-body-sm text-[12px] text-on-surface-variant mt-0.5">${escapeHtml(msg)}</p>
      </div>
    `;
    chatFeed.appendChild(row);
    chatInput.value = '';
    chatFeed.scrollTop = chatFeed.scrollHeight;
    showToast('Update Broadcast', 'Message posted to EcoPulse squad channel', 'info');
  }

  if (chatSend) chatSend.addEventListener('click', sendStudioMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendStudioMessage();
      }
    });
  }
}

function renderKanban() {
  const columns = ['col-ideation', 'col-prototyping', 'col-review', 'col-verified'];

  columns.forEach(colId => {
    const colEl = document.getElementById(colId);
    if (!colEl) return;

    // Filter tasks
    let filtered = AppState.tasks.filter(t => t.column === colId);
    if (AppState.kanbanFilter === 'my') {
      filtered = filtered.filter(t => t.category === 'my' || t.assignee === 'Alex Chen');
    } else if (AppState.kanbanFilter === 'risk') {
      filtered = filtered.filter(t => t.risk);
    }

    // Update count pill
    const countBadge = document.getElementById(`count-${colId}`);
    if (countBadge) countBadge.textContent = filtered.length;

    colEl.innerHTML = filtered.map(task => `
      <div class="kanban-card flex flex-col gap-space-sm p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high/80 transition-all shadow-sm cursor-grab border border-outline-variant/20" 
           draggable="true" 
           data-task-id="${task.id}"
           ondragstart="handleDragStart(event, '${task.id}')"
           onclick="openTaskDetails('${task.id}')">
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded-full bg-${task.tagColor}/15 text-${task.tagColor} font-label-md text-[11px] font-semibold">${task.tag}</span>
          <span class="font-label-code text-label-code text-outline">#${task.id}</span>
        </div>
        <h4 class="font-headline-sm text-[14px] text-on-surface leading-snug">${task.title}</h4>
        
        ${task.risk ? `
          <div class="flex items-start gap-space-xs p-2 rounded-lg bg-error-container/40 text-on-error-container">
            <span class="material-symbols-outlined text-[16px] text-error shrink-0">warning</span>
            <span class="font-body-sm text-[11px] leading-tight">
              <strong class="font-semibold text-error">AI Risk:</strong> ${task.riskText || 'Constraint risk identified.'}
            </span>
          </div>
        ` : `
          <p class="font-body-sm text-[12px] text-on-surface-variant line-clamp-2">${task.desc}</p>
        `}

        <div class="flex items-center justify-between pt-space-xs text-outline font-label-md text-[11px]">
          <div class="flex items-center gap-1 ${task.specsDone ? 'text-tertiary' : 'text-outline'}">
            <span class="material-symbols-outlined text-[15px]">${task.specsDone ? 'check_box' : 'check_box_outline_blank'}</span>
            <span>${task.specs}</span>
          </div>
          <div class="flex items-center gap-1">
            <button class="p-1 rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Move Left" onclick="event.stopPropagation(); moveTask('${task.id}', -1);">
              <span class="material-symbols-outlined text-[14px]">arrow_back</span>
            </button>
            <span class="font-label-code text-[11px] text-secondary">${task.assignee}</span>
            <button class="p-1 rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Move Right" onclick="event.stopPropagation(); moveTask('${task.id}', 1);">
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  });
}

// Drag & Drop
let draggedTaskId = null;
window.handleDragStart = function(e, taskId) {
  draggedTaskId = taskId;
  e.dataTransfer.setData('text/plain', taskId);
};

window.handleDragOver = function(e) {
  e.preventDefault();
};

window.handleDrop = function(e, targetColId) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
  const task = AppState.tasks.find(t => t.id === taskId);
  if (task && task.column !== targetColId) {
    task.column = targetColId;
    renderKanban();
    showToast('Task Relocated', `#${task.id} moved to ${getColName(targetColId)}`, 'success');
  }
};

window.moveTask = function(taskId, direction) {
  const cols = ['col-ideation', 'col-prototyping', 'col-review', 'col-verified'];
  const task = AppState.tasks.find(t => t.id === taskId);
  if (!task) return;
  const currentIdx = cols.indexOf(task.column);
  const nextIdx = currentIdx + direction;
  if (nextIdx >= 0 && nextIdx < cols.length) {
    task.column = cols[nextIdx];
    renderKanban();
    showToast('Task Shifted', `#${task.id} moved to ${getColName(task.column)}`, 'info');
  }
};

function getColName(colId) {
  const names = {
    'col-ideation': 'Ideation & Spec',
    'col-prototyping': 'In Prototyping',
    'col-review': 'Code Review',
    'col-verified': 'Verified & Deployed'
  };
  return names[colId] || colId;
}

/* ==========================================================================
   TASK DETAILS MODAL & NEW MILESTONE MODAL
   ========================================================================== */
window.openTaskDetails = function(taskId) {
  const task = AppState.tasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('modal-task-detail');
  const title = document.getElementById('task-modal-title');
  const tag = document.getElementById('task-modal-tag');
  const desc = document.getElementById('task-modal-desc');
  const subtasksList = document.getElementById('task-modal-subtasks');
  const riskBox = document.getElementById('task-modal-risk');

  if (title) title.textContent = task.title;
  if (tag) {
    tag.textContent = `#${task.id} • ${task.tag} • Assigned to ${task.assignee}`;
  }
  if (desc) desc.textContent = task.desc;

  if (riskBox) {
    if (task.risk) {
      riskBox.classList.remove('hidden');
      riskBox.innerHTML = `
        <span class="material-symbols-outlined text-[18px] text-error">warning</span>
        <div>
          <strong class="text-error font-semibold">AI Risk Diagnosis:</strong>
          <p class="text-[12px] text-on-error-container mt-0.5">${task.riskText}</p>
        </div>
      `;
    } else {
      riskBox.classList.add('hidden');
    }
  }

  if (subtasksList) {
    subtasksList.innerHTML = task.subtasks.map((st, idx) => `
      <label class="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high cursor-pointer transition-colors">
        <input type="checkbox" class="w-4 h-4 rounded text-tertiary focus:ring-tertiary bg-surface-container-lowest" ${st.done ? 'checked' : ''} onchange="toggleSubtask('${task.id}', ${idx}, this.checked)">
        <span class="font-body-sm text-[13px] ${st.done ? 'line-through text-outline' : 'text-on-surface'}">${st.text}</span>
      </label>
    `).join('');
  }

  openModal('modal-task-detail');
};

window.toggleSubtask = function(taskId, idx, isChecked) {
  const task = AppState.tasks.find(t => t.id === taskId);
  if (task && task.subtasks[idx]) {
    task.subtasks[idx].done = isChecked;
    const completed = task.subtasks.filter(s => s.done).length;
    task.specs = `${completed}/${task.subtasks.length} specs`;
    task.specsDone = completed === task.subtasks.length;
    renderKanban();
  }
};

window.openNewTaskModal = function() {
  openModal('modal-new-task');
};

window.createNewTask = function() {
  const title = document.getElementById('new-task-title')?.value.trim();
  const desc = document.getElementById('new-task-desc')?.value.trim();
  const col = document.getElementById('new-task-col')?.value || 'col-ideation';
  const tag = document.getElementById('new-task-tag')?.value || 'General';

  if (!title) {
    showToast('Missing Field', 'Please provide a milestone title', 'error');
    return;
  }

  const newId = `EP-${Math.floor(110 + Math.random() * 80)}`;
  AppState.tasks.unshift({
    id: newId,
    column: col,
    title: title,
    desc: desc || 'Sprint engineering milestone.',
    tag: tag,
    tagColor: 'primary',
    specs: '0/2 specs',
    specsDone: false,
    category: 'my',
    risk: false,
    assignee: 'Alex Chen',
    subtasks: [
      { text: 'Draft specification & architecture', done: false },
      { text: 'Run benchmark unit tests', done: false }
    ]
  });

  renderKanban();
  closeModal('modal-new-task');
  showToast('Milestone Added', `Created #${newId}: ${title}`, 'success');
};

/* ==========================================================================
   SKILL MATRIX & ANALYTICS INTERACTION
   ========================================================================== */
function initAnalyticsInteractions() {
  // Hexagon Radar vertex interactions
  const vertices = [
    { name: 'Algorithm Design', score: '95%', percentile: 'Top 1%' },
    { name: 'Deep Learning', score: '92%', percentile: 'Top 3%' },
    { name: 'Distributed Systems', score: '78%', percentile: 'Top 12%' },
    { name: 'Hardware Synthesis', score: '82%', percentile: 'Top 8%' },
    { name: 'Ethical AI', score: '74%', percentile: 'Top 15%' },
    { name: 'Product Innovation', score: '88%', percentile: 'Top 5%' }
  ];

  window.inspectRadarVertex = function(index) {
    const v = vertices[index];
    if (v) {
      showToast(v.name, `Mastery Score: ${v.score} (${v.percentile} Cohort)`, 'info');
    }
  };

  // Badge Showcase Modal
  window.openBadgeModal = function(badgeName, tier, date) {
    const modal = document.getElementById('modal-badge-showcase');
    const bTitle = document.getElementById('badge-modal-title');
    const bTier = document.getElementById('badge-modal-tier');
    const bDate = document.getElementById('badge-modal-date');
    const bHash = document.getElementById('badge-modal-hash');

    if (bTitle) bTitle.textContent = badgeName;
    if (bTier) bTier.textContent = tier;
    if (bDate) bDate.textContent = date || 'Issued September 2026';
    if (bHash) bHash.textContent = `0x${Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('')}`;

    openModal('modal-badge-showcase');
  };

  // Peer Arena Battle
  window.launchArenaBattle = function() {
    openModal('modal-arena-battle');
  };

  // Remediation Lab
  window.launchRemediationLab = function() {
    openModal('modal-remediation-lab');
  };

  // Deploy Sandbox Pod
  window.deploySandboxPod = function() {
    showToast('Provisioning Pod...', 'Initializing KubeFlow GPU slice node...', 'info');
    setTimeout(() => {
      showToast('Pod Online', 'Container pod-opt-992 active on port 8080 (38ms latency)', 'success');
    }, 1500);
  };

  // Export Verified Dossier
  window.exportVerifiedDossier = function() {
    openModal('modal-dossier-report');
  };
}

/* ==========================================================================
   FOCUS SPRINT (POMODORO) & SPACED FLASHCARDS
   ========================================================================== */
function initModals() {
  // Sprint Modal actions
  const sprintStartBtn = document.getElementById('sprint-start-btn');
  const sprintResetBtn = document.getElementById('sprint-reset-btn');
  const sprintDisplay = document.getElementById('sprint-display');

  function updateSprintDisplay() {
    if (!sprintDisplay) return;
    const m = Math.floor(AppState.sprintSecondsRemaining / 60).toString().padStart(2, '0');
    const s = Math.floor(AppState.sprintSecondsRemaining % 60).toString().padStart(2, '0');
    sprintDisplay.textContent = `${m}:${s}`;
  }

  if (sprintStartBtn) {
    sprintStartBtn.addEventListener('click', () => {
      AppState.sprintRunning = !AppState.sprintRunning;
      if (AppState.sprintRunning) {
        sprintStartBtn.textContent = 'Pause Sprint';
        sprintStartBtn.className = 'px-6 py-2.5 rounded-xl bg-error text-on-error font-label-lg transition-all';
        AppState.sprintTimer = setInterval(() => {
          if (AppState.sprintSecondsRemaining > 0) {
            AppState.sprintSecondsRemaining--;
            updateSprintDisplay();
          } else {
            clearInterval(AppState.sprintTimer);
            AppState.sprintRunning = false;
            sprintStartBtn.textContent = 'Start Sprint';
            sprintStartBtn.className = 'px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg transition-all';
            showToast('Sprint Complete!', '25 minutes of deep focus logged. +120 Innovation XP!', 'success');
          }
        }, 1000);
      } else {
        sprintStartBtn.textContent = 'Resume Sprint';
        sprintStartBtn.className = 'px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg transition-all';
        clearInterval(AppState.sprintTimer);
      }
    });
  }

  if (sprintResetBtn) {
    sprintResetBtn.addEventListener('click', () => {
      clearInterval(AppState.sprintTimer);
      AppState.sprintRunning = false;
      AppState.sprintSecondsRemaining = 25 * 60;
      updateSprintDisplay();
      if (sprintStartBtn) {
        sprintStartBtn.textContent = 'Start Sprint';
        sprintStartBtn.className = 'px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg transition-all';
      }
    });
  }

  // Flashcards Review Modal
  window.openFlashcardModal = function() {
    AppState.currentCardIdx = 0;
    renderFlashcard();
    openModal('modal-flashcards');
  };

  window.renderFlashcard = function() {
    const card = AppState.flashcards[AppState.currentCardIdx];
    const qEl = document.getElementById('flashcard-question');
    const aEl = document.getElementById('flashcard-answer');
    const progEl = document.getElementById('flashcard-progress');
    const revealBtn = document.getElementById('flashcard-reveal-btn');
    const scoreBtns = document.getElementById('flashcard-score-btns');

    if (qEl) qEl.textContent = card.q;
    if (aEl) {
      aEl.textContent = card.a;
      aEl.classList.add('hidden');
    }
    if (progEl) progEl.textContent = `Card ${AppState.currentCardIdx + 1} of ${AppState.flashcards.length}`;
    if (revealBtn) revealBtn.classList.remove('hidden');
    if (scoreBtns) scoreBtns.classList.add('hidden');
  };

  window.revealCardAnswer = function() {
    const aEl = document.getElementById('flashcard-answer');
    const revealBtn = document.getElementById('flashcard-reveal-btn');
    const scoreBtns = document.getElementById('flashcard-score-btns');
    if (aEl) aEl.classList.remove('hidden');
    if (revealBtn) revealBtn.classList.add('hidden');
    if (scoreBtns) scoreBtns.classList.remove('hidden');
  };

  window.rateCardScore = function(quality) {
    showToast('Retention Updated', `Interval adjusted via Anki-FSRS v4 (Score: ${quality})`, 'info');
    if (AppState.currentCardIdx < AppState.flashcards.length - 1) {
      AppState.currentCardIdx++;
      renderFlashcard();
    } else {
      closeModal('modal-flashcards');
      showToast('Session Finished', 'All scheduled spaced cards reviewed! Recall stability maintained at 98%.', 'success');
    }
  };

  // Breathing Micro-Break
  window.startBreathingBreak = function() {
    openModal('modal-breathing');
  };
}

/* ==========================================================================
   THEME, STORAGE & SETTINGS
   ========================================================================== */
function initThemeToggles() {
  const themeToggle = document.getElementById('theme-toggle-btn');
  let isNight = true;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      isNight = !isNight;
      const text = themeToggle.querySelector('span:last-child');
      const icon = themeToggle.querySelector('span:first-child');
      if (isNight) {
        if (text) text.textContent = 'Night';
        if (icon) icon.textContent = 'dark_mode';
        document.documentElement.classList.add('dark');
        showToast('Night Theme', 'Obsidian Lumina dark theme active', 'info');
      } else {
        if (text) text.textContent = 'Deep Slate';
        if (icon) icon.textContent = 'light_mode';
        showToast('Deep Slate Ambient', 'High-contrast astral glow mode active', 'info');
      }
    });
  }
}

/* ==========================================================================
   MODAL UTILITIES & TOAST NOTIFICATIONS
   ========================================================================== */
window.openModal = function(modalId) {
  const el = document.getElementById(modalId);
  if (el) {
    el.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = function(modalId) {
  const el = document.getElementById(modalId);
  if (el) {
    el.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

window.closeAllModals = function() {
  document.querySelectorAll('.app-modal').forEach(m => m.classList.add('hidden'));
  document.body.style.overflow = '';
};

window.showToast = function(title, message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    info: 'info',
    success: 'check_circle',
    error: 'error',
    warning: 'warning'
  };

  const colors = {
    info: 'border-secondary text-secondary',
    success: 'border-tertiary text-tertiary',
    error: 'border-error text-error',
    warning: 'border-primary text-primary'
  };

  const toast = document.createElement('div');
  toast.className = `flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-high/95 backdrop-blur-md shadow-2xl border-l-4 ${colors[type]} transform translate-y-2 opacity-0 transition-all duration-300 max-w-sm pointer-events-auto`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] shrink-0 mt-0.5">${icons[type]}</span>
    <div class="flex flex-col min-w-0 flex-1">
      <span class="font-headline-sm text-[13px] text-on-surface font-semibold leading-tight">${escapeHtml(title)}</span>
      <span class="font-body-sm text-[12px] text-on-surface-variant leading-snug mt-0.5">${escapeHtml(message)}</span>
    </div>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
