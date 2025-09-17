/* app.js — Full build con Agenda + Cobros + Analytics + Config y exportaciones por Técnica/Día/Mes/Año */

// ===== Helpers/Persistencia =====
const S = {
  key:k=>`salon.${k}`,
  load:(k,def)=>{ try { return JSON.parse(localStorage.getItem(S.key(k))) ?? def } catch { return def } },
  save:(k,v)=>localStorage.setItem(S.key(k), JSON.stringify(v)),
  csv:(rows)=>rows.map(r=>r.map(x=>`"${(x??'').toString().replace(/"/g,'""')}"`).join(',')).join('\n'),
  download:(name,content,type)=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([content],{type})); a.download=name; a.click(); URL.revokeObjectURL(a.href); },
  today:()=>new Date().toISOString().slice(0,10),
  pad:n=>n.toString().padStart(2,'0'),
  toDT:(d)=>`${d.getFullYear()}-${S.pad(d.getMonth()+1)}-${S.pad(d.getDate())} ${S.pad(d.getHours())}:${S.pad(d.getMinutes())}`
};

// ===== Estado =====
const state = {
  cfg: S.load('cfg', {
    salonName:'Mi Salón', font:'Inter, system-ui',
    colors:{bg:'#0f0f12',topbar:'#15151b',btn:'#26283a',accent:'#93c5fd'}
  }),
  users: S.load('users', [{user:'admin',pass:'admin',role:'admin'},{user:'user',pass:'user',role:'user'}]),
  session: S.load('session', null),
  techs: S.load('techs', ['General','Cynthia','Ana','Paola']),
  services: S.load('services', [{name:'Corte',price:25},{name:'Color',price:60},{name:'Blowout',price:30}]),
  appointments: S.load('appointments', []),
  invoices: S.load('invoices', [
    {id:'1', number:'INV-00001', date:'2025-09-15', time:'10:00', client:'María R.', phone:'', service:'Color', tech:'Cynthia', pay:'ATH Móvil', amount:85},
    {id:'2', number:'INV-00002', date:'2025-09-15', time:'12:30', client:'Laura P.', phone:'', service:'Uñas',  tech:'Ana',     pay:'Tarjeta',  amount:55},
    {id:'3', number:'INV-00003', date:'2025-09-16', time:'09:15', client:'Iris G.',  phone:'', service:'Secado',tech:'Cynthia', pay:'Cash',     amount:25},
    {id:'4', number:'INV-00004', date:'2025-09-16', time:'14:00', client:'Karla M.', phone:'', service:'Keratina',tech:'Paola', pay:'Tarjeta',  amount:120}
  ]),
  logs: S.load('logs', []),
  lastInvId: S.load('lastInvId', null),
  menu: S.load('menu',[
    {id:'Agenda', ico:'📅', view:'viewAgenda', role:'user'},
    {id:'Cobros/Facturas', ico:'💳', view:'viewBilling', role:'user'},
    {id:'Rendimiento', ico:'📈', view:'viewAnalytics', role:'admin'},
    {id:'Configuración', ico:'⚙️', view:'viewConfig', role:'admin'},
    {id:'Backups', ico:'🗂️', view:'viewBackups', role:'admin'}
  ])
};
function persist(){ ['cfg','users','session','techs','services','appointments','invoices','logs','lastInvId','menu'].forEach(k=>S.save(k,state[k])); }
function log(type,msg){ state.logs.push({id:Math.random().toString(36).slice(2), type, msg, ts:Date.now(), user:state.session?.user||'anon'}); S.save('logs',state.logs); }

// ===== Theming =====
function applyTheme(){
  document.documentElement.style.setProperty('--bg', state.cfg.colors.bg);
  document.documentElement.style.setProperty('--topbar', state.cfg.colors.topbar);
  document.documentElement.style.setProperty('--btn', state.cfg.colors.btn);
  document.documentElement.style.setProperty('--accent', state.cfg.colors.accent);
  document.body.style.fontFamily = state.cfg.font;
  document.getElementById('salonName').textContent = state.cfg.salonName;
  document.getElementById('salonNameLogin').textContent = state.cfg.salonName;
  document.getElementById('appFooter').textContent = `© ${state.cfg.salonName}`;
}

