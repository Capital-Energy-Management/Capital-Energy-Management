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

  // ====================================================================
  // SPANISH TRANSLATION FUNCTIONALITY - NEW ADDITION
  // ====================================================================
  
  const spanishLink = document.getElementById('spanish-link')
  if (spanishLink) {
    spanishLink.addEventListener('click', function(e) {
      e.preventDefault()
      
      // Get current page name
      const currentPage = window.location.pathname.split('/').pop() || 'index.html'
      
      // Map of English to Spanish pages (create these pages when ready)
      const spanishPages = {
        'index.html': 'index-es.html',
        'who-we-are.html': 'quienes-somos.html',
        'how-we-work.html': 'como-trabajamos.html',
        'leadership.html': 'liderazgo.html',
        'contact.html': 'contacto.html',
        'privacy-policy.html': 'politica-privacidad.html',
        'terms-of-service.html': 'terminos-servicio.html'
      }

      // Check if Spanish version exists
      const spanishPage = spanishPages[currentPage]
      
      if (spanishPage) {
        // Try to navigate to Spanish version
        window.location.href = spanishPage
      } else {
        // Show custom styled modal
        showTranslationModal()
      }
    })
  }
})

// Function to show custom translation modal
function showTranslationModal() {
  // Check if modal already exists
  if (document.getElementById('translation-modal-overlay')) {
    return
  }

  // Create modal overlay
  const overlay = document.createElement('div')
  overlay.id = 'translation-modal-overlay'
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease-out;
  `

  // Create modal content
  const modal = document.createElement('div')
  modal.style.cssText = `
    background: white;
    padding: 32px;
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    text-align: center;
    animation: slideUp 0.3s ease-out;
  `

  modal.innerHTML = `
    <div style="margin-bottom: 16px;">
      <svg style="width: 48px; height: 48px; margin: 0 auto; color: #059669;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
      </svg>
    </div>
    <h3 style="font-size: 20px; font-weight: bold; color: #111827; margin-bottom: 8px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      Spanish version coming soon
    </h3>
    <p style="color: #6B7280; margin-bottom: 24px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      We're working on the Spanish translation. It will be available shortly.
    </p>
    <button id="modal-close-btn" style="
      background: #059669;
      color: white;
      padding: 10px 24px;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
    " onmouseover="this.style.background='#047857'" onmouseout="this.style.background='#059669'">
      Aceptar
    </button>
  `

  // Add CSS animations
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
  document.head.appendChild(style)

  overlay.appendChild(modal)
  document.body.appendChild(overlay)
  document.body.style.overflow = 'hidden'

  // Close modal functionality
  function closeModal() {
    overlay.style.animation = 'fadeIn 0.2s ease-out reverse'
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay)
      }
      document.body.style.overflow = ''
    }, 200)
  }

  // Close on button click
  const closeBtn = document.getElementById('modal-close-btn')
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal)
  }

  // Close on overlay click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      closeModal()
    }
  })

  // Close on ESC key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal()
      document.removeEventListener('keydown', handleEscape)
    }
  }
  document.addEventListener('keydown', handleEscape)
}