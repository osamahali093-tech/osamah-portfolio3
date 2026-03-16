const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const year = document.getElementById('year');
const reveals = document.querySelectorAll('.reveal');
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') body.classList.add('light');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('portfolio-theme', body.classList.contains('light') ? 'light' : 'dark');
});

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

reveals.forEach(item => observer.observe(item));

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const target = button.dataset.filter;

    projects.forEach(project => {
      const category = project.dataset.category;
      const show = target === 'all' || category.includes(target);
      project.classList.toggle('hidden-project', !show);
    });
  });
});
