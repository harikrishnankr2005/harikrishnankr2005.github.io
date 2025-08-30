// Preloader Animation
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const letters = document.querySelectorAll(".letter");
  const body = document.body;

  // Prevent scrolling during preloader
  body.style.overflow = "hidden";

  // Animate letters appearing one by one
  letters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.1}s`;
  });

  // Start the sequence
  setTimeout(() => {
    // Add fly-away animation to letters
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add("fly-away");
      }, index * 50);
    });

    // Hide preloader and show main content
    setTimeout(() => {
      preloader.classList.add("hidden");
      body.style.overflow = "auto";

      // Remove preloader from DOM after transition
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1000);
  }, 4000); // Total animation duration: 4 seconds
});

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(26, 26, 26, 0.98)";
  } else {
    navbar.style.background = "rgba(26, 26, 26, 0.95)";
  }
});

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Animate skill levels when skills section comes into view
const skillsSection = document.querySelector("#skills");
const skillLevels = document.querySelectorAll(".skill-level");

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillLevels.forEach((skill) => {
          const level = skill.getAttribute("data-level");
          skill.style.setProperty("--level", level + "%");
        });
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillsObserver.observe(skillsSection);

// Typing effect for hero section
const heroText = document.querySelector(".hero-content h1");
const originalText = heroText.innerHTML;

function typeEffect() {
  heroText.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < originalText.length) {
      heroText.innerHTML += originalText.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 100);
}

// Start typing effect when page loads
window.addEventListener("load", () => {
  setTimeout(typeEffect, 500);
});

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;
  hero.style.transform = `translateY(${rate}px)`;
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add smooth reveal animation for project cards
const projectCards = document.querySelectorAll(".project-card");
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 }
);

projectCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  cardObserver.observe(card);
});

// Add scroll to top functionality
function createScrollToTop() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #3498db;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;

  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = "1";
    } else {
      scrollBtn.style.opacity = "0";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

createScrollToTop();
