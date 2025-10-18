const dynamicText = document.querySelector(".typed-text");
const words = [
  "Your Dream Software",
  "Mobile Applications",
  "Web Platforms",
  "Desktop Solutions",
  "Cross-Platform Apps",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  dynamicText.textContent = currentChar;
  dynamicText.classList.add("stop-blinking");

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    dynamicText.classList.remove("stop-blinking");
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 100;
  const duration = 2000;
  const stepTime = duration / 100;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
};

const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("hero-stats")) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
        observer.unobserve(entry.target);
      }

      if (
        entry.target.classList.contains("platform-card") ||
        entry.target.classList.contains("service-card") ||
        entry.target.classList.contains("portfolio-item")
      ) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(30px)";

        setTimeout(() => {
          entry.target.style.transition = "all 0.6s ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 100);
      }
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) observer.observe(heroStats);

  const platformCards = document.querySelectorAll(".platform-card");
  platformCards.forEach((card) => observer.observe(card));

  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => observer.observe(card));

  const portfolioItems = document.querySelectorAll(".portfolio-item");
  portfolioItems.forEach((item) => observer.observe(item));
});

const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const contactForm = document.querySelector(".contact-form");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

const formInputs = document.querySelectorAll(
  ".contact-form input, .contact-form textarea"
);

formInputs.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.hasAttribute("required") && !this.value.trim()) {
      this.style.borderColor = "#ef4444";
    } else if (this.type === "email" && this.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value)) {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "rgba(99, 102, 241, 0.5)";
      }
    } else if (this.value.trim()) {
      this.style.borderColor = "rgba(99, 102, 241, 0.5)";
    }
  });

  input.addEventListener("focus", function () {
    this.style.borderColor = "var(--primary-color)";
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll(".gradient-orb");

  orbs.forEach((orb, index) => {
    const speed = 0.5 + index * 0.2;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const techIcons = document.querySelectorAll(".tech-icon");

  techIcons.forEach((icon, index) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = 3 + Math.random() * 2;

    icon.style.animationDelay = `${randomDelay}s`;
    icon.style.animationDuration = `${randomDuration}s`;

    icon.addEventListener("click", function () {
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "";
      }, 10);

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
});

window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});
