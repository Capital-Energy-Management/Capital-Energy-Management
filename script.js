// Energy Capital Management - JavaScript functionality

document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu toggle
  var mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  var mobileCloseBtn = document.querySelector(".mobile-close-btn");
  var navLinks = document.querySelector(".nav-links");

  // Open menu
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function() {
      var isOpen = navLinks.classList.toggle("active");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Close menu
  if (mobileCloseBtn && navLinks) {
    mobileCloseBtn.addEventListener("click", function() {
      navLinks.classList.remove("active");
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Smooth scrolling for navigation links
  var navLinksItems = document.querySelectorAll('.nav-links a[href^="#"]');
  navLinksItems.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      var targetId = this.getAttribute("href");
      var targetSection = document.querySelector(targetId);

      if (targetSection) {
        var headerElement = document.querySelector(".header");
        var headerHeight = headerElement ? headerElement.offsetHeight : 0;
        var targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

        // Close mobile menu if open
        if (navLinks) {
          navLinks.classList.remove("active");
        }
      }
    });
  });

  // Header background on scroll
  var header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 100) {
        header.style.background = "rgba(30, 58, 138, 0.95)";
      } else {
        header.style.background = "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)";
      }
    });
  }

  // Animate stats on scroll
  var stats = document.querySelectorAll(".stat-number");
  
  var animateStats = function() {
    stats.forEach(function(stat) {
      var rect = stat.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        var finalValue = parseInt(stat.textContent.replace(/[^0-9]/g, ""));
        animateNumber(stat, 0, finalValue, 2000);
      }
    });
  };

  var animateNumber = function(element, start, end, duration) {
    var startTime = performance.now();
    var update = function(currentTime) {
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var current = Math.floor(start + (end - start) * progress);

      if (element.textContent.includes("$")) {
        element.textContent = "$" + current + "B+";
      } else if (element.textContent.includes("+")) {
        element.textContent = current + "+";
      } else {
        element.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  // Trigger stats animation on scroll
  var statsAnimated = false;
  window.addEventListener("scroll", function() {
    if (!statsAnimated) {
      var investmentsSection = document.querySelector(".investments");
      if (investmentsSection) {
        var rect = investmentsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          animateStats();
          statsAnimated = true;
        }
      }
    }
  });

  // Form handling (if contact form exists)
  var contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    });
  }
});