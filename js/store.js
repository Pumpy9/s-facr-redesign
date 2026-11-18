/* === MODEL: Správa dat a pravidel aplikace (js/store.js) === */

// Přečteme si ID zápasu z URL. Pokud tam není, načteme rovnou jarní zápas "1003" (Prusinovice vs Rymice B)
const urlParams = new URLSearchParams(window.location.search);
const currentMatchId = urlParams.get('id') || '1003';

const STORAGE_KEY = 'facr-zapis-v1-' + currentMatchId;
const currentRole = localStorage.getItem('facr-role') || 'club';

const TYPE_LABEL = { goal: 'Gól', yellow: 'Žlutá karta', red: 'Červená karta', sub: 'Střídání' };
const PHASES = ['Před zápasem', '1. poločas', '2. poločas', 'Kontrola', 'Uzavření'];
const NEXT_LABEL = ['Zahájit zápis', 'Ukončit 1. poločas', 'Přejít ke kontrole', 'Uzavřít zápis', null];
const $ = (id) => document.getElementById(id);

function seed() {
  // 1. Najdeme zápas v naší "databázi"
  const dbMatch = getMatch(currentMatchId);
  if (!dbMatch) {
    alert('Chyba: Zápas nebyl v databázi nalezen!');
    return null;
  }

  // 2. Najdeme oba kluby z tohoto zápasu
  const homeClub = getClub(dbMatch.homeId);
  const awayClub = getClub(dbMatch.awayId);

  // 3. Vytáhneme hráče klubů a připravíme strukturu soupisky
  const prepareRoster = (clubId) => {
    const players = getPlayersByClub(clubId);
    return players.map((p, index) => ({
      id: p.id,
      name: p.name,
      number: p.number,
      // Pro účely prototypu předvyplníme prvních 11 hráčů jako základ, aby se nemusela dělat celá sestava ručně od nuly
      isStarter: index < 11, 
      isGK: index === 0,
      isCapt: index === 9
    }));
  };

  return {
    matchId: currentMatchId,
    phase: 0, 
    lineupsConfirmed: { home: false, away: false },
    rewards: { fee: '', travel: '' },
    refereeReport: '',
    nextId: 1,
    teams: {
      home: { 
        name: homeClub.name, 
        roster: prepareRoster(homeClub.id),
        staff: { manager: homeClub.manager || '', coach: '', doctor: '' }
      },
      away: { 
        name: awayClub.name, 
        roster: prepareRoster(awayClub.id),
        staff: { manager: awayClub.manager || '', coach: '', doctor: '' }
      }
    },
    // Pokud už v db.js jsou u zápasu nějaké události (např. dohraný zápas), načteme je, jinak prázdné pole
    events: dbMatch.events ? [...dbMatch.events] : []
  };
}

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (s && s.teams && s.matchId === currentMatchId) return s;
  } catch (e) {}
  return seed();
}

let state = load();

/* --- Přístupová pravidla --- */
const canEditLineups = () => state.phase === 0;
const canEditEvents = () => currentRole === 'referee' && state.phase >= 1 && state.phase <= 3;

/* --- Pomocné funkce --- */
function score(events, maxMinute) {
  const r = { home: 0, away: 0 };
  for (const e of events) {
    if (e.type !== 'goal' || e.minute > maxMinute) continue;
    const scorer = e.goalKind === 'own' ? (e.team === 'home' ? 'away' : 'home') : e.team;
    r[scorer] += 1;
  }
  return r;
}

function getPlayerName(teamKey, num) {
  const p = state.teams[teamKey].roster.find(x => x.number === num);
  return p ? `#${num} ${p.name}` : `#${num} Neznámý`;
}

function validate(s) {
  const checks = [{ ok: s.lineupsConfirmed.home && s.lineupsConfirmed.away, label: 'Sestavy potvrzeny oběma kluby' }];
  const hmManager = s.teams.home.staff.manager.trim() !== '';
  const awManager = s.teams.away.staff.manager.trim() !== '';
  checks.push({ ok: hmManager && awManager, label: 'Vyplněn vedoucí u obou mužstev' });
  const bad = [];
  for (const team of ['home', 'away']) {
    const yellows = {}; const reds = new Set();
    for (const e of s.events) {
      if (e.team !== team) continue;
      if (e.type === 'yellow') yellows[e.playerNum] = (yellows[e.playerNum] || 0) + 1;
      if (e.type === 'red') reds.add(e.playerNum);
    }
    for (const [n, c] of Object.entries(yellows)) {
      if (c >= 2 && !reds.has(Number(n))) bad.push(getPlayerName(team, Number(n)));
    }
  }
  checks.push({ ok: bad.length === 0, label: 'Druhá žlutá karta má červenou', detail: bad.join(', ') });
  if(currentRole === 'referee') checks.push({ ok: s.rewards.fee !== '' && s.rewards.travel !== '', label: 'Odměny rozhodčích uloženy' });
  return checks;
}

function h(tag, props, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, v);
  }
  for (const c of children.flat()) if (c != null && c !== false) el.append(c);
  return el;
}