const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
const progressBar = document.querySelector('.scroll-progress span');
const themeToggle = document.querySelector('.theme-toggle');
const filterButtons = document.querySelectorAll('.filter-button');
const filterSections = document.querySelectorAll('.filter-section');
const copyEmailButton = document.querySelector('[data-copy-email]');

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