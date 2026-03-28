// hero.js - optimiert für schnelle Ladezeit (ohne visibility/opacity)

// ========== GRUNDLEGENDE HERO-STYLES (nur einmal beim Laden) ==========
function setHeroBaseStyles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Grundlegende Hero-Styles (Höhe kommt aus CSS)
    hero.style.height = 'auto';
    hero.style.display = 'flex';
    hero.style.alignItems = 'center';
    hero.style.justifyContent = 'center';
    hero.style.position = 'relative';
    hero.style.overflow = 'hidden';
    hero.style.paddingTop = '0';
    hero.style.marginTop = '0';
    
    // Container Grund-Styles
    const heroContainer = document.querySelector('.hero .container');
    if (heroContainer) {
        heroContainer.style.position = 'relative';
        heroContainer.style.zIndex = '3';
        heroContainer.style.display = 'flex';
        heroContainer.style.justifyContent = 'space-between';
        heroContainer.style.flexDirection = 'row';
        heroContainer.style.alignItems = 'center';
        heroContainer.style.width = '90%';
        heroContainer.style.maxWidth = '1200px';
        heroContainer.style.margin = '0 auto';
    }
    
    // Profilbild Grund-Styles
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.borderRadius = '50%';
        profileImage.style.objectFit = 'cover';
        profileImage.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
        profileImage.style.border = '4px solid #00ffff';
    }
    
    // Schrift Grund-Styles
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content h2');
    const heroText = document.querySelector('.hero-content p');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.color = 'white';
        heroTitle.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
        heroTitle.style.marginBottom = '0.5rem';
    }
    if (heroSubtitle) {
        heroSubtitle.style.color = '#00ffff';
        heroSubtitle.style.textShadow = '0 0 8px rgba(0, 255, 255, 0.5)';
        heroSubtitle.style.marginBottom = '1.5rem';
    }
    if (heroText) {
        heroText.style.color = '#e0e0e0';
        heroText.style.marginBottom = '2rem';
    }
    if (heroButtons) {
        heroButtons.style.marginTop = '40px';
        heroButtons.style.display = 'flex';
        heroButtons.style.gap = '20px';
    }
    
    // Buttons Grund-Styles
    const btns = document.querySelectorAll('.hero-buttons .btn');
    btns.forEach(btn => {
        btn.style.padding = '12px 30px';
        btn.style.fontSize = '1.1rem';
        btn.style.borderRadius = '30px';
        btn.style.minWidth = '180px';
        btn.style.textAlign = 'center';
        btn.style.background = 'transparent';
        btn.style.color = 'white';
        btn.style.border = '2px solid #00ffff';
        btn.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
    });
}

