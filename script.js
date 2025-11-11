// ====== MOBILE MENU FUNCTIONALITY ======
class MobileMenu {
  constructor() {
    this.menuButton = document.getElementById('mobileMenuBtn');
    this.navigation = document.getElementById('mainNav');
    this.isOpen = false;
    
    if (this.menuButton && this.navigation) {
      this.init();
    }
  }
  
  init() {
    // Menu button click event
    this.menuButton.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking on navigation links
    this.navigation.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && 
          !this.navigation.contains(e.target) && 
          !this.menuButton.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.isOpen = true;
    this.menuButton.setAttribute('aria-expanded', 'true');
    this.navigation.classList.add('active');
    document.body.classList.add('no-scroll');
  }
  
  closeMenu() {
    this.isOpen = false;
    this.menuButton.setAttribute('aria-expanded', 'false');
    this.navigation.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}

// ====== BACK TO TOP FUNCTIONALITY ======
class BackToTop {
  constructor() {
    this.button = document.getElementById('backToTop');
    if (this.button) {
      this.init();
    }
  }
  
  init() {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => this.toggleVisibility());
    
    // Scroll to top when button is clicked
    this.button.addEventListener('click', () => this.scrollToTop());
    
    // Hide button initially
    this.toggleVisibility();
  }
  
  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// ====== SMOOTH SCROLLING ======
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ====== HEADER SCROLL EFFECT ======
function initHeaderScroll() {
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// ====== CURRENT YEAR IN FOOTER ======
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ====== GOOGLE ANALYTICS TRACKING ======
function initAnalyticsTracking() {
  // Track phone calls
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_click', {
          'event_category': 'Engagement',
          'event_label': 'Phone Call'
        });
      }
    });
  });

  // Track email clicks
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'email_click', {
          'event_category': 'Engagement', 
          'event_label': 'Email Contact'
        });
      }
    });
  });

  // Track service clicks
  document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        const serviceName = link.closest('.service-card').querySelector('h3').textContent;
        gtag('event', 'service_click', {
          'event_category': 'Services',
          'event_label': serviceName
        });
      }
    });
  });
}

// ====== INITIALIZE EVERYTHING ======
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile menu
  new MobileMenu();
  
  // Initialize back to top button
  new BackToTop();
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize analytics tracking
  initAnalyticsTracking();
  
  // Update copyright year
  updateCurrentYear();
  
  console.log('TurkBridge website initialized successfully!');
});