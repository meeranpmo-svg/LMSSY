/* =========================================================
   SYPA IICPR LMS — Shared layout shell
   Renders sidebar + header for student / admin / super-admin
   ========================================================= */
(function () {
  const { Auth, UI } = window.SYPA;

  const NAV = {
    student: [
      { section: 'Learning' },
      { href: 'dashboard.html',     icon: 'fa-gauge-high',      label: 'Dashboard' },
      { href: 'courses.html',       icon: 'fa-graduation-cap',  label: 'My Courses' },
      { href: 'lesson.html',        icon: 'fa-circle-play',     label: 'Lessons & Videos' },
      { href: 'assessments.html',   icon: 'fa-pen-to-square',   label: 'Tests & Assignments' },
      { href: 'grades.html',        icon: 'fa-square-poll-vertical', label: 'Grades & Feedback' },
      { href: 'progress.html',      icon: 'fa-chart-line',      label: 'My Progress' },
      { section: 'Communication' },
      { href: 'announcements.html', icon: 'fa-bullhorn',        label: 'Announcements' },
      { href: 'doubts.html',        icon: 'fa-circle-question', label: 'Doubts & Queries' },
      { section: 'Account' },
      { href: 'profile.html',       icon: 'fa-user',            label: 'Profile' },
    ],
    admin: [
      { section: 'Overview' },
      { href: 'dashboard.html',     icon: 'fa-gauge-high',      label: 'Dashboard' },
      { href: 'reports.html',       icon: 'fa-chart-pie',       label: 'Reports & Analytics' },
      { section: 'Content' },
      { href: 'courses.html',       icon: 'fa-graduation-cap',  label: 'Courses & Modules' },
      { href: 'content.html',       icon: 'fa-cloud-arrow-up',  label: 'Content Upload' },
      { section: 'People' },
      { href: 'students.html',      icon: 'fa-users',           label: 'Students' },
      { href: 'batches.html',       icon: 'fa-layer-group',     label: 'Batches' },
      { section: 'Assessment' },
      { href: 'assessments.html',   icon: 'fa-pen-to-square',   label: 'Assessments' },
      { href: 'grading.html',       icon: 'fa-clipboard-check', label: 'Grading' },
      { section: 'Communication' },
      { href: 'announcements.html', icon: 'fa-bullhorn',        label: 'Announcements' },
      { href: 'doubts.html',        icon: 'fa-circle-question', label: 'Doubt Management' },
    ],
    super: [
      { section: 'Master Controls' },
      { href: 'dashboard.html',     icon: 'fa-gauge-high',     label: 'Master Dashboard' },
      { href: 'admins.html',        icon: 'fa-user-shield',    label: 'Admins / Faculty' },
      { href: 'settings.html',      icon: 'fa-gear',           label: 'Institute Settings' },
      { href: 'fees.html',          icon: 'fa-indian-rupee-sign', label: 'Fees & Records' },
      { href: 'reports.html',       icon: 'fa-chart-pie',      label: 'Master Reports' },
    ],
  };

  function buildSidebar(role, currentFile) {
    const links = NAV[role] || [];
    const settings = window.SYPA.Data.settings();
    const session = Auth.getSession();
    const labelByRole = { student: 'Student', admin: 'Admin / Instructor', super: 'Super Admin' };

    let inner = '';
    inner += `
      <div class="sb-brand">
        <div class="mark"><i class="fa-solid fa-spa"></i></div>
        <div><div class="name">SYPA IICPR</div><div class="sub">${settings.tagline || 'Wellness Education'}</div></div>
      </div>`;
    for (const item of links) {
      if (item.section) { inner += `<div class="sb-section">${item.section}</div>`; continue; }
      const active = (item.href === currentFile) ? ' active' : '';
      inner += `<a class="sb-link${active}" href="${item.href}"><i class="fa-solid ${item.icon}"></i> ${item.label}</a>`;
    }
    inner += `
      <div class="sb-foot">
        <div class="sb-user">
          <div class="avatar">${UI.initials(session ? session.name : '?')}</div>
          <div>
            <div class="name">${session ? session.name : 'Guest'}</div>
            <div class="role">${labelByRole[role] || role}</div>
          </div>
        </div>
        <a class="sb-link mt-2" href="#" id="logout-link"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out</a>
        <div class="sb-credit">
          Developed &amp; managed by<br><strong>Smart Shield AI &amp; Cyber Security</strong>
        </div>
      </div>`;
    return inner;
  }

  function buildHeader(title, crumb) {
    return `
      <div class="flex items-center gap-3">
        <button class="icon-btn sb-toggle" id="sb-toggle"><i class="fa-solid fa-bars"></i></button>
        <div>
          <div class="crumb">${crumb || ''}</div>
          <h1>${title}</h1>
        </div>
      </div>
      <div class="header-right">
        <button class="icon-btn" title="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
        <button class="icon-btn" title="Notifications"><i class="fa-solid fa-bell"></i><span class="dot"></span></button>
      </div>`;
  }

  function mount(opts) {
    const { role, title, crumb, redirectTo, allow } = opts;
    const allowed = allow || [role];
    const session = Auth.requireRole(allowed, redirectTo || '../index.html');
    if (!session) return null;

    const file = location.pathname.split('/').pop() || 'dashboard.html';
    const navRole = (session.role === 'super' && allowed.includes('super')) ? 'super'
                  : (session.role === 'admin') ? 'admin' : 'student';

    document.body.innerHTML = `
      <div id="toast-container"></div>
      <div class="app-shell">
        <aside class="sidebar" id="sidebar">${buildSidebar(navRole, file)}</aside>
        <div class="app-main">
          <header class="app-header">${buildHeader(title, crumb)}</header>
          <main class="app-content" id="app-content"></main>
        </div>
      </div>`;

    document.getElementById('logout-link').addEventListener('click', (e) => {
      e.preventDefault();
      const dest = (navRole === 'student') ? '../index.html' : '../admin-login.html';
      Auth.logout(dest);
    });
    const toggle = document.getElementById('sb-toggle');
    if (toggle) toggle.addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));

    return { session, content: document.getElementById('app-content') };
  }

  window.SYPA = Object.assign(window.SYPA || {}, { Shell: { mount } });
})();