// ===== Router =====
const views = ['viewLogin','viewMenu','viewAgenda','viewBilling','viewAnalytics','viewConfig','viewBackups'];
function show(v){ views.forEach(id=>document.getElementById(id).classList.add('hidden')); document.getElementById(v).classList.remove('hidden'); }
function toMenu(){ buildMenu(); show('viewMenu'); }

// ===== Login =====
document.getElementById('btnDoLogin').onclick=()=>{
  const u=loginUser.value.trim(), p=loginPass.value;
  const ok = state.users.find(x=>x.user===u && x.pass===p);
  if(!ok) return alert('Usuario o contraseña incorrectos');
  state.session={user:ok.user,role:ok.role,ts:Date.now()}; persist(); toMenu();
};
document.getElementById('btnLogout').onclick=()=>{ state.session=null; persist(); show('viewLogin'); };
document.getElementById('btnDashboard').onclick=toMenu;

// ===== Menú =====
function buildMenu(){
  const ml=document.getElementById('menuList'); ml.innerHTML='';
  const role=state.session?.role||'user';
  state.menu.filter(m=>role==='admin'||m.role!=='admin').forEach(m=>{
    const el=document.createElement('div'); el.className='item'; el.innerHTML=`<div class="ico">${m.ico}</div><div style="font-weight:700">${m.id}</div><div class="tag">${m.view}</div>`;
    el.onclick=()=>{ show(m.view);
      if(m.view==='viewAgenda') renderAgenda();
      if(m.view==='viewBilling') renderBilling();
      if(m.view==='viewAnalytics') renderAnalytics();
      if(m.view==='viewConfig') renderConfig();
      if(m.view==='viewBackups') renderBackups();
    };
    ml.appendChild(el);
  });
  const mo=document.getElementById('menuOrder'); if(mo){ mo.innerHTML='';
    state.menu.forEach(m=>{ const li=document.createElement('div'); li.className='item'; li.innerHTML=`<div class="ico">${m.ico}</div><div>${m.id}</div>`; mo.appendChild(li); });
  }
}

// ===== Agenda (básico) =====
const DKEY=['sun','mon','tue','wed','thu','fri','sat'];
function hoursFor(dateStr){ return {open:true,from:'09:00',to:'18:00'}; }

function renderAgenda(){
  apDate.value=S.today(); apTime.value='09:00'; filterDate.value=S.today();
  apTech.innerHTML = state.techs.map(t=>`<option>${t}</option>`).join('');
  servicesList.innerHTML = state.services.map(s=>`<option value="${s.name}">`).join('');
  renderCalendar(); renderApTable(); renderSlots();
}
function renderCalendar(){
  const cal=document.getElementById('calendar'); cal.innerHTML='';
  const m=document.getElementById('calMonth').value || new Date().toISOString().slice(0,7);
  const [y,mm]=m.split('-').map(Number);
  const days=new Date(y,mm,0).getDate();
  for(let d=1; d<=days; d++){
    const date=new Date(y,mm-1,d);
    const el=document.createElement('div'); el.className='day';
    if(date.toDateString()===new Date().toDateString()) el.classList.add('today');
    const has=state.appointments.some(a=>a.date===date.toISOString().slice(0,10));
    el.innerHTML=`<div style="font-weight:700">${d}</div><div>${has?'<span class="badge">citas</span>':''}</div>`;
    el.onclick=()=>{ filterDate.value=date.toISOString().slice(0,10); renderApTable(); renderSlots(); };
    cal.appendChild(el);
  }
}
function isDupAp({date,time,client,tech}){ return state.appointments.some(a=>a.date===date && a.time===time && a.client.trim().toLowerCase()===client.trim().toLowerCase() && a.tech===tech); }
function saveAppointment(editId=null){
  const date=apDate.value, time=apTime.value, client=apClient.value, phone=apPhone.value, service=apService.value, tech=apTech.value;
  if(!date||!time||!client) return alert('Fecha, hora y cliente son obligatorios.');
  if(!editId && isDupAp({date,time,client,tech})) return alert('⚠️ Cita duplicada.');
  if(editId){
    const ap=state.appointments.find(a=>a.id===editId); if(!ap) return;
    ap.date=date; ap.time=time; ap.client=client; ap.phone=phone; ap.service=service; ap.tech=tech; log('reagendar', `${client} -> ${date} ${time}`);
  }else{
    const id=Math.random().toString(36).slice(2);
    state.appointments.push({id,date,time,client,phone,service,tech, created:Date.now(), status:'ok'}); log('cita', `${client} ${date} ${time}`);
  }
  persist(); renderApTable(); renderSlots(); renderCalendar();
}
document.getElementById('btnSaveAp').onclick=()=>saveAppointment(null);
document.getElementById('btnResched').onclick=()=>{
  const sel=document.querySelector('#tblAp input[type=radio]:checked'); if(!sel) return alert('Seleccione una cita');
  saveAppointment(sel.value);
};
document.getElementById('btnNoShow').onclick=()=>{
  const sel=document.querySelector('#tblAp input[type=radio]:checked'); if(!sel) return alert('Seleccione una cita');
  const ap=state.appointments.find(a=>a.id===sel.value); ap.status='no-show'; persist(); renderApTable();
};

