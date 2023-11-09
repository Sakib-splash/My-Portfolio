// Fetch data from the JSON file
fetch('/jsons/education-and-experience.json')
    .then((response) => response.json())
    .then((data) => {
        // Function to generate HTML content for education or experience
        const generateContent = (sectionData) => {
            return sectionData.map((item) => `
        <div class="education-content">
          <div class="content">
            <div class="year"><i class='bx bxs-calendar'></i> ${item.year}</div>
            <h3>${item.institution || item.company} — ${item.degree || item.position}</h3>
            <p>${item.description}</p>
          </div>
        </div>
      `).join('');
        };

        // Populate the education section
        const educationSection = document.querySelector('.education-row .education-column:first-child .education-box');
        educationSection.innerHTML = generateContent(data.education);

        // Populate the experience section
        const experienceSection = document.querySelector('.education-row .education-column:last-child .education-box');
        experienceSection.innerHTML = generateContent(data.experience);
    })
    .catch((error) => {
        console.error('Error loading data:', error);
    });

// Fetch data from the JSON file
fetch('/jsons/skills.json')
    .then((response) => response.json())
    .then((data) => {
        // Function to generate HTML content for skills
        const generateSkillsContent = (skillsData) => {
            return skillsData.map((skill) => `
        <div class="progress">
            <h3>${skill.name} <span>${skill.percent}</span></h3>
            <div class="bar"><span style="width: ${skill.percent};"></span></div>
        </div>
    `).join('');
        };

        // Populate the coding skills and professional skills sections
        const codingSkillsSection = document.getElementById('codingSkills');
        const professionalSkillsSection = document.getElementById('professionalSkills');
        codingSkillsSection.innerHTML = generateSkillsContent(data.codingSkills);
        professionalSkillsSection.innerHTML = generateSkillsContent(data.professionalSkills);
    })
    .catch((error) => {
        console.error('Error loading data:', error);
    });

// Fetch data from the JSON file
fetch('/jsons/services.json')
    .then((response) => response.json())
    .then((data) => {
        // Function to generate HTML content for services
        const generateServicesContent = (servicesData) => {
            return servicesData.map((service) => `
            <div class="services-box">
                <i class="${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <a href="#contact" class="btn">GET IN TOUCH</a>
            </div>
        `).join('');
        };

        // Populate the services section
        const servicesSection = document.querySelector('.services-container');
        servicesSection.innerHTML = generateServicesContent(data.services);
    })
    .catch((error) => {
        console.error('Error loading data:', error);
    });

// Define the base path for image URLs
const basePath = 'images/';

// Function to create a portfolio box element
function createPortfolioBox(item) {
    const portfolioBox = document.createElement('div');
    portfolioBox.classList.add('portfolio-box');

    const imageSrc = basePath + item.image;

    // Create the 'image' element and set its 'src' and 'alt' attributes
    const image = document.createElement('img');
    image.src = imageSrc;
    image.alt = item.name;

    // Create the 'portfolio-layer' element
    const portfolioLayer = document.createElement('div');
    portfolioLayer.classList.add('portfolio-layer');

    // Create the 'h4' element for the project name
    const projectName = document.createElement('h4');
    projectName.textContent = item.name;

    // Create the 'p' element for the project description
    const projectDescription = document.createElement('p');
    projectDescription.textContent = item.description;

    // Create the 'a' element for the project link
    const projectLink = document.createElement('a');
    projectLink.setAttribute('title', 'Open Link');
    projectLink.href = item.link;
    projectLink.target = '_blank';

    // Create the 'i' element for the external link icon
    const externalLinkIcon = document.createElement('i');
    externalLinkIcon.classList.add('bx', 'bx-link-external');

    // Append elements to the portfolio box
    projectLink.appendChild(externalLinkIcon);
    portfolioLayer.appendChild(projectName);
    portfolioLayer.appendChild(projectDescription);
    portfolioLayer.appendChild(projectLink);
    portfolioBox.appendChild(image);
    portfolioBox.appendChild(portfolioLayer);

    return portfolioBox;
}

