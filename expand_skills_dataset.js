const fs = require('fs');
const path = require('path');

const technologies = [
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

console.log('Defined technologies count:', technologies.length);
