// ===== Page Navigation =====
document.addEventListener('DOMContentLoaded', function () {
    var navItems = document.querySelectorAll('.nav-item');
    var pages = document.querySelectorAll('.page');
    var currentPage = 'launcher';
    var isAnimating = false;

    // ===== Reveal Animation Observer =====
    function triggerReveals(container) {
        var reveals = container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        reveals.forEach(function (el, i) {
            // Reset first
            el.classList.remove('visible');
            // Stagger the reveals
            setTimeout(function () {
                el.classList.add('visible');
            }, 80 + (i * 60));
        });
    }

    function resetReveals(container) {
        var reveals = container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        reveals.forEach(function (el) {
            el.classList.remove('visible');
        });
    }

    // Trigger initial page reveals
    var initialPage = document.getElementById('launcher');
    if (initialPage) {
        setTimeout(function () {
            triggerReveals(initialPage);
        }, 200);
    }

    // ===== Page Switching =====
    navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var targetPage = this.getAttribute('data-page');

            if (targetPage === currentPage || isAnimating) return;
            isAnimating = true;

            // Update active nav with smooth indicator
            navItems.forEach(function (nav) { nav.classList.remove('active'); });
            this.classList.add('active');

            var currentEl = document.getElementById(currentPage);
            var targetEl = document.getElementById(targetPage);

            // Fade out current
            if (currentEl) {
                currentEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                currentEl.style.opacity = '0';
                currentEl.style.transform = 'translateY(-20px)';

                setTimeout(function () {
                    currentEl.classList.remove('active');
                    currentEl.style.opacity = '';
                    currentEl.style.transform = '';
                    currentEl.style.transition = '';
                    resetReveals(currentEl);

                    // Show new page
                    if (targetEl) {
                        targetEl.classList.add('active');
                        triggerReveals(targetEl);
                    }

                    currentPage = targetPage;
                    isAnimating = false;

                    // Scroll to top
                    document.querySelector('.main').scrollTo({ top: 0, behavior: 'smooth' });
                }, 250);
            }

            // Close mobile menu
            var sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.remove('open');
        });
    });

    // ===== Scroll-triggered reveals for long pages =====
    var mainEl = document.querySelector('.main');
    if (mainEl) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { root: mainEl, threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        // Observe all reveal elements
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
            observer.observe(el);
        });
    }

    // ===== Mobile Menu =====
    var menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    document.body.appendChild(menuToggle);

    var sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
        var isOpen = sidebar.classList.contains('open');
        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // ===== Theme Toggle =====
    var themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        var savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', function () {
            var isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ===== Typing Effect for Hero =====
    var heroName = document.querySelector('.hero-name');
    if (heroName) {
        var text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.borderRight = '3px solid var(--accent)';
        var i = 0;
        setTimeout(function () {
            var typeInterval = setInterval(function () {
                heroName.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    setTimeout(function () {
                        heroName.style.borderRight = 'none';
                    }, 2000);
                }
            }, 80);
        }, 400);
    }
});
