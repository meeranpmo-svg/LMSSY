/* =========================================================
   SYPA IICPR LMS — Seed data + storage helpers
   Stores everything in localStorage under keys prefixed `sypa.`
   Replace these helpers with Supabase / API calls later.
   ========================================================= */

(function () {
  const KEYS = {
    courses: 'sypa.courses',
    students: 'sypa.students',
    admins: 'sypa.admins',
    enrolments: 'sypa.enrolments',
    progress: 'sypa.progress',
    assessments: 'sypa.assessments',
    submissions: 'sypa.submissions',
    announcements: 'sypa.announcements',
    doubts: 'sypa.doubts',
    batches: 'sypa.batches',
    fees: 'sypa.fees',
    settings: 'sypa.settings',
    seeded: 'sypa.seeded.v1',
  };

  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  }
  function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function uid(prefix = 'id') { return prefix + '_' + Math.random().toString(36).slice(2, 9); }

  // ---- Seed (only first run) ----
  function seedIfEmpty() {
    if (localStorage.getItem(KEYS.seeded)) return;

    const courses = [
      {
        id: 'crs_dcp', code: 'DCP-101', title: 'Diploma in Counselling Psychology', level: 'Diploma',
        duration: '6 months', icon: 'fa-brain', accent: 'alt-1',
        description: 'Foundations of counselling theory, therapeutic skills, and ethical practice for aspiring mental health professionals.',
        modules: [
          { id: 'm1', title: 'Introduction to Counselling Psychology', duration: '42 min', resources: 3 },
          { id: 'm2', title: 'Major Theoretical Approaches', duration: '58 min', resources: 5 },
          { id: 'm3', title: 'The Therapeutic Relationship', duration: '36 min', resources: 4 },
          { id: 'm4', title: 'Assessment & Intake', duration: '48 min', resources: 6 },
          { id: 'm5', title: 'Ethics & Professional Practice', duration: '40 min', resources: 3 },
        ],
      },
      {
        id: 'crs_dnd', code: 'DND-101', title: 'Diploma in Nutrition & Dietetics', level: 'Diploma',
        duration: '6 months', icon: 'fa-apple-whole', accent: 'alt-2',
        description: 'Science of nutrition, meal planning, and dietetics for clinical, sports and community wellness contexts.',
        modules: [
          { id: 'm1', title: 'Macronutrients & Micronutrients', duration: '50 min', resources: 4 },
          { id: 'm2', title: 'Energy Balance & Metabolism', duration: '44 min', resources: 3 },
          { id: 'm3', title: 'Diet Across the Life-cycle', duration: '52 min', resources: 5 },
          { id: 'm4', title: 'Clinical Dietetics', duration: '60 min', resources: 6 },
        ],
      },
      {
        id: 'crs_adcc', code: 'ADCC-201', title: 'Advanced Diploma in Counselling Psychology & Coaching', level: 'Adv. Diploma',
        duration: '12 months', icon: 'fa-user-doctor', accent: 'alt-3',
        description: 'Advanced clinical skills, coaching frameworks, supervised practice and case-based learning.',
        modules: [
          { id: 'm1', title: 'Advanced Clinical Assessment', duration: '55 min', resources: 4 },
          { id: 'm2', title: 'Cognitive-Behavioural Therapy', duration: '70 min', resources: 6 },
          { id: 'm3', title: 'Coaching Frameworks (ICF / GROW)', duration: '48 min', resources: 5 },
          { id: 'm4', title: 'Supervised Practice', duration: '90 min', resources: 8 },
          { id: 'm5', title: 'Capstone Case Study', duration: '60 min', resources: 4 },
        ],
      },
    ];

    const batches = [
      { id: 'b_dcp_25a', courseId: 'crs_dcp', name: 'DCP — May 2026 Intake', startDate: '2026-05-15', students: 18 },
      { id: 'b_dnd_25a', courseId: 'crs_dnd', name: 'DND — Apr 2026 Intake', startDate: '2026-04-10', students: 12 },
      { id: 'b_adcc_25', courseId: 'crs_adcc', name: 'ADCC — Mar 2026 Intake', startDate: '2026-03-01', students: 9 },
    ];

    const students = [
      { id: 'stu_001', studentId: 'SYPA2026001', fullName: 'Priya Ramesh', email: 'priya@example.com', mobile: '+91 98xxxxxx01', dob: '1998-08-12', gender: 'Female', city: 'Chennai', state: 'Tamil Nadu', course: 'crs_dcp', qualification: 'B.A. Psychology', occupation: 'Counsellor (Trainee)', password: 'student123', verified: true, createdAt: '2026-04-12' },
      { id: 'stu_002', studentId: 'SYPA2026002', fullName: 'Arjun Mehta', email: 'arjun@example.com', mobile: '+91 98xxxxxx02', dob: '1995-02-22', gender: 'Male', city: 'Pune', state: 'Maharashtra', course: 'crs_adcc', qualification: 'M.A. Psychology', occupation: 'Therapist', password: 'student123', verified: true, createdAt: '2026-03-04' },
      { id: 'stu_003', studentId: 'SYPA2026003', fullName: 'Neha Iyer', email: 'neha@example.com', mobile: '+91 98xxxxxx03', dob: '2000-11-05', gender: 'Female', city: 'Bengaluru', state: 'Karnataka', course: 'crs_dnd', qualification: 'B.Sc. Nutrition', occupation: 'Dietitian (Junior)', password: 'student123', verified: true, createdAt: '2026-04-18' },
    ];

    const admins = [
      { id: 'adm_001', email: 'admin@sypa.in', name: 'Dr. Kavita Rao', role: 'admin', password: 'admin123' },
      { id: 'adm_002', email: 'super@sypa.in', name: 'Institute Director', role: 'super', password: 'super123' },
    ];

    const enrolments = [
      { studentId: 'stu_001', courseId: 'crs_dcp', batchId: 'b_dcp_25a', enrolledAt: '2026-04-12' },
      { studentId: 'stu_002', courseId: 'crs_adcc', batchId: 'b_adcc_25', enrolledAt: '2026-03-04' },
      { studentId: 'stu_003', courseId: 'crs_dnd', batchId: 'b_dnd_25a', enrolledAt: '2026-04-18' },
    ];

    const progress = [
      { studentId: 'stu_001', courseId: 'crs_dcp', completed: ['m1', 'm2'], lastModule: 'm3', percent: 40 },
      { studentId: 'stu_002', courseId: 'crs_adcc', completed: ['m1', 'm2', 'm3'], lastModule: 'm4', percent: 60 },
      { studentId: 'stu_003', courseId: 'crs_dnd', completed: ['m1'], lastModule: 'm2', percent: 25 },
    ];

    const assessments = [
      { id: 'as_dcp_m1', courseId: 'crs_dcp', moduleId: 'm1', title: 'Module 1 — MCQ Quiz', type: 'mcq', durationMin: 15, marks: 20, status: 'published',
        questions: [
          { q: 'Counselling psychology primarily focuses on:', options: ['Diagnosis of severe disorders', 'Personal & interpersonal functioning across the lifespan', 'Pharmacological intervention', 'Surgical planning'], answer: 1 },
          { q: 'Which is a core counselling skill?', options: ['Active listening', 'Memorisation', 'Speed reading', 'Public speaking'], answer: 0 },
          { q: 'Which framework defines ethical practice in counselling?', options: ['IEEE', 'APA / BPS guidelines', 'ISO 9001', 'PMI PMBOK'], answer: 1 },
          { q: 'Empathy in counselling is best described as:', options: ['Feeling sorry for the client', 'Understanding the client\'s frame of reference', 'Solving the client\'s problem', 'Sharing personal stories'], answer: 1 },
        ] },
      { id: 'as_dnd_m1', courseId: 'crs_dnd', moduleId: 'm1', title: 'Module 1 — Macronutrients Quiz', type: 'mcq', durationMin: 10, marks: 15, status: 'published',
        questions: [
          { q: '1 gram of fat provides approximately how many kcal?', options: ['4', '7', '9', '12'], answer: 2 },
          { q: 'Which is a complete protein source?', options: ['Wheat', 'Egg', 'Rice', 'Lentils alone'], answer: 1 },
          { q: 'Fibre is classified under:', options: ['Macronutrient — carbohydrate', 'Micronutrient — vitamin', 'Lipid', 'Mineral'], answer: 0 },
        ] },
      { id: 'as_dcp_assg1', courseId: 'crs_dcp', moduleId: 'm2', title: 'Reflective Essay — Theoretical Approach', type: 'assignment', durationMin: null, marks: 30, status: 'published',
        prompt: 'In 800 words, compare two counselling approaches and discuss which resonates with you and why. Cite at least 3 academic sources.' },
    ];

    const submissions = [
      { id: 'sub_001', assessmentId: 'as_dcp_m1', studentId: 'stu_001', score: 18, total: 20, submittedAt: '2026-04-22', feedback: 'Excellent grasp of the basics. Review ethical frameworks once more.' },
    ];

    const announcements = [
      { id: 'an_001', scope: 'global', title: 'Welcome to SYPA IICPR LMS', body: 'The portal is now live for all enrolled students. Reach out to your batch coordinator for any onboarding queries.', postedBy: 'Institute', postedAt: '2026-05-01' },
      { id: 'an_002', scope: 'course', courseId: 'crs_dcp', title: 'Live mentoring session — May 12', body: 'A live Q&A with Dr. Kavita Rao for the DCP cohort on May 12, 7 PM IST.', postedBy: 'Dr. Kavita Rao', postedAt: '2026-05-04' },
      { id: 'an_003', scope: 'global', title: 'Exam schedule released', body: 'Module-wise quiz schedule for May–June is now visible under Assessments.', postedBy: 'Institute', postedAt: '2026-05-06' },
    ];

    const doubts = [
      { id: 'd_001', studentId: 'stu_001', courseId: 'crs_dcp', moduleId: 'm2', text: 'Could you clarify the difference between humanistic and existential approaches?', reply: 'Both honour subjective experience, but existential therapy specifically engages with anxiety around freedom, meaning and mortality. Re-watch Module 2 from 22:14.', repliedBy: 'Dr. Kavita Rao', createdAt: '2026-04-25', status: 'answered' },
      { id: 'd_002', studentId: 'stu_003', courseId: 'crs_dnd', moduleId: 'm1', text: 'How do we calculate kcal for mixed Indian meals?', reply: null, repliedBy: null, createdAt: '2026-05-02', status: 'open' },
    ];

    const fees = [
      { id: 'fee_001', studentId: 'stu_001', courseId: 'crs_dcp', amount: 35000, paid: 35000, status: 'paid', dueDate: '2026-04-15' },
      { id: 'fee_002', studentId: 'stu_002', courseId: 'crs_adcc', amount: 75000, paid: 40000, status: 'partial', dueDate: '2026-05-30' },
      { id: 'fee_003', studentId: 'stu_003', courseId: 'crs_dnd', amount: 30000, paid: 0,     status: 'pending', dueDate: '2026-05-25' },
    ];

    const settings = {
      instituteName: 'SYPA IICPR Institute',
      tagline: 'Mental & Physical Wellness Education',
      contactEmail: 'hello@sypa.in',
      contactPhone: '+91 98xxxxxxxx',
      address: 'Chennai, India',
      certificateSignatory: 'Dr. Kavita Rao, Director',
    };

    save(KEYS.courses, courses);
    save(KEYS.students, students);
    save(KEYS.admins, admins);
    save(KEYS.enrolments, enrolments);
    save(KEYS.progress, progress);
    save(KEYS.assessments, assessments);
    save(KEYS.submissions, submissions);
    save(KEYS.announcements, announcements);
    save(KEYS.doubts, doubts);
    save(KEYS.batches, batches);
    save(KEYS.fees, fees);
    save(KEYS.settings, settings);
    localStorage.setItem(KEYS.seeded, '1');
  }

  // ---- Public API ----
  const Data = {
    KEYS, load, save, uid, seedIfEmpty,
    courses:    () => load(KEYS.courses, []),
    students:   () => load(KEYS.students, []),
    admins:     () => load(KEYS.admins, []),
    enrolments: () => load(KEYS.enrolments, []),
    progress:   () => load(KEYS.progress, []),
    assessments: () => load(KEYS.assessments, []),
    submissions: () => load(KEYS.submissions, []),
    announcements: () => load(KEYS.announcements, []),
    doubts:     () => load(KEYS.doubts, []),
    batches:    () => load(KEYS.batches, []),
    fees:       () => load(KEYS.fees, []),
    settings:   () => load(KEYS.settings, {}),

    findCourse: (id) => Data.courses().find(c => c.id === id),
    findStudent: (id) => Data.students().find(s => s.id === id),
    findStudentByLogin: (loginId) => {
      const s = Data.students();
      return s.find(x => x.email === loginId || x.studentId === loginId);
    },
    findAdminByEmail: (email) => Data.admins().find(a => a.email === email),
    progressFor: (studentId, courseId) => Data.progress().find(p => p.studentId === studentId && p.courseId === courseId),
    enrolmentsFor: (studentId) => Data.enrolments().filter(e => e.studentId === studentId),
    assessmentsForCourse: (courseId) => Data.assessments().filter(a => a.courseId === courseId),
    submissionsForStudent: (studentId) => Data.submissions().filter(s => s.studentId === studentId),
    doubtsForStudent: (studentId) => Data.doubts().filter(d => d.studentId === studentId),

    addStudent(stu) {
      const list = Data.students(); list.push(stu); save(KEYS.students, list);
    },
    addAnnouncement(a) { const l = Data.announcements(); l.unshift(a); save(KEYS.announcements, l); },
    addDoubt(d) { const l = Data.doubts(); l.unshift(d); save(KEYS.doubts, l); },
    addSubmission(s) { const l = Data.submissions(); l.unshift(s); save(KEYS.submissions, l); },
    updateProgress(studentId, courseId, moduleId) {
      const list = Data.progress();
      const idx = list.findIndex(p => p.studentId === studentId && p.courseId === courseId);
      const course = Data.findCourse(courseId);
      const total = course ? course.modules.length : 1;
      if (idx >= 0) {
        const p = list[idx];
        if (!p.completed.includes(moduleId)) p.completed.push(moduleId);
        p.lastModule = moduleId;
        p.percent = Math.round((p.completed.length / total) * 100);
        list[idx] = p;
      } else {
        list.push({ studentId, courseId, completed: [moduleId], lastModule: moduleId, percent: Math.round((1 / total) * 100) });
      }
      save(KEYS.progress, list);
    },
  };

  // Run seed immediately
  seedIfEmpty();
  window.SYPA = Object.assign(window.SYPA || {}, { Data });
})();
