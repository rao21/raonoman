// ===== Particles Config =====
var darkConfig = {
    "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 2000 } },
        "color": { "value": ["#00d4aa", "#00e5ff", "#7c4dff"] },
        "shape": { "type": ["circle", "triangle"], "stroke": { "width": 0, "color": "#000" } },
        "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 0.8, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 1.5, "size_min": 0.5, "sync": false } },
        "line_linked": { "enable": true, "distance": 130, "color": "#00d4aa", "opacity": 0.12, "width": 1 },
        "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": true, "rotateX": 800, "rotateY": 800 } }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 180, "line_linked": { "opacity": 0.4 } },
            "push": { "particles_nb": 4 },
            "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 0.8, "speed": 3 }
        }
    },
    "retina_detect": true
};

var lightConfig = {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 2000 } },
        "color": { "value": ["#00a37d", "#0288d1", "#7b1fa2"] },
        "shape": { "type": ["circle", "triangle"], "stroke": { "width": 0, "color": "#000" } },
        "opacity": { "value": 0.35, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.08, "sync": false } },
        "size": { "value": 3.5, "random": true, "anim": { "enable": true, "speed": 1, "size_min": 0.3, "sync": false } },
        "line_linked": { "enable": true, "distance": 140, "color": "#00a37d", "opacity": 0.1, "width": 1 },
        "move": { "enable": true, "speed": 0.8, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": true, "rotateX": 600, "rotateY": 600 } }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 160, "line_linked": { "opacity": 0.3 } },
            "push": { "particles_nb": 3 }
        }
    },
    "retina_detect": true
};

// Init with correct theme
var savedTheme = localStorage.getItem('theme') || 'dark';
particlesJS('particles-js', savedTheme === 'light' ? lightConfig : darkConfig);

// Expose configs for theme toggle
window.particlesConfigs = { dark: darkConfig, light: lightConfig };
