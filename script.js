// Smooth Scrolling for navigation links
const navLinks = document.querySelectorAll('#navbar a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor jump
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calculate position, considering navbar height if it's fixed
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            // Only offset if the navbar is likely fixed (check screen width or a class)
            const offsetPosition = window.innerWidth > 768 ?
                                  targetElement.offsetTop - navbarHeight :
                                  targetElement.offsetTop;


            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Optional: Close mobile menu if open
        }
    });
});

// Change navbar background on scroll
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero'); // Reference the hero section

// Function to add/remove 'scrolled' class
function handleScroll() {
    // Check if window.innerWidth > 768 because navbar is not fixed on mobile
    if (window.innerWidth > 768 && window.scrollY > 50) { // Add class after scrolling 50px
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Add scroll event listener only if navbar is potentially fixed
if (window.innerWidth > 768) {
   window.addEventListener('scroll', handleScroll);
}

// Optional: Recalculate on resize if needed
window.addEventListener('resize', () => {
    // Remove or add scroll listener based on new width
    window.removeEventListener('scroll', handleScroll); // Remove first to avoid duplicates
     if (window.innerWidth > 768) {
       window.addEventListener('scroll', handleScroll);
       handleScroll(); // Check immediately on resize
     } else {
       navbar.classList.remove('scrolled'); // Ensure it's not scrolled on mobile
     }
});


// Highlight active navigation link on scroll (More advanced)
const sections = document.querySelectorAll('section[id]'); // Select sections with an ID

function highlightNavLink() {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;
    const navbarHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50; // Adjust offset as needed
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // Check if current scroll position is within this section
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSectionId = sectionId;
        }
    });

    // If no section is actively scrolled into view (e.g., at the very top or bottom)
    // you might want default behavior, like highlighting the first link or none.
    // For simplicity, we highlight based on detected section.

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Compare link's href with the detected section ID
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll listener for highlighting
window.addEventListener('scroll', highlightNavLink);
// Call once on load to set initial state
document.addEventListener('DOMContentLoaded', highlightNavLink);


console.log("Portfolio script loaded."); // For debugging