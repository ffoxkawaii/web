const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;
const slideCount = slides.length;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 25}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateCarousel();
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Function to fetch and display books
const fetchAndDisplayBooks = async () => {
  try {
      // Replace with your actual API endpoint
      const response = await fetch('./product.json');
      const result = await response.json();

      if (result.status === 'success' && result.data) {
          const container = document.querySelector('.product-in-series');
          
          // Clear existing content
          container.innerHTML = '';
          
          // Map data to HTML structure
          container.innerHTML = result.data.map(product => `
              <div class="product-series">
                  <a href="../detail_product/detail_product.html?id=${product.ma_sach}">
                      <img 
                          alt="${product.tieu_de}"
                          src="${product.image_url || 'https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg'}"
                      />
                  </a>
                  <div class="product-series-info">
                      <h3>${product.tieu_de}</h3>
                      <p class="price">${Number(product.gia_tien).toLocaleString('vi-VN')}đ</p>
                  </div>
              </div>
          `).join('');
      }
  } catch (error) {
      console.error('Error fetching books:', error);
  }
};

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayBooks);

 // slider control
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.product-in-series');
  const prevBtn = document.querySelector('.prev-button');
  const nextBtn = document.querySelector('.next-button');
  
  const scrollAmount = 300;
  let startX, isDown = false;

  // Touch and mouse drag scrolling
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    container.style.cursor = 'grabbing';
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = container.scrollLeft - walk;
  });

  // Button controls
  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  // Show/hide buttons with fade effect
  const toggleButtons = () => {
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth;
    
    prevBtn.style.opacity = isAtStart ? '0' : '1';
    prevBtn.style.visibility = isAtStart ? 'hidden' : 'visible';
    
    nextBtn.style.opacity = isAtEnd ? '0' : '1';
    nextBtn.style.visibility = isAtEnd ? 'hidden' : 'visible';
  };

  container.addEventListener('scroll', toggleButtons);
  window.addEventListener('resize', toggleButtons);
  toggleButtons();
});

document.addEventListener('DOMContentLoaded', function() {
    var accountDropdown = document.getElementById('accountDropdown');
    var logoutButton = document.getElementById('logoutButton');

    accountDropdown.addEventListener('click', function(event) {
        event.preventDefault();
        var dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle('show');
    });

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '../index/index.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const accountIcon = document.querySelector('.nav-icon img[alt="Account"]');
  const accountPopup = document.getElementById('accountPopup');

  accountIcon.addEventListener('click', (event) => {
    event.preventDefault();
    accountPopup.style.display = accountPopup.style.display === 'block' ? 'none' : 'block';
  });

  // Ẩn pop-up khi click ra ngoài
  window.addEventListener('click', (event) => {
    if (!accountIcon.contains(event.target) && !accountPopup.contains(event.target)) {
      accountPopup.style.display = 'none';
    }
  });
});