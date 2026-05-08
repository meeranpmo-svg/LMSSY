/* =========================================================
   SYPA IICPR LMS — Auth + utilities
   Pure-frontend session in localStorage. Replace with Supabase later.
   ========================================================= */

(function () {
  const SESSION_KEY = 'sypa.session';

  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
  }
  function setSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
  function clearSession() { localStorage.removeItem(SESSION_KEY); }

  function loginStudent(idOrEmail, password) {
    const s = window.SYPA.Data.findStudentByLogin(idOrEmail.trim());
    if (!s) return { ok: false, msg: 'No student account found for that ID/email.' };
    if (s.password !== password) return { ok: false, msg: 'Incorrect password.' };
    if (s.verified === false) return { ok: false, msg: 'Please verify your email before logging in.' };
    setSession({ role: 'student', userId: s.id, name: s.fullName, courseId: s.course });
    return { ok: true };
  }

  function loginAdmin(email, password) {
    const a = window.SYPA.Data.findAdminByEmail(email.trim());
    if (!a) return { ok: false, msg: 'No admin account found for that email.' };
    if (a.password !== password) return { ok: false, msg: 'Incorrect password.' };
    setSession({ role: a.role, userId: a.id, name: a.name });
    return { ok: true };
  }

  function requireRole(role, redirectTo) {
    const s = getSession();
    if (!s) { window.location.href = redirectTo || '../index.html'; return null; }
    if (Array.isArray(role) ? !role.includes(s.role) : s.role !== role) {
      window.location.href = redirectTo || '../index.html'; return null;
    }
    return s;
  }

  function logout(redirectTo) {
    clearSession();
    window.location.href = redirectTo || '../index.html';
  }

  // ---- Toast ----
  function toast(msg, type = 'info') {
    let host = document.getElementById('toast-container');
    if (!host) { host = document.createElement('div'); host.id = 'toast-container'; document.body.appendChild(host); }
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(40px)'; }, 2400);
    setTimeout(() => t.remove(), 2800);
  }

  // ---- Helpers ----
  function fmtDate(d) {
    if (!d) return '—';
    const dt = typeof d === 'string' ? new Date(d) : d;
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  function initials(name) {
    return (name || '?').split(/\s+/).slice(0, 2).map(p => p[0] || '').join('').toUpperCase();
  }
  function $(sel, ctx = document) { return ctx.querySelector(sel); }
  function $$(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)); }

  window.SYPA = Object.assign(window.SYPA || {}, {
    Auth: { getSession, setSession, clearSession, loginStudent, loginAdmin, requireRole, logout },
    UI: { toast, fmtDate, initials, $, $$ },
  });
})();