function renderSlots(){
  const date = document.getElementById('filterDate').value || S.today();
  const H = hoursFor(date); const step = 30;
  const slotsEl = document.getElementById('slots'); slotsEl.innerHTML='';
  if(!H.open){ slotsEl.innerHTML='<div class="badge">Cerrado</div>'; return; }
  const booked = state.appointments.filter(a=>a.date===date).map(a=>a.time);
  const open=[];
  const [fh,fm]=H.from.split(':').map(Number); const [th,tm]=H.to.split(':').map(Number);
  for(let m=fh*60+fm; m<th*60+tm; m+=step){
    const h=Math.floor(m/60), mm=m%60; const t=`${S.pad(h)}:${S.pad(mm)}`;
    if(!booked.includes(t)) open.push(t);
  }
  slotsEl.innerHTML = open.length ? open.map(t=>`<button class="btn small" onclick="apTime.value='${t}';apDate.value='${date}'">${t}</button>`).join(' ') : '<div class="badge">Sin disponibilidad</div>';
}
function renderApTable(){
  const d=document.getElementById('filterDate').value;
  const c=document.getElementById('filterClient').value?.toLowerCase();
  let rows = state.appointments.filter(a=>!d||a.date===d);
  if(c) rows = rows.filter(a=>a.client.toLowerCase().includes(c));
  rows.sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
  const tbl=document.getElementById('tblAp');
  tbl.innerHTML='<tr><th></th><th>Fecha</th><th>Hora</th><th>Cliente</th><th>Teléfono</th><th>Servicio</th><th>Técnica</th><th>Estatus</th></tr>'+
    rows.map(a=>`<tr><td><input type="radio" name="selAp" value="${a.id}"></td><td>${a.date}</td><td>${a.time}</td><td>${a.client}</td><td>${a.phone||''}</td><td>${a.service||''}</td><td>${a.tech||''}</td><td>${a.status==='no-show'?'<span class="badge">no-show</span>':'✅'}</td></tr>`).join('');
}
document.getElementById('btnExportApCSV').onclick=()=>{
  const rows=[['Fecha','Hora','Cliente','Teléfono','Servicio','Técnica','Estatus'], ...state.appointments.map(a=>[a.date,a.time,a.client,a.phone||'',a.service||'',a.tech||'',a.status||'ok'])];
  S.download(`citas-${Date.now()}.csv`, S.csv(rows), 'text/csv');
};
document.getElementById('btnExportApPDF').onclick=()=>{
  const rows = state.appointments.map(a=>`<tr><td>${a.date}</td><td>${a.time}</td><td>${a.client}</td><td>${a.phone||''}</td><td>${a.service||''}</td><td>${a.tech||''}</td><td>${a.status||'ok'}</td></tr>`).join('');
  const html=`<html><head><meta charset="utf-8"><title>Citas</title>
  <style>@page{size:A4 landscape;margin:10mm}body{font-family:${state.cfg.font};color:#111}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #ccc;padding:6px}th{background:#f3f3f3}</style>
  </head><body><h1>Citas</h1><table><thead><tr><th>Fecha</th><th>Hora</th><th>Cliente</th><th>Teléfono</th><th>Servicio</th><th>Técnica</th><th>Estatus</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
  const w=window.open('','print'); w.document.write(html); w.document.close(); w.focus(); w.print();
};

// ===== Cobros / Facturas =====
function renderBilling(){
  invDate.value=S.today(); invTime.value=new Date().toTimeString().slice(0,5);
  invTech.innerHTML = state.techs.map(t=>`<option>${t}</option>`).join('');
  servicesList.innerHTML = state.services.map(s=>`<option value="${s.name}">`).join('');
  const techs = Array.from(new Set(state.invoices.map(i=>i.tech||''))).filter(Boolean).sort();
  invTechFilter.innerHTML = ['(todas)',...techs].map(t=>`<option>${t}</option>`).join('');

  const tbl=document.getElementById('tblInv');
  tbl.innerHTML='<tr><th>#</th><th>Fecha</th><th>Hora</th><th>Cliente</th><th>Servicio</th><th>Técnica</th><th>Método</th><th>Monto</th></tr>'+
    state.invoices.map(i=>`<tr>
      <td>${i.number||''}</td><td>${i.date}</td><td>${i.time||''}</td><td>${i.client||''}</td>
      <td>${i.service||''}</td><td>${i.tech||''}</td><td>${i.pay||''}</td><td>$${(+i.amount||0).toFixed(2)}</td>
    </tr>`).join('');
}
document.getElementById('btnSaveInv').onclick=()=>{
  const num = 'INV-' + String((state.invoices.length+1)).padStart(5,'0');
  const inv={id:Math.random().toString(36).slice(2), number:num,
    date:invDate.value,time:invTime.value,client:invClient.value,phone:invPhone.value,
    service:invService.value,tech:invTech.value,pay:invPay.value,amount:+invAmount.value||0};
  if(!inv.date||!inv.time||!inv.client||!inv.amount) return alert('Completa fecha, hora, cliente y monto.');
  state.invoices.push(inv); state.lastInvId=inv.id; persist(); renderBilling(); log('cobro', `${inv.number} ${inv.client} $${inv.amount.toFixed(2)} (${inv.pay})`);
};
document.getElementById('btnInvoicePDF').onclick=()=>{
  let inv = state.invoices.find(i=>i.id===state.lastInvId) || state.invoices.at(-1);
  if(!inv) return alert('No hay factura reciente.');
  const html = `<html><head><meta charset="utf-8"><title>${inv.number}</title>
  <style>@page{size:A4;margin:18mm}body{font-family:${state.cfg.font};color:#111}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:6px}th{background:#f6f6f6}</style></head><body>
    <h1>${state.cfg.salonName} — ${inv.number}</h1>
    <p>${inv.date} ${inv.time||''} · Cliente: <b>${inv.client}</b> · Técnica: <b>${inv.tech||''}</b> · Pago: ${inv.pay||''}</p>
    <table><tr><th>Servicio</th><th style="width:140px">Monto</th></tr><tr><td>${inv.service||'Servicio'}</td><td>$${(+inv.amount||0).toFixed(2)}</td></tr>
    <tr><td style="text-align:right"><b>Total</b></td><td><b>$${(+inv.amount||0).toFixed(2)}</b></td></tr></table>
  </body></html>`;
  const w=window.open('','print'); w.document.write(html); w.document.close(); w.focus(); w.print();
};

// ===== Filtros/Export por Técnica — Día/Mes/Año/Hour y Generales =====
function getPeriodRange(period){
  const now=new Date();
  const day0=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const mon0=new Date(now.getFullYear(),now.getMonth(),1);
  const year0=new Date(now.getFullYear(),0,1);
  if(period==='today')      return {from:day0,  to:new Date(day0.getFullYear(),day0.getMonth(),day0.getDate()+1)};
  if(period==='this_month') return {from:mon0,  to:new Date(now.getFullYear(),now.getMonth()+1,1)};
  if(period==='this_year')  return {from:year0, to:new Date(now.getFullYear()+1,0,1)};
  return null;
}
function periodLabel(p){ return p==='today'?'Hoy':p==='this_month'?'Este mes':p==='this_year'?'Este año':'Todo'; }
const currentTech   = () => (document.getElementById('invTechFilter')?.value)||'(todas)';
const currentPeriod = () => (document.getElementById('invPeriodFilter')?.value)||'all';

function groupInvoices(mode, {tech=null, period='all'} = {}){
  const pr = getPeriodRange(period);
  let list = state.invoices.slice();
  if(pr){ list = list.filter(i=>{ const d=new Date(i.date); return (!pr.from||d>=pr.from)&&(!pr.to||d<pr.to); }); }
  if(tech && tech!=='(todas)'){ list = list.filter(i=>(i.tech||'')===tech); }

  const keyFn =
    mode==='tech'  ? (i)=> i.tech || '(sin técnica)' :
    mode==='day'   ? (i)=> i.date || '(sin fecha)'   :
    mode==='month' ? (i)=> (i.date? i.date.slice(0,7) : '(sin mes)') :
    mode==='year'  ? (i)=> (i.date? i.date.slice(0,4) : '(sin año)') :
    mode==='hour'  ? (i)=> (i.time ? (i.time.slice(0,2)+':00') : '(sin hora)') :
                     (i)=> '(otro)';
  const map = {};
  for(const i of list){
    const k=keyFn(i), amt=(+i.amount||0);
    (map[k]??={key:k,count:0,total:0}).count++; map[k].total+=amt;
  }
  return Object.values(map).sort((a,b)=> b.total-a.total || String(a.key).localeCompare(String(b.key)));
}
function exportGroupedCSV(mode, opts={}){
  const nice = ({tech:'Técnica', day:'Día', month:'Mes', year:'Año', hour:'Hora'})[mode] || mode;
  const data = groupInvoices(mode, opts);
  const rows = [[nice,'Cantidad','Total ($)']];
  data.forEach(r=>rows.push([r.key, r.count, r.total.toFixed(2)]));
  const techSuffix = opts.tech && opts.tech!=='(todas)' ? `-${opts.tech.replace(/\s+/g,'_')}` : '';
  const perSuffix  = `-${(opts.period||'all')}`;
  S.download(`cobros-por-${mode}${techSuffix}${perSuffix}.csv`, S.csv(rows), 'text/csv');
}
function exportGroupedPDF(mode, opts={}){
  const nice = ({tech:'Técnica', day:'Día', month:'Mes', year:'Año', hour:'Hora'})[mode] || mode;
  const data = groupInvoices(mode, opts);
  const sumTotal = data.reduce((a,x)=>a+x.total,0);
  const sumCount = data.reduce((a,x)=>a+x.count,0);
  const rows = data.map(r=>`
    <tr>
      <td>${r.key}</td>
      <td style="text-align:right">${r.count}</td>
      <td style="text-align:right">$${r.total.toFixed(2)}</td>
    </tr>`).join('');
  const xTech = (opts.tech && opts.tech!=='(todas)') ? ` — Técnica: ${opts.tech}` : '';
  const xPer  = `Periodo: ${periodLabel(opts.period||'all')}`;
  const html = `
  <html><head><meta charset="utf-8"><title>Cobros por ${nice}</title>
  <style>@page{ size:A4 landscape; margin:12mm }body{ font-family:${state.cfg.font}; color:#111 }
  h1{ margin:0 0 8px 0; font-size:18px }.meta{ color:#555; margin-bottom:8px }
  table{ width:100%; border-collapse:collapse; font-size:12px }
  th,td{ border:1px solid #cfcfcf; padding:6px 8px } th{ background:#f3f3f3; text-align:left }
  tfoot td{ font-weight:700; background:#fafafa }</style></head><body>
    <h1>Historial de Cobros — ${nice}${xTech}</h1>
    <div class="meta">${xPer} · Generado: ${new Date().toLocaleString()}</div>
    <table>
      <thead><tr><th>${nice}</th><th style="text-align:right">Cantidad</th><th style="text-align:right">Total</th></tr></thead>
      <tbody>${rows||''}</tbody>
      <tfoot><tr><td>TOTAL</td><td style="text-align:right">${sumCount}</td><td style="text-align:right">$${sumTotal.toFixed(2)}</td></tr></tfoot>
    </table>
  </body></html>`;
  const w=window.open('','print'); w.document.write(html); w.document.close(); w.focus(); w.print();
}

// Wire-up de botones de export
function currentOpts(){ return { tech: currentTech(), period: currentPeriod() }; }
const byId=(id,fn)=>{ const el=document.getElementById(id); if(el) el.addEventListener('click',fn); };

byId('btnTechDayCSV',   ()=>exportGroupedCSV('day',   currentOpts()));
byId('btnTechDayPDF',   ()=>exportGroupedPDF('day',   currentOpts()));
byId('btnTechMonthCSV', ()=>exportGroupedCSV('month', currentOpts()));
byId('btnTechMonthPDF', ()=>exportGroupedPDF('month', currentOpts()));
byId('btnTechYearCSV',  ()=>exportGroupedCSV('year',  currentOpts()));
byId('btnTechYearPDF',  ()=>exportGroupedPDF('year',  currentOpts()));

byId('btnExportInvByTechCSV', ()=>exportGroupedCSV('tech', {period: currentPeriod()}));
byId('btnExportInvByTechPDF', ()=>exportGroupedPDF('tech', {period: currentPeriod()}));
byId('btnExportInvByDayCSV',  ()=>exportGroupedCSV('day',  {period: currentPeriod()}));
byId('btnExportInvByDayPDF',  ()=>exportGroupedPDF('day',  {period: currentPeriod()}));
byId('btnExportInvByHourCSV', ()=>exportGroupedCSV('hour', {period: currentPeriod()}));
byId('btnExportInvByHourPDF', ()=>exportGroupedPDF('hour', {period: currentPeriod()}));

// ===== Analytics (ligero) =====
function sumBy(arr,fn){return arr.reduce((a,x)=>a+(+fn(x)||0),0)}
function renderAnalytics(){
  const range=document.getElementById('rangeKPI').value||'month';
  const now=new Date();
  const start = range==='day'?new Date(now.getFullYear(),now.getMonth(),now.getDate()):
                range==='week'?new Date(now.getFullYear(),now.getMonth(),now.getDate()-6):
                new Date(now.getFullYear(),now.getMonth(),1);
  const invInRange=state.invoices.filter(i=>new Date(i.date)>=start);
  const total=sumBy(invInRange,i=>i.amount);
  const byTech={}; invInRange.forEach(i=>byTech[i.tech]=(byTech[i.tech]||0)+(+i.amount||0));
  const byPay={}; invInRange.forEach(i=>byPay[i.pay]=(byPay[i.pay]||0)+(+i.amount||0));
  const bySrvCount={}; invInRange.forEach(i=>bySrvCount[i.service]=(bySrvCount[i.service]||0)+1);

  const k=document.getElementById('kpis'); k.innerHTML='';
  const makeK=(title,val)=>{const c=document.createElement('div'); c.className='card'; c.innerHTML=`<div style="color:var(--muted)">${title}</div><div style="font-size:26px;font-weight:800">${val}</div>`; k.appendChild(c);}
  makeK('Ingresos', `$${total.toFixed(2)}`);
  makeK('Citas', state.appointments.filter(a=>new Date(a.date)>=start).length);
  makeK('No-shows', state.appointments.filter(a=>new Date(a.date)>=start && a.status==='no-show').length);

  // Dibujos simples de barras
  drawBar('chart1', Object.keys(byTech), Object.values(byTech), {title:'Ingresos por técnica'});
  drawBar('chart2', Object.keys(bySrvCount), Object.values(bySrvCount), {title:'Top servicios (conteo)'});

  document.getElementById('btnExportAnalCSV').onclick=()=>{
    const rows=[['KPI','Valor'],['Ingresos',total.toFixed(2)],[],['Técnica','Monto'],...Object.entries(byTech)];
    S.download(`analytics-${range}-${Date.now()}.csv`, S.csv(rows), 'text/csv');
  };
  document.getElementById('btnExportAnalPDF').onclick=()=>{
    const rows = Object.entries(byTech).map(([k,v])=>`<tr><td>${k||'(vacío)'}</td><td style="text-align:right">$${(+v).toFixed(2)}</td></tr>`).join('');
    const html=`<html><head><meta charset="utf-8"><title>Analytics</title>
    <style>@page{size:A4;margin:12mm}body{font-family:${state.cfg.font};color:#111}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #ddd;padding:6px}th{background:#f6f6f6}</style></head><body>
      <h1>Analytics (${range})</h1>
      <h2>Ingresos por técnica</h2><table><tr><th>Técnica</th><th style="text-align:right">Monto</th></tr>${rows}</table>
    </body></html>`;
    const w=window.open('','print'); w.document.write(html); w.document.close(); w.focus(); w.print();
  };

  renderLogsTable();
}
document.getElementById('rangeKPI').onchange=renderAnalytics;
function drawBar(canvasId, labels, vals, {title=''}){
  const c=document.getElementById(canvasId), ctx=c.getContext('2d');
  const W=c.width=c.clientWidth; const H=c.height=c.height; ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#fff'; ctx.font='14px sans-serif'; ctx.fillText(title,12,16);
  const max=Math.max(1,...vals); const padL=36, padR=10, padT=24, padB=28; const innerW=W-padL-padR, innerH=H-padT-padB;
  ctx.strokeStyle='#888'; ctx.globalAlpha=.4; ctx.beginPath(); for(let i=0;i<=4;i++){ const y=padT+innerH*(i/4); ctx.moveTo(padL,y); ctx.lineTo(padL+innerW,y); ctx.fillStyle='#bbb'; ctx.fillText(String(Math.round(max*(1-i/4))),4,y+4);} ctx.stroke(); ctx.globalAlpha=1;
  const bw=innerW/Math.max(1,labels.length);
  labels.forEach((lab,i)=>{ const v=vals[i]; const h=(v/max)*innerH; const x=padL+i*bw+bw*.15, y=padT+innerH-h, w=bw*.7; ctx.fillStyle='#fff'; ctx.fillRect(x,y,w,h); ctx.fillStyle='#ddd'; ctx.save(); ctx.translate(x+w/2,H-8); ctx.textAlign='center'; ctx.fillText(lab,0,0); ctx.restore(); ctx.fillStyle='#fff'; ctx.fillText(String(v),x,y-4); });
}

// Logs
function renderLogsTable(){
  const t=document.getElementById('tblLogs');
  t.innerHTML='<tr><th>Fecha</th><th>Usuario</th><th>Tipo</th><th>Mensaje</th></tr>'+
    state.logs.slice(-200).reverse().map(l=>`<tr><td>${S.toDT(new Date(l.ts))}</td><td>${l.user}</td><td>${l.type}</td><td>${l.msg}</td></tr>`).join('');
}
document.getElementById('btnExportLogsCSV').onclick=()=>{
  const rows=[['Fecha','Usuario','Tipo','Mensaje'], ...state.logs.map(l=>[S.toDT(new Date(l.ts)), l.user, l.type, l.msg])];
  S.download(`logs-${Date.now()}.csv`, S.csv(rows), 'text/csv');
};
document.getElementById('btnExportLogsPDF').onclick=()=>{
  const rows=state.logs.slice(-500).map(l=>`<tr><td>${S.toDT(new Date(l.ts))}</td><td>${l.user}</td><td>${l.type}</td><td>${l.msg}</td></tr>`).join('');
  const html=`<html><head><meta charset="utf-8"><title>Historial</title>
  <style>@page{size:A4 landscape;margin:10mm}body{font-family:${state.cfg.font};color:#111}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #ccc;padding:6px}th{background:#f3f3f3}</style>
  </head><body><h1>Historial</h1><table><thead><tr><th>Fecha</th><th>Usuario</th><th>Tipo</th><th>Mensaje</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
  const w=window.open('','print'); w.document.write(html); w.document.close(); w.focus(); w.print();
};

// ===== Config =====
function renderConfig(){
  cfgSalonName.value=state.cfg.salonName; cfgFont.value=state.cfg.font;
  cfgBg.value=state.cfg.colors.bg; cfgTopbar.value=state.cfg.colors.topbar; cfgBtn.value=state.cfg.colors.btn; cfgAccent.value=state.cfg.colors.accent;
  refreshTechs(); refreshServices(); buildMenu();
}
function refreshTechs(){
  const ul=document.getElementById('techList'); if(ul){ ul.innerHTML=''; state.techs.forEach((t,i)=>{ const li=document.createElement('li'); li.textContent=t+' '; const b=document.createElement('button'); b.className='btn small danger'; b.textContent='Eliminar'; b.onclick=()=>{ state.techs.splice(i,1); persist(); refreshTechs(); }; li.appendChild(b); ul.appendChild(li); }); }
  const selAp=document.getElementById('apTech'), selInv=document.getElementById('invTech');
  if(selAp) selAp.innerHTML = state.techs.map(t=>`<option>${t}</option>`).join('');
  if(selInv) selInv.innerHTML = selAp?.innerHTML || '';
}
function refreshServices(){
  const dl=document.getElementById('servicesList'); if(dl) dl.innerHTML='';
  state.services.forEach(s=>{ const o=document.createElement('option'); o.value=s.name; if(dl) dl.appendChild(o); });
  const tbl=document.getElementById('tblSrv'); if(tbl){
    tbl.innerHTML='<tr><th>Servicio</th><th>Precio</th><th></th></tr>'+ state.services.map((s,i)=>`<tr><td>${s.name}</td><td>$${(+s.price).toFixed(2)}</td><td><button class="btn small" onclick="delSrv(${i})">Eliminar</button></td></tr>`).join('');
  }
}
function delSrv(i){ state.services.splice(i,1); persist(); refreshServices(); }
btnAddTech?.addEventListener('click',()=>{ const t=techNew.value?.trim(); if(!t) return; state.techs.push(t); techNew.value=''; persist(); refreshTechs(); });
btnAddSrv?.addEventListener('click',()=>{ const name=srvName.value?.trim(); const price=+srvPrice.value||0; if(!name) return; state.services.push({name,price}); srvName.value=''; srvPrice.value=''; persist(); refreshServices(); });
btnSaveTheme?.addEventListener('click',()=>{
  state.cfg.salonName=cfgSalonName.value||state.cfg.salonName;
  state.cfg.font=cfgFont.value||state.cfg.font;
  state.cfg.colors.bg=cfgBg.value||state.cfg.colors.bg;
  state.cfg.colors.topbar=cfgTopbar.value||state.cfg.colors.topbar;
  state.cfg.colors.btn=cfgBtn.value||state.cfg.colors.btn;
  state.cfg.colors.accent=cfgAccent.value||state.cfg.colors.accent;
  persist(); applyTheme(); alert('Estilo guardado');
});

// ===== Backups =====
function renderBackups(){}
document.getElementById('btnSchedBackups').onclick=()=>alert('Backups programados (simulado)');
document.querySelectorAll('[data-backup]').forEach(b=>{
  b.onclick=()=>{
    const [what,freq]=b.dataset.backup.split(':');
    const data = what==='appointments'?state.appointments:what==='billing'?{invoices:state.invoices}:{logs:state.logs};
    S.download(`${what}-${freq}-${Date.now()}.json`, JSON.stringify(data,null,2));
  }
});
document.getElementById('btnExportAll').onclick=()=>{
  const dump = {cfg:state.cfg, users:state.users, techs:state.techs, services:state.services, appointments:state.appointments, invoices:state.invoices, logs:state.logs, menu:state.menu};
  S.download(`backup-total-${Date.now()}.json`, JSON.stringify(dump,null,2));
};
document.getElementById('importAll').onchange=e=>{ const f=e.target.files[0]; if(!f) return; f.text().then(t=>{ Object.assign(state, JSON.parse(t)); persist(); applyTheme(); buildMenu(); alert('Restaurado.'); }); };

// ===== Init =====
function init(){ applyTheme(); if(state.session){ toMenu(); } else { show('viewLogin'); } }
init();
