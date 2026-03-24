// JavaScript für das Lebenslauf-Modal mit PDF.js Integration und Zerfallseffekt

document.addEventListener('DOMContentLoaded', function() {
    // Referenzen zu den Elementen
    const resumeBtn = document.querySelector('.resume-btn');
    const modal = document.getElementById('resume-modal');
    const closeBtn = document.querySelector('.close-modal');
    const downloadBtn = document.getElementById('download-resume');
    const pdfContainer = document.getElementById('pdf-container');
    const pdfIframe = document.getElementById('pdf-iframe');
    const pdfJsContainer = document.getElementById('pdfjs-container');
    const modalTitle = document.querySelector('#resume-modal .modal-title');
    const downloadText = document.querySelector('#download-resume span');
    const iosHint = document.getElementById('ios-download-hint');
    
    // Erkennung von iOS/Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // PDF.js Worker konfigurieren
    if (isIOS || isSafari) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }
    
    // Übersetzungsfunktion für das Modal
    function updateModalTranslations(lang) {
        if (modalTitle) modalTitle.textContent = translations[lang]['resume_title'];
        if (downloadText) downloadText.textContent = translations[lang]['resume_download'];
        if (iosHint) iosHint.textContent = translations[lang]['resume_ios_hint'];
    }
    
    // Event-Listener für Sprachänderungen
    document.addEventListener('languageChanged', function(e) {
        updateModalTranslations(e.detail.language);
    });
    
    // Modal öffnen
    resumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        const currentLang = document.documentElement.getAttribute('lang') || 'de';
        updateModalTranslations(currentLang);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        pdfIframe.style.display = 'none';
        pdfJsContainer.style.display = 'block';
        
        if (!pdfJsContainer.hasAttribute('data-loaded')) {
            loadPdfWithBlurAndDissolve('assets/pdf/Lebenslauf_AstridKraft.pdf', pdfJsContainer);
            pdfJsContainer.setAttribute('data-loaded', 'true');
        }
    });
    
    // PDF laden mit kurz unscharf + Pixel-Zerfall
    function loadPdfWithBlurAndDissolve(url, container) {
        container.innerHTML = '<p style="padding:2rem; text-align:center;">PDF wird geladen...</p>';
        
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(function(pdf) {
            container.innerHTML = '';
            
            // Wrapper für alle Seiten
            const pagesWrapper = document.createElement('div');
            pagesWrapper.style.position = 'relative';
            pagesWrapper.style.width = '100%';
            pagesWrapper.style.maxHeight = '70vh';
            pagesWrapper.style.overflowY = 'auto';
            pagesWrapper.style.overflowX = 'hidden';
            pagesWrapper.style.borderRadius = '8px';
            pagesWrapper.style.backgroundColor = '#f5f5f5';
            
            container.appendChild(pagesWrapper);
            
            const pageCanvases = [];
            const loadPromises = [];
            
            // Alle PDF-Seiten laden
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                loadPromises.push(
                    pdf.getPage(pageNum).then(function(page) {
                        const viewport = page.getViewport({ scale: 1.2 });
                        
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        canvas.style.width = '100%';
                        canvas.style.height = 'auto';
                        canvas.style.marginBottom = '10px';
                        canvas.style.border = '1px solid #e0e0e0';
                        canvas.style.borderRadius = '4px';
                        canvas.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        canvas.style.transition = 'filter 0.3s ease';
                        
                        const pageContainer = document.createElement('div');
                        pageContainer.className = 'pdf-page';
                        pageContainer.style.position = 'relative';
                        pageContainer.appendChild(canvas);
                        pagesWrapper.appendChild(pageContainer);
                        
                        pageCanvases.push(canvas);
                        
                        return page.render({
                            canvasContext: context,
                            viewport: viewport
                        }).promise;
                    })
                );
            }
            
            // Nachdem alle Seiten geladen sind: kurz unscharf zeigen, dann Zerfall
            Promise.all(loadPromises).then(() => {
                // 1. Kurz unscharf machen (0.5 Sekunde)
                pageCanvases.forEach(canvas => {
                    canvas.style.filter = 'blur(12px)';
                });
                
                // 2. Nach 0.5 Sekunden: Zerfall starten
                setTimeout(() => {
                    startPixelDissolve(pagesWrapper, pageCanvases, container);
                }, 500);
            });
            
        }).catch(function(error) {
            container.innerHTML = `<p style="padding:2rem; text-align:center; color:red;">
                Fehler beim Laden der PDF: ${error.message || error}<br>
                <a href="assets/pdf/Lebenslauf_AstridKraft.pdf" target="_blank" style="color:blue;">PDF direkt öffnen</a>
            </p>`;
        });
    }
    
    // Pixel-Zerfall-Effekt
    function startPixelDissolve(wrapper, canvases, container) {
        // Position des Wrappers ermitteln
        const wrapperRect = wrapper.getBoundingClientRect();
        
        // Für jede Seite ein Pixel-Raster erzeugen
        canvases.forEach((canvas, index) => {
            const canvasRect = canvas.getBoundingClientRect();
            const relativeTop = canvasRect.top - wrapperRect.top;
            const relativeLeft = canvasRect.left - wrapperRect.left;
            
            // Canvas-Inhalt als Bild speichern
            const imageData = canvas.toDataURL();
            
            // Canvas ausblenden
            canvas.style.opacity = '0';
            canvas.style.transition = 'opacity 0.2s';
            
            // Pixel-Container für diese Seite
            const pixelContainer = document.createElement('div');
            pixelContainer.style.position = 'absolute';
            pixelContainer.style.top = relativeTop + 'px';
            pixelContainer.style.left = relativeLeft + 'px';
            pixelContainer.style.width = canvasRect.width + 'px';
            pixelContainer.style.height = canvasRect.height + 'px';
            pixelContainer.style.overflow = 'hidden';
            pixelContainer.style.pointerEvents = 'none';
            pixelContainer.style.zIndex = '5';
            wrapper.appendChild(pixelContainer);
            
            // Pixel-Größe: 8x8 Pixel pro Block
            const pixelSize = 12;
            const cols = Math.ceil(canvasRect.width / pixelSize);
            const rows = Math.ceil(canvasRect.height / pixelSize);
            
            const pixels = [];
            
            // Pixel-Elemente erzeugen
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const pixel = document.createElement('div');
                    pixel.style.position = 'absolute';
                    pixel.style.width = pixelSize + 'px';
                    pixel.style.height = pixelSize + 'px';
                    pixel.style.left = (col * pixelSize) + 'px';
                    pixel.style.top = (row * pixelSize) + 'px';
                    pixel.style.backgroundColor = '#0a3d62';
                    pixel.style.opacity = '0';
                    pixel.style.transform = 'scale(0.8)';
                    pixel.style.transition = 'all 0.4s ease-out';
                    pixel.style.borderRadius = '2px';
                    
                    // Zufällige Verzögerung für jedes Pixel
                    const delay = Math.random() * 0.8;
                    const xOffset = (Math.random() - 0.5) * 80;
                    const yOffset = (Math.random() - 0.5) * 80 + 20;
                    const rotation = (Math.random() - 0.5) * 360;
                    
                    pixel.style.setProperty('--x', xOffset + 'px');
                    pixel.style.setProperty('--y', yOffset + 'px');
                    pixel.style.setProperty('--rot', rotation + 'deg');
                    
                    pixelContainer.appendChild(pixel);
                    pixels.push({ pixel, delay });
                }
            }
            
            // Animation starten: Pixel erscheinen und fliegen weg
            setTimeout(() => {
                pixels.forEach(({ pixel, delay }) => {
                    setTimeout(() => {
                        pixel.style.opacity = '0.9';
                        pixel.style.transform = `translate(var(--x), var(--y)) rotate(var(--rot)) scale(0.3)`;
                        pixel.style.opacity = '0';
                    }, delay * 1000);
                });
            }, 50);
            
            // Nach der Animation: Pixel-Container entfernen und Platzhalter anzeigen
            setTimeout(() => {
                pixelContainer.remove();
                
                // Wenn letzte Seite fertig, Platzhalter anzeigen
                if (index === canvases.length - 1) {
                    showPlaceholder(container);
                }
            }, 1200);
        });
        
        // Falls keine Canvas vorhanden, direkt Platzhalter
        if (canvases.length === 0) {
            showPlaceholder(container);
        }
    }
    
    // Platzhalter nach Zerfall anzeigen
    function showPlaceholder(container) {
        container.innerHTML = '';
        
        const placeholder = document.createElement('div');
        placeholder.style.padding = '3rem 2rem';
        placeholder.style.textAlign = 'center';
        placeholder.style.backgroundColor = '#f8f9fa';
        placeholder.style.borderRadius = '12px';
        placeholder.style.border = '2px dashed #0a3d62';
        placeholder.style.margin = '1rem';
        
        placeholder.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">🔒</div>
            <h3 style="color: #0a3d62; margin-bottom: 1rem;">Lebenslauf auf persönliche Anfrage</h3>
            <p style="color: #555; margin-bottom: 0.5rem;">Aus Datenschutzgründen wird der vollständige Lebenslauf</p>
            <p style="color: #555; margin-bottom: 1.5rem;">nur im persönlichen Gespräch zur Verfügung gestellt.</p>
            <div style="background: #e9ecef; padding: 1rem; border-radius: 8px; display: inline-block;">
                <span style="font-family: monospace; font-size: 1.1rem;">📧 astridkraft.business@gmail.com</span>
            </div>
            <p style="color: #888; font-size: 0.85rem; margin-top: 1.5rem;">
                <span style="display: inline-block; margin-right: 0.5rem;">🔍</span> 
                Vorschau kurzzeitig unscharf eingeblendet
            </p>
        `;
        
        container.appendChild(placeholder);
        
        // Download-Button deaktivieren/verstecken
        const downloadBtn = document.getElementById('download-resume');
        if (downloadBtn) {
            downloadBtn.style.opacity = '0.5';
            downloadBtn.style.pointerEvents = 'none';
            downloadBtn.title = 'Lebenslauf nur auf persönliche Anfrage';
        }
    }
    
    // Modal schließen
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Download-Funktion (deaktiviert, da Platzhalter)
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hinweis anzeigen, dass Download nicht verfügbar ist
        const iosHint = document.getElementById('ios-download-hint');
        if (iosHint) {
            iosHint.style.display = 'block';
            iosHint.innerHTML = '<p style="color:#0a3d62;">📋 Der vollständige Lebenslauf ist nur auf persönliche Anfrage verfügbar. Kontaktieren Sie mich gerne!</p>';
            setTimeout(() => {
                iosHint.style.display = 'none';
                iosHint.innerHTML = '';
            }, 4000);
        }
    });
});
