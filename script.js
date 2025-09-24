window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  // After 3s, fade out intro
  setTimeout(() => {
    intro.style.opacity = "0";

    // After fade-out completes, remove it from DOM
    setTimeout(() => {
      intro.style.display = "none";
    }, 1000); // matches CSS transition
  }, 3000); // time to show logo
});

// Gallery functionality - SIMPLIFIED VERSION
class Gallery {
    constructor() {
        this.images = [
            'ignitioncrew1.jpg',
            'ignitioncrew3.jpg', 
            'ignitioncrew4.jpg',
            'ignitioncrew5.jpg',
            'ignitioncrewcart2.jpg',
            'ignitioncrewgokart.jpg',
            
        ];
        
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        console.log('Gallery loading with images:', this.images);
        this.createGallery();
        this.setupEventListeners();
        this.showSlide(0);
    }
    
    createGallery() {
        const thumbnailsContainer = document.querySelector('.thumbnails-container');
        const slidesContainer = document.querySelector('.gallery-slides');
        
        // Clear any existing content
        if (thumbnailsContainer) thumbnailsContainer.innerHTML = '';
        if (slidesContainer) slidesContainer.innerHTML = '';
        
        // Create thumbnails and slides from your images
        this.images.forEach((imgSrc, index) => {
            // Thumbnail
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.className = 'thumbnail';
            thumb.alt = `Ignition Crew ${index + 1}`;
            thumb.addEventListener('click', () => this.showSlide(index));
            if (thumbnailsContainer) thumbnailsContainer.appendChild(thumb);
            
            // Slide
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            const slideImg = document.createElement('img');
            slideImg.src = imgSrc;
            slideImg.alt = `Ignition Crew ${index + 1}`;
            slideImg.addEventListener('click', () => this.openLightbox(index));
            slide.appendChild(slideImg);
            if (slidesContainer) slidesContainer.appendChild(slide);
        });
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.querySelector('.gallery-nav.prev')?.addEventListener('click', () => this.prevSlide());
        document.querySelector('.gallery-nav.next')?.addEventListener('click', () => this.nextSlide());
        
        // Thumbnail navigation
        // Thumbnail navigation (also highlight image)
document.querySelector('.prev-thumb')?.addEventListener('click', () => {
    this.prevSlide(); // go to previous image + highlight
});
document.querySelector('.next-thumb')?.addEventListener('click', () => {
    this.nextSlide(); // go to next image + highlight
});

        
        // Lightbox
        document.querySelector('.close-lightbox')?.addEventListener('click', () => this.closeLightbox());
        document.querySelector('.lightbox-prev')?.addEventListener('click', () => this.lightboxPrev());
        document.querySelector('.lightbox-next')?.addEventListener('click', () => this.lightboxNext());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    showSlide(index) {
        this.currentIndex = index;
        
        const slides = document.querySelectorAll('.gallery-slide');
        const thumbs = document.querySelectorAll('.thumbnail');
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        if (thumbs[index]) {
            thumbs[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showSlide(this.currentIndex);
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showSlide(this.currentIndex);
    }
    
    scrollThumbs(direction) {
        const container = document.querySelector('.thumbnails-container');
        const scrollAmount = 150;
        if (container) {
            container.scrollLeft += direction * scrollAmount;
        }
    }
    
    openLightbox(index) {
        this.currentIndex = index;
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = document.querySelector('.lightbox-img');
        
        if (lightboxImg) lightboxImg.src = this.images[index];
        if (lightbox) lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    lightboxNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        const lightboxImg = document.querySelector('.lightbox-img');
        if (lightboxImg) lightboxImg.src = this.images[this.currentIndex];
    }
    
    lightboxPrev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        const lightboxImg = document.querySelector('.lightbox-img');
        if (lightboxImg) lightboxImg.src = this.images[this.currentIndex];
    }
    
    handleKeyboard(e) {
        const lightbox = document.querySelector('.lightbox');
        if (!lightbox?.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                this.lightboxPrev();
                break;
            case 'ArrowRight':
                this.lightboxNext();
                break;
            case 'Escape':
                this.closeLightbox();
                break;
        }
    }
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});