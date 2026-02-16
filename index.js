// ===== Page Navigation =====
document.addEventListener('DOMContentLoaded', function () {
    var navItems = document.querySelectorAll('.nav-item');
    var pages = document.querySelectorAll('.page');

    navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var targetPage = this.getAttribute('data-page');

            // Update active nav
            navItems.forEach(function (nav) { nav.classList.remove('active'); });
            this.classList.add('active');

            // Show target page
            pages.forEach(function (page) { page.classList.remove('active'); });
            var target = document.getElementById(targetPage);
            if (target) {
                target.classList.add('active');
            }

            // Close mobile menu
            var sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.remove('open');
        });
    });

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

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // ===== Typing Effect for Hero =====
    var heroName = document.querySelector('.hero-name');
    if (heroName) {
        var text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.borderRight = '3px solid var(--accent)';
        var i = 0;
        var typeInterval = setInterval(function () {
            heroName.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
                // Blink cursor then remove
                setTimeout(function () {
                    heroName.style.borderRight = 'none';
                }, 2000);
            }
        }, 80);
    }
});
