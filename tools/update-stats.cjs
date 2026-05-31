#!/usr/bin/env node
/* Ayaansh stats updater (on-demand).
 * 1. Reads data/football-data.csv  (a CSV export of the "Football Data" sheet).
 * 2. Recomputes KPIs.
 * 3. Safely swaps the previously-published goal/match/win-rate tokens in index.html
 *    (they carry distinctive "+"/"%" suffixes) using data/stats.json as the record.
 * 4. Prints awards / MOTM / tournaments for you to eyeball (bare numbers => manual).
 *
 * Refresh flow:  re-export the sheet to data/football-data.csv  ->  node tools/update-stats.cjs
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const rows = fs.readFileSync(path.join(ROOT, 'data/football-data.csv'), 'utf8')
  .trim().split('\n').slice(1).map(l => l.split(','));

let matches=0, goals=0, wins=0, losses=0, draws=0, motm=0, awards=0;
const tournaments = new Set();
for (const r of rows) {
  const t=(r[2]||'').trim(); const g=parseInt((r[8]||'').trim(),10);
  const res=(r[9]||'').trim().toLowerCase(); const aw=(r[10]||'').trim();
  if (t) tournaments.add(t);
  if (!isNaN(g)) goals+=g;
  if (/^win|^won/.test(res)){wins++;matches++;}
  else if (/^los/.test(res)){losses++;matches++;}
  else if (/^draw/.test(res)){draws++;matches++;}
  if (/[a-z]/i.test(aw) && !/^(none|yet to fill)$/i.test(aw)){awards++; if(/man of the match/i.test(aw)) motm++;}
}
const winRate = Math.round(wins/matches*100);
const next = { goals:`${goals}+`, matches:`${matches}+`, winrate:`${winRate}%`, awards, motm, tournaments:tournaments.size, wins, losses, draws };
console.log('Computed:', JSON.stringify(next,null,2));

const statsPath = path.join(ROOT,'data/stats.json');
const prev = fs.existsSync(statsPath) ? JSON.parse(fs.readFileSync(statsPath,'utf8')) : null;
if (!prev) { console.log('No data/stats.json yet — creating baseline only (no HTML changes).'); }
else if (!process.argv.includes('--dry')) {
  const idx = path.join(ROOT,'index.html');
  let html = fs.readFileSync(idx,'utf8'); let n=0;
  for (const k of ['goals','matches','winrate']) {
    if (prev[k] && prev[k]!==next[k]) { const before=html; html=html.split(prev[k]).join(next[k]); if(html!==before) n++; }
  }
  fs.writeFileSync(idx, html);
  console.log(`Updated index.html token groups: ${n} (goals/matches/winrate).`);
  if (prev.awards!==awards || prev.motm!==motm)
    console.log(`NOTE: awards ${prev.awards}->${awards}, MOTM ${prev.motm}->${motm}. These are bare numbers — update by hand if shown on the page.`);
}
if (!process.argv.includes('--dry')) fs.writeFileSync(statsPath, JSON.stringify(next,null,2)+'\n');
