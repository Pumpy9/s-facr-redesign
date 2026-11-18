/* === VIEW/CONTROLLER: Rozhraní zápisu a události (js/match.js) === */

// Globální oprava pro Windows/Chrome - zabrání problikávání kurzoru
document.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
});

let draggedItem = null;

function renderLineups() {
  $('lineups').replaceChildren(...['home', 'away'].map(teamKey => {
    const team = state.teams[teamKey];
    const sortedRoster = [...team.roster].sort((a, b) => a.number - b.number);
    const starters = sortedRoster.filter(p => p.isStarter);
    const subs = sortedRoster.filter(p => !p.isStarter);
    const ed = canEditLineups();
    
    const renderPlayer = (p) => {
      let roleStr = '';
      if(p.isGK && p.isCapt) roleStr = ' (B, K)';
      else if(p.isGK) roleStr = ' (B)';
      else if(p.isCapt) roleStr = ' (K)';

      return h('li', { 
        class: 'player-row',
        'data-id': String(p.id),
        style: ed ? 'cursor: grab; user-select: none;' : '',
        draggable: ed ? 'true' : null,
        ondragstart: ed ? (e) => {
          draggedItem = { id: p.id, teamKey };
          if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', String(p.id));
          }
          setTimeout(() => e.target.style.opacity = '0.3', 0);
        } : null,
        ondragend: ed ? (e) => {
          e.target.style.opacity = '1';
          draggedItem = null;
        } : null,
        ondragenter: ed ? (e) => e.preventDefault() : null,
        ondragover: ed ? (e) => {
          e.preventDefault();
          if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
        } : null
      }, 
        h('span', { class: 'p-num' }, p.number),
        h('span', { class: 'p-name' }, p.name, roleStr ? h('strong', { style: 'color: var(--primary);' }, roleStr) : null)
      );
    };

    const createDropZone = (players, isStarterList) => {
      return h('ul', { 
        class: 'lineup-list',
        style: ed ? 'min-height: 48px; padding: 4px; border: 2px dashed transparent; border-radius: 8px; transition: all 0.2s;' : '',
        ondragenter: ed ? (e) => {
          e.preventDefault();
          if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
        } : null,
        ondragover: ed ? (e) => { 
          e.preventDefault(); 
          if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
          e.currentTarget.style.borderColor = 'var(--primary)'; 
          e.currentTarget.style.background = 'rgba(74, 99, 214, 0.05)'; 
        } : null,
        ondragleave: ed ? (e) => { 
          e.currentTarget.style.borderColor = 'transparent'; 
          e.currentTarget.style.background = 'transparent'; 
        } : null,
        ondrop: ed ? (e) => {
          e.preventDefault();
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.background = 'transparent';
          
          if (!draggedItem || draggedItem.teamKey !== teamKey) return;
          const draggedPlayer = team.roster.find(x => x.id === draggedItem.id);
          if (!draggedPlayer) return;

          const targetRow = e.target.closest('.player-row');
          if (targetRow) {
            const targetId = Number(targetRow.getAttribute('data-id'));
            const targetPlayer = team.roster.find(x => x.id === targetId);
            if (targetPlayer && targetPlayer.id !== draggedPlayer.id) {
              const tempStarter = draggedPlayer.isStarter;
              draggedPlayer.isStarter = targetPlayer.isStarter;
              targetPlayer.isStarter = tempStarter;
              state.lineupsConfirmed[teamKey] = false; 
              render();
              return; 
            }
          }
          
          if (draggedPlayer.isStarter !== isStarterList) {
            if (isStarterList && starters.length >= 11) {
              alert('Chyba: V základní sestavě může být maximálně 11 hráčů!');
              return;
            }
            draggedPlayer.isStarter = isStarterList;
            state.lineupsConfirmed[teamKey] = false; 
            render();
          }
        } : null
      }, ...players.map(renderPlayer));
    };

    return h('div', { class: 'lineup-col' },
      h('div', { style: 'display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid var(--line); padding-bottom: 8px; margin-bottom: 12px;' },
        h('h3', { style: 'margin:0; border:none; padding:0;' }, team.name),
        h('button', { type: 'button', class: 'btn outline small', disabled: !ed, onclick: () => openRosterDialog(teamKey) }, 'Správa sestavy')
      ),
      h('h4', { class: 'roster-title' }, 'Základní sestava'),
      createDropZone(starters, true),
      h('h4', { class: 'roster-title' }, 'Náhradníci'),
      createDropZone(subs, false),
      h('div', { style: 'margin-top: 24px; padding-top: 16px; border-top: 2px solid var(--line);' },
        h('h4', { class: 'roster-title' }, 'Realizační tým'),
        h('label', { class: 'staff-label' }, 'Vedoucí mužstva (Povinné)', h('input', { type: 'text', value: team.staff.manager, disabled: !ed, onchange: (e) => { team.staff.manager = e.target.value; state.lineupsConfirmed[teamKey] = false; render(); } })),
        h('label', { class: 'staff-label' }, 'Trenér', h('input', { type: 'text', value: team.staff.coach, disabled: !ed, onchange: (e) => { team.staff.coach = e.target.value; state.lineupsConfirmed[teamKey] = false; render(); } })),
        h('label', { class: 'staff-label' }, 'Lékař / Masér', h('input', { type: 'text', value: team.staff.doctor, disabled: !ed, onchange: (e) => { team.staff.doctor = e.target.value; state.lineupsConfirmed[teamKey] = false; render(); } }))
      ),
      h('label', { class: 'lineup-confirm', style: 'margin-top: 16px;' }, h('input', { type: 'checkbox', disabled: !ed, checked: state.lineupsConfirmed[teamKey], onchange: (e) => { state.lineupsConfirmed[teamKey] = e.target.checked; render(); }}), 'Sestava a realizační tým potvrzeny')
    );
  }));
}

