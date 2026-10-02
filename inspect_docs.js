const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'skills_w3_data.js');

// Mock window
global.window = {};
global.localStorage = {
  getItem: () => '[]',
  setItem: () => {}
};

require(targetPath);

const existingData = global.window.SmartLearnSkillsDocs;
console.log('Existing technologies:', existingData.technologies.map(t => t.id));
console.log('Existing docs keys:', Object.keys(existingData.docs));
console.log('HTML topics:', existingData.docs.html.length);
console.log('CSS topics:', existingData.docs.css.length);
console.log('JS topics:', existingData.docs.javascript.length);
