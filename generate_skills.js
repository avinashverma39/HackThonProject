const fs = require('fs');
const path = require('path');

// Mock window and localStorage
global.window = {};
global.localStorage = {
  getItem: () => '[]',
  setItem: () => {}
};

require('./skills_w3_data.js');
const existingData = global.window.SmartLearnSkillsDocs;

const allTechnologies = [
  { id: 'html', name: 'HTML', color: '#f97316', label: 'Web Markup' },
  { id: 'css', name: 'CSS', color: '#38bdf8', label: 'Styling & Grid' },
  { id: 'javascript', name: 'JAVASCRIPT', color: '#facc15', label: 'Core Engine' },
  { id: 'sql', name: 'SQL', color: '#ec4899', label: 'Relational Queries' },
  { id: 'python', name: 'PYTHON', color: '#3b82f6', label: 'Backend & Data' },
  { id: 'java', name: 'JAVA', color: '#ef4444', label: 'JVM & OOP' },
  { id: 'php', name: 'PHP', color: '#8b5cf6', label: 'Server-Side Web' },
  { id: 'c', name: 'C', color: '#06b6d4', label: 'Systems & Memory' },
  { id: 'cpp', name: 'C++', color: '#0ea5e9', label: 'High Performance' },
  { id: 'csharp', name: 'C#', color: '#10b981', label: '.NET Enterprise' },
  { id: 'aws', name: 'AWS', color: '#f59e0b', label: 'Cloud Infrastructure' },
  { id: 'w3css', name: 'W3.CSS', color: '#14b8a6', label: 'CSS Framework' },
  { id: 'howto', name: 'HOW TO', color: '#a855f7', label: 'Code Snippets' },
  { id: 'bootstrap', name: 'BOOTSTRAP', color: '#7c3aed', label: 'Responsive UI' },
  { id: 'react', name: 'REACT', color: '#00d8ff', label: 'Frontend Components' },
  { id: 'mysql', name: 'MYSQL', color: '#0284c7', label: 'RDBMS Engine' },
  { id: 'jquery', name: 'JQUERY', color: '#0769ad', label: 'DOM Library' },
  { id: 'excel', name: 'EXCEL', color: '#16a34a', label: 'Spreadsheets & Data' },
  { id: 'xml', name: 'XML', color: '#f43f5e', label: 'Data Exchange' },
  { id: 'django', name: 'DJANGO', color: '#059669', label: 'Python Web Framework' }
];

// Load extraDocs from build_full_w3_data.js
delete require.cache[require.resolve('./build_full_w3_data.js')];
const extraContent = fs.readFileSync('./build_full_w3_data.js', 'utf8');

// Evaluate extraDocs
let extraDocs = {};
const extraDocsFn = new Function('const fs = require("fs"); const path = require("path"); ' + extraContent + '; return extraDocs;');
extraDocs = extraDocsFn();

const mergedDocs = {
  html: existingData.docs.html || [],
  css: existingData.docs.css || [],
  javascript: existingData.docs.javascript || [],
  sql: extraDocs.sql || [],
  python: extraDocs.python || [],
  java: extraDocs.java || [],
  php: extraDocs.php || [],
  c: extraDocs.c || [],
  cpp: extraDocs.cpp || [],
  csharp: extraDocs.csharp || [],
  aws: extraDocs.aws || [],
  w3css: extraDocs.w3css || [],
  howto: extraDocs.howto || [],
  bootstrap: extraDocs.bootstrap || [],
  react: extraDocs.react || [],
  mysql: extraDocs.mysql || [],
  jquery: extraDocs.jquery || [],
  excel: extraDocs.excel || [],
  xml: extraDocs.xml || [],
  django: extraDocs.django || []
};

const output = `/**
 * SmartLearn — W3Schools-Style Technical Concepts & Notes Architecture
 * Project: SmartLearn | SIH 2026 | Theme: Smart Education
 *
 * Full 20-Skill Technical Documentation Library:
 * HTML, CSS, JAVASCRIPT, SQL, PYTHON, JAVA, PHP, C, C++, C#,
 * AWS, W3.CSS, HOW TO, BOOTSTRAP, REACT, MYSQL, JQUERY, EXCEL, XML, DJANGO
 */

window.SmartLearnSkillsDocs = {
  currentTech: 'html',
  currentConceptId: 'html-study-plan',
  completedConcepts: JSON.parse(localStorage.getItem('smartlearn_completed_concepts') || '[]'),

  technologies: ${JSON.stringify(allTechnologies, null, 2)},

  docs: ${JSON.stringify(mergedDocs, null, 2)}
};
`;

fs.writeFileSync('./skills_w3_data.js', output, 'utf8');
console.log('Successfully wrote expanded skills_w3_data.js!');
console.log('Total technologies:', allTechnologies.length);
let totalConcepts = 0;
for (const [k, v] of Object.entries(mergedDocs)) {
  console.log('  ' + k + ': ' + v.length + ' topics');
  totalConcepts += v.length;
}
console.log('Total topics across all 20 skills:', totalConcepts);