function renderStepper() {
  $('stepper').replaceChildren(...PHASES.map((name, i) => {
    const done = i < state.phase || state.phase === 4;
    const current = i === state.phase && state.phase < 4;
    return h('li', { class: done ? 'done' : current ? 'current' : '', 'aria-current': current ? 'step' : null }, h('span', { class: 'dot', 'aria-hidden': 'true' }, done ? '✓' : String(i + 1)), name);
  }));
}

function playerRow(teamKey, num, mark) {
  const p = state.teams[teamKey].roster.find((x) => x.number === num);
  return h('p', { class: 'tl-row' },
    mark ? [h('span', { class: 'tl-arrow ' + mark.cls, 'aria-hidden': 'true' }, mark.sym), h('span', { class: 'sr-only' }, mark.label + ': ')] : null,
    h('span', { class: 'jersey' }, String(num)),
    h('span', { class: 'tl-name' }, p ? p.name : 'Neznámý hráč'));
}

function eventItem(e, ed) {
  const sub = e.type === 'sub';
  const detail = e.goalKind === 'penalty' ? 'pokutový kop' : e.goalKind === 'own' ? 'vlastní branka' : '';
  return h('li', { class: 'tl-item ' + e.team },
    h('span', { class: 'tl-min' }, e.minute + '\u2032'),
    h('div', { class: 'tl-ev' },
      h('p', { class: 'tl-team' }, state.teams[e.team].name),
      h('p', { class: 'tl-row' }, sub ? null : h('span', { class: 'tl-ico ' + e.type, 'aria-hidden': 'true' }), h('strong', {}, TYPE_LABEL[e.type]), detail ? h('span', { class: 'tl-note' }, detail) : null),
      sub ? [playerRow(e.team, e.playerNum, { sym: '\u2193', cls: 'out', label: 'Odchází' }), playerRow(e.team, e.playerInNum, { sym: '\u2191', cls: 'in', label: 'Nastupuje' })] : playerRow(e.team, e.playerNum),
      ed ? h('div', { class: 'tl-actions' },
        h('button', { type: 'button', class: 'btn outline small', onclick: () => openEventDialog(e) }, 'Upravit'),
        h('button', { type: 'button', class: 'btn outline small', onclick: () => removeEvent(e) }, 'Odebrat')) : null));
}