// ========== GERÄTE-SPEZIFISCHE ANPASSUNGEN ==========
function setHeroResponsiveStyles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const width = window.innerWidth;
    
    const heroContainer = document.querySelector('.hero .container');
    const profileImage = document.querySelector('.profile-image');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content h2');
    const heroText = document.querySelector('.hero-content p');
    const heroButtons = document.querySelector('.hero-buttons');
    const btns = document.querySelectorAll('.hero-buttons .btn');
    
    // 1. Desktop-Bereich (ab 993px und Querformat)
    if (width > 992 && window.innerHeight < window.innerWidth) {
        // Desktop spezifisch
        hero.style.backgroundColor = '#0f2a4a';
        hero.style.backgroundImage = '';
        
        // Container für Desktop
        if (heroContainer) {
            heroContainer.style.position = 'relative';
            heroContainer.style.zIndex = '3';
            heroContainer.style.display = 'flex';
            heroContainer.style.justifyContent = 'space-between';
            heroContainer.style.flexDirection = 'row';
            heroContainer.style.alignItems = 'center';
            heroContainer.style.width = '90%';
            heroContainer.style.maxWidth = '1200px';
            heroContainer.style.margin = '0 auto';
            heroContainer.style.padding = '0 20px';
            heroContainer.style.transform = 'none';
        }

        // Gehirn-Bild für Desktop
        const brainImage = document.querySelector('.hero-brain');
        if (brainImage) {
            brainImage.style.position = 'absolute';
            brainImage.style.top = '-100px';
            brainImage.style.left = '-40%';
            brainImage.style.width = 'auto';
            brainImage.style.height = '150%';
            brainImage.style.transform = 'rotate(-90deg)';
            brainImage.style.objectFit = 'cover';
            brainImage.style.opacity = '0.3';
            brainImage.style.zIndex = '1';
            brainImage.style.pointerEvents = 'none';
            brainImage.style.display = 'block';
        }
        
        // Profilbild für Desktop
        if (profileImage) {
            const newSize = Math.min(300, width * 0.4);
            profileImage.style.width = newSize + 'px';
            profileImage.style.height = newSize + 'px';
            profileImage.style.marginTop = '-50px';
            profileImage.style.margin = '';
        }
        
        // Schrift für Desktop
        if (heroTitle) {
            heroTitle.style.fontSize = '3.5rem';
            heroTitle.style.textAlign = 'left';
        }
        if (heroSubtitle) {
            heroSubtitle.style.fontSize = '1.8rem';
            heroSubtitle.style.textAlign = 'left';
        }
        if (heroText) {
            heroText.style.fontSize = '1.1rem';
            heroText.style.textAlign = 'left';
        }
        if (heroButtons) {
            heroButtons.style.justifyContent = 'flex-start';
            heroButtons.style.flexDirection = 'row';
        }
        
        // Buttons für Desktop
        btns.forEach(btn => {
            btn.style.minWidth = '180px';
            btn.style.padding = '12px 30px';
            btn.style.fontSize = '1.1rem';
        });
    }
    
    // 2. Tablet & Hochformat-Bereich
    else if (width >= 769 && width <= 992 || (width > 992 && window.innerHeight > window.innerWidth)) {
        // Tablet/Hochformat spezifisch
        hero.style.backgroundColor = 'transparent';
        hero.style.backgroundImage = 'none';
        
        // Container für Tablet/Hochformat
        if (heroContainer) {
            heroContainer.style.position = 'relative';
            heroContainer.style.zIndex = '2';
            heroContainer.style.display = 'flex';
            heroContainer.style.flexDirection = 'column';
            heroContainer.style.alignItems = 'center';
            heroContainer.style.justifyContent = 'center';
            heroContainer.style.textAlign = 'center';
            heroContainer.style.width = '90%';
            heroContainer.style.maxWidth = '600px';
            heroContainer.style.marginLeft = 'auto';
            heroContainer.style.marginRight = 'auto';
            heroContainer.style.transform = 'translateY(10vh)';
        }

        // Gehirn-Bild positionieren
        const brainImage = document.querySelector('.hero-brain');
        if (brainImage) {
            brainImage.style.position = 'absolute';
            brainImage.style.top = '-100px';
            brainImage.style.left = '-40%';
            brainImage.style.transform = 'rotate(-90deg)';
            brainImage.style.width = 'auto';
            brainImage.style.height = '150%';
            brainImage.style.objectFit = 'cover';
            brainImage.style.opacity = '0.3';
            brainImage.style.pointerEvents = 'none';
            brainImage.style.zIndex = '1';
            brainImage.style.display = 'block';
        }
        
        // Profilbild skalieren
        if (profileImage) {
            const newSize = Math.min(220, width * 0.4);
            profileImage.style.width = newSize + 'px';
            profileImage.style.height = newSize + 'px';
            profileImage.style.margin = '0 auto';
        }
        
        // Schrift skalieren und zentrieren
        if (heroTitle) {
            heroTitle.style.fontSize = Math.min(42, width * 0.08) + 'px';
            heroTitle.style.textAlign = 'center';
        }
        if (heroSubtitle) {
            heroSubtitle.style.fontSize = Math.min(28, width * 0.05) + 'px';
            heroSubtitle.style.textAlign = 'center';
        }
        if (heroText) {
            heroText.style.fontSize = Math.min(18, width * 0.03) + 'px';
            heroText.style.textAlign = 'center';
        }
        if (heroButtons) {
            heroButtons.style.justifyContent = 'center';
            heroButtons.style.flexDirection = 'row';
        }
        
        // Buttons für Tablet
        btns.forEach(btn => {
            btn.style.minWidth = '180px';
            btn.style.padding = '12px 30px';
            btn.style.fontSize = '1.1rem';
        });
    }
    
    // 3. Smartphone-Bereich (unter 769px)
    else {
        // Smartphone spezifisch
        hero.style.backgroundColor = '';
        hero.style.backgroundImage = '';
        
        if (heroContainer) {
            heroContainer.style.position = 'relative';
            heroContainer.style.zIndex = '3';
            heroContainer.style.display = 'flex';
            heroContainer.style.flexDirection = 'column';
            heroContainer.style.alignItems = 'center';
            heroContainer.style.justifyContent = 'center';
            heroContainer.style.textAlign = 'center';
            heroContainer.style.width = '90%';
            heroContainer.style.maxWidth = '600px';
            heroContainer.style.margin = '0 auto';
            heroContainer.style.transform = '';
        }
        
        // Gehirn-Bild ausblenden
        const brainImage = document.querySelector('.hero-brain');
        if (brainImage) {
            brainImage.style.display = 'none';
        }
        
        // Profilbild für Smartphone
        if (profileImage) {
            profileImage.style.width = '160px';
            profileImage.style.height = '160px';
            profileImage.style.margin = '0 auto';
        }
        
        // Schrift für Smartphone
        if (heroTitle) {
            heroTitle.style.fontSize = '2.2rem';
            heroTitle.style.textAlign = 'center';
        }
        if (heroSubtitle) {
            heroSubtitle.style.fontSize = '1.3rem';
            heroSubtitle.style.textAlign = 'center';
        }
        if (heroText) {
            heroText.style.fontSize = '1rem';
            heroText.style.textAlign = 'center';
        }
        if (heroButtons) {
            heroButtons.style.justifyContent = 'center';
            heroButtons.style.flexDirection = 'column';
            heroButtons.style.alignItems = 'center';
            heroButtons.style.gap = '12px';
        }
        
        // Buttons für Smartphone
        btns.forEach(btn => {
            btn.style.minWidth = '200px';
            btn.style.padding = '10px 20px';
            btn.style.fontSize = '1rem';
        });
    }
}

// ========== INITIALISIERUNG ==========
// Grund-Styles nur einmal beim Laden setzen
window.addEventListener('load', function() {
    setHeroBaseStyles();
    setHeroResponsiveStyles();
});

// Optimiertes Resize mit requestAnimationFrame
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        requestAnimationFrame(setHeroResponsiveStyles);
    }, 100);
});
