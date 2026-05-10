// window.addEventListener("load", () => {
//   const intro = document.getElementById("intro");

//   // After 3s, fade out intro
//   setTimeout(() => {
//     intro.style.opacity = "0";

//     // After fade-out completes, remove it from DOM
//     setTimeout(() => {
//       intro.style.display = "none";
//     }, 1000); // matches CSS transition
//   }, 3000); // time to show logo
// });


// Gallery functionality - SIMPLIFIED VERSION

// window.addEventListener("load", () => {
//   const intro = document.getElementById("intro");
//   const mainContent = document.getElementById("main-content");

//   setTimeout(() => {
//     intro.style.opacity = "0";

//     setTimeout(() => {
//       intro.style.display = "none";
//       mainContent.style.display = "block"; // Show the main content
//     }, 1000);
//   }, 3000);
// }); 

// ✅ Run immediately BEFORE anything else
/*if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);*/


window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const mainContent = document.getElementById("main-content");

  setTimeout(() => {
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      mainContent.classList.remove("hidden");
      mainContent.style.visibility = "visible";
      mainContent.style.opacity = "1";
    }, 0);
  }, 1000);
});
/*

// ✅ Handle intro cleanly (NO extra scroll forcing later)
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const mainContent = document.getElementById("main-content");

  setTimeout(() => {
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";

      // Reveal content WITHOUT layout jump
      mainContent.classList.remove("hidden");
      mainContent.style.display = "block";

    }, 1000);
  }, 3000);
});*/



/*
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const mainContent = document.getElementById("main-content");

  setTimeout(() => {
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      mainContent.classList.remove("hidden");
      mainContent.style.display = "block";
    }, 1000);
  }, 3000);
});
*/
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
        this.showSlide(0, true);
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
    
    /*showSlide(index) {
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
    }*/
    

showSlide(index, isInitialLoad = false) {
    this.currentIndex = index;
    
    const slides = document.querySelectorAll('.gallery-slide');
    const thumbs = document.querySelectorAll('.thumbnail');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
    
    // Only scroll into view if it's NOT the initial load
    if (!isInitialLoad && thumbs[index]) {
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

    document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
});

  // ===== HERO AUTO SLIDER =====
    let heroIndex = 0;
    const heroSlides = document.querySelectorAll(".hero-slide");

    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    // Auto change every 4 seconds
    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroSlides.length;
        showHeroSlide(heroIndex);
    }, 4000);


});
// ===== GALLERY SLIDER LOGIC =====
// Only runs if the gallery track exists on the page
const galleryTrack = document.getElementById('track');
const gallerySlides = document.querySelectorAll('.slide'); 
let galleryIndex = 0;

function moveSlide(direction) {
    if (!galleryTrack) return; // Safety check

    galleryIndex += direction;
    
    // Boundary check (Loop back)
    if (galleryIndex < 0) galleryIndex = gallerySlides.length - 1;
    if (galleryIndex >= gallerySlides.length) galleryIndex = 0;
    
    // Slide calculation
    galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
}

// ===== LIGHTBOX LOGIC =====
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightbox.style.display = 'flex';
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}


// Also ensure that when the main content is revealed, we stay at the top
/*window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});*/