function renderEvents() {
  const list = [...state.events].sort((a, b) => a.minute - b.minute || a.id - b.id);
  const ed = canEditEvents();
  const items = [];
  if (list.length) {
    const half = score(state.events, 45);
    let halfDone = !(state.phase >= 2 || list.some((e) => e.minute > 45));
    const halfLine = () => { items.push(h('li', { class: 'tl-half' }, h('span', {}, 'Poločas ' + half.home + ' : ' + half.away))); halfDone = true; };
    for (const e of list) { if (!halfDone && e.minute > 45) halfLine(); items.push(eventItem(e, ed)); }
    if (!halfDone) halfLine();
  } else items.push(h('li', { class: 'empty' }, currentRole === 'club' ? 'Průběh utkání zadává rozhodčí.' : 'Zatím nejsou zapsány žádné události.'));
  $('events').classList.toggle('is-empty', !list.length);
  $('events').replaceChildren(...items);
  $('add').disabled = !ed; $('add').hidden = currentRole === 'club';
}

function renderScore() {
  const s = score(state.events, 999); const p = score(state.events, 45);
  $('score-home').textContent = s.home; $('score-away').textContent = s.away;
  $('half').textContent = state.phase >= 2 ? 'Poločas ' + p.home + ' : ' + p.away : '';
  $('sb-phase').textContent = state.phase === 4 ? 'Zápis uzavřen' : PHASES[state.phase];
  $('sb-home').textContent = state.teams.home.name; $('sb-away').textContent = state.teams.away.name;
  $('scoreboard').setAttribute('aria-label', state.teams.home.name + ' ' + s.home + ' : ' + s.away + ' ' + state.teams.away.name);
}

function renderChecks() {
  $('checks').replaceChildren(...validate(state).map((c) => h('li', {}, h('span', {}, c.label, c.detail ? h('small', {}, c.detail) : null), h('span', { class: 'chip ' + (c.ok ? 'ok' : 'warn') }, c.ok ? 'Splněno' : 'Chybí'))));
}

function fillFormsData() {
  if(!$('rewards-form')) return;
  $('rewards-form').elements.fee.value = state.rewards.fee; $('rewards-form').elements.travel.value = state.rewards.travel; $('report-form').elements.report.value = state.refereeReport;
  const disableForms = currentRole === 'club' || state.phase === 4;
  $('rewards-form').elements.fee.disabled = disableForms; $('rewards-form').elements.travel.disabled = disableForms; $('rewards-form').querySelector('button').disabled = disableForms;
  $('report-form').elements.report.disabled = disableForms; $('report-form').querySelector('button').disabled = disableForms;
}

function renderActions() {
  const next = $('next'); const label = NEXT_LABEL[state.phase];
  next.hidden = label === null || currentRole === 'club'; next.textContent = label || '';
  let blocked = false;
  if (state.phase === 0) {
    blocked = !(state.lineupsConfirmed.home && state.lineupsConfirmed.away && state.teams.home.staff.manager.trim() !== '' && state.teams.away.staff.manager.trim() !== '');
    next.title = blocked ? 'Před zahájením musí být potvrzeny obě sestavy a vyplněni vedoucí.' : '';
  } else if (state.phase === 3) {
    blocked = !validate(state).every((c) => c.ok); next.title = blocked ? 'Nejdřív splňte všechny body kontroly.' : '';
  } else next.title = '';
  next.disabled = blocked;
}

