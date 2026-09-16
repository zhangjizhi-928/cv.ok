const data = window.resumeData;
const pageShell = document.querySelector('.page-shell');
const renderList = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
const renderHeading = (lines) => `${lines[0]}<br /><span>${lines[1]}</span>`;
const renderTimeline = (category, section, number) => `<section class="resume-section timeline-section filter-section" id="${category}" data-category="${category}"><div class="section-label">${section.label} <span>${number}</span></div><div class="timeline">${section.items.map((item) => `<article class="timeline-item${item.current ? ' current' : ''}"><div class="timeline-date">${item.date}${item.note ? `<br /><small>${item.note}</small>` : ''}</div><div class="timeline-content"><p class="kicker">${item.place}</p><h3>${item.institution}</h3><h4>${item.degree}</h4>${item.paragraphs ? item.paragraphs.map((text) => `<p>${text}</p>`).join('') : renderList(item.bullets)}</div></article>`).join('')}</div></section>`;

const renderPage = () => {
  const { profile, about, intent, timeline, campus, skills, email, year } = data;
  pageShell.innerHTML = `<nav class="topbar" aria-label="主导航"><a class="brand" href="#top" aria-label="返回顶部"><span class="brand-mark">${profile.initials}</span><span>${profile.name}</span></a><div class="nav-actions"><a class="nav-link" href="#resume">简历 <span aria-hidden="true">↓</span></a><button class="theme-toggle" type="button" aria-label="切换显示主题" title="切换显示主题"><span aria-hidden="true">◐</span></button><a class="nav-link" href="mailto:${email}">联系我 <span aria-hidden="true">↗</span></a></div></nav>
  <section class="hero" id="top"><div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> ${profile.location} · ${profile.availability}</p><h1>${profile.title}<br /><em>${profile.name}</em></h1><p class="intro">${profile.intro}</p><div class="actions"><a class="button button-primary" href="mailto:${email}">发一封邮件 <span aria-hidden="true">↗</span></a><a class="button button-secondary" href="#about">了解更多 <span aria-hidden="true">↓</span></a></div></div><div class="hero-visual" aria-label="${profile.imageAlt}"><div class="image-frame"><img src="${profile.image}" alt="${profile.imageAlt}" /><div class="image-caption"><span>01</span><span>${profile.imageCaption}</span></div></div><div class="floating-note">${profile.school}<br /><strong>${profile.role}</strong></div></div></section>
  <section class="info-grid" id="about"><div class="section-label">关于我 <span>02</span></div><div class="about-copy"><h2>${renderHeading(about.heading)}</h2><p>${about.description}</p><div class="facts" aria-label="个人信息">${about.facts.map((fact) => fact.copyable ? `<button class="fact fact-copy" type="button" data-copy-email="${fact.value}" aria-label="复制邮箱地址"><span>${fact.label}</span><strong>${fact.value}</strong><small>点击复制</small></button>` : `<div class="fact"><span>${fact.label}</span><strong>${fact.value}</strong></div>`).join('')}</div></div></section>
  <section class="resume-section" id="resume"><div class="section-label">工作意向 <span>03</span></div><div class="intent-grid"><div><h2>${renderHeading(intent.heading)}</h2><p class="section-lead">${intent.description}</p></div><div class="intent-list">${intent.items.map((item) => `<div class="intent-item"><span>${item.label}</span><strong>${item.value}</strong></div>`).join('')}</div></div></section>
  <div class="resume-filter" role="tablist" aria-label="简历内容筛选"><span class="filter-label">探索经历</span>${[['all', '全部'], ['education', '教育'], ['experience', '工作'], ['campus', '活动']].map(([value, label], index) => `<button class="filter-button${index === 0 ? ' is-active' : ''}" type="button" role="tab" aria-selected="${index === 0}" data-filter="${value}">${label}</button>`).join('')}</div>
  ${renderTimeline('education', timeline.education, '04')}${renderTimeline('experience', timeline.experience, '05')}
  <section class="resume-section projects-section filter-section" id="campus" data-category="campus"><div class="section-label">${campus.label} <span>06</span></div><div class="project-feature"><div class="project-meta"><span>${campus.date}</span><span>${campus.place}</span></div><div class="project-content"><p class="kicker">${campus.kicker}</p><h2>${campus.title}</h2>${renderList(campus.bullets)}</div><div class="project-stat"><strong>${campus.stat.value}</strong><span>${campus.stat.label}</span></div></div></section>
  <section class="resume-section skills-section" id="skills"><div class="skills-heading"><div class="section-label">技能与其他 <span>07</span></div><div class="skills-controls" aria-label="技能模块导航"><button class="skills-arrow" type="button" data-scroll-skills="-1" aria-label="向左查看技能"><span aria-hidden="true">←</span></button><button class="skills-arrow" type="button" data-scroll-skills="1" aria-label="向右查看技能"><span aria-hidden="true">→</span></button></div></div><div class="skills-scroller" data-skills-scroller tabindex="0" aria-label="技能与其他列表"><div class="skills-grid">${skills.map((group) => `<div class="skill-group"><span class="skill-title">${group.title}</span><p>${group.lines.join('<br />')}</p></div>`).join('')}</div></div></section><footer class="footer"><span>© ${year} ${profile.name}</span><span>Made with curiosity · ${profile.location}</span></footer>`;
};

