// ===== Particles Config =====
var darkConfig = {
    "particles": {
        "number": { "value": 120, "density": { "enable": true, "value_area": 1500 } },
        "color": { "value": ["#00d4aa", "#00e5ff", "#7c4dff", "#00ffcc"] },
        "shape": {
            "type": ["circle", "edge"],
            "stroke": { "width": 0, "color": "#000" }
        },
        "opacity": {
            "value": 0.7,
            "random": true,
            "anim": { "enable": true, "speed": 1.2, "opacity_min": 0.05, "sync": false }
        },
        "size": {
            "value": 3.5,
            "random": true,
            "anim": { "enable": true, "speed": 2, "size_min": 0.3, "sync": false }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00d4aa",
            "opacity": 0.15,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1.8,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "bounce",
            "bounce": true,
            "attract": { "enable": true, "rotateX": 1200, "rotateY": 1200 }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": ["grab", "bubble"] },
            "onclick": { "enable": true, "mode": "repulse" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 200, "line_linked": { "opacity": 0.5 } },
            "bubble": { "distance": 200, "size": 6, "duration": 0.4, "opacity": 0.8, "speed": 3 },
            "repulse": { "distance": 250, "duration": 0.6 },
            "push": { "particles_nb": 5 }
        }
    },
    "retina_detect": true
};

// Init particles
particlesJS('particles-js', darkConfig);