function render() {

  document.querySelectorAll('.only-club').forEach(el => el.hidden = (currentRole !== 'club'));
  document.querySelectorAll('.only-referee').forEach(el => el.hidden = (currentRole !== 'referee'));

  $('title').textContent = state.teams.home.name + ' – ' + state.teams.away.name;
  
  if ($('match-meta')) {
    const dbMatch = getMatch(state.matchId);
    if (dbMatch) {
      $('match-meta').textContent = `${db.league.name}, ${dbMatch.round}. kolo | ${dbMatch.date}`;
    }
  }
  
  const u = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if ($('sidebar-user-name')) {
      $('sidebar-user-name').textContent = u ? u.name : (currentRole === 'referee' ? 'Rozhodčí' : 'Administrátor Klubu');
    }
  
  const warnBox = $('role-warning');
  warnBox.replaceChildren(...(currentRole === 'club'
    ? [h('strong', {}, 'Zástupce klubu. '), state.phase === 0 ? 'Můžete upravovat sestavu.' : h('span', { class: 'lock' }, 'Zápas byl zahájen, úpravy jsou uzamčeny.')]
    : [h('strong', {}, 'Rozhodčí. '), 'Plná práva k zápisu.']));
    
  renderStepper(); 
  renderEvents(); 
  renderScore(); 
  renderLineups(); 
  renderChecks(); 
  renderActions();
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  
  const el = $('saved'); 
  el.className = 'chip ok'; 
  el.textContent = 'Uloženo v ' + new Date().toLocaleTimeString('cs-CZ');
}

function confirmDialog(title, text, yes) {
  return new Promise((resolve) => {
    const d = $('confirm-dialog');
    $('cf-title').textContent = title; $('cf-text').textContent = text; $('cf-yes').textContent = yes;
    const done = (v) => { d.close(); resolve(v); };
    $('cf-yes').onclick = () => done(true); $('cf-no').onclick = () => done(false);
    d.addEventListener('cancel', () => resolve(false), { once: true }); d.showModal();
  });
}

let editingTeam = null; let tempRoster = [];

function openRosterDialog(teamKey) {
  editingTeam = teamKey; tempRoster = JSON.parse(JSON.stringify(state.teams[teamKey].roster));
  $('rost-error').textContent = ''; renderRosterForm(); $('roster-dialog').showModal();
}

function renderRosterForm() {
  tempRoster.sort((a, b) => a.number - b.number);
  $('roster-form').replaceChildren(...tempRoster.map((p, index) => {
    return h('div', { class: 'roster-edit-row' },
      h('input', { type: 'number', value: p.number, min: 1, max: 99, onchange: (e) => p.number = Number(e.target.value) }),
      h('input', { type: 'text', value: p.name, onchange: (e) => p.name = e.target.value }),
      h('input', { type: 'checkbox', title: 'Základ', checked: p.isStarter, onchange: (e) => p.isStarter = e.target.checked }),
      h('input', { type: 'checkbox', title: 'Brankář', checked: p.isGK, onchange: (e) => p.isGK = e.target.checked }),
      h('input', { type: 'checkbox', title: 'Kapitán', checked: p.isCapt, onchange: (e) => p.isCapt = e.target.checked }),
      h('button', { type: 'button', class: 'del-btn', title: 'Odebrat', onclick: () => { tempRoster.splice(index, 1); renderRosterForm(); } }, '×')
    );
  }));
}

$('add-player-btn').onclick = () => {
  $('rost-error').textContent = ''; const nameInput = $('new-p-name'); const numInput = $('new-p-num');
  if (!nameInput.value) return;
  let desiredNum = Number(numInput.value);
  if (!desiredNum || tempRoster.some(p => p.number === desiredNum)) {
    if(desiredNum) $('rost-error').textContent = `Číslo ${desiredNum} je obsazené. Hráč dostal automatické číslo.`;
    desiredNum = 1; while (tempRoster.some(p => p.number === desiredNum)) desiredNum++;
  }
  tempRoster.push({ id: Date.now(), number: desiredNum, name: nameInput.value, isStarter: false, isGK: false, isCapt: false });
  numInput.value = ''; nameInput.value = ''; renderRosterForm();
};

