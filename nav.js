document.addEventListener('DOMContentLoaded', function () {
  // Create backdrop element (if not present)
  var backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  // Create close button inside nav (if not present)
  var nav = document.querySelector('.vertical-nav');
  if (nav) {
    var closeBtn = nav.querySelector('.nav-close');
    if (!closeBtn) {
      closeBtn = document.createElement('button');
      closeBtn.className = 'nav-close';
      closeBtn.setAttribute('aria-label', 'Close navigation');
      closeBtn.innerHTML = '&times;';
      nav.appendChild(closeBtn);
    }

    // Simple close button behavior: close nav on small screens, toggle closed state on larger screens
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (window.innerWidth <= 600) {
        document.body.classList.remove('nav-open');
      } else {
        document.body.classList.add('nav-closed');
      }
    });

    // Ensure a clean state when resizing across the 600px breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 600) {
        // desktop: remove mobile open state
        document.body.classList.remove('nav-open');
      } else {
        // mobile: remove desktop-closed state
        document.body.classList.remove('nav-closed');
      }
    });
  }

  // Toggle the navigation on small screens
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      // On small screens toggle the off-canvas open class
      if (window.innerWidth <= 600) {
        document.body.classList.toggle('nav-open');
      } else {
        // On larger screens toggle a closed state
        if (document.body.classList.contains('nav-closed')) {
          document.body.classList.remove('nav-closed');
        } else {
          document.body.classList.add('nav-closed');
        }
      }
    });
  }

  // Close nav when clicking the backdrop
  backdrop.addEventListener('click', function () {
    document.body.classList.remove('nav-open');
  });

  // Close nav when clicking a nav link (small screens)
  var navLinks = document.querySelectorAll('.vertical-nav a');
  navLinks.forEach(function (a) {
    a.addEventListener('click', function () {
      if (window.innerWidth <= 600) document.body.classList.remove('nav-open');
    });
  });

  // Active link highlighting
  try {
    var currentPath = location.pathname.replace(/\\/g, '/');
    navLinks.forEach(function (link) {
      try {
        var linkPath = new URL(link.href, location.origin).pathname.replace(/\\/g, '/');
        if (linkPath === currentPath || (linkPath.endsWith('/') && currentPath === '/')) {
          link.classList.add('active');
        }
      } catch (e) {
        /* ignore */
      }
    });
  } catch (e) {
    console.error('nav highlight error', e);
  }
});
