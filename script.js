// Energy Capital Management - JavaScript functionality

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileCloseBtn = document.querySelector(".mobile-close-btn")
  const navLinks = document.querySelector(".nav-links")

  // Abrir menú
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active")
      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false")
    })
  }

  // Cerrar menú
  if (mobileCloseBtn && navLinks) {
    mobileCloseBtn.addEventListener("click", () => {
      navLinks.classList.remove("active")
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute("aria-expanded", "false")
      }
    })
  }

  // Smooth scrolling for navigation links
  const navLinksItems = document.querySelectorAll('.nav-links a[href^="#"]')
  navLinksItems.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerElement = document.querySelector(".header")
        const headerHeight = headerElement ? headerElement.offsetHeight : 0
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navLinks) {
          navLinks.classList.remove("active")
        }
      }
    })
  })

  // Header background on scroll
  const header = document.querySelector(".header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.background = "rgba(30, 58, 138, 0.95)"
      } else {
        header.style.background = "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
      }
    })
  }

  // Animate stats on scroll
  const stats = document.querySelectorAll(".stat-number")
  const animateStats = () => {
    stats.forEach((stat) => {
      const rect = stat.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const finalValue = Number.parseInt(stat.textContent.replace(/[^0-9]/g, ""))
        animateNumber(stat, 0, finalValue, 2000)
      }
    })
  }

  const animateNumber = (element, start, end, duration) => {
    const startTime = performance.now()
    const update = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.floor(start + (end - start) * progress)

      if (element.textContent.includes("$")) {
        element.textContent = "$" + current + "B+"
      } else if (element.textContent.includes("+")) {
        element.textContent = current + "+"
      } else {
        element.textContent = current
      }

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
    requestAnimationFrame(update)
  }

  // Trigger stats animation on scroll
  let statsAnimated = false
  window.addEventListener("scroll", () => {
    if (!statsAnimated) {
      const investmentsSection = document.querySelector(".investments")
      if (investmentsSection) {
        const rect = investmentsSection.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          animateStats()
          statsAnimated = true
        }
      }
    }
  })

  // Form handling (if contact form exists)
  const contactForm = document.querySelector("#contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
      // Add your form submission logic here
      alert("Thank you for your message! We will get back to you soon.")
      this.reset()
    })
  }
})