$('rost-save').onclick = () => {
  const numbers = tempRoster.map(p => p.number);
  if (new Set(numbers).size !== numbers.length) return $('rost-error').textContent = 'Chyba: Dva hráči nesmí mít stejné číslo dresu!';
  if (tempRoster.filter(p => p.isStarter).length > 11) return $('rost-error').textContent = 'Chyba: V základní sestavě může být maximálně 11 hráčů!';
  if (tempRoster.filter(p => p.isCapt).length > 1) return $('rost-error').textContent = 'Chyba: Tým může mít maximálně jednoho kapitána!';
  if (tempRoster.filter(p => p.isStarter && p.isGK).length > 1) return $('rost-error').textContent = 'Chyba: V základní sestavě může být maximálně 1 brankář!';
  state.teams[editingTeam].roster = tempRoster; state.lineupsConfirmed[editingTeam] = false; 
  $('roster-dialog').close(); render();
};
$('rost-cancel').onclick = () => $('roster-dialog').close();

const form = $('event-form'); const dlg = $('event-dialog'); let editingId = null;
const val = (name) => form.elements[name].value; const num = (name) => Number(val(name)) || 0;

function fillGrid(container, name, teamKey, selectedNum) {
  const roster = [...state.teams[teamKey].roster].sort((a,b) => a.number - b.number);
  container.replaceChildren(...roster.map(p => h('label', { class: 'choice', title: p.name }, h('input', { type: 'radio', name, value: String(p.number), checked: selectedNum === p.number }), h('span', {}, String(p.number)))));
}

function refreshGrids(selPlayerNum, selInNum) {
  const type = val('type'); 
  const teamKey = val('team');
  
  const inBox = document.getElementById('in-box');
  const kindBox = document.getElementById('kind-box');
  const goalCountBox = document.getElementById('goal-count-box');
  const playerLegend = document.getElementById('player-legend');

  if (inBox) inBox.hidden = type !== 'sub';
  if (kindBox) kindBox.hidden = type !== 'goal';
  
  // Bezpečné skrytí počtu branek (zkusí ID a případně i element dle nadpisu)
  if (goalCountBox) {
    goalCountBox.style.display = (type === 'goal') ? 'flex' : 'none';
  }

  if (playerLegend) {
    playerLegend.textContent = type === 'sub' ? 'Odchází, číslo dresu' : 'Hráč, číslo dresu';
  }

  fillGrid(document.getElementById('player-grid'), 'playerNum', teamKey, selPlayerNum || 0);
  fillGrid(document.getElementById('in-grid'), 'playerInNum', teamKey, selInNum || 0);
}

function openEventDialog(e) {
  editingId = e ? e.id : null;
  
  const dialogForm = document.getElementById('event-form');
  const dialogEl = document.getElementById('event-dialog');
  if (!dialogForm || !dialogEl) return;
  
  const dlgTitle = document.getElementById('dlg-title');
  if (dlgTitle) dlgTitle.textContent = e ? 'Upravit událost' : 'Nová událost';
  
  if (dialogForm.elements.type) dialogForm.elements.type.value = e ? e.type : 'goal';
  if (dialogForm.elements.team) dialogForm.elements.team.value = e ? e.team : 'home';
  if (dialogForm.elements.kind) dialogForm.elements.kind.value = e && e.goalKind ? e.goalKind : 'regular';
  if (dialogForm.elements.minute) dialogForm.elements.minute.value = e ? e.minute : '';
  
  const goalCount = document.getElementById('goal-count');
  if (goalCount) goalCount.value = 1;
  
  const formError = document.getElementById('form-error');
  if (formError) formError.textContent = '';
  
  const teamBox = document.getElementById('team-box');
  if (teamBox) {
    teamBox.replaceChildren(...['home', 'away'].map((t, i) =>
      h('label', { class: 'choice' }, h('input', { type: 'radio', name: 'team', value: t, checked: (!e && i===0) || (e && e.team === t) }), h('span', {}, state.teams[t].name))
    ));
  }
      
  refreshGrids(e ? e.playerNum : 0, e ? e.playerInNum : 0);
  dialogEl.showModal();
}

