const fs = require("fs");
const lines = fs.readFileSync("index.html", "utf8").split(/\r?\n/);
console.log("Total lines:", lines.length);

const markers = [
  "smartlearn-preloader",
  "ambient-cursor-glow",
  "public-landing-view",
  "student-app-layout",
  "teacher-app-layout",
  "modal-edit-profile",
  "modal-student-onboarding",
  "modal-auth-login",
  "modal-auth-register",
  "modal-auth-forgot",
  "modal-quiz-runner",
  "modal-quiz-result",
  "modal-material-reader",
  "modal-video-player",
  "modal-course-detail",
  "modal-create-course",
  "copilot-drawer",
  "floating-ai-chatbot-btn",
  "toast-container"
];

for (const m of markers) {
  const idx = lines.findIndex(l => l.includes(`id="${m}"`));
  console.log(m, "at line", idx + 1);
}
