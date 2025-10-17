// Slide Navigation System
class SlidePresentation {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.slidesWrapper = document.querySelector('.slides-wrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideDisplay = document.getElementById('currentSlide');
        this.totalSlidesDisplay = document.getElementById('totalSlides');
        
        this.init();
    }

    init() {
        // Set total slides
        this.totalSlidesDisplay.textContent = this.totalSlides;
        
        // Create indicators
        this.createIndicators();
        
        // Button event listeners (Arrow buttons only)
        this.prevBtn.addEventListener('click', () => this.goToPrevSlide());
        this.nextBtn.addEventListener('click', () => this.goToNextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Update button states
        this.updateButtonStates();
        
        // Initial render
        this.updateSlidePosition();
    }

    createIndicators() {
        const indicatorsContainer = document.getElementById('indicators');
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides) return;
        
        this.currentSlide = index;
        this.updateSlidePosition();
        this.updateButtonStates();
        this.updateIndicators();
        this.currentSlideDisplay.textContent = this.currentSlide + 1;
        
        // Update active slide class for animations
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === this.currentSlide);
        });
    }

    goToNextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    goToPrevSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    updateSlidePosition() {
        const translateX = -this.currentSlide * 100;
        this.slidesWrapper.style.transform = `translateX(${translateX}vw)`;
    }

    updateButtonStates() {
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    handleKeyPress(e) {
        if (e.key === 'ArrowLeft') {
            this.goToPrevSlide();
        } else if (e.key === 'ArrowRight') {
            this.goToNextSlide();
        }
    }
}

// Initialize presentation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const presentation = new SlidePresentation();
    window.presentation = presentation; // Store for global access
    
    // Add entrance animation to first slide
    setTimeout(() => {
        const firstSlideContent = document.querySelector('.slide.active .slide-content');
        if (firstSlideContent) {
            firstSlideContent.style.animation = 'fadeInUp 0.6s ease-out';
        }
    }, 100);
});

// Add fullscreen support (F key)
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Fullscreen request failed:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
});

// Export for global access
window.SlidePresentation = SlidePresentation;