// Function to load portfolio items from JSON and append them to the container
function loadPortfolioItems() {
    const portfolioContainer = document.querySelector('.portfolio-container');

    // Replace 'portfolio-data.json' with the path to your JSON file
    fetch('/jsons/portfolio-data.json')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                const portfolioBox = createPortfolioBox(item);
                portfolioContainer.appendChild(portfolioBox);
            });

            // Initialize ScrollReveal after content is loaded
            ScrollReveal({
                distance: '80px',
                duration: 2000,
                delay: 200
            });

            // Add the ScrollReveal configuration for the portfolio items
            ScrollReveal().reveal('.portfolio-box', {
                origin: 'bottom'
            });
        })
        .catch((error) => {
            console.error('Error loading portfolio data.', error);
        });
}

// Call the function to load portfolio items when the page loads
window.addEventListener('load', () => {
    // Check if the URL contains the #contact anchor
    if (window.location.hash !== '#contact') {
        loadPortfolioItems();
    }
});

// Fetch data from the JSON file
// fetch('/jsons/testimonials.json')
//     .then((response) => response.json())
//     .then((data) => {
//         // Function to generate HTML content for testimonials
//         const generateTestimonialContent = (testimonialData) => {
//             return testimonialData.map((testimonial) => `
//             <div class="testimonial-slide swiper-slide">
//                 <img src="${testimonial.image}" alt="${testimonial.name}">
//                 <h3>${testimonial.name}</h3>
//                 <p>${testimonial.quote}</p>
//             </div>
//         `).join('');
//         };

//         // Populate the testimonial section
//         const testimonialContentSection = document.getElementById('testimonialContent');
//         testimonialContentSection.innerHTML = generateTestimonialContent(data);

//         // Initialize Swiper
//         var swiper = new Swiper(".mySwiper", {
//             slidesPerView: 1,
//             spaceBetween: 50,
//             loop: true,
//             grabCursor: true,
//             pagination: {
//                 el: ".swiper-pagination",
//                 clickable: true,
//             },
//             navigation: {
//                 nextEl: ".swiper-button-next",
//                 prevEl: ".swiper-button-prev",
//             },
//         });
//     })
//     .catch((error) => {
//         console.error('Error loading data:', error);
//     });

// Function to load the contact form and initialize ScrollReveal
function loadContactForm() {
    const contactForm = document.querySelector('.contact form');

    // Initialize ScrollReveal after content is loaded
    ScrollReveal({
        // reset: true,
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    // Add the ScrollReveal configuration for the contact form
    ScrollReveal().reveal(contactForm, {
        origin: 'bottom'
    });
}

// Call the function to load the contact form and initialize ScrollReveal
window.addEventListener('load', loadContactForm);

/*========================= toggle icon navbar =========================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*========================= scroll sections active link =========================*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*========================= sticky navbar =========================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*========================= remove toggle icon and navbar when click navbar link (scroll) =========================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*=============== swipper =====================*/
// var swiper = new Swiper(".mySwiper", {
//     slidesPerView: 1,
//     spaceBetween: 50,
//     loop: true,
//     grabCursor: true,
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
// });

/*========================= scroll reveal =========================*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', {
    origin: 'top'
});
ScrollReveal().reveal('.home-img, .education-row, .skills-row, .services-container, .testimonial-wrapper, .about-content, .about-content h2', {
    origin: 'bottom'
});
ScrollReveal().reveal('.home-content h1, .about-img', {
    origin: 'left'
});
ScrollReveal().reveal('.home-content p', {
    origin: 'right'
});

/*========================= typed js =========================*/

const typed = new Typed('.multiple-text', {
    strings: ['Front-End Developer.', 'Event Co-ordinator.', 'Android Developer.', 'Youtuber.'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/*========================= right clicking disabler =========================*/
$(document).ready(function () {
    $("body").on("contextmenu", function (e) {
        return false;
    });
});

/*========================= Ctrl+P and Ctrl+S disabler =========================*/
window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        // alert("Printing is disabled on this page.");
    }
});