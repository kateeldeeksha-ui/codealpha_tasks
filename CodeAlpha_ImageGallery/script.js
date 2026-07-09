// Gallery and Lightbox Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentImageIndex = 0;
let filteredImages = [];

// Initialize gallery
function initGallery() {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
}

// Open lightbox
function openLightbox(index) {
    const visibleItems = Array.from(galleryItems).filter(item => {
        return item.style.display !== 'none';
    });
    
    currentImageIndex = visibleItems.findIndex(item => {
        return item === galleryItems[index];
    });
    
    if (currentImageIndex === -1) {
        currentImageIndex = 0;
    }
    
    filteredImages = visibleItems;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Update lightbox image
function updateLightboxImage() {
    if (filteredImages.length === 0) return;
    
    const currentItem = filteredImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const caption = img.alt;
    
    lightboxImage.src = img.src;
    lightboxCaption.textContent = caption;
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate to next image
function nextImage() {
    if (filteredImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightboxImage();
}

// Navigate to previous image
function prevImage() {
    if (filteredImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
}

// Filter gallery by category
function filterGallery(category) {
    galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 10);
        } else {
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Add smooth transition to gallery items
const style = document.createElement('style');
style.textContent = `
    .gallery-item {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Event Listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
});

// Filter button events
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.dataset.filter;
        filterGallery(category);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});
