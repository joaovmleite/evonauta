// Este script copia os arquivos JSON de /data para /public/data para acesso via fetch no React
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../data');
const destDir = path.join(__dirname, '../public/data');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(srcDir).forEach(file => {
  if (file.endsWith('.json')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }
});

console.log('Arquivos JSON copiados para public/data.');
