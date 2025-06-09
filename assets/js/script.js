document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
                if (mobileMenuButton.querySelector('i').classList.contains('ri-menu-line')) {
                    mobileMenuButton.querySelector('i').classList.remove('ri-menu-line');
                    mobileMenuButton.querySelector('i').classList.add('ri-close-line');
                } else {
                    mobileMenuButton.querySelector('i').classList.remove('ri-close-line');
                    mobileMenuButton.querySelector('i').classList.add('ri-menu-line');
                }
            });
            
            // Mobile Dropdown Toggle
            const mobileDropdownButtons = document.querySelectorAll('.mobile-dropdown-button');
            
            mobileDropdownButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const content = this.nextElementSibling;
                    content.classList.toggle('hidden');
                    
                    const icon = this.querySelector('i');
                    if (icon.classList.contains('ri-arrow-down-s-line')) {
                        icon.classList.remove('ri-arrow-down-s-line');
                        icon.classList.add('ri-arrow-up-s-line');
                    } else {
                        icon.classList.remove('ri-arrow-up-s-line');
                        icon.classList.add('ri-arrow-down-s-line');
                    }
                });
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            // Back to Top Button
            const backToTopButton = document.getElementById('back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.remove('opacity-0', 'invisible');
                    backToTopButton.classList.add('opacity-100', 'visible');
                } else {
                    backToTopButton.classList.remove('opacity-100', 'visible');
                    backToTopButton.classList.add('opacity-0', 'invisible');
                }
            });
            
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            // Custom Select Initialization
            const customSelects = document.querySelectorAll('.custom-select');
            
            customSelects.forEach(select => {
                const selectElement = select.querySelector('select');
                const selectedDiv = document.createElement('div');
                selectedDiv.setAttribute('class', 'select-selected');
                selectedDiv.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
                select.appendChild(selectedDiv);
                
                const itemsDiv = document.createElement('div');
                itemsDiv.setAttribute('class', 'select-items select-hide');
                
                for (let i = 0; i < selectElement.length; i++) {
                    const optionDiv = document.createElement('div');
                    optionDiv.innerHTML = selectElement.options[i].innerHTML;
                    
                    optionDiv.addEventListener('click', function() {
                        const selectElement = this.parentNode.parentNode.querySelector('select');
                        const selectedDiv = this.parentNode.previousSibling;
                        
                        for (let j = 0; j < selectElement.length; j++) {
                            if (selectElement.options[j].innerHTML === this.innerHTML) {
                                selectElement.selectedIndex = j;
                                selectedDiv.innerHTML = this.innerHTML;
                                
                                // Show "Other Service" field if "Autre" is selected
                                if (selectElement.id === 'service' && selectElement.value === 'autre') {
                                    document.getElementById('other-service-container').style.display = 'block';
                                } else if (selectElement.id === 'service') {
                                    document.getElementById('other-service-container').style.display = 'none';
                                }
                                
                                break;
                            }
                        }
                        
                        selectedDiv.click();
                    });
                    
                    itemsDiv.appendChild(optionDiv);
                }
                
                select.appendChild(itemsDiv);
                
                selectedDiv.addEventListener('click', function(e) {
                    e.stopPropagation();
                    closeAllSelect(this);
                    this.nextSibling.classList.toggle('select-hide');
                    this.classList.toggle('select-arrow-active');
                });
            });
            
            function closeAllSelect(elmnt) {
                const selectItems = document.getElementsByClassName('select-items');
                const selectSelected = document.getElementsByClassName('select-selected');
                
                for (let i = 0; i < selectSelected.length; i++) {
                    if (elmnt !== selectSelected[i]) {
                        selectSelected[i].classList.remove('select-arrow-active');
                    }
                }
                
                for (let i = 0; i < selectItems.length; i++) {
                    if (elmnt !== selectItems[i].previousSibling) {
                        selectItems[i].classList.add('select-hide');
                    }
                }
            }
            
            document.addEventListener('click', closeAllSelect);
        });

        document.addEventListener('DOMContentLoaded', function() {
            // Form Submissions
            const bookingForm = document.getElementById('booking-form');
            const quoteForm = document.getElementById('quote-form');
            const contactForm = document.getElementById('contact-form');
            const newsletterForm = document.getElementById('newsletter-form');
            const bookingSuccessModal = document.getElementById('booking-success-modal');
            const closeBookingModal = document.getElementById('close-booking-modal');
            
            if (bookingForm) {
                bookingForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    bookingSuccessModal.classList.remove('hidden');
                    bookingForm.reset();
                    
                    // Reset custom select display
                    const customSelects = bookingForm.querySelectorAll('.select-selected');
                    customSelects.forEach(select => {
                        const selectElement = select.parentNode.querySelector('select');
                        select.innerHTML = selectElement.options[0].innerHTML;
                    });
                    
                    // Hide "Other Service" field
                    document.getElementById('other-service-container').style.display = 'none';
                });
            }
            
            if (closeBookingModal) {
                closeBookingModal.addEventListener('click', function() {
                    bookingSuccessModal.classList.add('hidden');
                });
            }
            
            if (quoteForm) {
                quoteForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Votre demande de devis a été envoyée avec succès! Nous vous contacterons dans les plus brefs délais.');
                    quoteForm.reset();
                    
                    // Reset custom select display
                    const customSelects = quoteForm.querySelectorAll('.select-selected');
                    customSelects.forEach(select => {
                        const selectElement = select.parentNode.querySelector('select');
                        select.innerHTML = selectElement.options[0].innerHTML;
                    });
                });
            }
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.');
                    contactForm.reset();
                });
            }
            
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Merci de vous être inscrit à notre newsletter!');
                    newsletterForm.reset();
                });
            }
            
            // Set minimum date for date inputs to today
            const today = new Date().toISOString().split('T')[0];
            const dateInputs = document.querySelectorAll('input[type="date"]');
            dateInputs.forEach(input => {
                input.min = today;
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        const mobileMenu = document.getElementById('mobile-menu');
                        if (!mobileMenu.classList.contains('hidden')) {
                            mobileMenu.classList.add('hidden');
                            const menuButton = document.getElementById('mobile-menu-button');
                            menuButton.querySelector('i').classList.remove('ri-close-line');
                            menuButton.querySelector('i').classList.add('ri-menu-line');
                        }
                        
                        // Scroll to target
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Adjust for header height
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });



// animation de carroussel en mouvement
let currentIndex = 0;
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides; // Boucle infinie
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}
setInterval(showNextSlide, 3100); // Change d'image toutes les 3 secondes


// Initialize CounterUp
$(document).ready(function () {
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });
});

  $(document).ready(function () {
    let countersStarted = false; // Pour éviter plusieurs déclenchements

    function startCounters() {
      if (!countersStarted) {
        $('[data-toggle="counter-up"]').each(function () {
          $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
          }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
          });
        });
        countersStarted = true;
      }
    }

    // Déclenche l'animation quand les compteurs entrent dans la vue
    const waypoint = new Waypoint({
      element: document.getElementById('counter-section'), // met ici l’ID du conteneur de tes compteurs
      handler: function () {
        startCounters();
        this.destroy(); // Pour ne pas relancer au scroll
      },
      offset: '80%' // Déclenche quand 80% du conteneur entre en vue
    });
  });