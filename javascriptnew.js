// Load external HTML for About Us hover card
fetch('about-hover.html')
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('beforeend', data);

    // After inserting, re-assign aboutBox
    aboutBox = document.getElementById('aboutBox');
  })
  .catch(error => console.error('Error loading About Us card:', error));

 

 const scrollContainer = document.getElementById("productScroll");


    document.querySelector(".left-btn").onclick = () => {
      scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
    };


    document.querySelector(".right-btn").onclick = () => {
      scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
    };

    const aboutWrapper = document.querySelector('.about-wrapper');
    let aboutBox = document.getElementById('aboutBox');
    const contactWrapper = document.querySelector('.contact-wrapper');
    const contactBox = document.getElementById('contactBox');

    function showCard(card) {
      card.style.opacity = '1';
      card.style.visibility = 'visible';
      card.classList.add('clicked-open');
    }

    function hideCard(card) {
      card.style.opacity = '0';
      card.style.visibility = 'hidden';
      card.classList.remove('clicked-open');
    }

    function toggleCard(cardToToggle, otherCard) {
      const open = cardToToggle.classList.contains('clicked-open');
      if (open) {
        hideCard(cardToToggle);
      } else {
        showCard(cardToToggle);
        if (otherCard) hideCard(otherCard);
      }
    }

    // Wire click handlers on the wrapper elements so clicking the nav item toggles the card
    aboutWrapper.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCard(aboutBox, contactBox);
    });

    contactWrapper.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCard(contactBox, aboutBox);
    });

    // Keyboard support (Enter/Space) on wrappers
    [aboutWrapper, contactWrapper].forEach((wrapper) => {
      wrapper.setAttribute('tabindex', '0');
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          wrapper.click();
        }
      });
    });

    // Click outside to close any open cards
    document.addEventListener('click', (e) => {
      if (!aboutWrapper.contains(e.target) && !aboutBox.contains(e.target)) {
        hideCard(aboutBox);
      }
      if (!contactWrapper.contains(e.target) && !contactBox.contains(e.target)) {
        hideCard(contactBox);
      }
    });

    // On resize, clear clicked-open classes (keeps layout predictable)
    window.addEventListener('resize', () => {
      hideCard(aboutBox);
      hideCard(contactBox);
    });
