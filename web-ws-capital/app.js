document.addEventListener('DOMContentLoaded', () => {
    // --- REAL-TIME OS CLOCK ---
    const clockEl = document.getElementById('os-clock');
    const updateTime = () => {
        const d = new Date();
        clockEl.textContent = d.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
    };
    setInterval(updateTime, 1000);
    updateTime();

    // --- OS ANIMATIONS (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // --- i18n ENGINE V5 (Modal Strategy) ---
    let currentLang = document.documentElement.lang || 'es';
    const switchBtn = document.getElementById('i18n-switch');
    const langLabel = switchBtn ? switchBtn.querySelector('.lang-label') : null;
    if (langLabel) langLabel.textContent = currentLang.toUpperCase();
    const modal = document.getElementById('lng-modal');
    const closeBtn = modal ? modal.querySelector('.close-modal') : null;

    const runTranslations = () => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const keyPath = el.getAttribute('data-i18n');
            const keys = keyPath.split('.');
            let value = translations[currentLang];
            
            for (const key of keys) {
                if (value && value[key]) {
                    value = value[key];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (value) {
                el.innerHTML = value;
            }
        });
        document.documentElement.lang = currentLang;
        document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    };

    switchBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    if (closeBtn) closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');
    });

    // Ejecutar traducciones al cargar la pagina
    runTranslations();

    document.querySelectorAll('.lang-opt').forEach(opt => {
        opt.addEventListener('click', () => {
            currentLang = opt.getAttribute('data-lang');
            langLabel.textContent = currentLang.toUpperCase();
            runTranslations();
            modal.classList.remove('active');
        });
    });

    // Close on overlay click
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // --- DESKTOP INTERACTIONS V6 ---
    window.toggleAbout = () => {
        const win = document.getElementById('about-window');
        if (win.style.display === 'none') {
            win.style.display = 'block';
            win.style.animation = 'aboutPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        } else {
            win.style.display = 'none';
        }
    };

    window.toggleIncinerator = () => {
        const win = document.getElementById('incinerator-window');
        if (win.style.display === 'none') {
            win.style.display = 'block';
            win.style.animation = 'extremeIncineratePop 0.8s steps(5, end) forwards';
            
            // Extreme Mario Castle Fire Effect
            document.body.classList.add('screen-shake-active');
            
            // Spawn 35 pixel fires
            for (let i = 0; i < 35; i++) {
                const fire = document.createElement('div');
                fire.className = 'pixel-fire';
                fire.style.left = (Math.random() * 100) + 'vw';
                // Randomize delay to clump them slightly
                fire.style.animationDelay = (Math.random() * 0.4) + 's';
                document.body.appendChild(fire);
                
                // Cleanup
                setTimeout(() => fire.remove(), 2500);
            }

            // Stop shaking when the animation resolves
            setTimeout(() => {
                document.body.classList.remove('screen-shake-active');
            }, 800);

        } else {
            win.style.display = 'none';
        }
    };

    window.toggleContactTerminal = () => {
        const win = document.getElementById('contact-terminal-window');
        if (win.style.display === 'none') {
            win.style.display = 'block';
            win.style.animation = 'terminalBoot 0.35s ease-out forwards';
        } else {
            win.style.display = 'none';
        }
    };

    window.transitionToArchives = () => {
        // Create an overlay div
        const overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        overlay.innerText = 'MOUNTING ARCHIVES...';
        document.body.appendChild(overlay);

        // Trigger animation
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);

        // Redirect after animation completes
        setTimeout(() => {
            window.location.href = 'blog.html';
        }, 600);
    };

    window.transitionToPitch = () => {
        const overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        overlay.style.background = '#171411';
        overlay.style.color = '#A9552C';
        overlay.style.fontFamily = "'Fraunces', serif";
        overlay.innerText = 'INITIALIZING STRATEGIC_UNITS...';
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);

        setTimeout(() => {
            window.location.href = 'pitch-deck.html';
        }, 800);
    };

    // Simulated Boot Sequence (fun part)
    const bootProgress = document.querySelector('.retro-progress-fill');
    if (bootProgress) {
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 15;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => {
                    const loader = document.getElementById('loader');
                    if (loader) loader.style.opacity = '0';
                    setTimeout(() => { if (loader) loader.style.display = 'none'; }, 500);
                }, 400);
            }
            bootProgress.style.width = p + '%';
        }, 80);
    }

    // --- SMOOTH WINDOW SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 40;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- WINDOW SHADE EFFECT ---
    window.toggleShade = (btn) => {
        const win = btn.closest('.os-window') || btn.closest('.window-bezel');
        if (win) {
            win.classList.toggle('window-collapsed');
        }
    };

    // --- SYSTEM ALERT EMULATOR ---
    window.systemAlert = (msg) => {
        console.log(`WS_ADMIN: ${msg}`);
        // Visual indicator could be added here
    };

    // --- TERMINAL COMMAND PROCESSOR (Hidden) ---
    const terminalInputs = document.querySelectorAll('.terminal-input');
    terminalInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            if (e.target.value.toLowerCase().trim() === 'pitch') {
                const icon = document.getElementById('pitch-deck-icon');
                if (icon) {
                    icon.style.display = 'flex';
                    icon.style.animation = 'aboutPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
                    window.systemAlert("Strategic units revealed.");
                    
                    // Clear the input to prevent loops
                    e.target.value = '';
                    
                    // Small visual feedback in terminal
                    e.target.placeholder = "COMMAND_ACCEPTED: PITCH_UNITS_MOUNTED";
                    setTimeout(() => {
                        e.target.placeholder = "_";
                    }, 2000);
                }
            }
        });
    });

    console.log("WS_CAPITAL_OS_CORE: Initialized [OK]");
    window.systemAlert("Intelligence Units Mounted.");
});
