import { CATEGORIES, convert } from './converters.js';

const $ = sel => document.querySelector(sel);
const categoryEl = $('#category');
const fromUnitEl = $('#fromUnit');
const toUnitEl = $('#toUnit');
const fromValueEl = $('#fromValue');
const toValueEl = $('#toValue');
const swapBtn = $('#swap');
const copyBtn = $('#copy');
const swapValuesBtn = $('#swapValues');
const clearBtn = $('#clear');
const infoEl = $('#info');

function populateCategories(){
  categoryEl.innerHTML = Object.keys(CATEGORIES).map(k => `<option value="${k}">${k}</option>`).join('');
}

function populateUnits(categoryKey){
  const units = CATEGORIES[categoryKey].units;
  const options = Object.keys(units).map(u => `<option value="${u}">${u} — ${units[u].name}</option>`).join('');
  fromUnitEl.innerHTML = options;
  toUnitEl.innerHTML = options;
}

function formatNumber(n){
  if (!isFinite(n)) return '—';
  // show up to 8 significant digits, trim zeros
  let s = Number.parseFloat(n.toPrecision(8)).toString();
  return s;
}

function recalc(){
  const cat = categoryEl.value;
  const fromKey = fromUnitEl.value;
  const toKey = toUnitEl.value;
  const raw = fromValueEl.value.trim();
  if (raw === '') { toValueEl.value = ''; infoEl.textContent = ''; return; }
  const v = Number(raw);
  if (!isFinite(v)) { toValueEl.value = 'Invalid'; infoEl.textContent = ''; return; }
  const out = convert(cat, fromKey, toKey, v);
  toValueEl.value = formatNumber(out);
  infoEl.textContent = `${v} ${fromKey} → ${toValueEl.value} ${toKey}`;
}

function swapUnits(){
  const a = fromUnitEl.value;
  fromUnitEl.value = toUnitEl.value;
  toUnitEl.value = a;
  recalc();
}

function swapValues(){
  const a = fromValueEl.value;
  fromValueEl.value = toValueEl.value;
  toValueEl.value = a;
  recalc();
}

function copyResult(){
  const text = toValueEl.value;
  if (!text) return;
  navigator.clipboard?.writeText(text).then(()=> {
    infoEl.textContent = 'Copied to clipboard';
    setTimeout(()=> infoEl.textContent = '', 1200);
  }).catch(()=> {
    infoEl.textContent = 'Copy failed';
  });
}

function clearAll(){
  fromValueEl.value = '';
  toValueEl.value = '';
  infoEl.textContent = '';
}

categoryEl.addEventListener('change', ()=> {
  populateUnits(categoryEl.value);
  recalc();
});

fromUnitEl.addEventListener('change', recalc);
toUnitEl.addEventListener('change', recalc);
fromValueEl.addEventListener('input', recalc);
swapBtn.addEventListener('click', swapUnits);
swapValuesBtn.addEventListener('click', swapValues);
copyBtn.addEventListener('click', copyResult);
clearBtn.addEventListener('click', clearAll);

// initialize
populateCategories();
// ensure the category select has a definite initial selection, then populate units from that value
if (!categoryEl.value) categoryEl.selectedIndex = 0;
populateUnits(categoryEl.value);
fromUnitEl.selectedIndex = 0;
toUnitEl.selectedIndex = 1;
fromValueEl.value = '';
toValueEl.value = '';
infoEl.textContent = '';

// mobile-friendly focus behavior
fromValueEl.addEventListener('focus', () => fromValueEl.select());