renderPage();

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
const progressBar = document.querySelector('.scroll-progress span');
const themeToggle = document.querySelector('.theme-toggle');
const filterButtons = document.querySelectorAll('.filter-button');
const filterSections = document.querySelectorAll('.filter-section');
const copyEmailButton = document.querySelector('[data-copy-email]');
const skillsScroller = document.querySelector('[data-skills-scroller]');
const skillsArrows = document.querySelectorAll('[data-scroll-skills]');

const updateSkillsControls = () => {
  if (!skillsScroller) return;
  const maxScroll = skillsScroller.scrollWidth - skillsScroller.clientWidth;
  skillsArrows.forEach((button) => {
    const direction = Number(button.dataset.scrollSkills);
    button.disabled = direction < 0 ? skillsScroller.scrollLeft <= 1 : skillsScroller.scrollLeft >= maxScroll - 1;
  });
};

skillsArrows.forEach((button) => {
  button.addEventListener('click', () => {
    skillsScroller.scrollBy({ left: Number(button.dataset.scrollSkills) * 260, behavior: 'smooth' });
  });
});

skillsScroller.addEventListener('scroll', updateSkillsControls, { passive: true });
skillsScroller.addEventListener('wheel', (event) => {
  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault();
    skillsScroller.scrollLeft += event.deltaY;
  }
}, { passive: false });

let dragStartX = 0;
let dragStartScroll = 0;
let isDraggingSkills = false;

skillsScroller.addEventListener('pointerdown', (event) => {
  isDraggingSkills = true;
  dragStartX = event.clientX;
  dragStartScroll = skillsScroller.scrollLeft;
  skillsScroller.setPointerCapture(event.pointerId);
});

skillsScroller.addEventListener('pointermove', (event) => {
  if (!isDraggingSkills) return;
  skillsScroller.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
});

skillsScroller.addEventListener('pointerup', () => {
  isDraggingSkills = false;
});

skillsScroller.addEventListener('pointercancel', () => {
  isDraggingSkills = false;
});
window.addEventListener('resize', updateSkillsControls);
updateSkillsControls();

const updateProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('is-dark');
  const darkModeEnabled = document.body.classList.contains('is-dark');
  themeToggle.setAttribute('aria-label', darkModeEnabled ? '切换浅色主题' : '切换深色主题');
  localStorage.setItem('resume-theme', darkModeEnabled ? 'dark' : 'light');
});

if (localStorage.getItem('resume-theme') === 'dark') {
  document.body.classList.add('is-dark');
  themeToggle.setAttribute('aria-label', '切换浅色主题');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle('is-active', isSelected);
      item.setAttribute('aria-selected', isSelected);
    });

    filterSections.forEach((section) => {
      section.classList.toggle('is-hidden', selectedFilter !== 'all' && section.dataset.category !== selectedFilter);
    });
  });
});

copyEmailButton.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.copyEmail;

  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.classList.add('is-copied');
    copyEmailButton.querySelector('small').textContent = '已复制';
    window.setTimeout(() => {
      copyEmailButton.classList.remove('is-copied');
      copyEmailButton.querySelector('small').textContent = '点击复制';
    }, 1800);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.resume-section, .project-feature, .skill-group').forEach((element) => {
  element.classList.add('reveal-ready');
  revealObserver.observe(element);
});

emailLinks.forEach((link) => {
  link.addEventListener('click', () => {
    link.classList.add('is-clicked');
    window.setTimeout(() => link.classList.remove('is-clicked'), 500);
  });
});