form.addEventListener('change', (ev) => { if (ev.target.name === 'type' || ev.target.name === 'team') refreshGrids(num('playerNum'), num('playerInNum')); });

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const type = val('type'); const minute = Number(val('minute')); const playerNum = num('playerNum'); const playerInNum = num('playerInNum');
  const err = !Number.isInteger(minute) || minute < 1 || minute > 120 ? 'Zadejte minutu od 1 do 120.' : !playerNum ? 'Vyberte hráče.' : type === 'sub' && !playerInNum ? 'Vyberte hráče, který nastupuje.' : type === 'sub' && playerInNum === playerNum ? 'Střídaný a nastupující hráč musí být různí.' : '';
  $('form-error').textContent = err; if (err) return;
  
  const goalAmount = type === 'goal' && !editingId ? (Number($('goal-count').value) || 1) : 1;
  for (let i = 0; i < goalAmount; i++) {
    const data = { minute, type, team: val('team'), playerNum, playerInNum: type === 'sub' ? playerInNum : null, goalKind: type === 'goal' ? val('kind') : null };
    if (editingId) {
      const idx = state.events.findIndex((x) => x.id === editingId); state.events[idx] = Object.assign({}, state.events[idx], data);
    } else state.events.push(Object.assign({ id: state.nextId++ }, data));
  }
  dlg.close(); render();
});

$('cancel').addEventListener('click', () => dlg.close());

async function removeEvent(e) {
  const ok = await confirmDialog('Odebrat událost?', e.minute + '. min, ' + TYPE_LABEL[e.type] + ': ' + (e.type === 'sub' ? 'Střídání' : getPlayerName(e.team, e.playerNum)), 'Odebrat');
  if (!ok) return; state.events = state.events.filter((x) => x.id !== e.id); render();
}

if($('rewards-form')) {
  $('rewards-form').addEventListener('submit', (ev) => { ev.preventDefault(); state.rewards.fee = ev.target.elements.fee.value; state.rewards.travel = ev.target.elements.travel.value; render(); });
  $('report-form').addEventListener('submit', (ev) => { ev.preventDefault(); state.refereeReport = ev.target.elements.report.value; render(); });
}

// Navázání akcí tlačítek
/* Bezpečná inicializace tlačítek */
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = $('add');
  if (addBtn) addBtn.addEventListener('click', () => openEventDialog(null));

  const printBtn = $('print');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  const nextBtn = $('next');
  if (nextBtn) {
    nextBtn.addEventListener('click', async () => {
      if (state.phase === 0) {
        if (!state.lineupsConfirmed.home || !state.lineupsConfirmed.away || state.teams.home.staff.manager.trim() === '' || state.teams.away.staff.manager.trim() === '') return;
        const ok = await confirmDialog('Zahájit zápas?', 'Po zahájení zápasu se sestavy a realizační týmy trvale uzamknou pro oba týmy.', 'Zahájit zápas');
        if (!ok) return;
      }
      if (state.phase === 3) {
        if (!validate(state).every((c) => c.ok)) return;
        const ok = await confirmDialog('Uzavřít zápis?', 'Po uzavření už nepůjde zápis upravit.', 'Uzavřít zápis');
        if (!ok) return;
      }
      state.phase += 1; render(); fillFormsData();
    });
  }

  const resetBtn = $('reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      if (await confirmDialog('Obnovit ukázková data?', 'Všechny změny se smažou.', 'Obnovit')) { 
        state = seed(); fillFormsData(); render(); 
      }
    });
  }

  fillFormsData(); 
  render();
});