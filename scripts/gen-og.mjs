import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

// Inline tool list to avoid TS import issues in plain node
const tools = JSON.parse(fs.readFileSync('./src/data/tools.json', 'utf8'));

const outDir = './public/og';
fs.mkdirSync(outDir, { recursive: true });

for (const tool of tools) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1200, 630);
  ctx.fillStyle = '#FFDD00';
  ctx.fillRect(0, 560, 1200, 12);
  ctx.fillStyle = '#FFDD00';
  ctx.beginPath();
  ctx.arc(140, 200, 80, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 70px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(tool.icon || 'A1', 140, 205);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.font = 'bold 72px sans-serif';
  ctx.fillText(tool.title.slice(0, 22), 260, 180);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '32px sans-serif';
  const words = tool.description.split(' ');
  let line = '', y = 280;
  for (const w of words) {
    if (ctx.measureText(line + w).width > 820) { ctx.fillText(line, 260, y); y += 44; line = ''; }
    line += w + ' ';
  }
  ctx.fillText(line, 260, y);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('All-in-One Helper', 260, 500);
  ctx.fillStyle = '#FFDD00';
  ctx.font = '24px sans-serif';
  ctx.fillText('Free - Private - No upload', 260, 540);

  fs.writeFileSync(path.join(outDir, `${tool.slug}.png`), canvas.toBuffer('image/png'));
}
console.log(`generated ${tools.length} OG images`);
