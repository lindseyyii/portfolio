// Select carousel elements
const carouselTrack = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

// Settings
const itemWidth = items[0].getBoundingClientRect().width;
let currentIndex = 0; // Start at the first item
let currentFocus = 0;
const visibleCount = 3; // Number of visible items
const totalItems = items.length;

// Position carousel track to show the centered item
const updateTrackPosition = () => {
    const offset = 
      -(currentIndex * itemWidth) + (carouselTrack.offsetWidth - itemWidth * 1.65) / visibleCount;
    carouselTrack.style.transform = `translateX(${offset}px)`;
  };
  
// Move carousel left or right
const moveCarousel = (direction) => {
  if (direction === 'right') {
    currentIndex = (currentIndex + 1) % totalItems; // Circular indexing
    currentFocus = (currentFocus + 1) % totalItems;
  } else if (direction === 'left') {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Circular indexing
    currentFocus = (currentFocus - 1 + totalItems) % totalItems;
  }
  updateTrackPosition();
  updateFocus();
};


// Update focus class for center item
const updateFocus = () => {
    items.forEach((item, index) => {
      item.classList.remove('focus');
      if (index === currentFocus+1) {
        item.classList.add('focus');
      }
    });
  };

  
// Add event listeners for buttons
leftBtn.addEventListener('click', () => moveCarousel('left'));
rightBtn.addEventListener('click', () => moveCarousel('right'));

// Initial setup
updateTrackPosition();
updateFocus();

// Recalculate positions on window resize
window.addEventListener('resize', () => {
  updateTrackPosition();
});