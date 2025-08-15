// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.getElementById('main-nav');

mobileMenuBtn.addEventListener('click', () => {
   mainNav.classList.toggle('active');
});

// Smooth Scrolling für Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
       e.preventDefault();
       
       const targetId = this.getAttribute('href');
       const targetElement = document.querySelector(targetId);
       
       if (targetElement) {
           window.scrollTo({
               top: targetElement.offsetTop - 70,
               behavior: 'smooth'
           });
           
           // Schliesse das mobile Menü nach dem Klick
           if (mainNav.classList.contains('active')) {
               mainNav.classList.remove('active');
           }
       }
   });
});

// Animierte Fortschrittsbalken für Skills
function animateSkills() {
   const skillsSection = document.querySelector('.skills');
   const progressBars = document.querySelectorAll('.progress');
   
   // Prüfe, ob der Skills-Bereich im sichtbaren Bereich ist
   const skillsPosition = skillsSection.getBoundingClientRect().top;
   const screenPosition = window.innerHeight / 1.3;
   
   if (skillsPosition < screenPosition) {
       progressBars.forEach(progress => {
           progress.style.width = progress.parentElement.getAttribute('data-width');
       });
       window.removeEventListener('scroll', animateSkills);
   }
}

// Setze die ursprünglichen Breiten als Attribute
document.querySelectorAll('.progress').forEach(progress => {
   const width = progress.style.width;
   progress.parentElement.setAttribute('data-width', width);
   progress.style.width = '0';
});

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Aktiver Navigationslink beim Scrollen
window.addEventListener('scroll', () => {
   const sections = document.querySelectorAll('section');
   const navLinks = document.querySelectorAll('nav ul li a');
   
   let current = '';
   
   sections.forEach(section => {
       const sectionTop = section.offsetTop;
       const sectionHeight = section.clientHeight;
       
       if (pageYOffset >= sectionTop - 100) {
           current = section.getAttribute('id');
       }
   });
   
   navLinks.forEach(link => {
       link.classList.remove('active');
       if (link.getAttribute('href') === `#${current}`) {
           link.classList.add('active');
       }
   });
});

// Timeline Animation beim Scrollen
function animateTimeline() {
   const timelineItems = document.querySelectorAll('.timeline-item');
   
   timelineItems.forEach(item => {
       const itemPosition = item.getBoundingClientRect().top;
       const screenPosition = window.innerHeight / 1.3;
       
       if (itemPosition < screenPosition) {
           item.style.opacity = '1';
           item.style.transform = 'translateY(0)';
       }
   });
}

// Setze initiale Timeline-Styles
document.querySelectorAll('.timeline-item').forEach(item => {
   item.style.opacity = '0';
   item.style.transform = 'translateY(50px)';
   item.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateTimeline);
window.addEventListener('load', animateTimeline);

// Intersection Observer für bessere Performance (Alternative zur Scroll-Animation)
if ('IntersectionObserver' in window) {
   const observerOptions = {
       threshold: 0.1,
       rootMargin: '0px 0px -50px 0px'
   };

   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.style.opacity = '1';
               entry.target.style.transform = 'translateY(0)';
               observer.unobserve(entry.target);
           }
       });
   }, observerOptions);

   // Beobachte Timeline-Items
   document.querySelectorAll('.timeline-item').forEach(item => {
       observer.observe(item);
   });
}