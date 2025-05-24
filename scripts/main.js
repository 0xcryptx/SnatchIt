document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#contact form');
  const thankYou = document.getElementById('thankyou-message');
  if (form && thankYou) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent actual form submission
      thankYou.style.display = 'block';
      form.reset(); // Optionally reset the form fields
    });
  }

  // Fade-in/out on scroll using Intersection Observer
  const fadeSections = document.querySelectorAll('.fade-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.15 });

  fadeSections.forEach(section => observer.observe(section));

  // Immediately reveal any sections already in view (for mobile browsers that don't trigger observer on load)
  fadeSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      section.classList.add('visible');
    }
  });

  // Smooth scroll with easing and delay for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 120); // 120ms delay before scrolling
      }
    });
  });

  // Staggered fade-in for About section people (per-person on mobile)
  const aboutSection = document.getElementById('about-team');
  if (aboutSection) {
    const people = aboutSection.querySelectorAll('.about-person');
    if (window.innerWidth < 600) {
      // MOBILE: Animate each person as they enter viewport
      const personObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 200); // Optional: slight stagger between people
            personObserver.unobserve(entry.target); // Animate only once
          }
        });
      }, { threshold: 0.3 });
      people.forEach(person => personObserver.observe(person));
    } else {
      // DESKTOP: Animate all at once when section enters, only once
      const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            people.forEach((person, i) => {
              setTimeout(() => {
                person.classList.add('visible');
              }, i * 500);
            });
            aboutObserver.disconnect(); // <-- disconnect after animating once
          }
        });
      }, { threshold: 0.2 });
      aboutObserver.observe(aboutSection);
    }
  }

  // Fade in sections on scroll and on load
  function revealSections() {
    const fadeSections = document.querySelectorAll('.fade-section');
    fadeSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        section.classList.add('visible');
      }
    });
  }

  // Run on scroll and on load
  window.addEventListener('scroll', revealSections);
  window.addEventListener('DOMContentLoaded', revealSections);

  // Hamburger menu toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menuDropdown = document.getElementById('mobileMenuDropdown');
  if (menuBtn && menuDropdown) {
    menuBtn.addEventListener('click', function() {
      menuDropdown.classList.toggle('open');
      menuBtn.classList.toggle('rotated');
    });
    menuDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuDropdown.classList.remove('open');
        menuBtn.classList.remove('rotated');
      });
    });
  }

  // --- Render Categories Section as cards ---
  const categoriesContent = document.getElementById('categories-content');
  if (categoriesContent && typeof products !== "undefined") {
    // Get unique categories
    const categories = [...new Set(products.map(p => p.category))];

    // Choose a representative image for each category (first product's image in that category)
    const categoryImages = {};
    categories.forEach(cat => {
      const prod = products.find(p => p.category === cat);
      categoryImages[cat] = prod ? prod.image : '';
    });

    // Render categories as cards
    let row = document.createElement('div');
    row.className = 'w3-row-padding';
    categories.forEach(category => {
      row.innerHTML += `
        <div class="w3-col l3 m6 w3-margin-bottom">
          <div class="w3-display-container" style="cursor:pointer;">
            <a href="category.html?cat=${encodeURIComponent(category)}">
              <div class="w3-display-bottomleft w3-black w3-padding" style="font-size:1.2em;">${category}</div>
              <img src="${categoryImages[category]}" alt="${category}" style="width:100%; min-height:180px; object-fit:cover;">
            </a>
          </div>
        </div>
      `;
    });
    categoriesContent.appendChild(row);
  }
});